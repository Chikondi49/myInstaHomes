import React from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialsAndMap = () => {
  return (
    <section className="flex flex-col lg:flex-row min-h-[400px]">
      {/* Left: Testimonials */}
      <div className="bg-brand-gold w-full lg:w-1/2 p-12 md:p-20 flex flex-col justify-center relative overflow-hidden">
        <div className="relative z-10 w-full max-w-xl mx-auto text-center">
          <div className="flex justify-center space-x-1 mb-6 text-brand-teal">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
          </div>
          <p className="text-brand-teal text-lg md:text-xl italic font-medium leading-relaxed mb-8">
            "Our goal is to provide a seamless, comfortable experience that feels both welcoming and secure. Whether you're a solo traveller, a couple on a getaway, or a group of friends — Mai Insta Homes is your sanctuary."
          </p>
          <div className="flex flex-col items-center">
            <h4 className="text-brand-teal font-bold uppercase tracking-widest text-sm mb-1">Mr. Clement Ndiwo Banda</h4>
            <span className="text-brand-teal/70 text-xs font-semibold uppercase tracking-wider">Founder</span>
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
