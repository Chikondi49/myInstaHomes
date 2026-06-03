import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShieldCheck, Heart, MapPin, Sun, Car, Flame, Trees, Bed, Bath, Wifi, Zap, Lock, ShoppingBag, CheckCircle2, ChevronRight } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const About = () => {
  const [aboutInfo, setAboutInfo] = useState(() => {
    const cached = localStorage.getItem('mai_about_cache');
    return cached ? JSON.parse(cached) : {
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
      hostQuote: "Our goal is to provide a seamless, comfortable experience that feels both welcoming and secure. Whether you're a solo traveller, a couple on a getaway, or a group of friends — Mai Insta Homes is your sanctuary.",
      hostName: "Amenye Ndiwo-Banda",
      hostTitle: "Co-Founder, Mai Insta Homes",
      hostImage: ""
    };
  });

  const featureIcons = [
    <Sun size={28} />, <Flame size={28} />, <Trees size={28} />,
    <Car size={28} />, <Lock size={28} />, <ShoppingBag size={28} />
  ];

  useEffect(() => {
    const fetchAboutInfo = async () => {
      try {
        const aboutDoc = await getDoc(doc(db, 'settings', 'about_info'));
        if (aboutDoc.exists()) {
          const data = aboutDoc.data();
          setAboutInfo(data);
          localStorage.setItem('mai_about_cache', JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error fetching about info: ", error);
      }
    };
    fetchAboutInfo();
  }, []);

  return (
    <div className="min-h-screen bg-brand-offwhite flex flex-col font-sans selection:bg-brand-gold selection:text-white">
      <Navbar />

      <main className="flex-grow pt-28">
        {/* Hero Section */}
        <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{ backgroundImage: 'url("/hero3.png")' }}
          >
            <div className="absolute inset-0 bg-brand-teal/60 mix-blend-multiply"></div>
          </div>
          <div className="relative z-10 text-center px-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
              About Mai Insta Homes
            </h1>
            <div className="h-1.5 w-24 bg-brand-gold mx-auto mb-6 rounded-full"></div>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium tracking-wide">
              A cozy home away from home in the heart of Lilongwe, Malawi — the Warm Heart of Africa.
            </p>
          </div>
        </section>

        {/* The Essence - Split Layout */}
        <section className="py-12 md:py-20 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
            {/* Left Image Stack */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-brand-gold/20 to-brand-teal/10 rounded-[3rem] blur-2xl transform rotate-3"></div>
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white aspect-[3/4]">
                <img 
                  src="/hero4.png" 
                  alt="Mai Insta Homes Interior" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Stat Card */}
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-w-[200px] animate-bounce-slow hidden md:block">
                <div className="flex justify-between items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-brand-teal/10 flex items-center justify-center">
                    <ShieldCheck className="text-brand-teal" size={20} />
                  </div>
                  <span className="text-xs font-bold text-gray-400">100% SECURE</span>
                </div>
                <p className="font-bold text-brand-teal text-sm leading-tight">Enclosed with ClearVu fencing.</p>
              </div>
            </div>

            {/* Right Text Content */}
            <div className="lg:col-span-7 space-y-8 lg:pl-10">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-teal leading-[1.15]">
                {aboutInfo.aboutTitle.includes(' ') ? (
                  <>
                    {aboutInfo.aboutTitle.split(' ').slice(0, -1).join(' ')}{' '}
                    <span className="text-brand-gold italic serif">{aboutInfo.aboutTitle.split(' ').slice(-1)}</span>
                  </>
                ) : (
                  aboutInfo.aboutTitle
                )}
              </h2>
              
              <div className="prose prose-lg text-gray-600 max-w-none space-y-4">
                {(aboutInfo.aboutDescription || '').split('\n').map((paragraph, idx) => {
                  if (!paragraph.trim()) return null;
                  return (
                    <p key={idx} className={`${idx === 0 ? 'text-xl font-medium text-gray-700' : ''} leading-relaxed`}>
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Icon Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                {[
                  { icon: <Bed size={24}/>, value: "4", label: "King Suites" },
                  { icon: <Bath size={24}/>, value: "4", label: "En-suite Baths" },
                  { icon: <Zap size={24}/>, value: "24/7", label: "Solar Backup" },
                  { icon: <Wifi size={24}/>, value: "Fast", label: "Free WiFi" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col items-center justify-center text-center group hover:bg-brand-teal transition-colors duration-300">
                    <div className="text-brand-teal group-hover:text-brand-gold mb-3 transition-colors">{stat.icon}</div>
                    <span className="text-2xl font-black text-gray-800 group-hover:text-white leading-none mb-1 transition-colors">{stat.value}</span>
                    <span className="text-[10px] font-bold text-gray-400 group-hover:text-white/80 uppercase tracking-widest">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feature List Section */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          {/* Decorative background vectors */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-[100px] -translate-x-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-teal/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-teal mb-6">
                {aboutInfo.peaceTitle || 'Designed For Your Peace of Mind'}
              </h2>
              <div className="w-20 h-1.5 bg-brand-gold mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
              {(aboutInfo.features || []).map((feature, idx) => (
                <div key={idx} className="flex gap-5 group">
                  <div className="w-14 h-14 rounded-2xl bg-brand-offwhite border border-brand-teal/10 flex-shrink-0 flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-brand-gold transition-colors duration-300 shadow-sm">
                    {featureIcons[idx % featureIcons.length]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-brand-teal transition-colors">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed font-medium">{feature.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Host Section */}
        <section className="py-12 px-4 md:px-8 bg-white relative">
          <div className="max-w-[1400px] w-full mx-auto rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col lg:flex-row relative">
            {/* Left side Image - Narrowed to 1/6 */}
            <div className="lg:w-1/6 relative min-h-[200px] lg:min-h-0 overflow-hidden group border-r border-gray-50 bg-gray-50">
              <img 
                src={aboutInfo.hostImage || ""} 
                alt="Mai Insta Homes Host" 
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-100 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-brand-teal/10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0"></div>
            </div>

            {/* Middle Text - Story */}
            <div className="lg:flex-1 bg-gradient-to-br from-brand-offwhite to-white p-6 md:p-8 lg:p-10 relative flex flex-col justify-center">
              {/* Giant decorative quote mark */}
              <div className="absolute top-6 right-8 text-[100px] text-brand-teal/5 font-serif leading-none select-none pointer-events-none">
                "
              </div>
              
              <div className="relative z-10 max-w-2xl">
                <div className="mb-4 inline-flex items-center text-brand-gold uppercase tracking-widest text-[10px] font-bold px-3 py-1.5 rounded-full border border-brand-gold/20 bg-brand-gold/5 backdrop-blur-sm">
                  <Heart size={12} className="mr-2" /> Your Host
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-brand-teal mb-4 leading-tight">
                  Passionate About <span className="italic text-brand-gold font-serif">Hospitality</span>
                </h2>
                
                <blockquote className="text-base md:text-lg text-gray-700 italic leading-relaxed font-serif border-l-4 border-brand-gold pl-4 mb-6">
                  "{aboutInfo.hostQuote}"
                </blockquote>
                
                <div className="flex flex-col">
                  <span className="text-brand-teal font-black text-lg tracking-tight uppercase">
                    {aboutInfo.hostName || "Amenye Ndiwo-Banda"}
                  </span>
                  <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.2em]">
                    {aboutInfo.hostTitle || "Co-Founder, Mai Insta Homes"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right side Features - Color Banner */}
            <div className="lg:w-1/4 bg-brand-teal/[0.04] p-6 md:p-8 lg:p-10 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-brand-teal/10">
              <ul className="flex flex-col space-y-6">
                {['Local expertise & city recommendations', 'Dedicated 5-star cleanliness', 'Responsive 24/7 communication'].map((item, i) => (
                  <li key={i} className="flex items-start text-gray-800 font-semibold text-sm group/item">
                    <div className="bg-white shadow-sm p-1.5 rounded-lg border border-brand-teal/10 mr-4 mt-0.5 transition-all group-hover/item:border-brand-gold/50 group-hover/item:shadow-md">
                      <CheckCircle2 size={16} className="text-brand-gold" />
                    </div>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default About;
