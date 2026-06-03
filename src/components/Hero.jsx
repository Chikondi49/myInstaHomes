import React, { useEffect, useState } from 'react';
import { Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Hero = () => {
  const [heroInfo, setHeroInfo] = useState({
    mainTitle: 'Your Comfort is Our Priority',
    subtitle: 'BOOKING & MANAGEMENT PORTAL',
    description: ''
  });

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'settings', 'hero_info'));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setHeroInfo(prev => ({
            mainTitle: data.mainTitle || prev.mainTitle,
            subtitle: data.subtitle || prev.subtitle,
            description: data.description || prev.description
          }));
        }
      } catch (error) {
        console.error("Error fetching hero info: ", error);
      }
    };
    fetchHero();
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const threeDaysLater = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="/hero.png" 
          alt="Mai Insta Homes" 
          fetchpriority="high"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-teal/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
          {heroInfo.mainTitle}
        </h1>
        {heroInfo.description && (
          <p className="text-white md:text-xl font-medium max-w-2xl mx-auto mb-6 drop-shadow-md">
            {heroInfo.description}
          </p>
        )}
        <p className="text-sm md:text-lg tracking-[0.3em] font-medium text-brand-gold uppercase mb-12 drop-shadow-md">
          {heroInfo.subtitle}
        </p>
      </div>

      {/* Floating Booking Widget */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-5xl px-6 z-20">
        <div className="bg-brand-teal rounded-xl shadow-2xl p-2 md:p-4 flex flex-col md:flex-row items-stretch gap-4 border border-white/10">
          {/* Check-In */}
          <div className="flex-1 bg-white rounded-lg p-3 flex items-center space-x-3 group transition-all hover:ring-2 hover:ring-brand-gold">
            <Calendar className="text-brand-teal" size={20} />
            <div className="flex flex-col flex-1">
              <label className="text-[10px] text-gray-500 uppercase font-bold">Check-In</label>
              <input type="date" className="text-sm font-semibold outline-none w-full bg-transparent" defaultValue={today} />
            </div>
          </div>

          {/* Check-Out */}
          <div className="flex-1 bg-white rounded-lg p-3 flex items-center space-x-3 group transition-all hover:ring-2 hover:ring-brand-gold">
            <Calendar className="text-brand-teal" size={20} />
            <div className="flex flex-col flex-1">
              <label className="text-[10px] text-gray-500 uppercase font-bold">Check-Out</label>
              <input type="date" className="text-sm font-semibold outline-none w-full bg-transparent" defaultValue={threeDaysLater} />
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1 bg-white rounded-lg p-3 flex items-center space-x-3 group transition-all hover:ring-2 hover:ring-brand-gold">
            <Users className="text-brand-teal" size={20} />
            <div className="flex flex-col flex-1">
              <label className="text-[10px] text-gray-500 uppercase font-bold">Guests</label>
              <select className="text-sm font-semibold outline-none w-full bg-transparent appearance-none">
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option selected>3 Guests</option>
                <option>4+ Guests</option>
              </select>
            </div>
          </div>

          {/* CTA */}
          <Link to="/book" className="bg-brand-gold text-brand-teal font-bold px-10 py-4 rounded-lg uppercase tracking-widest text-sm hover:scale-[1.02] transition-transform shadow-lg whitespace-nowrap text-center">
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
