import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Search, MapPin, Building, Sparkles, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
export const BrowseStartups = () => {
  const { startups, authLoading } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");
  const approvedStartups = startups.filter((s) => s.status === "approved");
  const industries = ["All", ...Array.from(new Set(approvedStartups.map((s) => s.industry)))];
  const stages = ["All", "Pre-seed", "Seed", "Series A", "Series B", "Bootstrapped"];
  const filtered = approvedStartups.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.description.toLowerCase().includes(searchTerm.toLowerCase()) || s.pitch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === "All" || s.industry === selectedIndustry;
    const matchesStage = selectedStage === "All" || s.fundingStage === selectedStage;
    return matchesSearch && matchesIndustry && matchesStage;
  });
  return <div className="min-h-screen bg-transparent text-slate-850 dark:text-slate-150 py-12 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
    <div className="max-w-7xl mx-auto">

      {authLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">Loading startups...</p>
        </div>
      ) : (
        <>
          {
            /* Header Block */
          }
          <div className="mb-10 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 py-1 px-3 rounded-full text-xs font-semibold mb-4">
              <Sparkles size={12} />
              {/* <span>Active Sandbox database: {approvedStartups.length} startups approved</span> */}
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
              Discover Tech Companies
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
              Browse early-to-series startups recruiting active collaborators. Tap details to investigate open engineering roles, pitch slides, and founders' direct contacts.
            </p>
          </div>

          {
            /* Filter Toolbar */
          }
          <div className="glass-card rounded-2xl p-5 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">

            {
              /* Seek Input */
            }
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-2.5 text-slate-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, values, mission keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/45 dark:bg-slate-950/45 border border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-200 text-xs py-2.5 pl-10 pr-4 rounded-lg focus:outline-none focus:border-indigo-500/50 backdrop-blur-md"
              />
            </div>

            {
              /* Industry dropdown */
            }
            <div>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full bg-white/45 dark:bg-slate-950/45 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 text-xs py-2.5 px-3 rounded-lg focus:outline-none focus:border-indigo-500/50 backdrop-blur-md"
              >
                <option value="All" className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">All Industries</option>
                {industries.filter((ind) => ind !== "All").map((ind) => <option key={ind} value={ind} className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">{ind}</option>)}
              </select>
            </div>

            {
              /* Stage Dropdown */
            }
            <div>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full bg-white/45 dark:bg-slate-950/45 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 text-xs py-2.5 px-3 rounded-lg focus:outline-none focus:border-indigo-500/50 backdrop-blur-md"
              >
                <option value="All" className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">All Funding Stages</option>
                {stages.filter((stg) => stg !== "All").map((stg) => <option key={stg} value={stg} className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">{stg}</option>)}
              </select>
            </div>

          </div>

          {
            /* Result grid */
          }
          {filtered.length === 0 ? <div className="glass-card rounded-2xl p-16 text-center max-w-lg mx-auto mt-6 shadow-xl">
            <Building className="w-12 h-12 text-slate-700 mx-auto mb-4" />
            <p className="font-bold text-slate-900 dark:text-white text-base">No Startups Found</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              We couldn't locate any records matching your filter parameters. Try clearing words or resetting filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedIndustry("All");
                setSelectedStage("All");
              }}
              className="mt-5 inline-block text-xs bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Reset Filters
            </button>
          </div> : <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((startup) => <div
                key={startup.id}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between hover:border-indigo-500/35 hover:shadow-2xl hover:shadow-indigo-500/5 transition duration-300 shadow-lg"
              >
                <div>
                  <div className="flex gap-4">
                    <span className="text-4xl bg-slate-100 dark:bg-slate-950 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 w-14 h-14 flex items-center justify-center overflow-hidden">
                      {startup.logo && startup.logo.startsWith("http") ? <img src={startup.logo} alt={startup.name} loading="lazy" decoding="async" className="w-full h-full object-cover rounded-xl" /> : startup.logo}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display font-black text-lg text-slate-900 dark:text-white truncate hover:text-indigo-400">
                        <Link to={`/startups/${startup.id}`}>{startup.name}</Link>
                      </h3>
                      <p className="text-xs text-slate-450 flex items-center gap-1.5 mt-0.5 font-sans">
                        <span>{startup.industry}</span>
                        <span>•</span>
                        <span className="text-slate-400 font-semibold">{startup.fundingStage}</span>
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-650 dark:text-slate-400 mt-5 leading-relaxed line-clamp-3">
                    {startup.description}
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 bg-white/60 dark:bg-slate-950/60 rounded-lg p-2.5 border border-slate-200 dark:border-slate-850">
                    <MapPin size={13} className="text-slate-500" />
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 font-mono truncate">{startup.location}</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-850 mt-6 pt-5">
                  <div className="flex justify-between items-center text-xs mb-4">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-mono">Founder</span>
                      <span className="text-slate-850 dark:text-slate-300 font-semibold text-xs">{startup.founderName}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-500 block text-[10px] uppercase font-mono">Recruits</span>
                      <span className="text-indigo-400 font-bold text-xs">{startup.teamSizeNeeded} collaborators</span>
                    </div>
                  </div>
                  <Link
                    to={`/startups/${startup.id}`}
                    className="w-full text-center bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-750 text-slate-750 dark:text-slate-100 py-2 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1"
                  >
                    <span>Explore Pitch & Roles</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>)}
            </div>

            {
              /* Pagination simulator UI */
            }
            <div className="flex justify-center items-center gap-2 mt-12 pb-6">
              <button disabled className="px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded text-slate-500 text-xs">Prev</button>
              <button className="px-3 py-1 bg-primary text-white border border-primary rounded text-xs font-bold">1</button>
              <button disabled className="px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded text-slate-500 text-xs">Next</button>
            </div>
          </>}
        </>
      )}
    </div>
  </div>;
};

