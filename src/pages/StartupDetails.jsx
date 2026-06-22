import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ArrowLeft, MapPin, Globe, Calendar, Briefcase, ShieldCheck, Sparkles, AlertCircle, Loader2 } from "lucide-react";
export const StartupDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { startups, opportunities, currentUser, authLoading } = useApp();
  const startup = startups.find((s) => s.id === id);
  
  if (authLoading) {
    return <div className="min-h-screen bg-transparent flex flex-col justify-center items-center py-20">
      <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
      <p className="text-slate-600 dark:text-slate-400 font-medium text-xs">Loading startup details...</p>
    </div>;
  }

  if (!startup) {
    return <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 flex flex-col justify-center items-center py-20">
        <AlertCircle className="w-16 h-16 text-rose-500 mb-4" />
        <h2 className="font-display font-bold text-2xl">Startup Not Found</h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">The company record may have been removed or is pending approval.</p>
        <Link to="/startups" className="mt-6 bg-primary text-white py-2 px-4 rounded text-xs">Back to List</Link>
      </div>;
  }
  const relatedOpp = opportunities.filter((o) => o.startupId === startup.id);
  return <div className="min-h-screen bg-transparent text-slate-800 dark:text-slate-200 py-12 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
      <div className="max-w-5xl mx-auto">
        
        {
    /* Back Link */
  }
        <button
    onClick={() => navigate(-1)}
    className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white mb-8 group"
  >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to browser list</span>
        </button>

        {
    /* Header Block Section */
  }
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 sm:p-10 mb-8 relative overflow-hidden">
          {
    /* Subtle decoration */
  }
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row gap-6 items-start justify-between relative z-10">
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <span className="text-5xl bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 w-20 h-20 flex items-center justify-center overflow-hidden">
                {startup.logo && startup.logo.startsWith("http") ? <img src={startup.logo} alt={startup.name} loading="lazy" decoding="async" className="w-full h-full object-cover rounded-xl" /> : startup.logo}
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">{startup.name}</h1>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${startup.status === "approved" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/25" : "bg-amber-500/10 text-amber-500 border border-amber-500/25"}`}>
                    {startup.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-slate-450 mt-2">
                  <span className="bg-slate-100 dark:bg-slate-850 text-slate-800 dark:text-slate-300 font-mono px-2.5 py-0.5 rounded text-[11px] font-bold">
                    {startup.industry}
                  </span>
                  <span className="text-slate-650">•</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-350">{startup.fundingStage} stage</span>
                  <span className="text-slate-650">•</span>
                  <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    <MapPin size={12} /> {startup.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-2 shrink-0">
              <a
    href={startup.website}
    target="_blank"
    rel="noreferrer"
    className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-750 text-xs font-semibold py-2 px-4 rounded-lg text-slate-800 dark:text-slate-100 flex items-center gap-1.5 transition self-start"
  >
                <Globe size={13} />
                <span>Visit Website</span>
              </a>
              <span className="text-[10px] text-slate-600 dark:text-slate-550 font-mono flex items-center gap-1">
                <Calendar size={11} className="text-slate-500" />
                Founded {startup.createdDate}
              </span>
            </div>
          </div>
        </div>

        {
    /* Content Columns */
  }
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {
    /* Main Content */
  }
          <div className="lg:col-span-2 space-y-8">
            
            {
    /* About & Elevator */
  }
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">About the Startup</h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {startup.description}
              </p>
            </div>

            {
    /* Structured Pitch Description */
  }
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                <Sparkles size={16} className="text-amber-500" />
                <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">Startup Pitch & Vision</h2>
              </div>
              <p className="text-xs text-slate-650 dark:text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                {startup.pitch}
              </p>
            </div>

            {
    /* List of open opportunities */
  }
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
                Open Team Positions ({relatedOpp.length})
              </h2>

              {relatedOpp.length === 0 ? <div className="py-6 text-center text-xs text-slate-600 dark:text-slate-500">
                  <Briefcase size={24} className="mx-auto mb-2 text-slate-400 dark:text-slate-700" />
                  No open positions reported at this moment. Contact founder directly.
                </div> : <div className="divide-y divide-slate-200 dark:divide-slate-850">
                  {relatedOpp.map((opp) => <div key={opp.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center gap-4">
                      <div className="min-w-0">
                        <Link to={`/opportunities/${opp.id}`} className="font-bold text-sm text-slate-800 dark:text-slate-200 hover:text-indigo-650 dark:hover:text-white truncate block">
                           {opp.title}
                        </Link>
                        <div className="flex flex-wrap gap-2 items-center text-[10px] text-slate-600 dark:text-slate-400 mt-1">
                          <span className="bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded font-mono text-cyan-500 dark:text-cyan-400">{opp.workType}</span>
                          <span>•</span>
                          <span>{opp.commitment}</span>
                          <span>•</span>
                          {opp.salaryRange && <span className="text-slate-700 dark:text-slate-300 font-mono">{opp.salaryRange}</span>}
                        </div>
                      </div>
                      <Link
    to={`/opportunities/${opp.id}`}
    className="bg-primary hover:bg-primary/95 text-white py-1.5 px-3.5 rounded-md text-xs font-semibold whitespace-nowrap transition cursor-pointer"
  >
                        Details
                      </Link>
                    </div>)}
                </div>}
            </div>

          </div>

          {
    /* Sidebar */
  }
          <div className="space-y-6">
            
            {
    /* Leadership team info block */
  }
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
              <h2 className="font-display font-bold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Leadership Team</h2>
              
              <div className="flex gap-3 items-center border-b border-slate-200 dark:border-slate-855 dark:border-slate-850 pb-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-display font-bold text-indigo-500 dark:text-indigo-400 uppercase">
                  {startup.founderName.substring(0, 2)}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{startup.founderName}</p>
                  <p className="text-[10px] text-slate-500 font-mono uppercase">Primary Founder</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Contact Email</span>
                  <span className="text-slate-800 dark:text-slate-300 font-mono text-[11px] selection:bg-indigo-500">
                    {startup.founderId === "u-1" ? "sarah@ecosphere.io" : startup.founderId === "u-2" ? "alex@aetherai.tech" : "contact@foundry.co"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Target Hires</span>
                  <span className="text-slate-800 dark:text-slate-200 font-bold">{startup.teamSizeNeeded || 1} collaborators</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Verification</span>
                  <span className="text-emerald-650 dark:text-emerald-400 flex items-center gap-1 font-semibold text-[11px]">
                    <ShieldCheck size={12} /> SEC Compliant
                  </span>
                </div>
              </div>
            </div>

            {
    /* Quick action helper card */
  }
            <div className="bg-gradient-to-tr from-white dark:from-slate-900 to-indigo-50 dark:to-indigo-950/20 border border-indigo-200 dark:border-indigo-500/20 rounded-xl p-5 text-left text-xs">
              <p className="font-bold text-slate-900 dark:text-white">Assemble or Recruit?</p>
              <p className="text-slate-600 dark:text-slate-400 text-xxs mt-1.5 leading-relaxed">
                If you are a builder with verified experience credentials, you can submit application letters directly to any listed jobs free of charge.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>;
};
