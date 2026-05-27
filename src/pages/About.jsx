import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShieldCheck, Heart, User, MapPin, Sun, Car, Flame, Trees, Bed, Bath, Wifi, Zap, Lock, ShoppingBag } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-brand-offwhite flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow pt-28">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
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

        {/* Story Section — Luxury Meets Convenience */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1.5 bg-brand-gold/10 border border-brand-gold/20 rounded-full">
                <span className="text-brand-gold font-bold text-xs uppercase tracking-widest">Our Essence</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-teal leading-tight">
                Luxury Meets <span className="text-brand-gold italic serif">Convenience</span>
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Welcome to MAI Instahomes — a cozy home away from home. This spacious four-bedroom house is located within a secure compound among other standalone homes in the up-and-coming middle-class neighbourhood of Airwing, Lilongwe. The property is enclosed with a full ClearVu electric fence and offers 24-hour solar power backup.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Guests can enjoy a fully equipped kitchen with a washing machine, a comfortable lounge with a shared TV, and high-speed WiFi — perfect for unwinding after a long day. Each of the four bedrooms features a king-size bed and a private bathroom with a hot shower, ensuring comfort and privacy throughout your stay.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Conveniently close to Lilongwe CBD and major shopping destinations such as Gateway Mall, with Old Town Market just 10 minutes away offering crafts, fresh produce, and a vibrant local atmosphere.
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4">
                <div className="flex flex-col items-center text-center bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                  <Bed className="text-brand-teal mb-2" size={28} />
                  <span className="text-2xl font-bold text-brand-teal">4</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">King Suites</span>
                </div>
                <div className="flex flex-col items-center text-center bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                  <Bath className="text-brand-teal mb-2" size={28} />
                  <span className="text-2xl font-bold text-brand-teal">4</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">En-suite Baths</span>
                </div>
                <div className="flex flex-col items-center text-center bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                  <Zap className="text-brand-teal mb-2" size={28} />
                  <span className="text-2xl font-bold text-brand-teal">24/7</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Solar Backup</span>
                </div>
                <div className="flex flex-col items-center text-center bg-white p-4 rounded-2xl shadow-sm border border-gray-50">
                  <Wifi className="text-brand-teal mb-2" size={28} />
                  <span className="text-2xl font-bold text-brand-teal">Fast</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">WiFi</span>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-brand-gold/20 rounded-3xl blur-2xl group-hover:bg-brand-gold/30 transition-all duration-500"></div>
              <div className="relative overflow-hidden rounded-3xl aspect-[4/5] shadow-2xl">
                <img 
                  src="/hero4.png" 
                  alt="Mai Insta Homes property" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              {/* Decorative badge */}
              <div className="absolute -bottom-8 -left-8 bg-brand-teal p-8 rounded-2xl shadow-xl hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="bg-brand-gold/20 p-3 rounded-full">
                    <MapPin className="text-brand-gold" size={32} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-lg leading-tight">Airwing</p>
                    <p className="text-brand-gold font-bold text-xl leading-tight">Lilongwe, Malawi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Space & Guest Access */}
        <section className="bg-white py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* The Space */}
              <div className="space-y-6">
                <div className="inline-block px-4 py-1.5 bg-brand-teal/5 border border-brand-teal/10 rounded-full">
                  <span className="text-brand-teal font-bold text-xs uppercase tracking-widest">The Space</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-teal leading-tight">
                  Your Sanctuary in <span className="text-brand-gold italic">Lilongwe</span>
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Our home is ideal for solo travellers, couples, and groups of friends seeking a welcoming and comfortable stay in the capital of the "Warm Heart of Africa." The compound provides both peace and security for a relaxing experience.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Guests have exclusive access to the house and assigned room(s), depending on the number of people booked. All amenities within the house are available for guest use, in line with the number of occupants in the reservation.
                </p>
              </div>

              {/* Things to Note */}
              <div className="space-y-6">
                <div className="inline-block px-4 py-1.5 bg-brand-gold/10 border border-brand-gold/20 rounded-full">
                  <span className="text-brand-gold font-bold text-xs uppercase tracking-widest">Good to Know</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-teal leading-tight">
                  Things to Note
                </h2>
                <div className="space-y-4">
                  {[
                    { icon: <Sun size={22} />, text: "Solar backup ensures continuous power for lights, TV, and refrigerator." },
                    { icon: <Flame size={22} />, text: "A gas cooker is available as an alternative when the main grid power is unavailable." },
                    { icon: <Trees size={22} />, text: "Guests are welcome to relax on the patio or enjoy the outdoor garden space." },
                    { icon: <Car size={22} />, text: "Free parking is available on the property." },
                    { icon: <Lock size={22} />, text: "Fully enclosed with ClearVu electric fence for maximum security." },
                    { icon: <ShoppingBag size={22} />, text: "A nearby supermarket is within easy reach; Gateway Mall and Old Town Market are minutes away." },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-4 bg-brand-offwhite p-4 rounded-xl hover:shadow-md transition-shadow group">
                      <div className="text-brand-teal mt-0.5 shrink-0 group-hover:text-brand-gold transition-colors">
                        {item.icon}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-brand-teal py-24 px-6 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our Core Values</h2>
              <p className="text-brand-gold font-medium text-lg italic">The pillars that define the Mai Insta Homes experience</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Heart size={32} />,
                  title: "Warm Heart Hospitality",
                  desc: "True to Malawi's spirit, we treat every guest as family — ensuring your needs are met with warmth, care, and professionalism."
                },
                {
                  icon: <ShieldCheck size={32} />,
                  title: "Security & Reliability",
                  desc: "From our ClearVu electric fence to 24-hour solar backup, we never compromise on your safety or comfort."
                },
                {
                  icon: <MapPin size={32} />,
                  title: "Heart of Lilongwe",
                  desc: "Proudly rooted in Airwing, minutes from Lilongwe CBD, Gateway Mall, and the vibrant Old Town Market."
                }
              ].map((value, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors group">
                  <div className="text-brand-gold mb-6 transition-transform group-hover:scale-110 duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Host Section */}
        <section className="py-24 px-6 max-w-4xl mx-auto text-center">
          <div className="mb-8 relative inline-block">
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-brand-gold shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300" 
                alt="Host" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-brand-gold p-2 rounded-full shadow-lg">
              <User className="text-brand-teal" size={16} fill="currentColor" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-brand-teal mb-2">Meet Your Host</h2>
          <p className="text-brand-gold font-bold uppercase tracking-widest text-xs mb-6">Passionate Hospitality Professional</p>
          <p className="text-gray-600 italic text-lg leading-relaxed mb-8">
            "My goal is to provide a seamless, comfortable experience that feels both welcoming and secure. Whether you're a solo traveller exploring Malawi, a couple on a getaway, or a group of friends — Mai Insta Homes is your sanctuary in the Warm Heart of Africa."
          </p>
          <div className="h-px w-20 bg-gray-200 mx-auto"></div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
