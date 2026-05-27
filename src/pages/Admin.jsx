import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { db, storage } from '../firebase';
import { collection, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Upload, Image as ImageIcon, Loader2, Info, LayoutTemplate, Phone, BookOpen } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [message, setMessage] = useState({ type: '', text: '' });

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

  // Blog State
  const [blogFile, setBlogFile] = useState(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [uploadingBlog, setUploadingBlog] = useState(false);

  // Fetch Existing Settings
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const contactDoc = await getDoc(doc(db, 'settings', 'contact_info'));
        if (contactDoc.exists()) setContactInfo(contactDoc.data());

        const heroDoc = await getDoc(doc(db, 'settings', 'hero_info'));
        if (heroDoc.exists()) setHeroInfo(heroDoc.data());
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-32">
            <div className="p-6 border-b border-gray-100 bg-brand-teal text-white">
              <h2 className="text-xl font-bold">Admin Portal</h2>
              <p className="text-sm opacity-80 mt-1">Manage Application</p>
            </div>
            <div className="p-3 space-y-1">
              <button 
                onClick={() => setActiveTab('gallery')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-colors ${activeTab === 'gallery' ? 'bg-brand-gold/10 text-brand-teal' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <ImageIcon size={20} /> Gallery Manager
              </button>
              <button 
                onClick={() => setActiveTab('contact')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-colors ${activeTab === 'contact' ? 'bg-brand-gold/10 text-brand-teal' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Phone size={20} /> Contact & Footer
              </button>
              <button 
                onClick={() => setActiveTab('hero')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-colors ${activeTab === 'hero' ? 'bg-brand-gold/10 text-brand-teal' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <LayoutTemplate size={20} /> Hero & Taglines
              </button>
              <button 
                onClick={() => setActiveTab('blog')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-colors ${activeTab === 'blog' ? 'bg-brand-gold/10 text-brand-teal' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <BookOpen size={20} /> Blog Manager
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

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
