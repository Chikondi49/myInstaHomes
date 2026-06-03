import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Calendar, Users, CreditCard, ChevronRight, Info, CheckCircle2 } from 'lucide-react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Booking = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    guests: '2',
    checkIn: '2023-05-12',
    checkOut: '2023-05-15',
    notes: ''
  });
  
  const [pricingInfo, setPricingInfo] = useState({
    nightlyRate: 120,
    serviceFee: 60,
    occupancyTaxes: 30
  });

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const docRef = doc(db, 'settings', 'pricing_info');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPricingInfo(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching pricing info: ", error);
      }
    };
    fetchPricing();
  }, []);

  const totalPrice = (pricingInfo.nightlyRate * 3) + pricingInfo.serviceFee + pricingInfo.occupancyTaxes;

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-brand-offwhite flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-brand-teal mb-2">Book Your Stay</h1>
            <p className="text-gray-500 font-medium">Complete your reservation for Mai Insta Homes</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column: Form */}
            <div className="flex-grow lg:w-2/3">
              {/* Stepper */}
              <div className="flex items-center space-x-4 mb-8">
                <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-brand-teal' : 'text-gray-400'}`}>
                  <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${step >= 1 ? 'border-brand-teal bg-brand-teal text-white' : 'border-gray-200'}`}>1</span>
                  <span className="font-bold text-sm hidden sm:inline">Details</span>
                </div>
                <div className="w-12 h-0.5 bg-gray-200"></div>
                <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-brand-teal' : 'text-gray-400'}`}>
                  <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${step >= 2 ? 'border-brand-teal bg-brand-teal text-white' : 'border-gray-200'}`}>2</span>
                  <span className="font-bold text-sm hidden sm:inline">Payment</span>
                </div>
                <div className="w-12 h-0.5 bg-gray-200"></div>
                <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-brand-teal' : 'text-gray-400'}`}>
                  <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${step >= 3 ? 'border-brand-teal bg-brand-teal text-white' : 'border-gray-200'}`}>3</span>
                  <span className="font-bold text-sm hidden sm:inline">Confirm</span>
                </div>
              </div>

              {step === 1 && (
                <div className="bg-white rounded-3xl shadow-xl shadow-brand-teal/5 p-8 border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-bold text-brand-teal mb-6 flex items-center">
                    <Users className="mr-2" size={24} />
                    Guest Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">First Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Last Name</label>
                      <input 
                        type="text" 
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                        placeholder="Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Phone Number</label>
                      <input 
                        type="tel" 
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                        placeholder="+263 77..."
                      />
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-brand-teal mb-6 flex items-center">
                    <Calendar className="mr-2" size={24} />
                    Tour Dates
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Check-In</label>
                      <input 
                        type="date" 
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                        defaultValue="2023-05-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Check-Out</label>
                      <input 
                        type="date" 
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                        defaultValue="2023-05-15"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Total Guests</label>
                      <select className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-gold transition-all appearance-none cursor-pointer">
                        <option>1 Guest</option>
                        <option selected>2 Guests</option>
                        <option>3 Guests</option>
                        <option>4 Guests</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 mb-8">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Special Notes (Optional)</label>
                    <textarea 
                      rows="3"
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-gold transition-all resize-none"
                      placeholder="Any specific requests?"
                    ></textarea>
                  </div>

                  <button 
                    onClick={nextStep}
                    className="w-full btn-teal py-4 text-lg font-bold flex items-center justify-center group"
                  >
                    Proceed to Payment
                    <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white rounded-3xl shadow-xl p-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <h2 className="text-2xl font-bold text-brand-teal mb-6 flex items-center">
                    <CreditCard className="mr-2" size={24} />
                    Secure Payment
                  </h2>
                  
                  <div className="bg-brand-teal/5 p-4 rounded-xl flex items-start space-x-3 mb-8">
                    <Info className="text-brand-teal shrink-0" size={20} />
                    <p className="text-xs text-brand-teal/80 font-medium leading-relaxed">
                      Your payment information is encrypted and secure. We accept all major credit cards and PayPal.
                    </p>
                  </div>

                  <div className="space-y-6 mb-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Card Number</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                          placeholder="0000 0000 0000 0000"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex space-x-2">
                           <div className="w-8 h-5 bg-gray-200 rounded"></div>
                           <div className="w-8 h-5 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Expiry Date</label>
                        <input 
                          type="text" 
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                          placeholder="MM / YY"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">CVV</label>
                        <input 
                          type="text" 
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button 
                      onClick={prevStep}
                      className="flex-1 border-2 border-brand-teal text-brand-teal font-bold py-4 rounded-xl hover:bg-brand-teal/5 transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      onClick={nextStep}
                      className="flex-[2] btn-teal py-4 text-lg font-bold"
                    >
                      Process Payment (${totalPrice.toFixed(2)})
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-white rounded-3xl shadow-xl p-12 text-center animate-in zoom-in-95 duration-700">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-3xl font-bold text-brand-teal mb-4">Booking Confirmed!</h2>
                  <p className="text-gray-500 mb-10 max-w-sm mx-auto font-medium">
                    Your reservation at Mai Insta Homes has been successfully placed. We've sent a confirmation email to your address.
                  </p>
                  <div className="bg-brand-offwhite p-6 rounded-2xl mb-10 text-left border border-gray-100">
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Booking ID</span>
                      <span className="text-brand-teal font-bold font-mono">#MAI-8829-XL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Total Paid</span>
                      <span className="text-brand-teal font-bold">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.location.href = '/'}
                    className="btn-teal py-4 px-12 font-bold"
                  >
                    Return to Homepage
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Order Summary (Sticky) */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 sticky top-28">
                <div className="overflow-hidden rounded-2xl mb-6 aspect-video">
                  <img 
                    src="/hero.png" 
                    alt="Mai Insta Homes" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-brand-teal mb-1">Mai Insta Homes</h3>
                <p className="text-brand-gold font-bold text-xs uppercase tracking-widest mb-6">Luxury Airbnb Lodge</p>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                    <span className="text-gray-400 font-medium">Nightly Rate</span>
                    <span className="text-brand-teal font-bold">${pricingInfo.nightlyRate.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                    <span className="text-gray-400 font-medium">Duration</span>
                    <span className="text-brand-teal font-bold">3 Nights</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                    <span className="text-gray-400 font-medium">Service Fee</span>
                    <span className="text-brand-teal font-bold">${pricingInfo.serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b border-gray-50">
                    <span className="text-gray-400 font-medium">Occupancy Taxes</span>
                    <span className="text-brand-teal font-bold">${pricingInfo.occupancyTaxes.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-brand-teal p-6 rounded-2xl flex justify-between items-center shadow-lg">
                  <span className="text-white/70 font-bold uppercase text-xs tracking-widest">Total Price</span>
                  <span className="text-brand-gold text-2xl font-bold">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
