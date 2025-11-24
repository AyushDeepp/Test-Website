import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { X, ShoppingBag, Star, Filter, Eye } from 'lucide-react';

const CATEGORIES = ['All', 'Organic', 'Tech', 'Art'];

const PRODUCTS: (Product & { category: string })[] = [
  {
    id: '1',
    name: 'Holo-Plant v2',
    shortDescription: 'Self-sustaining holographic flora.',
    fullDescription: 'A maintenance-free botanical marvel. This unit projects a high-fidelity hologram of various rare species. Includes a calming ambient soundscape generator.',
    price: 299,
    image: 'https://picsum.photos/seed/holo/600/600',
    features: ['12 Plant Species', 'Ambient Audio', 'Night Mode'],
    category: 'Organic'
  },
  {
    id: '2',
    name: 'Quantum Cube',
    shortDescription: 'Interactive stress-relief artifact.',
    fullDescription: 'A tactile cube that shifts weight and temperature based on your bio-feedback. The perfect desk companion for high-stress intergalactic trading.',
    price: 145,
    image: 'https://picsum.photos/seed/cube/600/600',
    features: ['Haptic Feedback', 'Temp Control', 'Bluetooth 9.0'],
    category: 'Tech'
  },
  {
    id: '3',
    name: 'Cyber-Visor X1',
    shortDescription: 'Augmented reality streetwear.',
    fullDescription: 'Style meets function. Displays real-time social stats and weather overlays without obstructing vision. Frame made from recycled starship hull.',
    price: 599,
    image: 'https://picsum.photos/seed/visor/600/600',
    features: ['Heads-up Display', 'UV Protection', 'Neural Link'],
    category: 'Tech'
  },
  {
    id: '4',
    name: 'Neon Bonsai',
    shortDescription: 'Hand-sculpted light sculpture.',
    fullDescription: 'Each branch is hand-bent neon glass charged with noble gases. A timeless piece that bathes your room in a calming magenta glow.',
    price: 850,
    image: 'https://picsum.photos/seed/bonsai/600/600',
    features: ['Hand-blown Glass', '50,000h Life', 'Dimmable'],
    category: 'Art'
  },
  {
    id: '5',
    name: 'Void Sphere',
    shortDescription: 'Vantablack decorative orb.',
    fullDescription: 'Absorbs 99.9% of light. Staring into it is said to calm the mind and reset the soul. Comes with a magnetic levitation base.',
    price: 420,
    image: 'https://picsum.photos/seed/void/600/600',
    features: ['Levitation Base', 'Zero Reflection', 'Silence Aura'],
    category: 'Art'
  },
  {
    id: '6',
    name: 'Synth-Wave Vinyl',
    shortDescription: 'Limited edition transparent record.',
    fullDescription: 'A compilation of the galaxy\'s best synth-wave tracks. The vinyl itself glows when spinning.',
    price: 89,
    image: 'https://picsum.photos/seed/vinyl/600/600',
    features: ['Glow-in-dark', '180g Vinyl', 'Digital Download'],
    category: 'Art'
  },
];

export const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart } = useCart();

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="py-32 bg-nebula-950 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">Artifacts</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-nebula-cyan to-transparent rounded-full" />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-nebula-cyan text-nebula-900 shadow-[0_0_15px_rgba(0,242,96,0.4)]' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={product.id}
                className="group relative glass-card rounded-2xl overflow-hidden hover:border-nebula-cyan/30 transition-all duration-500"
              >
                {/* Image Area */}
                <div className="aspect-[4/5] overflow-hidden relative bg-nebula-900">
                  <div className="absolute inset-0 bg-nebula-500/10 mix-blend-overlay z-10" />
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-nebula-950 via-transparent to-transparent opacity-90 z-10" />
                  
                  {/* Floating Action Button */}
                  <div className="absolute top-4 right-4 z-20 translate-x-12 group-hover:translate-x-0 transition-transform duration-300 ease-out">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-nebula-cyan hover:text-nebula-900 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute top-4 left-4 z-20">
                     <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-lg text-nebula-cyan font-mono text-sm font-bold">
                        ${product.price}
                     </span>
                  </div>

                  {/* Card Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold text-white mb-1">{product.name}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4 group-hover:text-gray-300 transition-colors">{product.shortDescription}</p>
                    
                    <button
                       onClick={(e) => {
                         e.stopPropagation();
                         addToCart(product);
                       }}
                       className="w-full py-3 bg-white/10 border border-white/10 rounded-xl font-bold text-white hover:bg-nebula-cyan hover:text-nebula-900 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100"
                    >
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-nebula-900 border border-white/20 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(74,0,224,0.3)] flex flex-col md:flex-row relative"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="md:w-1/2 min-h-[400px] relative">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nebula-900 via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
                <div className="mb-2">
                   <span className="text-nebula-cyan font-mono text-sm tracking-widest uppercase">
                     {(selectedProduct as any).category || 'Artifact'}
                   </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{selectedProduct.name}</h2>
                <div className="flex items-center gap-2 mb-8">
                  <div className="flex text-yellow-400 gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-gray-500 text-sm ml-2">4.9 (128 reviews)</span>
                </div>
                
                <p className="text-gray-300 text-lg mb-8 leading-relaxed font-light">
                  {selectedProduct.fullDescription}
                </p>

                <div className="mb-8 p-6 bg-white/5 rounded-xl border border-white/5">
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Tech Specs</h4>
                  <ul className="grid grid-cols-2 gap-3">
                    {selectedProduct.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-200 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-nebula-cyan shadow-[0_0_5px_#00f260]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-6">
                  <div>
                    <span className="block text-gray-500 text-xs uppercase tracking-wide mb-1">Price</span>
                    <span className="text-4xl font-mono font-bold text-white">${selectedProduct.price}</span>
                  </div>
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 w-full bg-gradient-to-r from-nebula-500 to-nebula-400 hover:from-nebula-cyan hover:to-nebula-500 text-white hover:text-nebula-900 px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Acquire Unit
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};