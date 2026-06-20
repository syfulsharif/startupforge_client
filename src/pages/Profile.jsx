import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Code, BookOpen, Crown, ChevronRight } from "lucide-react";
export const Profile = () => {
  const { currentUser, updateProfileCV } = useApp();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState(currentUser ? currentUser.name : "");
  const [userBio, setUserBio] = useState(currentUser ? currentUser.bio : "");
  const [userSkills, setUserSkills] = useState(currentUser ? currentUser.skills.join(", ") : "");
  const [userExperience, setUserExperience] = useState(currentUser ? currentUser.experience : "");
  const [userAvatar, setUserAvatar] = useState(currentUser ? currentUser.avatar : "");
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAvatarUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        const newAvatarUrl = data.data.url;
        setUserAvatar(newAvatarUrl);
        const skillsArray = userSkills.split(",").map((s) => s.trim()).filter((s) => s !== "");
        await updateProfileCV(userName, skillsArray, userBio, userExperience, newAvatarUrl);
        setFeedback("Success: Avatar uploaded and saved successfully!");
      } else {
        setFeedback("Error: Image upload failed.");
      }
    } catch (error) {
      console.error(error);
      setFeedback("Error: Image upload failed.");
    } finally {
      setAvatarUploading(false);
    }
  };
  if (!currentUser) {
    return <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 flex flex-col justify-center items-center py-20 px-4">
        <ShieldCheck className="w-16 h-16 text-indigo-500 dark:text-indigo-400 mb-4" />
        <h2 className="font-display font-bold text-xl">Access Privately Guarded</h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Log in or select an active user profile to configure your identity page.</p>
        <button onClick={() => navigate("/login")} className="mt-5 bg-primary text-white py-2 px-5 rounded-lg text-xs font-semibold">Login</button>
      </div>;
  }
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setFeedback("");
    const skillsArray = userSkills.split(",").map((s) => s.trim()).filter((s) => s !== "");
    const success = await updateProfileCV(userName, skillsArray, userBio, userExperience, userAvatar);
    if (success) {
      setFeedback("Success: System profile credentials locked and finalized!");
      setEditMode(false);
    } else {
      setFeedback("Error: Failed to update profile.");
    }
  };
  return <div className="min-h-screen bg-transparent text-slate-800 dark:text-slate-200 py-12 px-4 sm:px-6 lg:px-8 bg-grid-pattern">
      <div className="max-w-4xl mx-auto">
        
        {
    /* Profile Card Render */
  }
        <div className="glass-card rounded-2xl p-6 sm:p-10 mb-8 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row gap-6 items-start justify-between">
            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <img
    src={currentUser.avatar}
    alt={currentUser.name}
    className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500"
    referrerPolicy="no-referrer"
  />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-display font-black text-2xl text-slate-900 dark:text-white">{currentUser.name}</h1>
                  {currentUser.isPremium && <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xxs px-2 py-0.5 rounded-full font-bold flex items-center gap-0.5">
                      <Crown size={10} className="fill-amber-500" /> Premium Member
                    </span>}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize mt-1.5 flex items-center gap-1.5 font-mono">
                  <span className="bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white px-2.5 py-0.5 rounded uppercase">{currentUser.role}</span>
                  <span>•</span>
                  <span>Verification: Active Actor</span>
                </p>
              </div>
            </div>

            <button
    onClick={() => {
      setEditMode(!editMode);
      setFeedback("");
    }}
    className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-750 text-xs font-semibold py-2 px-4 rounded-lg text-slate-800 dark:text-slate-100 transition whitespace-nowrap"
  >
              {editMode ? "Cancel Edit" : "Edit Profile Parameters"}
            </button>
          </div>
        </div>

        {feedback && <div className="p-3 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs rounded-lg mb-6">
            {feedback}
          </div>}

        {
    /* Display and edit columns */
  }
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            
            {editMode ? (
    /* Editable Profile Forms */
    <div className="glass-card rounded-2xl p-6 shadow-lg">
                <h2 className="font-display font-bold text-slate-900 dark:text-white text-base mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">Configure public credentials</h2>
                
                <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs text-slate-600 dark:text-slate-350">
                  <div className="space-y-1">
                    <label className="font-semibold block text-slate-750 text-slate-700 dark:text-slate-400">Display Name</label>
                    <input
      type="text"
      required
      value={userName}
      onChange={(e) => setUserName(e.target.value)}
      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-900 dark:text-white outline-none focus:border-indigo-500"
    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold block text-slate-750 text-slate-700 dark:text-slate-400">Profile Avatar Image</label>
                    <div className="flex items-center gap-3">
                      <img src={userAvatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarUpload}
                          disabled={avatarUploading}
                          className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-slate-900 dark:text-white outline-none focus:border-indigo-500 text-xs font-mono"
                        />
                      </div>
                    </div>
                    {avatarUploading && <p className="text-xs text-indigo-500 mt-1">Uploading image...</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold block text-slate-700 dark:text-slate-400">Introduction Tagline</label>
                    <textarea
      required
      rows={3}
      value={userBio}
      onChange={(e) => setUserBio(e.target.value)}
      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-900 dark:text-white outline-none focus:border-indigo-500 font-sans"
    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold block text-slate-700 dark:text-slate-400">Technical Skills (Comma separated)</label>
                    <input
      type="text"
      required
      value={userSkills}
      onChange={(e) => setUserSkills(e.target.value)}
      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-900 dark:text-white outline-none focus:border-indigo-500 font-mono"
    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold block text-slate-700 dark:text-slate-400">Experience Background Details</label>
                    <textarea
      required
      rows={3}
      value={userExperience}
      onChange={(e) => setUserExperience(e.target.value)}
      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-900 dark:text-white outline-none focus:border-indigo-500 font-sans"
    />
                  </div>

                  <button
      type="submit"
      className="bg-primary hover:bg-primary/95 text-white font-bold py-2 px-5 rounded-lg transition mt-2 cursor-pointer float-right"
    >
                    Save Biography
                  </button>
                  <div className="clear-both" />
                </form>
              </div>
  ) : (
    /* Public profile info logs */
    <div className="space-y-6">
                
                {
      /* Introduction */
    }
                <div className="glass-card rounded-2xl p-6 shadow-md">
                  <h2 className="font-display font-bold text-slate-900 dark:text-white text-base mb-4 pb-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
                    <BookOpen size={16} className="text-indigo-650 dark:text-indigo-400" /> Biography Intro
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {currentUser.bio}
                  </p>
                </div>

                {
      /* Experience background */
    }
                <div className="glass-card rounded-2xl p-6 shadow-md">
                  <h2 className="font-display font-bold text-slate-900 dark:text-white text-base mb-4 pb-2 border-b border-slate-200 dark:border-slate-800 flex items-center gap-1.5">
                    <Code size={16} className="text-cyan-600 dark:text-cyan-400" /> CV Experience Background
                  </h2>
                  <p className="text-xs text-slate-650 dark:text-slate-300 leading-relaxed font-sans">
                    {currentUser.experience}
                  </p>
                </div>

                {
      /* Skills Check */
    }
                <div className="glass-card rounded-2xl p-6 shadow-md">
                  <h2 className="font-display font-bold text-slate-900 dark:text-white text-base mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">Skills Toolset</h2>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.skills.map((s, i) => <span key={i} className="bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-850 py-1 px-3 rounded-full font-mono text-xs font-semibold">
                        {s}
                      </span>)}
                  </div>
                </div>

              </div>
  )}

          </div>

          {
    /* Sidebar parameters */
  }
          <aside className="space-y-6">
                        <div className="glass-card rounded-2xl p-6 space-y-4 shadow-md">
              <h2 className="font-display font-bold text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider">Account Credentials</h2>
              
              <div className="text-xs space-y-3">
                <div>
                  <span className="text-slate-500 block uppercase text-[9px] font-mono">Personal Email</span>
                  <span className="text-slate-800 dark:text-slate-200 block font-mono mt-0.5 select-all">{currentUser.email}</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase text-[9px] font-mono">Platform Identity ID</span>
                  <span className="text-slate-600 dark:text-slate-400 block font-mono text-[10px] sm:text-xxs mt-0.5 truncate select-all">{currentUser.id}</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase text-[9px] font-mono">Premium Protection Status</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-amber-600 dark:text-amber-500 block font-semibold">
                      {currentUser.isPremium ? "\u2605 Enabled" : "None Upgrade"}
                    </span>
                    {currentUser.role === "founder" && !currentUser.isPremium && (
                      <button
                        onClick={() => navigate("/payment")}
                        className="bg-amber-500 hover:bg-amber-600 text-white text-[10px] px-2 py-0.5 rounded font-bold transition"
                      >
                        Upgrade
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {
    /* Quick dashboard helper */
  }
            <div className="glass-card rounded-2xl p-5 text-left text-xs space-y-2.5 shadow-md">
              <p className="font-bold text-slate-900 dark:text-white">Navigate to Desk</p>
              <p className="text-slate-600 dark:text-slate-400 text-xxs leading-relaxed">
                Configure startups, view open opportunities from co-founders, or track application statuses inside your role-tailored workspace dashboard.
              </p>
              <button
    onClick={() => navigate("/dashboard")}
    className="w-full text-center bg-indigo-500/10 hover:bg-indigo-500 text-indigo-400 hover:text-white border border-indigo-500/20 py-2 rounded-lg text-xxs font-bold transition cursor-pointer flex items-center justify-center gap-0.5"
  >
                <span>Enter Workspace</span>
                <ChevronRight size={12} />
              </button>
            </div>

          </aside>

        </div>

      </div>
    </div>;
};
