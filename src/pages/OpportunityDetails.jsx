import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  ArrowLeft,
  Sparkles,
  Send,
  ShieldAlert,
  CheckCircle,
  Clock,
  Link2,
  Loader2
} from "lucide-react";
export const OpportunityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { opportunities, startups, currentUser, addApplication, authLoading } = useApp();
  const openOpp = opportunities.find((o) => o.id === id);
  const startup = openOpp ? startups.find((s) => s.id === openOpp.startupId) : null;
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [pitch, setPitch] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [customSkills, setCustomSkills] = useState("");
  const [successApply, setSuccessApply] = useState(false);

  if (authLoading) {
    return <div className="min-h-screen bg-transparent flex flex-col justify-center items-center py-20">
      <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
      <p className="text-slate-600 dark:text-slate-400 font-medium text-xs">Loading role details...</p>
    </div>;
  }

  if (!openOpp || !startup) {
    return <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 flex flex-col justify-center items-center py-20">
      <ShieldAlert className="w-16 h-16 text-rose-500 mb-4 animate-bounce" />
      <h2 className="font-display font-bold text-2xl">Role Not Found</h2>
      <p className="text-xs text-slate-650 dark:text-slate-400 mt-2">The open position might be filled or has expired.</p>
      <Link to="/opportunities" className="mt-6 bg-primary text-white py-2 px-4 rounded text-xs">Back to List</Link>
    </div>;
  }
  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate("/login", { state: { from: `/opportunities/${id}` } });
      return;
    }
    addApplication({
      opportunityId: openOpp.id,
      startupId: startup.id,
      applicantBio: pitch || `Excited to join the team as ${openOpp.title}. I have active experience building startups in similar fields.`,
      applicantSkills: customSkills ? customSkills.split(",").map((s) => s.trim()) : currentUser.skills,
      applicantPortfolio: portfolio || "https://myportfolio.github.io"
    });
    setSuccessApply(true);
    setPitch("");
    setPortfolio("");
    setCustomSkills("");
  };
  return <div className="min-h-screen bg-transparent text-slate-800 dark:text-slate-200 py-12 px-4 sm:px-6 lg:px-8 bg-grid-pattern relative">

    <div className="max-w-4xl mx-auto">

      {
        /* Navigation Link Back */
      }
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-900 mb-8 group cursor-pointer"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        <span>Back to browser feed</span>
      </button>

      {
        /* Dynamic header cards */
      }
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-800/30 px-3 py-1 rounded-full font-bold uppercase tracking-wider font-mono">
              {openOpp.workType} Mode
            </span>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white mt-3 leading-tight">
              {openOpp.title}
            </h1>

            <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
              Startup Proposal: <Link to={`/startups/${startup.id}`} className="text-secondary hover:underline font-semibold">{openOpp.startupName}</Link>
            </p>
          </div>

          <div className="text-left sm:text-right text-xs">
            <span className="text-slate-500 block uppercase font-mono text-[9px]">Compensation Range</span>
            <span className="text-emerald-555 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-sm sm:text-base tracking-tight block mt-0.5">
              {openOpp.salaryRange || "Equity Allocation Offered"}
            </span>
            <span className="text-slate-500 block uppercase font-mono text-[9px] mt-2">Position Recruiter</span>
            <span className="text-slate-850 dark:text-slate-300 font-semibold">{startup.founderName}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-xs">
          <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-lg border border-slate-200 dark:border-slate-850">
            <span className="text-slate-500 uppercase text-[9px] font-mono block mb-1">Engagement</span>
            <span className="text-slate-900 dark:text-white font-bold">{openOpp.commitment}</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-lg border border-slate-200 dark:border-slate-850">
            <span className="text-slate-500 uppercase text-[9px] font-mono block mb-1">Response Speed</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">2-3 days average</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-lg border border-slate-200 dark:border-slate-850">
            <span className="text-slate-500 uppercase text-[9px] font-mono block mb-1">Team Size Needed</span>
            <span className="text-slate-900 dark:text-white font-bold">{startup.teamSizeNeeded || 1} collaborators</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-lg border border-slate-200 dark:border-slate-850">
            <span className="text-slate-500 uppercase text-[9px] font-mono block mb-1">Application Deadline</span>
            <span className="text-rose-600 dark:text-rose-400 font-bold">{openOpp.deadline}</span>
          </div>
        </div>
      </div>

      {
        /* Content Panel Columns */
      }
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-6">

          {
            /* About the Position Description */
          }
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <h2 className="font-display font-semibold text-slate-900 dark:text-white text-base mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">Job Description & Scope</h2>
            <p className="text-xs text-slate-650 dark:text-slate-300 leading-relaxed font-sans whitespace-pre-line">
              {openOpp.description}
            </p>
          </div>

          {
            /* Required Skills Checkboxes */
          }
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <h2 className="font-display font-semibold text-slate-900 dark:text-white text-base mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">Required Skills Profile</h2>
            <div className="flex flex-wrap gap-2">
              {openOpp.skills.map((skill, index) => <span
                key={index}
                className="bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-mono text-xs py-1 px-3 rounded-full border border-slate-200 dark:border-slate-850"
              >
                {skill}
              </span>)}
            </div>
          </div>

        </div>

        {
          /* Sidebar Action Widget */
        }
        <div className="space-y-6">

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <h2 className="font-display font-semibold text-slate-550 dark:text-slate-400 text-sm uppercase tracking-wider mb-3">Position Status</h2>

            <div className="flex items-center gap-2 mb-6">
              <Clock size={16} className="text-cyan-555 text-cyan-600 dark:text-cyan-400 animate-pulse" />
              <span className="text-xs text-slate-650 dark:text-slate-350">Ad-hoc recruitment open. Applications evaluated daily.</span>
            </div>

            {!currentUser ? <div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 text-xxs text-amber-500 mb-4 leading-relaxed">
                <strong>Logged Out Mode:</strong> You must create or switch profiles to send an application to this company.
              </div>
              <Link
                to="/login"
                className="w-full text-center bg-primary hover:bg-primary/95 text-white py-2.5 rounded-lg text-xs font-semibold transition block"
              >
                Login to Apply
              </Link>
            </div> : currentUser.id === startup.founderId ? (
              <div className="w-full text-center bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 py-2.5 rounded-lg text-xs font-bold cursor-not-allowed">
                You posted this position
              </div>
            ) : <button
              onClick={() => setShowApplyModal(true)}
              className="w-full text-center bg-primary hover:bg-primary/95 text-white py-2.5 rounded-lg text-xs font-bold shadow-lg shadow-primary/20 transition cursor-pointer"
            >
              Apply For This Position
            </button>}
          </div>

          {
            /* Quick Pitch card details */
          }
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 text-left text-xs">
            <p className="font-bold text-slate-900 dark:text-white mb-2">Company Pitch</p>
            <p className="text-slate-650 dark:text-slate-400 text-xxs line-clamp-4 leading-relaxed">
              {startup.pitch}
            </p>
            <Link to={`/startups/${startup.id}`} className="text-indigo-600 dark:text-indigo-400 hover:underline text-xxs font-bold mt-2.5 block">
              View detailed Pitch slide &gt;
            </Link>
          </div>

        </div>

      </div>

    </div>

    {
      /* Dynamic Overlay / slide popup modal for application placement */
    }
    {showApplyModal && <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">

        {
          /* Close Toggle */
        }
        <button
          onClick={() => {
            setShowApplyModal(false);
            setSuccessApply(false);
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 dark:hover:text-slate-900"
        >
          ✕
        </button>

        {!successApply ? <form onSubmit={handleApplySubmit} className="space-y-5 text-xs">

          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={16} className="text-cyan-555 text-cyan-600 dark:text-cyan-400" />
            <h2 className="font-display font-bold text-lg text-slate-900 dark:text-white">Apply to {openOpp.title}</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-xxs">
            Your current account, <strong>{currentUser?.name}</strong> ({currentUser?.email}), will be linked as the primary candidate.
          </p>

          {
            /* Cover letter Cover pitch */
          }
          <div className="space-y-1">
            <label className="text-slate-700 dark:text-slate-350 block font-semibold">Your Cover Pitch *</label>
            <textarea
              required
              rows={4}
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              placeholder="Briefly state your exit history, software skill strengths and why you are interested in voluntary equity positions for this Greentech/AI vision..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-900 dark:text-slate-200 outline-none focus:border-indigo-500 font-sans"
            />
          </div>

          {
            /* Portfolio URL linkouts */
          }
          <div className="space-y-1">
            <label className="text-slate-700 dark:text-slate-350 block font-semibold flex items-center gap-1">
              <Link2 size={13} className="text-slate-500" /> Portfolio Website / GitHub Link
            </label>
            <input
              type="url"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              placeholder="https://marcuschen.dev"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-900 dark:text-slate-200 outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          {
            /* Skills custom entry */
          }
          <div className="space-y-1">
            <label className="text-slate-700 dark:text-slate-350 block font-semibold">Explicit Tool Stack (comma separated or leave blank for profile default)</label>
            <input
              type="text"
              value={customSkills}
              onChange={(e) => setCustomSkills(e.target.value)}
              placeholder="React, TypeScript, Redux, Docker, WASM"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-900 dark:text-slate-200 outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3 text-xs">
            <button
              type="button"
              onClick={() => setShowApplyModal(false)}
              className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-305 hover:bg-slate-300 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-750 py-2 px-4 rounded-lg font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary hover:bg-primary/95 text-white py-2 px-5 rounded-lg font-bold flex items-center gap-1"
            >
              <Send size={12} />
              <span>Submit Pitch Application</span>
            </button>
          </div>

        </form> : <div className="py-6 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
            <CheckCircle size={24} />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Application Placed Successfully!</h3>
          <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed max-w-sm mx-auto">
            Your cover letter and profile CV have been logged on <strong>{startup.name}</strong>'s applicant management dashboard backlog. The founder will review and confirm.
          </p>

          <div className="pt-4 flex flex-col gap-2 max-w-xs mx-auto">
            <Link
              to="/dashboard"
              onClick={() => setShowApplyModal(false)}
              className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-750 text-slate-800 dark:text-white text-xs py-2 px-4 rounded-lg font-semibold block text-center"
            >
              Monitor Status on Dashboard &gt;
            </Link>
            <button
              onClick={() => setShowApplyModal(false)}
              className="text-slate-500 hover:text-slate-300 text-xxs font-semibold uppercase mt-1 cursor-pointer"
            >
              Back to Details
            </button>
          </div>
        </div>}

      </div>
    </div>}

  </div>;
};
