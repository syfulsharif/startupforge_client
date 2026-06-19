import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { Search, Briefcase, Grid, List, ArrowDownWideNarrow, Sparkles } from 'lucide-react';

export const BrowseOpportunities = () => {
  const { fetchOpportunities, startups } = useApp();
  
  // Search & filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedWorkType, setSelectedWorkType] = useState('All');
  const [selectedCommitment, setSelectedCommitment] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  
  // Pagination & data states
  const [loadedOpportunities, setLoadedOpportunities] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isGridView, setIsGridView] = useState(true);

  // Load distinct industries dynamically from registered startups
  const industries = ['All', ...Array.from(new Set(startups.filter(s => s.status === 'approved').map(s => s.industry)))];
  const workTypes = ['All', 'Remote', 'Hybrid', 'Onsite'];
  const commitments = ['All', 'Full-time', 'Part-time', 'Contract', 'Equity Only'];

  // Trigger search / pagination fetch from backend
  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchOpportunities({
        search: searchTerm,
        industry: selectedIndustry,
        workType: selectedWorkType,
        commitment: selectedCommitment,
        sort: sortBy,
        page,
        limit: 6
      });
      if (data && data.success) {
        setLoadedOpportunities(data.opportunities || []);
        setTotalPages(data.pages || 1);
        setTotalCount(data.total || 0);
      }
    } catch (err) {
      console.error('Error fetching opportunities:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch when search query or filter values change (reset to page 1)
  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedIndustry, selectedWorkType, selectedCommitment, sortBy]);

  // Fetch on page change or when load parameters change
  useEffect(() => {
    loadData();
  }, [page, searchTerm, selectedIndustry, selectedWorkType, selectedCommitment, sortBy]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-150 py-12 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Segment */}
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 py-1 px-3 rounded-full text-xs font-semibold mb-3">
              <Sparkles size={12} />
              <span>{totalCount} active positions match search criteria</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
              Browse Open Opportunities
            </h1>
            <p className="text-xs text-slate-400 mt-2 max-w-xl">
              Apply to join early stages with active equity allocations, contract terms, or hybrid options. Find your niche, submit a direct pitch, and co-found.
            </p>
          </div>

          {/* Grid/List toggle */}
          <div className="flex items-center gap-3 bg-slate-900/45 border border-white/5 p-1.5 rounded-lg backdrop-blur-md shadow-sm">
            <button 
              onClick={() => setIsGridView(true)}
              className={`p-1.5 rounded transition ${isGridView ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Grid View"
            >
              <Grid size={15} />
            </button>
            <button 
              onClick={() => setIsGridView(false)}
              className={`p-1.5 rounded transition ${!isGridView ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:text-white'}`}
              title="List View"
            >
              <List size={15} />
            </button>
          </div>
        </div>

        {/* Toolbar & Search Options */}
        <div className="glass-card rounded-2xl p-5 mb-8 space-y-4">
          
          {/* Seek search text inputs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-2.5 text-slate-500 w-4 h-4" />
              <input 
                type="text"
                placeholder="Search roles (e.g. Lead, Frontend, Figma, Rust...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-950/45 border border-white/5 text-slate-200 text-xs py-2.5 pl-10 pr-4 rounded-lg focus:outline-none focus:border-indigo-500/50 backdrop-blur-md"
              />
            </div>

            {/* Industry selector */}
            <div>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full bg-slate-950/45 border border-white/5 text-slate-300 text-xs py-2.5 px-3 rounded-lg focus:outline-none focus:border-indigo-500/50 backdrop-blur-md"
              >
                <option value="All" className="bg-slate-950">All Industries</option>
                {industries.filter(i => i !== 'All').map(i => (
                  <option key={i} value={i} className="bg-slate-950">{i}</option>
                ))}
              </select>
            </div>

            {/* Sort order settings */}
            <div className="flex items-center gap-2 bg-slate-950/45 border border-white/5 px-3 py-1.5 rounded-lg backdrop-blur-md">
              <ArrowDownWideNarrow size={14} className="text-slate-500 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-transparent text-slate-350 text-xs border-0 focus:outline-none cursor-pointer"
              >
                <option value="newest" className="bg-slate-950">Sort: Newest First</option>
                <option value="oldest" className="bg-slate-950">Sort: Oldest First</option>
              </select>
            </div>
          </div>

          {/* Auxiliary filter row for workType and commitment */}
          <div className="flex flex-wrap gap-4 pt-1 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono text-slate-500">Work Mode:</span>
              <div className="flex gap-1.5">
                {workTypes.map(wt => (
                  <button
                    key={wt}
                    onClick={() => setSelectedWorkType(wt)}
                    className={`px-2.5 py-1 rounded text-[10px] font-semibold border transition ${selectedWorkType === wt ? 'bg-cyan-500/15 text-cyan-400 border-cyan-500/35' : 'bg-slate-950/45 text-slate-400 border-white/5 hover:bg-slate-800/40 backdrop-blur-sm'}`}
                  >
                    {wt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 ml-default md:ml-auto">
              <span className="text-[10px] uppercase font-mono text-slate-500">Commitment:</span>
              <div className="flex gap-1.5">
                {commitments.map(ct => (
                  <button
                    key={ct}
                    onClick={() => setSelectedCommitment(ct)}
                    className={`px-2.5 py-1 rounded text-[10px] font-semibold border transition ${selectedCommitment === ct ? 'bg-indigo-500/15 text-indigo-400 border-indigo-500/35' : 'bg-slate-950/45 text-slate-400 border-white/5 hover:bg-slate-800/40 backdrop-blur-sm'}`}
                  >
                    {ct}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic List Render */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
            <p className="text-xs text-slate-400 mt-4">Retrieving opportunities from the server...</p>
          </div>
        ) : loadedOpportunities.length === 0 ? (
          <div className="glass-card rounded-2xl p-16 text-center max-w-lg mx-auto shadow-xl">
            <Briefcase className="w-12 h-12 text-slate-755 mx-auto mb-4 text-slate-600" />
            <p className="font-bold text-white text-base">No Positions Match Criteria</p>
            <p className="text-xs text-slate-400 mt-2">
              Try adjusting your query words (e.g. selecting 'All' work modes or commitments) to search the wider list.
            </p>
            <button 
              onClick={() => { setSearchTerm(''); setSelectedIndustry('All'); setSelectedWorkType('All'); setSelectedCommitment('All'); }}
              className="mt-5 text-xs bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Reset Search Parameters
            </button>
          </div>
        ) : isGridView ? (
          /* Grid View Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loadedOpportunities.map(opp => (
              <div 
                key={opp.id}
                className="glass-card rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/35 hover:shadow-2xl hover:shadow-cyan-500/5 transition duration-350 shadow-lg"
              >
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="bg-cyan-950/40 text-cyan-400 text-[10px] font-bold font-mono py-0.5 px-2 rounded border border-cyan-900/30">
                      {opp.workType}
                    </span>
                    <span className="text-[10px] text-slate-500">Deadline: {opp.deadline}</span>
                  </div>

                  <h3 className="font-display font-extrabold text-base text-white mt-4 leading-snug">
                    {opp.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 hover:underline">
                    <Link to={`/startups/${opp.startupId}`}>{opp.startupName}</Link>
                  </p>

                  <p className="text-xs text-slate-400 mt-4 line-clamp-3 leading-relaxed">
                    {opp.description}
                  </p>

                  {/* Skills tags list */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {opp.skills.map((skill, i) => (
                      <span key={i} className="bg-slate-950 text-slate-400 border border-slate-850 px-2 py-0.5 rounded font-mono text-[9px]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-850 mt-6 pt-4 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-slate-500 block text-[9px] uppercase font-mono">Engagement</span>
                    <span className="text-slate-200 font-bold">{opp.commitment}</span>
                  </div>
                  <Link 
                    to={`/opportunities/${opp.id}`}
                    className="bg-primary hover:bg-primary/95 text-white py-1.5 px-4 rounded-lg text-xs font-semibold transition cursor-pointer"
                  >
                    View & Apply
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View Layout */
          <div className="space-y-4">
            {loadedOpportunities.map(opp => (
              <div 
                key={opp.id}
                className="glass-card rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-indigo-500/35 hover:shadow-2xl hover:shadow-indigo-500/5 transition shadow-md"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display font-bold text-base text-white">
                      <Link to={`/opportunities/${opp.id}`} className="hover:text-primary transition-colors">{opp.title}</Link>
                    </h3>
                    <span className="bg-cyan-950/40 text-cyan-400 text-[9px] font-bold py-0.5 px-1.5 rounded font-mono border border-cyan-800/20">
                      {opp.workType}
                    </span>
                    <span className="bg-indigo-950/40 text-indigo-400 text-[9px] font-bold py-0.5 px-1.5 rounded font-mono border border-indigo-800/20">
                      {opp.commitment}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400">
                    Proposed by <span className="text-slate-350 hover:underline"><Link to={`/startups/${opp.startupId}`}>{opp.startupName}</Link></span>
                  </p>

                  <div className="flex flex-wrap gap-1 mt-1">
                    {opp.skills.map((skill, i) => (
                      <span key={i} className="bg-slate-950 text-slate-400 px-2 py-0.5 rounded font-mono text-[9px]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between sm:justify-start pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                  <div className="text-left sm:text-right">
                    {opp.salaryRange && <p className="text-xs font-mono text-slate-200">{opp.salaryRange}</p>}
                    <p className="text-[10px] text-slate-500 mt-0.5">Deadline: {opp.deadline}</p>
                  </div>
                  <Link 
                    to={`/opportunities/${opp.id}`}
                    className="bg-primary hover:bg-primary/95 text-white py-2 px-4 rounded-lg text-xs font-semibold shrink-0 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Real server-side pagination UI */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12 pb-6">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="px-3 py-1 bg-slate-900 border border-slate-850 rounded text-slate-300 disabled:text-slate-600 text-xs hover:bg-slate-800 transition disabled:hover:bg-slate-900 cursor-pointer"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx + 1)}
                className={`px-3 py-1 rounded text-xs font-bold transition cursor-pointer ${page === idx + 1 ? 'bg-primary text-white border border-primary' : 'bg-slate-900 text-slate-300 border border-slate-850 hover:bg-slate-800'}`}
              >
                {idx + 1}
              </button>
            ))}
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="px-3 py-1 bg-slate-900 border border-slate-850 rounded text-slate-300 disabled:text-slate-600 text-xs hover:bg-slate-800 transition disabled:hover:bg-slate-900 cursor-pointer"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
