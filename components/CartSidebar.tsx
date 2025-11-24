import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartSidebar: React.FC = () => {
  const { isCartOpen, toggleCart, cart, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-nebula-900/95 backdrop-blur-xl border-l border-white/10 z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-nebula-950/50">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-nebula-cyan" />
                <h2 className="text-xl font-bold text-white">Cargo Bay</h2>
                <span className="bg-white/10 px-2 py-0.5 rounded-full text-xs text-gray-400">{cart.length} items</span>
              </div>
              <button onClick={toggleCart} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-6">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center relative">
                     <div className="absolute inset-0 bg-nebula-cyan/20 blur-xl rounded-full animate-pulse" />
                    <ShoppingBag className="w-10 h-10 opacity-50" />
                  </div>
                  <p className="text-lg">Your inventory is empty.</p>
                  <button onClick={toggleCart} className="text-nebula-cyan hover:underline text-sm">Return to Catalog</button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors group"
                  >
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-nebula-950 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-white font-medium line-clamp-1">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-nebula-cyan font-mono text-sm mt-1">${item.price}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 bg-black/40 rounded-lg p-1 border border-white/10">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-white/10 rounded-md text-white disabled:opacity-30"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-white text-sm font-mono w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:bg-white/10 rounded-md text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-gray-400 text-sm font-mono">${item.price * item.quantity}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-nebula-950/80 backdrop-blur-xl">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-gray-400 text-sm">
                    <span>Subtotal</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-400 text-sm">
                    <span>Tax (Galactic)</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between items-center text-white text-xl font-bold pt-4 border-t border-white/10">
                    <span>Total</span>
                    <span className="font-mono text-nebula-cyan">${totalPrice}</span>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-nebula-cyan to-nebula-teal text-nebula-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(0,242,96,0.3)] hover:scale-[1.02] active:scale-[0.98]">
                  Initiate Transfer <ArrowRight className="w-5 h-5" />
                </button>
                
                <button 
                  onClick={clearCart}
                  className="w-full mt-4 text-xs text-gray-600 hover:text-red-400 transition-colors flex items-center justify-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Empty Cargo Bay
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};