import React from 'react';
import { Bed, Wifi, Battery, UtensilsCrossed, Tv, MapPin } from 'lucide-react';

const Amenities = () => {
  const amenities = [
    { icon: <Bed size={32} />, title: "4 Bedrooms all en-suite" },
    { icon: <Wifi size={32} />, title: "Free WiFi" },
    { icon: <Battery size={32} />, title: "Power back up" },
    { icon: <UtensilsCrossed size={32} />, title: "Complete kitchen" },
    { icon: <Tv size={32} />, title: "DSTV" },
    { icon: <MapPin size={32} />, title: "Convenient Location" },
  ];

  return (
    <section className="pt-24 md:pt-40 pb-12 md:pb-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-brand-teal uppercase tracking-tight max-w-2xl mx-auto leading-tight">
          LOOKING FOR A <span className="text-brand-gold">COMFORTABLE & AFFORDABLE</span> ACCOMMODATION?
        </h2>
        <p className="font-serif italic text-4xl md:text-5xl text-brand-gold mt-2 -rotate-2">
          We're Here!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {amenities.map((item, index) => (
          <div 
            key={index} 
            className="bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 flex flex-col items-center text-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-brand-teal mb-4 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="text-sm font-semibold text-gray-700 leading-tight">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Amenities;
