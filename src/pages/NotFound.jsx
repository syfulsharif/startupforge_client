import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight } from "lucide-react";
export const NotFound = () => {
  return <div className="min-h-[80vh] bg-transparent text-slate-805 dark:text-slate-200 flex flex-col justify-center items-center py-20 px-4 text-center bg-grid-pattern relative">
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md space-y-6">
        
        {
    /* Visual Illustration */
  }
        <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/25 flex items-center justify-center mx-auto animate-bounce">
          <AlertTriangle size={32} />
        </div>

        <div className="space-y-2">
          <h1 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white">404 — Route Lost</h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed max-w-sm mx-auto">
            The page you are trying to view has either been moved under a new team, or the co-founding workspace record was deleted.
          </p>
        </div>

        <div className="pt-4">
          <Link
    to="/"
    className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/95 text-white font-bold py-2.5 px-6 rounded-lg text-xs shadow-lg shadow-primary/20 transition-all cursor-pointer"
  >
            <span>Return to Landing Home</span>
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </div>;
};
