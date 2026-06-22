import { useApp } from "../context/AppContext";

export const GlobalLoader = () => {
  const { authLoading } = useApp();

  if (!authLoading) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md transition-all duration-300">
      <div className="relative flex justify-center items-center">
        <div className="absolute inset-0 rounded-full blur-xl bg-primary/30 animate-pulse"></div>
        <div className="w-16 h-16 border-4 border-slate-200 dark:border-slate-800 border-t-primary dark:border-t-primary rounded-full animate-spin z-10"></div>
      </div>
      <p className="mt-6 font-display font-bold text-lg text-slate-800 dark:text-slate-100 animate-pulse tracking-wide">
        Forging Workspace...
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
        Authenticating & Loading Data
      </p>
    </div>
  );
};
