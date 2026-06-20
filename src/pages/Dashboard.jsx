import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line
} from "recharts";
import {
  LayoutDashboard,
  Building,
  PlusCircle,
  ListTodo,
  FileText,
  Check,
  X,
  Users,
  UserSquare2,
  DollarSign,
  Trash2,
  UserCheck,
  Ban,
  ExternalLink,
  Crown
} from "lucide-react";
export const Dashboard = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    startups,
    opportunities,
    applications,
    payments,
    usersList,
    addStartup,
    updateStartup,
    deleteStartup,
    approveStartup,
    addOpportunity,
    updateOpportunity,
    deleteOpportunity,
    updateApplicationStatus,
    updateUserStatus,
    setUserPremium,
    updateProfileCV
  } = useApp();
  if (!currentUser) {
    return <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 flex flex-col justify-center items-center py-20 px-4 text-center">
        <LayoutDashboard className="w-16 h-16 text-indigo-500 dark:text-indigo-400 mb-4" />
        <h2 className="font-display font-bold text-2xl">Sandbox Session Logged Out</h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 max-w-sm">No active actor is logged in. Use the top bar switcher or log in manually.</p>
        <div className="mt-6 flex gap-3">
          <Link to="/login" className="bg-primary text-white py-2 px-5 rounded-lg text-xs font-semibold">Login Portal</Link>
          <Link to="/" className="bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 py-2 px-5 rounded-lg text-xs font-semibold">Back Home</Link>
        </div>
      </div>;
  }
  const [activeTab, setActiveTab] = useState(() => {
    if (currentUser.role === "founder") return "overview";
    if (currentUser.role === "admin") return "overview";
    return "overview";
  });
  const myStartups = startups.filter((s) => s.founderId === currentUser.id);
  const myActiveStartup = myStartups[0] || null;
  const myOpportunities = myActiveStartup ? opportunities.filter((o) => o.startupId === myActiveStartup.id) : [];
  const myStartupApplications = myActiveStartup ? applications.filter((a) => a.startupId === myActiveStartup.id) : [];
  const myCollaboratorApplications = applications.filter((a) => (a.applicantEmail || a.applicant_email) === currentUser.email);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [startupName, setStartupName] = useState(myActiveStartup ? myActiveStartup.name : "");
  const [startupLogo, setStartupLogo] = useState(myActiveStartup ? myActiveStartup.logo : "🚀");
  const [logoUploading, setLogoUploading] = useState(false);
  const [startupIndustry, setStartupIndustry] = useState(myActiveStartup ? myActiveStartup.industry : "SaaS");

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogoUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setStartupLogo(data.data.url);
        setStartupFormFeedback("Success: Logo uploaded successfully!");
      } else {
        setStartupFormFeedback("Error: Logo upload failed.");
      }
    } catch (error) {
      console.error(error);
      setStartupFormFeedback("Error: Logo upload failed.");
    } finally {
      setLogoUploading(false);
    }
  };
  const [startupDescription, setStartupDescription] = useState(myActiveStartup ? myActiveStartup.description : "");
  const [startupStage, setStartupStage] = useState(() => {
    return myActiveStartup ? myActiveStartup.fundingStage : "Pre-seed";
  });
  const [startupLocation, setStartupLocation] = useState(myActiveStartup ? myActiveStartup.location : "Remote");
  const [startupWebsite, setStartupWebsite] = useState(myActiveStartup ? myActiveStartup.website : "https://");
  const [startupPitch, setStartupPitch] = useState(myActiveStartup ? myActiveStartup.pitch : "");
  const [startupFormFeedback, setStartupFormFeedback] = useState("");
  const [oppTitle, setOppTitle] = useState("");
  const [oppSkills, setOppSkills] = useState("");
  const [oppWorkType, setOppWorkType] = useState("Remote");
  const [oppCommitment, setOppCommitment] = useState("Full-time");
  const [oppDeadline, setOppDeadline] = useState("2026-08-30");
  const [oppSalary, setOppSalary] = useState("");
  const [oppDescription, setOppDescription] = useState("");
  const [oppFormFeedback, setOppFormFeedback] = useState("");
  const [profileSkills, setProfileSkills] = useState(currentUser.skills.join(", "));
  const [profileBio, setProfileBio] = useState(currentUser.bio);
  const [profileExperience, setProfileExperience] = useState(currentUser.experience);
  const [profileFormFeedback, setProfileFormFeedback] = useState("");
  const handleStartupSubmit = (e) => {
    e.preventDefault();
    setStartupFormFeedback("");
    if (!startupName || !startupDescription || !startupPitch) {
      setStartupFormFeedback("Error: Please compile all required text fields.");
      return;
    }
    if (myActiveStartup) {
      const updated = {
        ...myActiveStartup,
        name: startupName,
        logo: startupLogo,
        industry: startupIndustry,
        description: startupDescription,
        fundingStage: startupStage,
        location: startupLocation,
        website: startupWebsite,
        pitch: startupPitch
      };
      updateStartup(updated);
      setStartupFormFeedback("Success: Startup information updated.");
    } else {
      addStartup({
        name: startupName,
        logo: startupLogo,
        industry: startupIndustry,
        description: startupDescription,
        fundingStage: startupStage,
        location: startupLocation,
        website: startupWebsite,
        pitch: startupPitch
      });
      setStartupFormFeedback("Success: Startup created under review badge.");
    }
  };
  const handleOpportunitySubmit = (e) => {
    e.preventDefault();
    setOppFormFeedback("");
    if (!myActiveStartup) {
      setOppFormFeedback("Error: You must save a Startup profile record first before posting jobs!");
      return;
    }
    if (!oppTitle || !oppSkills || !oppDescription) {
      setOppFormFeedback("Error: Complete all required job metrics.");
      return;
    }
    addOpportunity({
      startupId: myActiveStartup.id,
      title: oppTitle,
      skills: oppSkills.split(",").map((s) => s.trim()),
      workType: oppWorkType,
      commitment: oppCommitment,
      deadline: oppDeadline,
      salaryRange: oppSalary || "Equity Only",
      description: oppDescription
    });
    setOppFormFeedback("Success: New Open Position was published instantly!");
    setOppTitle("");
    setOppSkills("");
    setOppDescription("");
    setOppSalary("");
  };
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileFormFeedback("");
    const skillsArray = profileSkills.split(",").map((s) => s.trim()).filter((s) => s !== "");
    // Maintain existing name and avatar when updating from the dashboard
    const success = await updateProfileCV(currentUser.name, skillsArray, profileBio, profileExperience, currentUser.avatar);
    if (success) {
      setProfileFormFeedback("Success: Collaborator CV has been finalized and refreshed!");
    } else {
      setProfileFormFeedback("Error: Failed to update CV.");
    }
  };
  const chartsApplicationData = [
    { name: "Jan", count: 12 },
    { name: "Feb", count: 18 },
    { name: "Mar", count: 24 },
    { name: "Apr", count: 15 },
    { name: "May", count: 32 },
    { name: "Jun", count: 45 }
  ];
  const chartsTeamGrowthData = [
    { name: "Jan", members: 2 },
    { name: "Feb", members: 2 },
    { name: "Mar", members: 3 },
    { name: "Apr", members: 4 },
    { name: "May", members: 5 },
    { name: "Jun", members: 8 }
  ];
  const adminStatsChartData = [
    { name: "Startups", value: startups.length },
    { name: "Open Jobs", value: opportunities.length },
    { name: "Applicants", value: applications.length },
    { name: "Payments log", value: payments.length }
  ];
  return <div className="min-h-screen bg-transparent text-slate-800 dark:text-slate-200 flex flex-col md:flex-row">
      
      {
    /* Sidebar Panel Navigation */
  }
      <aside className="w-full md:w-64 glass-sidebar shrink-0 select-none">
        <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center gap-3">
          <img
    src={currentUser.avatar}
    alt="Current avatar"
    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
    referrerPolicy="no-referrer"
  />
          <div className="min-w-0">
            <h3 className="font-bold text-xs truncate max-w-[120px] text-slate-900 dark:text-white">{currentUser.name}</h3>
            <span className="text-[9px] uppercase font-mono bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 py-0.5 px-2 rounded-full font-bold">
              {currentUser.role}
            </span>
          </div>
        </div>

        <nav className="p-4 space-y-1 text-xs">
          <span className="text-[10px] uppercase font-mono text-slate-500 block px-3 mb-2 font-bold select-none">MAIN DESK</span>

          {currentUser.role === "founder" && <>
              <button
    onClick={() => setActiveTab("overview")}
    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition ${activeTab === "overview" ? "bg-primary text-white font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-205 hover:bg-slate-200 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white"}`}
  >
                <LayoutDashboard size={15} />
                <span>Overview Analytics</span>
              </button>
              <button
    onClick={() => setActiveTab("my-startup")}
    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition ${activeTab === "my-startup" ? "bg-primary text-white font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white"}`}
  >
                <Building size={15} />
                <span>My Startup Profile</span>
              </button>
              <button
    onClick={() => setActiveTab("add-opportunity")}
    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition ${activeTab === "add-opportunity" ? "bg-primary text-white font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white"}`}
  >
                <PlusCircle size={15} />
                <span>Post Open Job</span>
              </button>
              <button
    onClick={() => setActiveTab("manage-opportunities")}
    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition ${activeTab === "manage-opportunities" ? "bg-primary text-white font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white"}`}
  >
                <ListTodo size={15} />
                <span>Manage Roles ({myOpportunities.length})</span>
              </button>
              <button
    onClick={() => setActiveTab("applications")}
    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition ${activeTab === "applications" ? "bg-primary text-white font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white"}`}
  >
                <FileText size={15} />
                <span>Applicants ({myStartupApplications.length})</span>
              </button>
            </>}

          {currentUser.role === "collaborator" && <>
              <button
    onClick={() => setActiveTab("overview")}
    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition ${activeTab === "overview" ? "bg-primary text-white font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white"}`}
  >
                <LayoutDashboard size={15} />
                <span>Application Metrics</span>
              </button>
              <button
    onClick={() => setActiveTab("my-applications")}
    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition ${activeTab === "my-applications" ? "bg-primary text-white font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white"}`}
  >
                <FileText size={15} />
                <span>My Applied Pitch ({myCollaboratorApplications.length})</span>
              </button>
              <button
    onClick={() => setActiveTab("profile")}
    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition ${activeTab === "profile" ? "bg-primary text-white font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white"}`}
  >
                <UserSquare2 size={15} />
                <span>Edit Collaborator CV</span>
              </button>
            </>}

          {currentUser.role === "admin" && <>
              <button
    onClick={() => setActiveTab("overview")}
    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition ${activeTab === "overview" ? "bg-primary text-white font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white"}`}
  >
                <LayoutDashboard size={15} />
                <span>Moderator Audit desk</span>
              </button>
              <button
    onClick={() => setActiveTab("manage-users")}
    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition ${activeTab === "manage-users" ? "bg-primary text-white font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white"}`}
  >
                <Users size={15} />
                <span>Manage Accounts ({usersList.length})</span>
              </button>
              <button
    onClick={() => setActiveTab("manage-startups")}
    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition ${activeTab === "manage-startups" ? "bg-primary text-white font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white"}`}
  >
                <Building size={15} />
                <span>Manage Startups ({startups.length})</span>
              </button>
              <button
    onClick={() => setActiveTab("transactions")}
    className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2.5 transition ${activeTab === "transactions" ? "bg-primary text-white font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-850 hover:text-slate-900 dark:hover:text-white"}`}
  >
                <DollarSign size={15} />
                <span>Bank Ledgers ({payments.length})</span>
              </button>
            </>}

          <div className="pt-6 select-none">
            <span className="text-[9px] uppercase font-mono text-slate-500 block px-3 mb-1">PROMOTIONAL OFFER</span>
            <Link
    to="/payment"
    className="px-3 py-2 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20 hover:bg-amber-500/25 transition flex items-center gap-1.5 font-bold text-xxs block"
  >
              <Crown size={12} className="shrink-0" />
              <span>Get Founder Premium</span>
            </Link>
          </div>

        </nav>
      </aside>

      {
    /* Main Workspace Frame */
  }
      <main className="flex-1 bg-transparent p-6 sm:p-10 overflow-y-auto">

        {
    /* ========================================================================= */
  }
        {
    /* FOUNDER VIEWPORT */
  }
        {
    /* ========================================================================= */
  }
        {currentUser.role === "founder" && <div className="space-y-8">
            
            {
    /* Overview Module */
  }
            {activeTab === "overview" && <div className="space-y-6">
                
                {
    /* Title */
  }
                <div>
                  <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Founder Hub Dashboard</h1>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Check active telemetry on your open listings, reviewed collaborators, and applicant backlogs.</p>
                </div>

                {
    /* Counter Cards */
  }
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="glass-card rounded-2xl p-5 shadow-md">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Startup Profile Managed</span>
                    <span className="font-display font-bold text-lg text-slate-900 dark:text-white mt-2 flex items-center gap-2 truncate">
                      {myActiveStartup ? (
                        <>
                          <span className="w-6 h-6 shrink-0 flex items-center justify-center rounded overflow-hidden bg-slate-100 dark:bg-slate-900 text-sm">
                            {myActiveStartup.logo && myActiveStartup.logo.startsWith("http") ? <img src={myActiveStartup.logo} alt="Logo" className="w-full h-full object-cover" loading="lazy" decoding="async" /> : myActiveStartup.logo}
                          </span>
                          <span className="truncate">{myActiveStartup.name}</span>
                        </>
                      ) : (
                        "(No registered startup yet)"
                      )}
                    </span>
                    {!myActiveStartup && <button onClick={() => setActiveTab("my-startup")} className="text-xxs text-indigo-500 dark:text-indigo-400 font-bold hover:underline mt-2">Initialize company &gt;</button>}
                  </div>
                  <div className="glass-card rounded-2xl p-5 shadow-md">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Total Job Postings</span>
                    <span className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-1 block">{myOpportunities.length}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Total active cofounder needs</span>
                  </div>
                  <div className="glass-card rounded-2xl p-5 shadow-md">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Backlogged Applicants</span>
                    <span className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-1 block">{myStartupApplications.length}</span>
                    <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold hover:underline cursor-pointer" onClick={() => setActiveTab("applications")}>
                      Review applicants &gt;
                    </span>
                  </div>
                </div>

                {
    /* Analytical graphs / charts using Recharts */
  }
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                  <div className="glass-card rounded-2xl p-5 shadow-lg">
                    <h3 className="font-display font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4">Monthly Applicant Feed (Recharts)</h3>
                    <div className="h-64 text-slate-800 text-xs">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartsApplicationData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#2a3341" strokeOpacity={0.4} />
                          <XAxis dataKey="name" stroke="#64748b" />
                          <YAxis stroke="#64748b" />
                          <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }} />
                          <Bar dataKey="count" fill="#4F46E5" radius={[4, 4, 0, 0]} name="Applicants" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-5 shadow-lg">
                    <h3 className="font-display font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4">Team Size Expansion (Recharts)</h3>
                    <div className="h-64 text-slate-800 text-xs">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartsTeamGrowthData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#2a3341" strokeOpacity={0.4} />
                          <XAxis dataKey="name" stroke="#64748b" />
                          <YAxis stroke="#64748b" />
                          <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }} />
                          <Line type="monotone" dataKey="members" stroke="#06B6D4" strokeWidth={3} name="Total Engineers" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

              </div>}

            {
    /* My Startup Section Tab */
  }
            {activeTab === "my-startup" && <div className="glass-card rounded-xl p-6 sm:p-8 max-w-3xl">
                <h2 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mb-2">My Startup Profile Setup</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Create or update your startup branding so collaborators can view details on public registries.</p>

                {startupFormFeedback && <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs rounded-lg mb-4">
                    {startupFormFeedback}
                  </div>}

                <form onSubmit={handleStartupSubmit} className="space-y-4 text-xs text-slate-600 dark:text-slate-300">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-400">Startup Name *</label>
                      <input
    type="text"
    required
    value={startupName}
    onChange={(e) => setStartupName(e.target.value)}
    placeholder="e.g. EcoSphere Solutions"
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
  />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-400">Branding Logo (Upload Image) *</label>
                      <div className="flex items-center gap-2">
                        {startupLogo && startupLogo !== "🚀" && startupLogo.startsWith("http") && (
                          <img src={startupLogo} alt="Logo" className="w-9 h-9 rounded object-cover" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          disabled={logoUploading}
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-1.5 text-slate-900 dark:text-white outline-none focus:border-indigo-500 text-xs"
                        />
                      </div>
                      {logoUploading && <p className="text-xs text-indigo-500 mt-1">Uploading...</p>}
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-400">Industry Theme *</label>
                      <select
    value={startupIndustry}
    onChange={(e) => setStartupIndustry(e.target.value)}
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
  >
                        <option value="Greentech">Greentech</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Developer Tools">Developer Tools</option>
                        <option value="Medtech">Medtech</option>
                        <option value="SaaS">SaaS</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-400">Funding Stage</label>
                      <select
    value={startupStage}
    onChange={(e) => setStartupStage(e.target.value)}
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
  >
                        <option value="Pre-seed">Pre-seed</option>
                        <option value="Seed">Seed</option>
                        <option value="Series A">Series A</option>
                        <option value="Bootstrapped">Bootstrapped</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-400">Main Office / Location</label>
                      <input
    type="text"
    value={startupLocation}
    onChange={(e) => setStartupLocation(e.target.value)}
    placeholder="e.g. Hybrid, Remote, SF"
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
  />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-400">Website Address</label>
                    <input
    type="url"
    value={startupWebsite}
    onChange={(e) => setStartupWebsite(e.target.value)}
    placeholder="e.g. https://mycompany.io"
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-slate-900 dark:text-white outline-none focus:border-indigo-500 font-mono"
  />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-400">Description Tagline *</label>
                    <input
    type="text"
    required
    value={startupDescription}
    onChange={(e) => setStartupDescription(e.target.value)}
    placeholder="Brief one-sentence business focus..."
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
  />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-400">Full Slide Pitch Deck Copy *</label>
                    <textarea
    required
    rows={5}
    value={startupPitch}
    onChange={(e) => setStartupPitch(e.target.value)}
    placeholder="Detail letters of intents, telemetry numbers, market sizing..."
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-900 dark:text-white outline-none focus:border-indigo-500 font-sans"
  />
                  </div>

                  <button
    type="submit"
    className="bg-primary hover:bg-primary/95 text-white font-bold py-2.5 px-6 rounded-lg float-right transition cursor-pointer"
  >
                    Save Startup Profile
                  </button>

                  <div className="clear-both" />

                </form>
              </div>}

            {
    /* Post Opportunity Section Tab */
  }
            {activeTab === "add-opportunity" && <div className="glass-card rounded-xl p-6 sm:p-8 max-w-3xl">
                <h2 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mb-2">Publish an Open Team Position</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Describe role requirements to recruit aligned technical collaborators on StartupForge.</p>

                {oppFormFeedback && <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs rounded-lg mb-4">
                    {oppFormFeedback}
                  </div>}

                <form onSubmit={handleOpportunitySubmit} className="space-y-4 text-xs text-slate-600 dark:text-slate-300 col-span-1">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-400 font-sans">Role Title *</label>
                      <input
    type="text"
    required
    value={oppTitle}
    onChange={(e) => setOppTitle(e.target.value)}
    placeholder="e.g. Lead React Architect"
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
  />
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-400 font-sans">Compensation (Salary range or equity %)*</label>
                      <input
    type="text"
    required
    value={oppSalary}
    onChange={(e) => setOppSalary(e.target.value)}
    placeholder="e.g. $120k + 1.5% Equity or Volunteer"
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
  />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-400">Work Type</label>
                      <select
    value={oppWorkType}
    onChange={(e) => setOppWorkType(e.target.value)}
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-slate-900 dark:text-white outline-none focus:border-indigo-500 animate-none"
  >
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Onsite">Onsite</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-400">Commitment Level</label>
                      <select
    value={oppCommitment}
    onChange={(e) => setOppCommitment(e.target.value)}
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
  >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Equity Only">Equity Only</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 dark:text-slate-400">Apply Deadline *</label>
                      <input
    type="date"
    required
    value={oppDeadline}
    onChange={(e) => setOppDeadline(e.target.value)}
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
  />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-400">Explicit Tool Stack (Comma separated) *</label>
                    <input
    type="text"
    required
    value={oppSkills}
    onChange={(e) => setOppSkills(e.target.value)}
    placeholder="React, TypeScript, Recharts, TailwindCss, UIUX"
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-slate-900 dark:text-white outline-none focus:border-indigo-500 font-mono"
  />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-400">Role description & candidate expectations *</label>
                    <textarea
    required
    rows={4}
    value={oppDescription}
    onChange={(e) => setOppDescription(e.target.value)}
    placeholder="Detail specific deliverables..."
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-900 dark:text-white outline-none focus:border-indigo-500 font-sans"
  />
                  </div>

                  <button
    type="submit"
    className="bg-primary hover:bg-primary/95 text-white font-bold py-2.5 px-6 rounded-lg float-right transition cursor-pointer"
  >
                    Post Position
                  </button>

                  <div className="clear-both" />

                </form>
              </div>}

            {
    /* Manage Opportunities list Tab */
  }
            {activeTab === "manage-opportunities" && <div className="glass-card rounded-xl p-6 sm:p-8">
                <h2 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mb-2">My Open Positions</h2>
                <p className="text-secondary text-xs text-slate-500 dark:text-slate-400 mb-6">Manage roles posted for <strong>{myActiveStartup?.name || "(Unknown Starter)"}</strong>.</p>

                {myOpportunities.length === 0 ? <div className="text-center py-10 text-slate-500 dark:text-slate-400 text-xs">
                    No positions currently posted. Tap "Post Open Job" on the sidebar!
                  </div> : <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 text-xxs uppercase tracking-wider font-mono">
                          <th className="py-3">Job Name</th>
                          <th className="py-3">Work Mode</th>
                          <th className="py-3">Commitment</th>
                          <th className="py-3">Deadline</th>
                          <th className="py-3 text-right">Removal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-850">
                        {myOpportunities.map((opp) => <tr key={opp.id} className="text-slate-700 dark:text-slate-300">
                            <td className="py-3.5 font-bold text-slate-900 dark:text-white pr-2">{opp.title}</td>
                            <td className="py-3.5 font-mono"><span className="bg-slate-100 dark:bg-slate-950 text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-slate-855 px-2 py-0.5 rounded text-[10px]">{opp.workType}</span></td>
                            <td className="py-3.5 text-slate-550 dark:text-slate-400">{opp.commitment}</td>
                            <td className="py-3.5 font-mono text-slate-500 dark:text-slate-400">{opp.deadline}</td>
                            <td className="py-3.5 text-right">
                              <button
    onClick={() => deleteOpportunity(opp.id)}
    className="text-rose-500 hover:text-rose-450 dark:hover:text-rose-400 transition"
    title="Delete Position"
  >
                                <Trash2 size={16} className="inline" />
                              </button>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>}
              </div>}

            {
    /* Applications review board tab */
  }
            {activeTab === "applications" && <div className="glass-card rounded-xl p-6 sm:p-8">
                <h2 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mb-2">My Startup Applications Inboxes</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Review candidate pitches, tool stack profiles, and click to coordinate hires.</p>

                {myStartupApplications.length === 0 ? <div className="text-center py-10 text-slate-500 dark:text-slate-400 text-xs">
                    No candidatures received yet. Open positions are public.
                  </div> : <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 text-xxs uppercase tracking-wider font-mono">
                          <th className="py-3">Candidate</th>
                          <th className="py-3">Target Node</th>
                          <th className="py-3">Pitch Cover Letter</th>
                          <th className="py-3">Status</th>
                          <th className="py-3 text-right">Decision Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-850 text-xs">
                        {myStartupApplications.map((app) => <tr key={app.id} className="text-slate-700 dark:text-slate-350 hover:bg-slate-200/50 dark:hover:bg-slate-850/20 transition">
                            <td className="py-4 pr-3">
                              <div className="flex items-center gap-2.5">
                                <div className="space-y-0.5">
                                  <p className="font-bold text-slate-900 dark:text-white">{app.applicantName}</p>
                                  <p className="text-[10px] text-slate-500 dark:text-slate-450 font-mono select-all font-semibold break-all">{app.applicantEmail}</p>
                                  {app.applicantPortfolio && <a href={app.applicantPortfolio} target="_blank" rel="noreferrer" className="text-cyan-600 dark:text-cyan-400 hover:underline text-[10px] flex items-center gap-0.5">
                                      <ExternalLink size={10} /> Profile Link
                                    </a>}
                                </div>
                              </div>
                            </td>
                            <td className="py-4 font-semibold text-slate-700 dark:text-slate-300 pr-3">{app.opportunityTitle}</td>
                            <td className="py-4 pr-4">
                              <p className="max-w-xs text-xxs leading-relaxed line-clamp-3 font-sans text-slate-650 dark:text-slate-400">
                                {app.applicantBio}
                              </p>
                              {app.applicantSkills && <div className="flex flex-wrap gap-1 mt-1.5">
                                  {app.applicantSkills.map((sk, idx) => <span key={idx} className="bg-slate-100 dark:bg-slate-950 text-[9px] font-mono px-1.5 py-0.2 rounded text-slate-600 dark:text-slate-450 font-medium">
                                      {sk}
                                    </span>)}
                                </div>}
                            </td>
                            <td className="py-4">
                              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${app.status === "Accepted" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : app.status === "Rejected" ? "bg-rose-500/10 text-rose-400 border border-rose-500/30" : "bg-amber-500/10 text-amber-500 border border-amber-500/30"}`}>
                                {app.status}
                              </span>
                            </td>
                            <td className="py-4 text-right pr-2">
                              {app.status === "Pending" ? <div className="flex items-center justify-end gap-1.5">
                                  <button
    onClick={() => updateApplicationStatus(app.id, "Accepted")}
    className="p-1 px-2.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white rounded text-[11px] font-bold transition flex items-center gap-0.5 border border-emerald-500/15 cursor-pointer"
  >
                                    <Check size={11} /> Accept
                                  </button>
                                  <button
    onClick={() => updateApplicationStatus(app.id, "Rejected")}
    className="p-1 px-2 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded text-[11px] font-bold transition flex items-center gap-0.5 border border-rose-500/15 cursor-pointer"
  >
                                    <X size={11} /> Reject
                                  </button>
                                </div> : <span className="text-slate-500 text-xxs font-mono">Reviewed</span>}
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>}
              </div>}

          </div>}

        {
    /* ========================================================================= */
  }
        {
    /* COLLABORATOR VIEWPORT */
  }
        {
    /* ========================================================================= */
  }
        {currentUser.role === "collaborator" && <div className="space-y-8">
            
            {
    /* Overview stats layout */
  }
            {activeTab === "overview" && <div className="space-y-6">
                <div>
                  <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Collaborator Active Dashboard</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Review validation statuses of direct pitch applications submitted to active founders.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="glass-card rounded-xl p-5">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Applications Sent</span>
                    <span className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-1 block">{myCollaboratorApplications.length}</span>
                    <span className="text-xxs text-slate-500 dark:text-slate-400 mt-2 block">Total open startup submissions</span>
                  </div>
                  <div className="glass-card rounded-xl p-5">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Accepted Roles</span>
                    <span className="font-display font-extrabold text-3xl text-emerald-500 dark:text-emerald-400 mt-1 block">
                      {myCollaboratorApplications.filter((a) => a.status === "Accepted").length}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1.5">Founders coordinates confirmed</span>
                  </div>
                  <div className="glass-card rounded-xl p-5">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Pending Review</span>
                    <span className="font-display font-extrabold text-3xl text-amber-500 mt-1 block">
                      {myCollaboratorApplications.filter((a) => a.status === "Pending").length}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-1.5">Awating direct feedback</span>
                  </div>
                </div>

                {
    /* Nice helper workspace prompt */
  }
                <div className="bg-gradient-to-tr from-indigo-500/10 to-indigo-950/20 border border-indigo-500/25 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="space-y-1">
                    <p className="font-display font-bold text-slate-900 dark:text-white text-base">Want to expand your matches?</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
                      Make sure your collaborator CV is fully detailed with up-to-date technologies. StartupForge founders frequently scan active CV indexes to recruit builders directly.
                    </p>
                  </div>
                  <button
    onClick={() => setActiveTab("profile")}
    className="bg-primary hover:bg-primary/95 text-white font-bold py-2 px-5 rounded-lg text-xs transition cursor-pointer shrink-0"
  >
                    Configure My CV Block
                  </button>
                </div>
              </div>}

            {
    /* My Applications Tab */
  }
            {activeTab === "my-applications" && <div className="glass-card rounded-xl p-6">
                <h2 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mb-2">My Applied Pitch Submissions</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Track approvals of job requests sent to the voluntary startup ecosystem.</p>

                {myCollaboratorApplications.length === 0 ? <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-xs space-y-4">
                    <p>You haven't applied to any startup squads yet. Connect now!</p>
                    <Link to="/opportunities" className="bg-primary text-white py-2 px-4 rounded font-bold text-xxs inline-block">Browse Opportunities</Link>
                  </div> : <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 text-xxs uppercase tracking-wider font-mono">
                          <th className="py-3">Startup Name</th>
                          <th className="py-3">Applied Node Position</th>
                          <th className="py-3">Pitch Cover</th>
                          <th className="py-3">Applied Date</th>
                          <th className="py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-850">
                        {myCollaboratorApplications.map((app) => <tr key={app.id} className="text-slate-700 dark:text-slate-300">
                            <td className="py-3.5 pr-3">
                              <span className="font-bold text-slate-900 dark:text-white hover:underline block truncate max-w-[150px]">
                                <Link to={`/startups/${app.startupId}`}>{app.startupName}</Link>
                              </span>
                            </td>
                            <td className="py-3.5 font-semibold text-slate-700 dark:text-slate-300 pr-2">{app.opportunityTitle}</td>
                            <td className="py-3.5 max-w-xs truncate text-slate-500 dark:text-slate-400 font-sans pr-2">{app.applicantBio}</td>
                            <td className="py-3.5 font-mono text-slate-500 dark:text-slate-400">{app.appliedDate}</td>
                            <td className="py-3.5">
                              <span className={`text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase ${app.status === "Accepted" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : app.status === "Rejected" ? "bg-rose-500/10 text-rose-450 text-rose-400 border border-rose-505/30" : "bg-amber-500/10 text-amber-500 border border-amber-500/30"}`}>
                                {app.status}
                              </span>
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>}
              </div>}

            {
    /* Profile CV setup tab */
  }
            {activeTab === "profile" && <div className="glass-card rounded-xl p-6 sm:p-8 max-w-2xl">
                <h2 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mb-2">Configure My Collaborator CV</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Describe your previous SaaS builds, framework skills, and bio statement details.</p>

                {profileFormFeedback && <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg mb-4">
                    {profileFormFeedback}
                  </div>}

                <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs text-slate-600 dark:text-slate-350">
                  
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-400">Skills Stack (Comma separated) *</label>
                    <input
    type="text"
    required
    value={profileSkills}
    onChange={(e) => setProfileSkills(e.target.value)}
    placeholder="React, TypeScript, Redux, Docker, TailwindCss"
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-900 dark:text-white outline-none focus:border-indigo-500 font-mono"
  />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-400 font-sans">Self Introduction / Bio *</label>
                    <textarea
    required
    rows={3}
    value={profileBio}
    onChange={(e) => setProfileBio(e.target.value)}
    placeholder="Discuss active tech stack fields..."
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-900 dark:text-white outline-none focus:border-indigo-500 font-sans"
  />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700 dark:text-slate-400 font-sans">Professional Experience Record *</label>
                    <textarea
    required
    rows={3}
    value={profileExperience}
    onChange={(e) => setProfileExperience(e.target.value)}
    placeholder="Past jobs, open-source work..."
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-900 dark:text-white outline-none focus:border-indigo-500 font-sans"
  />
                  </div>

                  <button
    type="submit"
    className="bg-primary hover:bg-primary/95 text-white font-bold py-2.5 px-6 rounded-lg float-right transition cursor-pointer"
  >
                    Update CV
                  </button>

                  <div className="clear-both" />

                </form>
              </div>}

          </div>}

        {
    /* ========================================================================= */
  }
        {
    /* ADMIN VIEWPORT */
  }
        {
    /* ========================================================================= */
  }
        {currentUser.role === "admin" && <div className="space-y-8 col-span-1">
            
            {
    /* Admin Overview overview */
  }
            {activeTab === "overview" && <div className="space-y-6">
                <div>
                  <h1 className="font-display font-extrabold text-2xl text-slate-900 dark:text-white">Platform Moderator Dashboard</h1>
                  <p className="text-secondary text-xs text-slate-500 dark:text-slate-400 mt-1">Supervise sandbox databases, approve startups, audit global financial upgrade transactions.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                  <div className="glass-card rounded-xl p-5">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Audit Users</span>
                    <span className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-1 block">{usersList.length} Accounts</span>
                    <span className="text-xxs text-slate-500 dark:text-slate-400 mt-1.5 block hover:underline cursor-pointer text-indigo-500 dark:text-indigo-400" onClick={() => setActiveTab("manage-users")}>Manage &gt;</span>
                  </div>
                  <div className="glass-card rounded-xl p-5">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Registry Startups</span>
                    <span className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-1 block">{startups.length} Registered</span>
                    <span className="text-xxs text-slate-500 dark:text-slate-400 mt-1.5 block hover:underline cursor-pointer text-indigo-500 dark:text-indigo-400" onClick={() => setActiveTab("manage-startups")}>Approve list &gt;</span>
                  </div>
                  <div className="glass-card rounded-xl p-5">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Open Vacancies</span>
                    <span className="font-display font-extrabold text-2xl text-slate-900 dark:text-white mt-1 block">{opportunities.length} Listings</span>
                    <span className="text-xxs text-slate-500 dark:text-slate-400 mt-1.5 block">Preconfigured feed</span>
                  </div>
                  <div className="glass-card rounded-xl p-5">
                    <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold">Combined Revenue</span>
                    <span className="font-display font-extrabold text-2xl text-emerald-555 text-emerald-600 dark:text-emerald-400 mt-1 block">
                      ${payments.reduce((acc, curr) => acc + curr.amount, 0)} CAD
                    </span>
                    <span className="text-xxs text-slate-500 dark:text-slate-400 mt-1.5 block hover:underline cursor-pointer text-indigo-500 dark:text-indigo-400" onClick={() => setActiveTab("transactions")}>Bank ledger &gt;</span>
                  </div>
                </div>

                {
    /* Mini chart visual for admin registries */
  }
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-display font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-4">Total Registry Proportions (Recharts)</h3>
                  <div className="h-64 text-slate-850 dark:text-slate-800 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={adminStatsChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2a3341" strokeOpacity={0.4} />
                        <XAxis dataKey="name" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#475569", color: "#f8fafc" }} />
                        <Bar dataKey="value" fill="#06B6D4" radius={[4, 4, 0, 0]} name="Value Count" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>}

            {
    /* Manage Users Tab */
  }
            {activeTab === "manage-users" && <div className="glass-card rounded-xl p-6">
                <h2 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mb-2">Audit Platform Accounts</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Authorize block rules or premium status modifiers on active sandbox users.</p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 text-xxs uppercase tracking-wider font-mono">
                        <th className="py-3">Account Creator</th>
                        <th className="py-3">Upgrade Level</th>
                        <th className="py-3">Status</th>
                        <th className="py-3 text-right">Moderator Decisions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-850">
                      {usersList.map((usr) => <tr key={usr.id} className="text-slate-700 dark:text-slate-350 even:bg-slate-50 dark:even:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                          <td className="py-3.5 pr-2">
                            <div className="flex items-center gap-3">
                              <img src={usr.avatar} alt={usr.name} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                              <div>
                                <span className="font-bold text-slate-900 dark:text-white">{usr.name}</span>
                                <div className="flex items-center gap-2 mt-0.5">
                                  <span className="text-[10px] text-slate-500 font-mono">{usr.email}</span>
                                  <span className="bg-slate-200 dark:bg-slate-800 text-[9px] px-1.5 py-0.5 rounded capitalize font-semibold text-slate-600 dark:text-slate-400">
                                    {usr.role}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 font-medium">
                            <button
    onClick={() => setUserPremium(usr.id, !usr.isPremium)}
    className={`px-2 py-0.5 rounded text-[10px] font-bold ${usr.isPremium ? "bg-amber-500/10 text-amber-600 dark:text-amber-500 border border-amber-500/30" : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-500 border border-slate-200 dark:border-slate-850"}`}
  >
                              {usr.isPremium ? "\u2605 Premium Actor" : "Standard"}
                            </button>
                          </td>
                          <td className="py-3.5">
                            <span className={`text-[9px] px-2 py-0.5 rounded font-mono ${usr.status === "blocked" ? "bg-rose-500/10 text-rose-500 border border-rose-500/30" : "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30"}`}>
                              {usr.status || "active"}
                            </span>
                          </td>
                          <td className="py-3.5 text-right">
                            {usr.status === "blocked" ? <button
    onClick={() => updateUserStatus(usr.id, "active")}
    className="text-xs bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white px-2.5 py-1 rounded font-bold transition flex items-center gap-0.5 justify-end ml-auto cursor-pointer"
  >
                                <UserCheck size={11} /> Unblock
                              </button> : <button
    onClick={() => updateUserStatus(usr.id, "blocked")}
    className="text-xs bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500 hover:text-white px-2.5 py-1 rounded font-bold transition flex items-center gap-0.5 justify-end ml-auto cursor-pointer"
  >
                                <Ban size={11} /> Block Account
                              </button>}
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>}

            {
    /* Manage Startups Tab */
  }
            {activeTab === "manage-startups" && <div className="glass-card rounded-xl p-6">
                <h2 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mb-2 font-display">Evaluate Registered Startups</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Moderate voluntary pre-registers. Verify description compliance, and approve listings.</p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 text-xxs uppercase tracking-wider font-mono">
                        <th className="py-3">Startup Company Name</th>
                        <th className="py-3">Industry Theme</th>
                        <th className="py-3">Creator / Founder</th>
                        <th className="py-3">Funding Stage</th>
                        <th className="py-3">Approval Badge</th>
                        <th className="py-3 text-right font-mono">Decisions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-850">
                      {startups.map((st) => <tr key={st.id} className="text-slate-700 dark:text-slate-350 hover:bg-slate-200/50 dark:hover:bg-slate-850/10 transition">
                          <td className="py-3.5 pr-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm rounded bg-slate-100 dark:bg-slate-950 p-1 w-7 h-7 flex items-center justify-center overflow-hidden shrink-0">
                                {st.logo && st.logo.startsWith("http") ? <img src={st.logo} alt={st.name} loading="lazy" decoding="async" className="w-full h-full object-cover rounded-sm" /> : st.logo}
                              </span>
                              <span className="font-bold text-slate-900 dark:text-white">{st.name}</span>
                            </div>
                          </td>
                          <td className="py-3.5 font-semibold text-slate-900 dark:text-white">{st.industry}</td>
                          <td className="py-3.5 text-slate-500 dark:text-slate-400">{st.founderName}</td>
                          <td className="py-3.5 font-mono text-slate-500 dark:text-slate-400">{st.fundingStage}</td>
                          <td className="py-3.5">
                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${st.status === "approved" ? "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/30" : "bg-amber-500/10 text-amber-500 border border-amber-500/30"}`}>
                              {st.status}
                            </span>
                          </td>
                          <td className="py-3.5 text-right">
                            {st.status === "pending" ? <div className="flex gap-1.5 justify-end">
                                <button
    onClick={() => approveStartup(st.id)}
    className="p-1 px-2.5 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white rounded text-[11px] font-semibold transition flex items-center gap-1 cursor-pointer"
  >
                                    <Check size={11} /> Approve
                                </button>
                                <button
    onClick={() => deleteStartup(st.id)}
    className="p-1 px-2 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded text-[11px] font-semibold transition flex items-center gap-1 cursor-pointer"
  >
                                    <X size={11} /> Remove
                                </button>
                              </div> : <button
    onClick={() => deleteStartup(st.id)}
    className="p-1 px-2 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded text-[11px] font-semibold transition inline-flex items-center gap-1 cursor-pointer"
  >
                                  <Trash2 size={11} /> Remove listing
                                </button>}
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>}

            {
    /* Transactions Audit Tab */
  }
            {activeTab === "transactions" && <div className="glass-card rounded-xl p-6">
                <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white mb-2">Platform Payments Audit Trackers</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Verify sandbox premium receipts processed through direct upgrade funnels.</p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-850 text-slate-500 text-[10px] uppercase tracking-wider font-mono">
                        <th className="py-3">Creator Name</th>
                        <th className="py-3">Ledger Fee Item</th>
                        <th className="py-3">Amount</th>
                        <th className="py-3">System Ref Code</th>
                        <th className="py-3">Ref Date</th>
                        <th className="py-3 text-right">Settlement</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-850">
                      {payments.map((py) => <tr key={py.id} className="text-slate-700 dark:text-slate-350 hover:bg-slate-200/50 dark:hover:bg-slate-850/10">
                          <td className="py-3.5 font-bold text-slate-900 dark:text-white">{py.userName}</td>
                          <td className="py-3.5 pr-2">{py.planName}</td>
                          <td className="py-3.5 font-mono text-emerald-500 dark:text-emerald-400 font-bold">${py.amount} CAD</td>
                          <td className="py-3.5 font-mono text-slate-500 dark:text-slate-400 text-xxs">{py.transactionId}</td>
                          <td className="py-3.5 font-mono text-slate-550 dark:text-slate-400">{py.date}</td>
                          <td className="py-3.5 text-right">
                            <span className="text-emerald-555 dark:text-emerald-400 border border-emerald-500/20 bg-emerald-500/15 py-0.5 px-2.5 rounded text-[10px] font-bold">
                              {py.status}
                            </span>
                          </td>
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </div>}

          </div>}

      </main>
    </div>;
};
