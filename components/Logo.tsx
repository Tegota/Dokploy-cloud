import React from 'react';
import { Zap } from 'lucide-react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2.5">
      {/* 
        Logo Container 
        - Fixed size (w-8 h-8) to prevent layout shift.
        - Flex center to ensure icon is always perfectly centered.
        - Transition colors for smooth theme switch.
      */}
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-black/5 dark:bg-white/10 transition-colors duration-300">
        <Zap 
          className="w-5 h-5 text-gray-900 dark:text-white transition-colors duration-300" 
          strokeWidth={2.5} 
          fill="currentColor" /* Fills the bolt for a solid look, or remove for outline */
          fillOpacity={0.2}   /* Subtle fill opacity */
        />
      </div>

      {/* 
        Text
        - Uppercase as requested.
        - Tracking widest for premium infrastructure look.
        - Fixed font weight and size to ensure no jitter.
        - Color transition only.
      */}
      <span className="text-lg font-bold tracking-widest text-gray-900 dark:text-white transition-colors duration-300 uppercase">
        Dokploy.Cloud
      </span>
    </div>
  );
};