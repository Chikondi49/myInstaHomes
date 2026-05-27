import React from 'react';

const Gallery = () => {
  const rooms = [
    {
      title: "Living Room/TV",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Dining area",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      image: "https://images.unsplash.com/photo-1517705008128-361805f42e8a?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Kitchen",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
      image: "https://images.unsplash.com/photo-1556911223-e250e3efaa87?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Master Bedroom",
      description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
      image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-10 border-l-4 border-brand-gold pl-4">
        Featured Properties
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {rooms.map((room, index) => (
          <div key={index} className="flex flex-col group">
            <div className="overflow-hidden rounded-2xl mb-4 aspect-[4/3]">
              <img 
                src={room.image} 
                alt={room.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
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
