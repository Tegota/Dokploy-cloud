import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 px-6 border-t border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/40 backdrop-blur-md relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            <div className="flex flex-col items-center md:items-start gap-1">
                <span className="font-semibold text-gray-900 dark:text-brand-text">Managed by Tegota</span>
                <span className="text-gray-500 dark:text-brand-muted text-xs">
                    Independent Infrastructure Deployment
                </span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6 text-gray-600 dark:text-brand-muted">
                <a href="mailto:support@tegota.com" className="hover:text-black dark:hover:text-white transition-colors">
                    support@tegota.com
                </a>
                <span className="hidden md:inline text-black/10 dark:text-white/10">|</span>
                <span className="opacity-60">© {new Date().getFullYear()} Tegota. All rights reserved.</span>
            </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-black/5 dark:border-white/5 text-center text-[10px] text-gray-400 dark:text-brand-muted/40 uppercase tracking-widest">
            Dokploy is a registered trademark of its respective owners. This site is not affiliated with the official Dokploy SaaS.
        </div>
    </footer>
  );
};