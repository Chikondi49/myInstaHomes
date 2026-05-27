import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Maximize2, X, Loader2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Interior', 'Bedrooms', 'Exterior & Grounds'];

  useEffect(() => {
    const q = query(collection(db, 'gallery_images'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedPhotos = [];
      querySnapshot.forEach((doc) => {
        fetchedPhotos.push({ id: doc.id, ...doc.data() });
      });
      setPhotos(fetchedPhotos);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching gallery images: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredPhotos = activeFilter === 'All' 
    ? photos 
    : photos.filter(photo => photo.category === activeFilter);

  return (
    <div className="min-h-screen bg-brand-offwhite flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-teal mb-4">
            Gallery
          </h1>
          <div className="h-1.5 w-16 bg-brand-gold mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Take a visual tour of Mai Insta Homes. From our spacious king suites to the comfortable lounge and secure outdoor spaces.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 px-6">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                activeFilter === category 
                  ? 'bg-brand-teal text-white shadow-lg' 
                  : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Photo Grid or Empty State */}
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-20">
              <Loader2 className="animate-spin text-brand-gold mb-4" size={48} />
              <p className="text-gray-500 font-medium">Loading gallery...</p>
            </div>
          ) : filteredPhotos.length === 0 ? (
            <div className="text-center p-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 font-medium text-lg mb-4">No images found for this category yet.</p>
              <p className="text-brand-teal text-sm">Use the Admin Portal to upload gorgeous property photos!</p>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredPhotos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="relative group overflow-hidden rounded-2xl cursor-pointer break-inside-avoid shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-100"
                  onClick={() => setSelectedImage(photo)}
                >
                  <img 
                    src={photo.src} 
                    alt={photo.title}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-teal/90 via-brand-teal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <Maximize2 className="text-brand-gold mb-3" size={24} />
                      <h3 className="text-white font-bold text-xl">{photo.title}</h3>
                      <p className="text-gray-300 text-sm font-medium uppercase tracking-wider">{photo.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Lightbox Overlay */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 animate-in fade-in duration-300">
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          
          <div className="relative max-w-6xl w-full max-h-full flex flex-col items-center">
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-6 text-center">
              <h3 className="text-white font-bold text-2xl mb-1">{selectedImage.title}</h3>
              <p className="text-brand-gold uppercase tracking-widest text-sm font-bold">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default GalleryPage;
