import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Amenities from '../components/Amenities';
import Gallery from '../components/Gallery';
import TestimonialsAndMap from '../components/TestimonialsAndMap';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Amenities />
        <Gallery />
        <TestimonialsAndMap />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
