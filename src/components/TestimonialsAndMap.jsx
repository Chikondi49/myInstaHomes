import React from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const TestimonialsAndMap = () => {
  const [founderInfo, setFounderInfo] = React.useState({
    quote: "Our goal is to provide a seamless, comfortable experience that feels both welcoming and secure. Whether you're a solo traveller, a couple on a getaway, or a group of friends — Mai Insta Homes is your sanctuary.",
    name: "Mr. Clement Ndiwo Banda",
    title: "Founder",
    imageUrl: ""
  });

  React.useEffect(() => {
    const fetchFounderInfo = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'settings', 'founder_info'));
        if (docSnap.exists()) {
          setFounderInfo(docSnap.data());
        }
      } catch (err) {
        console.error("Error fetching founder info:", err);
      }
    };
    fetchFounderInfo();
  }, []);

  return (
    <section className="flex flex-col lg:flex-row min-h-[400px]">
      {/* Left: Testimonials */}
      <div className="bg-brand-gold w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center relative overflow-hidden">
        <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-8">
          
          {founderInfo.imageUrl ? (
            <img 
              src={founderInfo.imageUrl} 
              alt={founderInfo.name} 
              className="w-24 h-32 md:w-32 md:h-40 rounded-2xl object-cover shadow-2xl shrink-0 border-4 border-brand-teal/20 hover:scale-[1.02] transition-transform duration-500"
            />
          ) : (
            <div className="w-24 h-32 md:w-32 md:h-40 rounded-2xl bg-brand-teal/10 flex items-center justify-center shrink-0 border-4 border-brand-teal/20 hover:scale-[1.02] transition-transform duration-500">
              <Star className="text-brand-teal opacity-50" size={32} />
            </div>
          )}

          <div className="text-center md:text-left flex-1">
            <div className="flex justify-center md:justify-start space-x-1 mb-4 text-brand-teal">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <p className="text-brand-teal text-base md:text-lg italic font-medium leading-relaxed mb-6">
              "{founderInfo.quote}"
            </p>
            <div className="flex flex-col items-center md:items-start">
              <h4 className="text-brand-teal font-bold uppercase tracking-widest text-sm mb-1">{founderInfo.name}</h4>
              <span className="text-brand-teal/70 text-xs font-semibold uppercase tracking-wider">{founderInfo.title}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Map */}
      <div className="w-full lg:w-1/2 h-[400px] lg:h-auto bg-gray-200 grayscale contrast-125 relative">
        <iframe 
          title="location map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3000!2d33.70569!3d-13.94969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus" 
          className="absolute inset-0 w-full h-full border-none opacity-80"
          allowFullScreen="" 
          loading="lazy"
        ></iframe>
        {/* Custom Marker Overlay (Visual representative) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
          <div className="bg-brand-teal text-white text-[10px] px-2 py-1 rounded shadow-lg font-bold mb-1 whitespace-nowrap">MAI INSTA HOMES — Airwing, Lilongwe</div>
          <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsAndMap;
