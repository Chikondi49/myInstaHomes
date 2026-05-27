import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Instagram, Facebook, Lock, ArrowRight, MapPin } from 'lucide-react';
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
    <footer className="bg-brand-teal text-white pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
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

        {/* Col 4: Admin */}
        <div>
          <h4 className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-6">Admin Login</h4>
          <a href="#" className="inline-flex items-center space-x-2 text-sm text-gray-300 hover:text-white group">
            <Lock size={14} className="text-brand-gold group-hover:scale-110 transition-transform" />
            <span className="flex items-center">
              Admin Login Portal
              <ArrowRight size={14} className="ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
            </span>
          </a>
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
