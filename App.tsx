import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Products } from './components/Products';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CartSidebar } from './components/CartSidebar';

function App() {
  return (
    <CartProvider>
      <div className="bg-black min-h-screen text-gray-200 font-sans selection:bg-nebula-cyan selection:text-nebula-900">
        <Navbar />
        <CartSidebar />
        
        <main>
          <Hero />
          <About />
          <Products />
          <Testimonials />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
