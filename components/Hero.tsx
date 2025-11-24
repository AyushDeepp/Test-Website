import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          animate={{
            x: mousePosition.x * 0.05,
            y: mousePosition.y * 0.05,
          }}
          transition={{ type: 'spring', damping: 50, stiffness: 400 }}
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-nebula-500/20 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{
            x: mousePosition.x * -0.05,
            y: mousePosition.y * -0.05,
          }}
          transition={{ type: 'spring', damping: 50, stiffness: 400 }}
          className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-nebula-cyan/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-nebula-400/20 rounded-full blur-[80px] animate-pulse-slow" 
        />
      </div>

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 80%)'
        }}
      />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Decorative element above title */}
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
            className="w-px h-16 bg-gradient-to-b from-transparent to-nebula-cyan mx-auto mb-6"
          />

          <span className="inline-block px-4 py-1.5 mb-6 rounded-full border border-nebula-cyan/30 bg-nebula-cyan/5 text-nebula-cyan text-xs md:text-sm font-mono tracking-[0.2em] uppercase backdrop-blur-md shadow-[0_0_15px_rgba(0,242,96,0.2)]">
            Est. 2042 • Sector 7
          </span>
          
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold mb-8 tracking-tighter text-white leading-tight">
            Future <span className="text-transparent bg-clip-text bg-gradient-to-r from-nebula-cyan via-white to-nebula-500 animate-gradient-x">Artifacts</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Curated tech-art from the outer colonies. Each piece is a bridge between 
            digital dreams and physical reality.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.a
              href="#products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 bg-white text-nebula-900 px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,242,96,0.5)]"
            >
              <span className="relative z-10 group-hover:text-nebula-900 transition-colors">Start Collection</span>
              <div className="absolute inset-0 bg-nebula-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <a href="#about" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-mono tracking-wider">
              <span className="w-8 h-px bg-current" />
              OUR MISSION
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest font-mono">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
};