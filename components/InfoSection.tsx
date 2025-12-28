import React from 'react';
import { motion } from 'framer-motion';
import { Server, Heart, ShieldCheck, GitBranch, ArrowUpRight, Lock } from 'lucide-react';

// Reusable card component for strict visual consistency
const InfoCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay?: number;
}> = ({ icon, title, children, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className="group relative h-full flex flex-col p-8 md:p-10 rounded-2xl border border-black/5 dark:border-white/5 bg-white/50 dark:bg-brand-surface/50 backdrop-blur-md hover:bg-white/80 dark:hover:bg-brand-surface/80 hover:border-black/10 dark:hover:border-white/10 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-md dark:shadow-none"
  >
    {/* Subtle Inner Highlight */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-gray-900 dark:text-brand-text group-hover:text-black dark:group-hover:text-white group-hover:border-black/20 dark:group-hover:border-white/20 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-brand-text tracking-tight group-hover:text-black dark:group-hover:text-white transition-colors">
          {title}
        </h3>
      </div>
      
      <div className="flex-grow space-y-4 text-gray-600 dark:text-brand-muted leading-relaxed">
        {children}
      </div>
    </div>
  </motion.div>
);

export const InfoSection: React.FC = () => {
  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            
            {/* Gateway Infrastructure Card */}
            <InfoCard 
              icon={<Server size={24} />} 
              title="Gateway Infrastructure"
              delay={0.1}
            >
                <p>
                    You have reached <span className="font-mono text-sm px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-gray-900 dark:text-brand-text">dokploy.cloud</span>. 
                    This domain serves as the primary ingress point and secure landing gateway for Tegota's internal application deployment infrastructure.
                </p>
                <p>
                    To ensure strict separation of concerns and enhanced security for our DevOps operations, the active management panel is fully isolated at:
                </p>
                <a href="https://app.dokploy.cloud" className="inline-flex items-center gap-2 text-gray-900 dark:text-brand-text font-medium hover:text-black dark:hover:text-white transition-colors pt-2">
                    <span>app.dokploy.cloud</span>
                    <ArrowUpRight size={14} className="text-gray-500 dark:text-brand-muted" />
                </a>

                <div className="pt-6 mt-auto flex flex-wrap gap-4 border-t border-black/5 dark:border-white/5">
                     <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-brand-muted/70">
                        <Lock size={14} />
                        <span>Private Access</span>
                     </div>
                     <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-brand-muted/70">
                        <GitBranch size={14} />
                        <span>Version v0.26.2+</span>
                     </div>
                </div>
            </InfoCard>

            {/* Open Source Tribute Card */}
            <InfoCard 
              icon={<Heart size={24} />} 
              title="Powered by Open Source"
              delay={0.2}
            >
                <p>
                    This infrastructure runs on <a href="https://dokploy.com" target="_blank" rel="noreferrer" className="text-gray-900 dark:text-brand-text underline decoration-black/20 dark:decoration-white/20 underline-offset-4 hover:decoration-black/60 dark:hover:decoration-white/60 transition-all">Dokploy</a>, 
                    a powerful open-source alternative to proprietary PaaS solutions like Vercel and Heroku.
                </p>
                <p>
                    Tegota extends sincere gratitude to the Dokploy maintainers and contributors for building a robust, Docker-native deployment solution that empowers engineering teams to own their infrastructure at scale.
                </p>

                <div className="pt-6 mt-auto border-t border-black/5 dark:border-white/5">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-brand-muted italic">
                            Independently operated by Tegota.
                        </span>
                        <a 
                            href="https://github.com/dokploy/dokploy" 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-brand-text hover:text-black dark:hover:text-white transition-colors opacity-80 hover:opacity-100"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path></svg>
                            <span>Star on GitHub</span>
                        </a>
                    </div>
                </div>
            </InfoCard>
        </div>
    </section>
  );
};