import React from 'react';
import { Instagram, Twitter, Github, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-nebula-900 border-t border-white/10 py-12 text-sm">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          <div className="flex items-center gap-2">
            <Zap className="w-6 h-6 text-nebula-cyan" />
            <span className="text-xl font-bold text-white">Nebula<span className="text-nebula-500">Craft</span></span>
          </div>

          <div className="text-gray-500 text-center md:text-right">
            <p>&copy; 2077 NebulaCraft Industries. All rights reserved.</p>
            <p className="mt-1">Designed for the modern stellar citizen.</p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-nebula-cyan transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-nebula-cyan transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-nebula-cyan transition-colors"><Github className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
