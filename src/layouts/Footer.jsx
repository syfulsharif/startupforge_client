import { Link } from "react-router-dom";
import { Sparkles, Mail, MapPin, Phone, Github, Twitter, Linkedin, Heart } from "lucide-react";
export const Footer = () => {
  return <footer className="bg-slate-150 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {
    /* Brand segment */
  }
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold">
              <Sparkles size={16} />
            </div>
            <span className="font-display font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
              StartupForge
            </span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            Unifying visionary startup founders with specialized collaborators to engineer the next generation of industry builders. Empowering remote teamwork from zero to Seed.
          </p>
          <div className="flex items-center gap-3 mt-2 text-slate-400">
            <a href="#" className="hover:text-primary transition-colors"><Twitter size={16} /></a>
            <a href="#" className="hover:text-primary transition-colors"><Linkedin size={16} /></a>
            <a href="#" className="hover:text-primary transition-colors"><Github size={16} /></a>
          </div>
        </div>

        {
    /* Quick Links */
  }
        <div>
          <h3 className="font-display font-semibold text-slate-950 dark:text-white text-sm uppercase tracking-wider mb-4">
            Platform Pages
          </h3>
          <ul className="space-y-2 text-xs">
            <li><Link to="/" className="hover:text-slate-950 dark:hover:text-slate-900 transition-colors">Home Landing</Link></li>
            <li><Link to="/startups" className="hover:text-slate-950 dark:hover:text-slate-900 transition-colors">Browse Startups</Link></li>
            <li><Link to="/opportunities" className="hover:text-slate-950 dark:hover:text-slate-900 transition-colors">Assemble Collaborators</Link></li>
            <li><Link to="/payment" className="hover:text-amber-400 transition-colors flex items-center gap-1">Upgrade to Premium</Link></li>
          </ul>
        </div>

        {
    /* Resources / Tech Stack */
  }
        <div>
          <h3 className="font-display font-semibold text-slate-950 dark:text-white text-sm uppercase tracking-wider mb-4">
            Built For Quality
          </h3>
          <ul className="space-y-2 text-xs">
            <li><span className="text-slate-500">React 19 & Vite 6</span></li>
            <li><span className="text-slate-500">Tailwind CSS v4</span></li>
            <li><span className="text-slate-500">Lucide High-Density Icons</span></li>
            <li><span className="text-slate-500">Framer Motion Transition States</span></li>
          </ul>
        </div>

        {
    /* Contact Info */
  }
        <div>
          <h3 className="font-display font-semibold text-slate-950 dark:text-white text-sm uppercase tracking-wider mb-4">
            Support Office
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li className="flex items-center gap-2">
              <MapPin size={14} className="text-primary flex-shrink-0" />
              <span>SOMA District, San Francisco, CA</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-primary flex-shrink-0" />
              <a href="mailto:support@startupforge.co" className="hover:text-slate-950 dark:hover:text-slate-900 transition-colors">support@startupforge.co</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-primary flex-shrink-0" />
              <span>+1 (415) 390-2104</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-200 dark:border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-slate-500 text-[11px] gap-4">
        <p>© 2026 StartupForge. All rights strictly reserved. An AI Studio built platform.</p>
        <p className="flex items-center gap-1">
          Designed with <Heart size={10} className="text-rose-500 fill-rose-500" /> for the global builder economy.
        </p>
      </div>
    </footer>;
};
