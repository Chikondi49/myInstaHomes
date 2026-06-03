import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Instagram, Facebook, MapPin } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Footer = () => {
  const [contactInfo, setContactInfo] = useState({
    phone: '+265 000 000 000',
    email: 'hello@maiinstahomes.com',
    address: 'Airwing, Lilongwe, Malawi',
    facebook: '',
    instagram: ''
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'settings', 'contact_info'));
        if (docSnap.exists()) {
          setContactInfo(prev => ({ ...prev, ...docSnap.data() }));
        }
      } catch (error) {
        console.error("Error fetching contact info: ", error);
      }
    };
    fetchContact();
  }, []);

  const legalLinks = [
    { name: 'About', path: '/about' },
    { name: 'Pricing', path: '/#pricing' },
    { name: 'Terms of Service', path: '/#terms' },
    { name: 'Contact', path: '/#contact' },
  ];

  return (
    <footer className="bg-brand-teal text-white pt-16 pb-8 md:pt-20 md:pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
        {/* Col 1: Contact */}
        <div>
          <h4 className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-6">Contact Info</h4>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3 text-sm text-gray-300">
              <Phone size={16} className="text-brand-gold flex-shrink-0" />
              <span>{contactInfo.phone}</span>
            </li>
            <li className="flex items-center space-x-3 text-sm text-gray-300">
              <Mail size={16} className="text-brand-gold flex-shrink-0" />
              <span>{contactInfo.email}</span>
            </li>
            <li className="flex items-start space-x-3 text-sm text-gray-300">
              <MapPin size={16} className="text-brand-gold flex-shrink-0 mt-0.5" />
              <span>{contactInfo.address}</span>
            </li>
          </ul>
        </div>

        {/* Col 2: Social */}
        <div>
          <h4 className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-6">Social Links</h4>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3 text-sm text-gray-300 group cursor-pointer hover:text-white transition-colors">
              <Instagram size={16} className="text-brand-gold" />
              <a href={contactInfo.instagram || '#'} target="_blank" rel="noreferrer">Instagram</a>
            </li>
            <li className="flex items-center space-x-3 text-sm text-gray-300 group cursor-pointer hover:text-white transition-colors">
              <Facebook size={16} className="text-brand-gold" />
              <a href={contactInfo.facebook || '#'} target="_blank" rel="noreferrer">Facebook</a>
            </li>
          </ul>
        </div>
        
        {/* Col 3: Legal */}
        <div>
          <h4 className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-6">Legal Links</h4>
          <ul className="space-y-3">
            {legalLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.path} className="text-sm text-gray-300 hover:text-white cursor-pointer transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>


        {/* Col 4: Newsletter */}
        <div>
          <h4 className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-6">Newsletter</h4>
          <p className="text-sm text-gray-300 mb-4 leading-relaxed">
            Subscribe to get the latest updates, special offers, and news from Mai Insta Homes.
          </p>
          <div className="flex w-full">
            <input 
              type="email" 
              placeholder="Your email" 
              className="px-4 py-2 w-full text-sm rounded-l-lg outline-none text-gray-800"
            />
            <button className="bg-brand-gold text-white px-4 py-2 rounded-r-lg font-bold hover:bg-opacity-90 transition-opacity">
              Join
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
        <p>© 2026 - Mai Insta Homes. All rights reserved.</p>
        <div className="mt-4 md:mt-0 flex space-x-4">
          <span>Privacy Policy</span>
          <span>Cookies</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
