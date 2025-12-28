import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, LayoutDashboard, Terminal, Moon, Sun } from 'lucide-react';
import { Logo } from './components/Logo';
import BackgroundMesh from './components/BackgroundMesh';
import { InfoSection } from './components/InfoSection';
import { Footer } from './components/Footer';

// Extend the Document interface to include startViewTransition
declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => {
      ready: Promise<void>;
      finished: Promise<void>;
      updateCallbackDone: Promise<void>;
    };
  }
}

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Helper to apply theme
  const applyTheme = (newTheme: 'dark' | 'light') => {
    const root = document.documentElement;
    if (newTheme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    setTheme(newTheme);
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`; // Store for 1 year
  };

  // Theme management based on system preference and Cookies
  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const storedTheme = getCookie('theme');
    
    if (storedTheme === 'light') {
      applyTheme('light');
    } else if (storedTheme === 'dark') {
      applyTheme('dark');
    } else {
      const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      applyTheme(systemPrefersLight ? 'light' : 'dark');
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
       if (!getCookie('theme')) {
         applyTheme(e.matches ? 'light' : 'dark');
       }
    };
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  const toggleTheme = async (e: React.MouseEvent) => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    // Fallback if browser doesn't support View Transitions
    if (!document.startViewTransition) {
        applyTheme(newTheme);
        return;
    }

    // Get click coordinates
    const x = e.clientX;
    const y = e.clientY;

    // Calculate the distance to the furthest corner
    const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
    );

    // Start the transition
    const transition = document.startViewTransition(() => {
        applyTheme(newTheme);
    });

    // Wait for the pseudo-elements to be created
    await transition.ready;

    // Animate the clip-path of the NEW view
    document.documentElement.animate(
        {
            clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
        },
        {
            duration: 500,
            easing: 'ease-in-out',
            // Specifically target the new view entering the screen
            pseudoElement: '::view-transition-new(root)',
        }
    );
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden selection:bg-black/10 dark:selection:bg-white/20">
      
      {/* Fixed Navigation with Blur Background */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:py-6 bg-white/70 dark:bg-brand-bg/70 backdrop-blur-xl border-b border-black/5 dark:border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Logo />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4"
            >
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs text-gray-500 dark:text-brand-muted backdrop-blur-sm">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                   <span>Online</span>
                </div>
                
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 transition-colors relative overflow-hidden"
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </motion.div>
        </div>
      </nav>

      {/* Hero Section 
          Responsiveness Fixes:
          - min-h-[100dvh]: Forces the section to be at least the full device viewport height on mobile, preventing overlap and ensuring the "gateway" text doesn't peek prematurely.
          - md:min-h-[70vh]: Reduces the height constraint on tablets/desktops. 85vh was too tall, causing "extra length" scroll issues. 70vh allows the content to sit nicely without forcing a long scroll.
          - pt-32 / md:pt-40: Increased top padding to ensure the Fixed Navigation doesn't overlap the hero content on smaller screens.
      */}
      <main className="relative flex flex-col justify-center min-h-[100dvh] md:min-h-[70vh] pt-32 pb-16 md:pt-40 md:pb-20 w-full overflow-hidden">
        {/* Animated Background Mesh & Grid */}
        <BackgroundMesh />

        <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
            
            {/* Tagline / Badge */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center justify-center gap-2 mb-6 md:mb-8"
            >
                <div className="px-4 py-1.5 rounded-full bg-white dark:bg-brand-surface border border-black/5 dark:border-white/10 shadow-lg dark:shadow-[0_0_20px_-5px_rgba(255,255,255,0.05)] backdrop-blur-sm">
                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-500 dark:text-brand-muted">
                        Production
                    </span>
                </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 md:mb-8 text-gray-900 dark:text-white drop-shadow-sm dark:drop-shadow-2xl"
            >
                <span className="block mb-2">Self-Hosted Dokploy</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-500 dark:from-white dark:to-white/40">
                    Instance by Tegota
                </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base md:text-xl text-gray-600 dark:text-brand-muted mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed font-light"
            >
                Internal infrastructure for hosting and managing production-grade services. 
                Powered by the <span className="text-gray-900 dark:text-white font-medium">Dokploy</span> platform, 
                maintained by <span className="text-gray-900 dark:text-white font-medium">Tegota</span> .
            </motion.p>

            {/* CTA Button */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col items-center gap-6"
            >
                <a 
                    href="https://app.dokploy.cloud" 
                    className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 text-lg font-semibold text-white dark:text-black bg-black dark:bg-white rounded-xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl dark:hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 dark:via-black/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Go to Dashboard</span>
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </a>
                
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-brand-muted/60 bg-white/50 dark:bg-black/30 px-4 py-2 rounded-lg border border-black/5 dark:border-white/5 backdrop-blur-sm">
                    <Terminal size={12} />
                    <span>Limited access: Tegota personnel only.</span>
                </div>
            </motion.div>
        </div>
      </main>

      {/* Visual Separator */}
      <div className="relative w-full h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
      </div>

      {/* Info Section */}
      <InfoSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;