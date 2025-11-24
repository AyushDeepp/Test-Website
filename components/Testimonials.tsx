import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Testimonial } from '../types';

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Lyra Vance',
    role: 'Cyber-Botanist',
    content: 'The Holo-Plant v2 completely transformed my bunker. It feels like I\'m back on Earth pre-collapse. Stunning visuals.',
    avatar: 'https://picsum.photos/seed/person1/100/100'
  },
  {
    id: '2',
    name: 'Jax Orion',
    role: 'Starship Pilot',
    content: 'NebulaCraft gets it. The build quality of the Cyber-Visor is military grade, but the aesthetics are pure art. Highly recommended.',
    avatar: 'https://picsum.photos/seed/person2/100/100'
  },
  {
    id: '3',
    name: 'Dr. Aris Thorne',
    role: 'Quantum Physicist',
    content: 'I use the Void Sphere for meditation before complex calculations. The silence it generates is... profound.',
    avatar: 'https://picsum.photos/seed/person3/100/100'
  }
];

export const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="py-32 bg-nebula-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-nebula-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-nebula-cyan/5 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Transmission Logs</h2>
           <div className="w-24 h-1 bg-nebula-800 mx-auto rounded-full overflow-hidden">
             <div className="w-1/2 h-full bg-nebula-cyan animate-pulse" />
           </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[350px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.6 }}
                className="w-full glass-card p-8 md:p-14 rounded-3xl text-center relative border border-white/10"
              >
                {/* Holographic Scanline Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-20 animate-scan pointer-events-none rounded-3xl" />

                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-nebula-950 p-4 rounded-full border border-nebula-cyan/30 shadow-[0_0_20px_rgba(0,242,96,0.2)]">
                  <Quote className="w-8 h-8 text-nebula-cyan" />
                </div>

                <div className="mt-6">
                  <p className="text-xl md:text-3xl text-gray-200 font-light italic mb-10 leading-relaxed tracking-wide">
                    "{TESTIMONIALS[current].content}"
                  </p>

                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-nebula-cyan blur-md opacity-50" />
                      <img 
                        src={TESTIMONIALS[current].avatar} 
                        alt={TESTIMONIALS[current].name}
                        className="w-16 h-16 rounded-full border-2 border-white relative z-10"
                      />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg tracking-wider uppercase">{TESTIMONIALS[current].name}</h4>
                      <p className="text-nebula-cyan text-sm font-mono">{TESTIMONIALS[current].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  idx === current ? 'w-12 bg-nebula-cyan shadow-[0_0_10px_#00f260]' : 'w-4 bg-white/10 hover:bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};