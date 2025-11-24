import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Radio } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<typeof formState>>({});

  const validate = () => {
    const newErrors: Partial<typeof formState> = {};
    if (!formState.name) newErrors.name = 'Identify yourself';
    if (!formState.email) newErrors.email = 'Frequency required';
    else if (!/\S+@\S+\.\S+/.test(formState.email)) newErrors.email = 'Invalid frequency format';
    if (!formState.message) newErrors.message = 'Data packet empty';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 2000);
  };

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
       {/* Grid Background */}
       <div className="absolute inset-0 z-0 opacity-20" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(74, 0, 224, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 0, 224, 0.1) 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
       </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
          
          <div className="md:w-1/2">
             <div className="sticky top-32">
                <span className="text-nebula-cyan font-mono text-sm tracking-widest uppercase mb-2 block">Uplink</span>
                <h2 className="text-5xl font-bold text-white mb-6">Initiate <br/> Contact</h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Our neural network is always listening. Whether you need a custom commission or have questions about particle physics, the line is open.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-gray-300">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-nebula-cyan">
                      <Radio className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500">Secure Channel</p>
                      <p className="font-mono">encrypted@nebulacraft.io</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>

          <div className="md:w-1/2">
            <motion.form 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-nebula-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
            >
              {status === 'success' && (
                <div className="absolute inset-0 bg-nebula-900/90 z-20 flex flex-col items-center justify-center text-center p-8">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-nebula-cyan/20 rounded-full flex items-center justify-center text-nebula-cyan mb-4"
                  >
                    <CheckCircle className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Transmission Received</h3>
                  <p className="text-gray-400">We will respond within 24 galactic standard hours.</p>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Identity Code</label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({...formState, name: e.target.value})}
                    className={`w-full bg-black/40 border-b-2 ${errors.name ? 'border-red-500' : 'border-white/10'} px-4 py-4 text-white focus:outline-none focus:border-nebula-cyan focus:bg-white/5 transition-all placeholder-gray-600 rounded-t-lg`}
                    placeholder="Enter Name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Frequency (Email)</label>
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className={`w-full bg-black/40 border-b-2 ${errors.email ? 'border-red-500' : 'border-white/10'} px-4 py-4 text-white focus:outline-none focus:border-nebula-cyan focus:bg-white/5 transition-all placeholder-gray-600 rounded-t-lg`}
                    placeholder="name@domain.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Data Packet</label>
                  <textarea
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    className={`w-full bg-black/40 border-b-2 ${errors.message ? 'border-red-500' : 'border-white/10'} px-4 py-4 text-white focus:outline-none focus:border-nebula-cyan focus:bg-white/5 transition-all resize-none placeholder-gray-600 rounded-t-lg`}
                    placeholder="Type your message..."
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-white text-nebula-900 font-bold py-4 rounded-xl hover:bg-nebula-cyan transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group mt-4"
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-nebula-900 border-t-transparent rounded-full animate-spin" />
                      Encrypting...
                    </span>
                  ) : (
                    <>
                      <span>Transmit Data</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};