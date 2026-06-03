import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { db, storage, auth } from '../firebase';
import { collection, addDoc, doc, setDoc, getDoc, getDocs, query, orderBy, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { Upload, Image as ImageIcon, Loader2, Info, LayoutTemplate, Phone, BookOpen, CreditCard, LogOut, FileText, Home, Calendar, ClipboardList, Search } from 'lucide-react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('gallery');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will handle the rest
    } catch (error) {
      alert('Invalid email or password');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  // Gallery State
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Interior');
  const [uploading, setUploading] = useState(false);

  // Contact Info State
  const [contactInfo, setContactInfo] = useState({
    phone: '', email: '', address: '', facebook: '', instagram: ''
  });
  const [savingContact, setSavingContact] = useState(false);

  // Hero Info State
  const [heroInfo, setHeroInfo] = useState({
    mainTitle: '', subtitle: '', description: ''
  });
  const [savingHero, setSavingHero] = useState(false);

  // Pricing State
  const [pricingInfo, setPricingInfo] = useState({
    nightlyRate: 120, serviceFee: 60, occupancyTaxes: 30
  });
  const [savingPricing, setSavingPricing] = useState(false);

  // Blog State
  const [blogFile, setBlogFile] = useState(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [uploadingBlog, setUploadingBlog] = useState(false);

  // Featured Properties State
  const [featuredProperties, setFeaturedProperties] = useState([
    { title: "Living Room/TV", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.", image: "" },
    { title: "Dining area", description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.", image: "" },
    { title: "Kitchen", description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.", image: "" },
    { title: "Master Bedroom", description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.", image: "" }
  ]);
  const [savingFeatured, setSavingFeatured] = useState(false);
  const [uploadingFeaturedIndex, setUploadingFeaturedIndex] = useState(null);

  // Availability State
  const [blockedDates, setBlockedDates] = useState([]);
  const [newRange, setNewRange] = useState({ start: '', end: '', label: '' });
  const [savingAvailability, setSavingAvailability] = useState(false);

  // Bookings State
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [bookingSearch, setBookingSearch] = useState('');
  const [aboutInfo, setAboutInfo] = useState({
    aboutTitle: 'Luxury Meets Convenience',
    aboutDescription: 'Welcome to MAI Instahomes — your spacious four-bedroom retreat located within a secure compound of standalone homes in Lilongwe.\n\nGuests are treated to a fully equipped kitchen, a comfortable communal lounge, and 24-hour solar power backup. Each of our four elegant bedrooms features a king-size bed and a private en-suite bathroom with a hot shower, ensuring absolute privacy and comfort throughout your stay.',
    peaceTitle: 'Designed For Your Peace of Mind',
    features: [
      { title: "Solar Power", text: "Continuous power for lights, TV, and refrigeration through our dedicated backup systems." },
      { title: "Gas Utilities", text: "A gas cooker is available as a reliable alternative when the main grid power fluctuates." },
      { title: "Outdoor Living", text: "Guests are welcome to relax on the patio or enjoy our beautifully maintained outdoor garden." },
      { title: "Secure Parking", text: "Ample, free parking is available directly on our guarded property." },
      { title: "Maximum Security", text: "The entire perimeter is fully enclosed with a ClearVu electric fence." },
      { title: "Prime Location", text: "Gateway Mall and Old Town Market are just a 10-minute drive away." }
    ],
    hostQuote: "My goal is to provide a seamless, comfortable experience that feels both welcoming and secure. Whether you're a solo traveller, a couple on a getaway, or a group of friends — Mai Insta Homes is your sanctuary."
  });
  const [savingAbout, setSavingAbout] = useState(false);

  const [founderInfo, setFounderInfo] = useState({
    quote: "Our goal is to provide a seamless, comfortable experience that feels both welcoming and secure. Whether you're a solo traveller, a couple on a getaway, or a group of friends — Mai Insta Homes is your sanctuary.",
    name: "Mr. Clement Ndiwo Banda",
    title: "Founder",
    imageUrl: ""
  });
  const [savingFounder, setSavingFounder] = useState(false);
  const [founderFile, setFounderFile] = useState(null);
  // Fetch Existing Settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const contactDoc = await getDoc(doc(db, 'settings', 'contact_info'));
        if (contactDoc.exists()) setContactInfo(contactDoc.data());

        const heroDoc = await getDoc(doc(db, 'settings', 'hero_info'));
        if (heroDoc.exists()) setHeroInfo(heroDoc.data());

        const pricingDoc = await getDoc(doc(db, 'settings', 'pricing_info'));
        if (pricingDoc.exists()) setPricingInfo(pricingDoc.data());

        const featuredDoc = await getDoc(doc(db, 'settings', 'featured_properties'));
        if (featuredDoc.exists()) setFeaturedProperties(featuredDoc.data().properties);

        const aboutDoc = await getDoc(doc(db, 'settings', 'about_info'));
        if (aboutDoc.exists()) setAboutInfo(aboutDoc.data());

        const founderDoc = await getDoc(doc(db, 'settings', 'founder_info'));
        if (founderDoc.exists()) setFounderInfo(founderDoc.data());

        const availabilityDoc = await getDoc(doc(db, 'settings', 'availability'));
        if (availabilityDoc.exists()) setBlockedDates(availabilityDoc.data().blocked || []);

        // Fetch bookings
        setLoadingBookings(true);
        const bookingsQuery = query(collection(db, 'bookings'), orderBy('submittedAt', 'desc'));
        const bookingsSnap = await getDocs(bookingsQuery);
        setBookings(bookingsSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        setLoadingBookings(false);
      } catch (error) {
        console.error("Error fetching settings: ", error);
      }
    };
    fetchSettings();
  }, []);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  // --- Handlers ---
  
  const handleBookingStatusChange = async (bookingId, newStatus, firstName, lastName, checkIn, checkOut) => {
    try {
      await updateDoc(doc(db, 'bookings', bookingId), { status: newStatus });
      setBookings(prev => prev.map(x => x.id === bookingId ? { ...x, status: newStatus } : x));

      if (newStatus === 'confirmed') {
        const newBlockedRange = {
          id: Date.now() + Math.floor(Math.random() * 1000),
          start: checkIn,
          end: checkOut,
          label: `Booked online by ${firstName} ${lastName}`
        };
        const updatedBlockedDates = [...blockedDates, newBlockedRange];
        setBlockedDates(updatedBlockedDates);
        await setDoc(doc(db, 'settings', 'availability'), { blocked: updatedBlockedDates });
        showMessage('success', 'Booking confirmed and dates blocked automatically.');
      } else {
        showMessage('success', `Booking marked as ${newStatus}.`);
      }
    } catch (err) {
      console.error("Error updating booking status:", err);
      showMessage('error', 'Failed to update booking status.');
    }
  };
  const handleUploadGallery = async (e) => {
    e.preventDefault();
    if (!file) return showMessage('error', 'Please select an image first.');
    setUploading(true);
    try {
      const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      await addDoc(collection(db, 'gallery_images'), {
        title: title || 'Untitled',
        category,
        src: downloadURL,
        createdAt: new Date(),
      });
      showMessage('success', 'Image uploaded successfully!');
      setFile(null); setTitle(''); document.getElementById('file-upload').value = '';
    } catch (error) {
      showMessage('error', 'Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveContact = async (e) => {
    e.preventDefault();
    setSavingContact(true);
    try {
      await setDoc(doc(db, 'settings', 'contact_info'), contactInfo);
      showMessage('success', 'Contact info updated successfully!');
    } catch (error) {
      showMessage('error', 'Failed to save contact info.');
    } finally {
      setSavingContact(false);
    }
  };

  const handleSaveFounder = async (e) => {
    e.preventDefault();
    setSavingFounder(true);
    let imageUrl = founderInfo.imageUrl;
    try {
      if (founderFile) {
        const timestamp = Date.now();
        const storageRef = ref(storage, `founder/${timestamp}_${founderFile.name}`);
        const snapshot = await uploadBytes(storageRef, founderFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }
      const newFounderInfo = { ...founderInfo, imageUrl };
      await setDoc(doc(db, 'settings', 'founder_info'), newFounderInfo);
      setFounderInfo(newFounderInfo);
      setFounderFile(null);
      showMessage('success', 'Founder info updated successfully!');
    } catch (error) {
      console.error(error);
      showMessage('error', 'Failed to save founder info.');
    } finally {
      setSavingFounder(false);
    }
  };

  const handleSaveHero = async (e) => {
    e.preventDefault();
    setSavingHero(true);
    try {
      await setDoc(doc(db, 'settings', 'hero_info'), heroInfo);
      showMessage('success', 'Hero info updated successfully!');
    } catch (error) {
      showMessage('error', 'Failed to save hero info.');
    } finally {
      setSavingHero(false);
    }
  };

  const handleFeaturedImageChange = async (index, file) => {
    if (!file) return;
    setUploadingFeaturedIndex(index);
    showMessage('info', 'Uploading image...');
    try {
      const timestamp = Date.now();
      const storageRef = ref(storage, `featured/${timestamp}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      const newProps = [...featuredProperties];
      newProps[index].image = downloadURL;
      setFeaturedProperties(newProps);
      showMessage('success', 'Image uploaded successfully. Remember to click Save.');
    } catch (error) {
      showMessage('error', 'Failed to upload image.');
    } finally {
      setUploadingFeaturedIndex(null);
    }
  };

  const handleSaveFeatured = async (e) => {
    e.preventDefault();
    setSavingFeatured(true);
    try {
      await setDoc(doc(db, 'settings', 'featured_properties'), { properties: featuredProperties });
      showMessage('success', 'Featured properties saved successfully!');
    } catch (error) {
      showMessage('error', 'Failed to save properties.');
    } finally {
      setSavingFeatured(false);
    }
  };

  const handleSaveAbout = async (e) => {
    e.preventDefault();
    setSavingAbout(true);
    try {
      await setDoc(doc(db, 'settings', 'about_info'), aboutInfo);
      showMessage('success', 'About Page text updated successfully!');
    } catch (error) {
      showMessage('error', 'Failed to save about info.');
    } finally {
      setSavingAbout(false);
    }
  };

  const handleHostImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    showMessage('info', 'Uploading host image...');
    try {
      const timestamp = Date.now();
      const storageRef = ref(storage, `host/${timestamp}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      setAboutInfo({ ...aboutInfo, hostImage: downloadURL });
      showMessage('success', 'Host image uploaded successfully. Click Save to apply.');
    } catch (error) {
      showMessage('error', 'Failed to upload host image.');
    }
  };

  const handleSavePricing = async (e) => {
    e.preventDefault();
    setSavingPricing(true);
    try {
      await setDoc(doc(db, 'settings', 'pricing_info'), {
        nightlyRate: Number(pricingInfo.nightlyRate),
        serviceFee: Number(pricingInfo.serviceFee),
        occupancyTaxes: Number(pricingInfo.occupancyTaxes)
      });
      showMessage('success', 'Pricing updated successfully!');
    } catch (error) {
      showMessage('error', 'Failed to save pricing.');
    } finally {
      setSavingPricing(false);
    }
  };

  const handleUploadBlog = async (e) => {
    e.preventDefault();
    if (!blogFile) return showMessage('error', 'Please select an image for the blog post.');
    setUploadingBlog(true);
    try {
      const storageRef = ref(storage, `blogs/${Date.now()}_${blogFile.name}`);
      const snapshot = await uploadBytes(storageRef, blogFile);
      const downloadURL = await getDownloadURL(snapshot.ref);
      await addDoc(collection(db, 'blogs'), {
        title: blogTitle || 'Untitled Post',
        content: blogContent,
        image: downloadURL,
        createdAt: new Date(),
        author: 'Mai Insta Homes'
      });
      showMessage('success', 'Blog post published successfully!');
      setBlogFile(null); setBlogTitle(''); setBlogContent(''); document.getElementById('blog-file-upload').value = '';
    } catch (error) {
      showMessage('error', 'Failed to publish blog post.');
    } finally {
      setUploadingBlog(false);
    }
  };

  const handleSaveAvailability = async (e) => {
    if (e) e.preventDefault();
    setSavingAvailability(true);
    try {
      await setDoc(doc(db, 'settings', 'availability'), { blocked: blockedDates });
      showMessage('success', 'Calendar availability updated successfully!');
    } catch (error) {
      showMessage('error', 'Failed to save availability.');
    } finally {
      setSavingAvailability(false);
    }
  };

  const addBlockedRange = () => {
    if (!newRange.start || !newRange.end) return showMessage('error', 'Start and end dates are required.');
    if (newRange.start > newRange.end) return showMessage('error', 'Start date must be before end date.');
    
    setBlockedDates([...blockedDates, { ...newRange, id: Date.now() }]);
    setNewRange({ start: '', end: '', label: '' });
  };

  const removeBlockedRange = (id) => {
    setBlockedDates(blockedDates.filter(range => range.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-8">
        {isCheckingAuth ? (
          <div className="w-full flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-brand-gold h-10 w-10" />
          </div>
        ) : !isAuthenticated ? (
          <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-10">
            <h2 className="text-2xl font-bold text-brand-teal mb-6 text-center">Admin Access</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@maiinstahomes.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Access Code / Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none" />
              </div>
              <button type="submit" className="w-full bg-brand-teal text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition-opacity">
                Enter Portal
              </button>
            </form>
          </div>
        ) : (
          <>
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-32">
            <div className="p-6 border-b border-gray-100 bg-brand-teal text-white">
              <h2 className="text-xl font-bold">Admin Portal</h2>
              <p className="text-sm opacity-80 mt-1">Manage Application</p>
            </div>

            {/* Mobile Nav */}
            <div className="p-4 md:hidden border-b border-gray-100 bg-gray-50/50">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Select Module</label>
              <select 
                value={activeTab} 
                onChange={(e) => setActiveTab(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-brand-teal font-medium text-gray-700 bg-white"
              >
                <optgroup label="Operations & Reservations">
                  <option value="bookings">Bookings Desk</option>
                  <option value="availability">Availability Calendar</option>
                  <option value="pricing">Rates & Pricing</option>
                </optgroup>
                <optgroup label="Content & Branding">
                  <option value="hero">Hero & Home</option>
                  <option value="about">About Company</option>
                  <option value="founder">Founder Profile</option>
                  <option value="contact">Contact & Footer</option>
                </optgroup>
                <optgroup label="Properties & Media">
                  <option value="featured">Featured Properties</option>
                  <option value="gallery">Gallery Collection</option>
                  <option value="blog">Blog Articles</option>
                </optgroup>
              </select>
            </div>

            {/* Desktop Nav */}
            <div className="p-3 space-y-1 hidden md:block">
              <div className="px-4 py-2 mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Operations & Reservations</div>
              <button onClick={() => setActiveTab('bookings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-colors ${activeTab === 'bookings' ? 'bg-brand-gold/10 text-brand-teal' : 'text-gray-600 hover:bg-gray-50'}`}><ClipboardList size={20} /> Bookings Desk</button>
              <button onClick={() => setActiveTab('availability')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-colors ${activeTab === 'availability' ? 'bg-brand-gold/10 text-brand-teal' : 'text-gray-600 hover:bg-gray-50'}`}><Calendar size={20} /> Availability Calendar</button>
              <button onClick={() => setActiveTab('pricing')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-colors ${activeTab === 'pricing' ? 'bg-brand-gold/10 text-brand-teal' : 'text-gray-600 hover:bg-gray-50'}`}><CreditCard size={20} /> Rates & Pricing</button>

              <div className="px-4 py-2 mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Content & Branding</div>
              <button onClick={() => setActiveTab('hero')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-colors ${activeTab === 'hero' ? 'bg-brand-gold/10 text-brand-teal' : 'text-gray-600 hover:bg-gray-50'}`}><LayoutTemplate size={20} /> Hero & Home</button>
              <button onClick={() => setActiveTab('about')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-colors ${activeTab === 'about' ? 'bg-brand-gold/10 text-brand-teal' : 'text-gray-600 hover:bg-gray-50'}`}><FileText size={20} /> About Company</button>
              <button onClick={() => setActiveTab('founder')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-colors ${activeTab === 'founder' ? 'bg-brand-gold/10 text-brand-teal' : 'text-gray-600 hover:bg-gray-50'}`}><Info size={20} /> Founder Profile</button>
              <button onClick={() => setActiveTab('contact')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-colors ${activeTab === 'contact' ? 'bg-brand-gold/10 text-brand-teal' : 'text-gray-600 hover:bg-gray-50'}`}><Phone size={20} /> Contact & Footer</button>

              <div className="px-4 py-2 mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Properties & Media</div>
              <button onClick={() => setActiveTab('featured')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-colors ${activeTab === 'featured' ? 'bg-brand-gold/10 text-brand-teal' : 'text-gray-600 hover:bg-gray-50'}`}><Home size={20} /> Featured Properties</button>
              <button onClick={() => setActiveTab('gallery')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-colors ${activeTab === 'gallery' ? 'bg-brand-gold/10 text-brand-teal' : 'text-gray-600 hover:bg-gray-50'}`}><ImageIcon size={20} /> Gallery Collection</button>
              <button onClick={() => setActiveTab('blog')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-colors ${activeTab === 'blog' ? 'bg-brand-gold/10 text-brand-teal' : 'text-gray-600 hover:bg-gray-50'}`}><BookOpen size={20} /> Blog Articles</button>
            </div>
            
            <div className="p-3 border-t border-gray-100">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          
          {message.text && (
            <div className={`p-4 rounded-xl mb-8 border ${message.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
              {message.text}
            </div>
          )}

          {/* TAB 1: GALLERY */}
          {activeTab === 'gallery' && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-brand-teal">Upload New Image</h2>
                <p className="text-gray-500">Add high-quality photos to the public gallery.</p>
              </div>
              <form onSubmit={handleUploadGallery} className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Image Title</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none transition-all bg-white">
                    <option value="Interior">Interior</option>
                    <option value="Bedrooms">Bedrooms</option>
                    <option value="Exterior & Grounds">Exterior & Grounds</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Select Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-brand-teal bg-gray-50">
                    <div className="space-y-2 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <label className="cursor-pointer font-bold text-brand-teal hover:text-brand-gold">
                        <span>Upload a file</span>
                        <input id="file-upload" type="file" className="sr-only" onChange={(e) => setFile(e.target.files[0])} accept="image/*" />
                      </label>
                      {file && <p className="text-sm font-medium text-brand-teal mt-2">Selected: {file.name}</p>}
                    </div>
                  </div>
                </div>
                <button type="submit" disabled={uploading} className="w-full bg-brand-teal hover:bg-opacity-90 text-white font-bold py-4 rounded-xl flex items-center justify-center disabled:opacity-70">
                  {uploading ? <><Loader2 className="animate-spin mr-2" /> Uploading...</> : 'Upload to Gallery'}
                </button>
              </form>
            </div>
          )}

          {/* TAB: FEATURED PROPERTIES */}
          {activeTab === 'featured' && (
            <div className="animate-in fade-in duration-300 mb-10">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-brand-teal">Featured Properties</h2>
                <p className="text-gray-500">Edit the 4 featured properties shown on the homepage.</p>
              </div>
              <form onSubmit={handleSaveFeatured} className="space-y-6 max-w-4xl">
                {featuredProperties.map((prop, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 flex flex-col gap-3">
                       <img src={prop.image} alt={prop.title} className="w-full h-32 object-cover rounded-xl border border-gray-200" />
                       <label className="text-sm font-bold text-brand-teal cursor-pointer hover:text-brand-gold transition-colors text-center bg-brand-offwhite py-2 rounded-lg border border-brand-teal/10 relative">
                         {uploadingFeaturedIndex === index ? 'Uploading...' : 'Change Image'}
                         <input type="file" className="sr-only" accept="image/*" onChange={(e) => handleFeaturedImageChange(index, e.target.files[0])} disabled={uploadingFeaturedIndex !== null} />
                       </label>
                    </div>
                    <div className="md:w-2/3 space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Title</label>
                        <input type="text" value={prop.title} onChange={(e) => {
                          const newProps = [...featuredProperties];
                          newProps[index].title = e.target.value;
                          setFeaturedProperties(newProps);
                        }} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-brand-teal outline-none" required />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
                        <textarea value={prop.description} onChange={(e) => {
                          const newProps = [...featuredProperties];
                          newProps[index].description = e.target.value;
                          setFeaturedProperties(newProps);
                        }} className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-brand-teal outline-none block" rows="3" required />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button type="submit" disabled={savingFeatured || uploadingFeaturedIndex !== null} className="bg-brand-teal hover:bg-opacity-90 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center w-full mt-4 text-lg transition-colors">
                  {savingFeatured ? <><Loader2 className="animate-spin mr-2" /> Saving...</> : 'Save Featured Properties'}
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: CONTACT INFO */}
          {activeTab === 'contact' && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-brand-teal">Contact & Footer Information</h2>
                <p className="text-gray-500">Update the phone numbers, addresses, and social links that appear everywhere on the site.</p>
              </div>
              <form onSubmit={handleSaveContact} className="space-y-6 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                    <input type="text" value={contactInfo.phone} onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})} placeholder="+265 888 123 456"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                    <input type="email" value={contactInfo.email} onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})} placeholder="hello@maiinstahomes.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Physical Address</label>
                  <textarea value={contactInfo.address} onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})} placeholder="Inside Airwing compound, Lilongwe, Malawi" rows="2"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Facebook URL</label>
                    <input type="url" value={contactInfo.facebook} onChange={(e) => setContactInfo({...contactInfo, facebook: e.target.value})} placeholder="https://facebook.com/..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Instagram URL</label>
                    <input type="url" value={contactInfo.instagram} onChange={(e) => setContactInfo({...contactInfo, instagram: e.target.value})} placeholder="https://instagram.com/..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none" />
                  </div>
                </div>
                <button type="submit" disabled={savingContact} className="bg-brand-gold hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center disabled:opacity-70 mt-4">
                  {savingContact ? <><Loader2 className="animate-spin mr-2" /> Saving...</> : 'Save Contact Info'}
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: HERO INFO */}
          {activeTab === 'hero' && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-brand-teal">Home Page Text</h2>
                <p className="text-gray-500">Edit the primary headline and welcoming description shown at the very top of your front page.</p>
              </div>
              <form onSubmit={handleSaveHero} className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Main Headline / Title</label>
                  <input type="text" value={heroInfo.mainTitle} onChange={(e) => setHeroInfo({...heroInfo, mainTitle: e.target.value})} placeholder="e.g. Welcome to Mai Insta Homes"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none text-xl" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Subtitle / Tagline (Smaller text)</label>
                  <input type="text" value={heroInfo.subtitle} onChange={(e) => setHeroInfo({...heroInfo, subtitle: e.target.value})} placeholder="e.g. Luxury Meets Convenience in Lilongwe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Welcome Description</label>
                  <textarea value={heroInfo.description} onChange={(e) => setHeroInfo({...heroInfo, description: e.target.value})} placeholder="A cozy home away from home..." rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none" />
                </div>
                <button type="submit" disabled={savingHero} className="bg-brand-gold hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center disabled:opacity-70 mt-4">
                  {savingHero ? <><Loader2 className="animate-spin mr-2" /> Saving...</> : 'Save Hero Text'}
                </button>
              </form>
            </div>
          )}

          {/* TAB: PRICING */}
          {activeTab === 'pricing' && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-brand-teal">Pricing Manager</h2>
                <p className="text-gray-500">Edit the nightly rates and fees for your property.</p>
              </div>
              <form onSubmit={handleSavePricing} className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Nightly Rate ($)</label>
                  <input type="number" step="0.01" value={pricingInfo.nightlyRate} onChange={(e) => setPricingInfo({...pricingInfo, nightlyRate: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Service Fee ($)</label>
                    <input type="number" step="0.01" value={pricingInfo.serviceFee} onChange={(e) => setPricingInfo({...pricingInfo, serviceFee: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Occupancy Taxes ($)</label>
                    <input type="number" step="0.01" value={pricingInfo.occupancyTaxes} onChange={(e) => setPricingInfo({...pricingInfo, occupancyTaxes: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none" required />
                  </div>
                </div>
                <button type="submit" disabled={savingPricing} className="bg-brand-gold hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center disabled:opacity-70 mt-4">
                  {savingPricing ? <><Loader2 className="animate-spin mr-2" /> Saving...</> : 'Save Pricing'}
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: BLOG MANAGER */}
          {activeTab === 'blog' && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-brand-teal">Publish Blog Post</h2>
                <p className="text-gray-500">Share updates, local tips, and news with your guests.</p>
              </div>
              <form onSubmit={handleUploadBlog} className="space-y-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Post Title</label>
                  <input type="text" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} required placeholder="e.g. 5 Reasons to Visit Lilongwe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none transition-all text-xl" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Featured Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-brand-teal bg-gray-50">
                    <div className="space-y-2 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <label className="cursor-pointer font-bold text-brand-teal hover:text-brand-gold">
                        <span>Upload an image</span>
                        <input id="blog-file-upload" type="file" className="sr-only" onChange={(e) => setBlogFile(e.target.files[0])} accept="image/*" />
                      </label>
                      {blogFile && <p className="text-sm font-medium text-brand-teal mt-2">Selected: {blogFile.name}</p>}
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Post Content</label>
                  <textarea value={blogContent} onChange={(e) => setBlogContent(e.target.value)} required placeholder="Write your blog post here..." rows="8"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none transition-all" />
                </div>
                <button type="submit" disabled={uploadingBlog} className="w-full bg-brand-teal hover:bg-opacity-90 text-white font-bold py-4 rounded-xl flex items-center justify-center disabled:opacity-70">
                  {uploadingBlog ? <><Loader2 className="animate-spin mr-2" /> Publishing...</> : 'Publish Post'}
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: ABOUT MANAGER */}
          {activeTab === 'about' && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-brand-teal">About Page Content</h2>
                <p className="text-gray-500">Edit the text sections displayed on the About page and Host profile.</p>
              </div>
              <form onSubmit={handleSaveAbout} className="space-y-6 max-w-3xl">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Main Introduction</h3>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Section Title</label>
                    <input type="text" value={aboutInfo.aboutTitle || ''} onChange={(e) => setAboutInfo({...aboutInfo, aboutTitle: e.target.value})} 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none text-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Description (Press Enter for new paragraphs)</label>
                    <textarea value={aboutInfo.aboutDescription || ''} onChange={(e) => setAboutInfo({...aboutInfo, aboutDescription: e.target.value})} rows="8"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Features Section</h3>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Section Title</label>
                    <input type="text" value={aboutInfo.peaceTitle || ''} onChange={(e) => setAboutInfo({...aboutInfo, peaceTitle: e.target.value})} 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none text-lg" />
                  </div>
                  
                  <div className="space-y-4">
                    <label className="block text-sm font-bold text-gray-700">The 6 Features</label>
                    {(aboutInfo.features || []).map((feature, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200">
                        <input 
                          type="text" 
                          placeholder="Short Title" 
                          value={feature.title} 
                          onChange={(e) => {
                            const newFeatures = [...aboutInfo.features];
                            newFeatures[index].title = e.target.value;
                            setAboutInfo({...aboutInfo, features: newFeatures});
                          }}
                          className="px-3 py-2 border rounded-lg focus:border-brand-teal outline-none h-11"
                        />
                        <input 
                          type="text" 
                          placeholder="Feature description text..." 
                          value={feature.text} 
                          onChange={(e) => {
                            const newFeatures = [...aboutInfo.features];
                            newFeatures[index].text = e.target.value;
                            setAboutInfo({...aboutInfo, features: newFeatures});
                          }}
                          className="px-3 py-2 border rounded-lg focus:border-brand-teal outline-none h-11 w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                  <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Host Profile</h3>
                  
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="w-full md:w-1/3">
                      <label className="block text-sm font-bold text-gray-700 mb-2">Host Image</label>
                      <div className="relative rounded-xl overflow-hidden border-2 border-dashed border-gray-300 bg-gray-50 aspect-[4/5] group">
                        {aboutInfo.hostImage ? (
                          <img src={aboutInfo.hostImage} className="w-full h-full object-cover" alt="Host" />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            <ImageIcon size={48} />
                          </div>
                        )}
                        <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white cursor-pointer transition-opacity font-bold">
                          Upload New Image
                          <input type="file" className="sr-only" accept="image/*" onChange={handleHostImageUpload} />
                        </label>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-2/3 space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Host Name</label>
                        <input type="text" value={aboutInfo.hostName || ''} onChange={(e) => setAboutInfo({...aboutInfo, hostName: e.target.value})} 
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none font-bold" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Host Title / Subtitle</label>
                        <input type="text" value={aboutInfo.hostTitle || ''} onChange={(e) => setAboutInfo({...aboutInfo, hostTitle: e.target.value})} 
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Host Message / Blockquote</label>
                        <textarea value={aboutInfo.hostQuote || ''} onChange={(e) => setAboutInfo({...aboutInfo, hostQuote: e.target.value})} rows="4"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-teal outline-none italic" />
                      </div>
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={savingAbout} className="bg-brand-gold hover:bg-opacity-90 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center w-full disabled:opacity-70 mt-4 text-lg">
                  {savingAbout ? <><Loader2 className="animate-spin mr-2" /> Saving...</> : 'Save About Page Content'}
                </button>
              </form>
            </div>
          )}
          {/* TAB: AVAILABILITY */}
          {activeTab === 'availability' && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-brand-teal">Availability Manager</h2>
                <p className="text-gray-500">Block dates for private bookings, maintenance, or when the property is unavailable.</p>
              </div>

              <div className="bg-brand-teal/5 p-6 rounded-2xl border border-brand-teal/10 mb-8">
                <h3 className="text-lg font-bold text-brand-teal mb-4">Add Blocked Date Range</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Start Date</label>
                    <input type="date" value={newRange.start} onChange={(e) => setNewRange({...newRange, start: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-brand-teal" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">End Date</label>
                    <input type="date" value={newRange.end} onChange={(e) => setNewRange({...newRange, end: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-brand-teal" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Label (Optional)</label>
                    <input type="text" placeholder="e.g. Private Booking" value={newRange.label} onChange={(e) => setNewRange({...newRange, label: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 outline-none focus:border-brand-teal" />
                  </div>
                </div>
                <button onClick={addBlockedRange} className="mt-4 bg-brand-teal text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-opacity">
                  Add to List
                </button>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-bold text-gray-800">Currently Blocked Dates</h3>
                {blockedDates.length === 0 ? (
                  <p className="text-gray-400 italic">No dates currently blocked.</p>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {blockedDates.map((range) => (
                      <div key={range.id} className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="bg-red-50 text-red-600 p-2 rounded-lg">
                            <Calendar size={20} />
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">
                              {new Date(range.start).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} — {new Date(range.end).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </p>
                            {range.label && <p className="text-xs text-gray-500">{range.label}</p>}
                          </div>
                        </div>
                        <button onClick={() => removeBlockedRange(range.id)} className="text-red-500 hover:text-red-700 font-bold text-sm px-3 py-1 rounded-lg hover:bg-red-50 transition-colors">
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button onClick={handleSaveAvailability} disabled={savingAvailability} className="w-full bg-brand-gold text-white font-bold py-4 rounded-xl flex items-center justify-center disabled:opacity-70 shadow-lg">
                {savingAvailability ? <><Loader2 className="animate-spin mr-2" /> Saving...</> : 'Apply Availability Changes'}
              </button>
            </div>
          )}

          {/* TAB: FOUNDER */}
          {activeTab === 'founder' && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-brand-teal">Founder Profile Manager</h2>
                <p className="text-gray-500">Update the founder photo and quote placed on the Home page.</p>
              </div>

              <form onSubmit={handleSaveFounder} className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                  
                  <div className="flex flex-col md:flex-row gap-6 items-center border-b border-gray-100 pb-6 mb-6">
                    <div className="w-32 h-40 md:w-36 md:h-48 rounded-2xl border border-gray-200 overflow-hidden relative group shrink-0 bg-gray-50 flex items-center justify-center">
                      {founderFile ? (
                        <img src={URL.createObjectURL(founderFile)} alt="Preview" className="w-full h-full object-cover" />
                      ) : founderInfo.imageUrl ? (
                        <img src={founderInfo.imageUrl} alt="Current" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon size={40} className="text-gray-300" />
                      )}
                      
                      <div className="absolute inset-0 bg-black/50 items-center justify-center hidden group-hover:flex transition-all cursor-pointer">
                        <Upload className="text-white bg-white/20 p-2 rounded-full" size={36} />
                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setFounderFile(e.target.files[0])} />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Founder Image</p>
                      <p className="text-xs text-gray-500 mb-2">Upload a high-quality, professional, rectangular portrait.</p>
                      <label className="text-xs font-bold bg-brand-teal text-white px-3 py-1.5 rounded-lg cursor-pointer inline-block mt-2">
                        Upload New Photo
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => setFounderFile(e.target.files[0])} />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Founder Name</label>
                      <input type="text" value={founderInfo.name} onChange={(e) => setFounderInfo({...founderInfo, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-brand-teal" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Title</label>
                      <input type="text" value={founderInfo.title} onChange={(e) => setFounderInfo({...founderInfo, title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-brand-teal" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Quote</label>
                    <textarea 
                      rows="3" 
                      value={founderInfo.quote} 
                      onChange={(e) => setFounderInfo({...founderInfo, quote: e.target.value})} 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-brand-teal resize-none" 
                    />
                  </div>

                </div>

                <div className="flex justify-end pt-4">
                  <button type="submit" disabled={savingFounder} className="bg-brand-gold text-white font-bold py-3 px-8 rounded-xl flex items-center justify-center disabled:opacity-70 shadow-lg">
                    {savingFounder ? <><Loader2 className="animate-spin mr-2" /> Saving...</> : 'Save Founder Profile'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: BOOKINGS */}
          {activeTab === 'bookings' && (
            <div className="animate-in fade-in duration-300">
              <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-brand-teal">Bookings Manager</h2>
                  <p className="text-gray-500">All reservation requests submitted through the booking form.</p>
                </div>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-teal w-64"
                  />
                </div>
              </div>

              {loadingBookings ? (
                <div className="flex justify-center py-20"><Loader2 className="animate-spin text-brand-gold h-8 w-8" /></div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <ClipboardList size={48} className="mx-auto mb-4 opacity-30" />
                  <p className="font-bold">No bookings yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings
                    .filter(b => {
                      const q = bookingSearch.toLowerCase();
                      return !q || `${b.firstName} ${b.lastName}`.toLowerCase().includes(q) || b.email?.toLowerCase().includes(q);
                    })
                    .map((b) => (
                      <div key={b.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center font-bold text-lg shrink-0">
                              {b.firstName?.[0]}{b.lastName?.[0]}
                            </div>
                            <div>
                              <p className="font-bold text-gray-800 text-lg">{b.firstName} {b.lastName}</p>
                              <p className="text-sm text-gray-500">{b.email} · {b.phone}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <select
                              value={b.status || 'pending'}
                              onChange={(e) => handleBookingStatusChange(b.id, e.target.value, b.firstName, b.lastName, b.checkIn, b.checkOut)}
                              className={`text-xs font-bold px-3 py-1.5 rounded-full border outline-none cursor-pointer ${
                                b.status === 'confirmed' ? 'bg-green-50 text-green-700 border-green-200' :
                                b.status === 'cancelled' ? 'bg-red-50 text-red-600 border-red-200' :
                                'bg-amber-50 text-amber-700 border-amber-200'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <span className="text-xs text-gray-400 font-mono">#{b.id.slice(0,8).toUpperCase()}</span>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-gray-50 pt-4">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Check-In</p>
                            <p className="font-semibold text-gray-700 text-sm">{new Date(b.checkIn).toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric'})}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Check-Out</p>
                            <p className="font-semibold text-gray-700 text-sm">{new Date(b.checkOut).toLocaleDateString('en-GB', {day:'2-digit',month:'short',year:'numeric'})}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Guests · Nights</p>
                            <p className="font-semibold text-gray-700 text-sm">{b.guests} guests · {b.nights} nights</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total</p>
                            <p className="font-bold text-brand-teal text-sm">${b.totalPrice?.toFixed(2)}</p>
                          </div>
                        </div>

                        {b.notes && (
                          <div className="mt-3 bg-gray-50 rounded-lg px-4 py-2 text-xs text-gray-500">
                            <span className="font-bold text-gray-700">Notes: </span>{b.notes}
                          </div>
                        )}

                        <p className="text-[10px] text-gray-300 mt-3">
                          Submitted: {new Date(b.submittedAt).toLocaleString('en-GB')}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

        </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
