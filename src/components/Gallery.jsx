import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Gallery = () => {
  // Initialize from cache if available to prevent "empty" state flash
  const [rooms, setRooms] = useState(() => {
    const cached = localStorage.getItem('mai_featured_cache');
    return cached ? JSON.parse(cached) : [
      { title: "Living Room/TV", description: "Fully equipped with modern entertainment systems.", image: "" },
      { title: "Dining area", description: "Spacious and elegant for family meals.", image: "" },
      { title: "Kitchen", description: "High-end appliances and full cooking facilities.", image: "" },
      { title: "Master Bedroom", description: "Luxury en-suite king bedroom with premium linens.", image: "" }
    ];
  });

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const docRef = doc(db, 'settings', 'featured_properties');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data().properties;
          setRooms(data);
          // Update cache for next time
          localStorage.setItem('mai_featured_cache', JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error fetching featured properties: ", error);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-10 border-l-4 border-brand-gold pl-4">
        Mai Home Features
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {rooms.map((room, index) => (
          <div key={index} className="flex flex-col group">
            <div className="overflow-hidden rounded-2xl mb-4 aspect-[4/3] bg-gray-100">
              {room.image && (
                <img 
                  src={room.image} 
                  alt={room.title} 
                  fetchpriority="high"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              )}
            </div>
            <h3 className="text-xl font-bold text-brand-teal mb-2">{room.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
              {room.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
