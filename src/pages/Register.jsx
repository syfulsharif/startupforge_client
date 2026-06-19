import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Eye, EyeOff, Check, X, Camera, Sparkles } from "lucide-react";
export const Register = () => {
  const { register } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("collaborator");
  const [avatar, setAvatar] = useState("https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reqLength, setReqLength] = useState(false);
  const [reqUpper, setReqUpper] = useState(false);
  const [reqLower, setReqLower] = useState(false);
  const [strengthScore, setStrengthScore] = useState(0);
  useEffect(() => {
    const hasMinLength = password.length >= 6;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    setReqLength(hasMinLength);
    setReqUpper(hasUpper);
    setReqLower(hasLower);
    let score = 0;
    if (hasMinLength) score += 1;
    if (hasUpper) score += 1;
    if (hasLower) score += 1;
    setStrengthScore(score);
  }, [password]);
  const presetAvatars = [
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
  ];
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (strengthScore < 3) return;
    setLoading(true);
    const res = await register(name, email, password, role, avatar);
    setLoading(false);
    if (res.success) {
      navigate("/dashboard");
    }
  };
  const getStrengthLabel = () => {
    switch (strengthScore) {
      case 3:
        return { text: "Excellent", color: "bg-emerald-500 text-emerald-400" };
      case 2:
        return { text: "Good", color: "bg-amber-500 text-amber-500" };
      default:
        return { text: "Weak", color: "bg-rose-500 text-rose-500" };
    }
  };
  return <div className="min-h-screen bg-transparent text-slate-800 dark:text-slate-200 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-grid-pattern relative">
      
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/15 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold mx-auto mb-2">
            <Sparkles size={18} />
          </div>
          <h2 className="font-display font-black text-xl sm:text-2xl text-slate-900 dark:text-white">Join the Forge Build-force</h2>
          <p className="text-slate-650 dark:text-slate-400 text-[11px] mt-1">
            Create an account to pitch ideas, join team squads, and formalize equity milestones.
          </p>
        </div>

        <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs text-slate-650 dark:text-slate-350">
          
          {
    /* Full Name */
  }
          <div className="space-y-1">
            <label className="text-slate-700 dark:text-slate-330 font-semibold block">Full Name</label>
            <input
    type="text"
    required
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="e.g. Elena Rostova"
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2 pl-3 text-slate-900 dark:text-slate-200 outline-none focus:border-indigo-500 text-xs"
  />
          </div>

          {
    /* Email segment */
  }
          <div className="space-y-1">
            <label className="text-slate-700 dark:text-slate-330 font-semibold block">Email Address</label>
            <input
    type="email"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="elena@rost.io"
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2 pl-3 text-slate-900 dark:text-slate-200 outline-none focus:border-indigo-500 text-xs font-mono"
  />
          </div>

          {
    /* Role Selection */
  }
          <div className="space-y-1.5">
            <label className="text-slate-700 dark:text-slate-330 font-semibold block">Account Purpose (Your Platform Role)</label>
            <div className="grid grid-cols-2 gap-3">
              <button
    type="button"
    onClick={() => setRole("collaborator")}
    className={`py-2 px-3.5 border rounded-lg text-center font-bold font-sans transition ${role === "collaborator" ? "bg-primary/10 border-primary text-white" : "bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
  >
                Collaborator / Builder
              </button>
              <button
    type="button"
    onClick={() => setRole("founder")}
    className={`py-2 px-3.5 border rounded-lg text-center font-bold font-sans transition ${role === "founder" ? "bg-primary/10 border-primary text-white" : "bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
  >
                Startup Founder / Initiator
              </button>
            </div>
          </div>

          {
    /* Preset Profile Avatars */
  }
          <div className="space-y-1">
            <label className="text-slate-700 dark:text-slate-330 font-semibold block flex items-center gap-1">
              <Camera size={13} className="text-slate-500" /> Select Sandbox Avatar
            </label>
            <div className="flex gap-3 pt-1">
              {presetAvatars.map((url, i) => <button
    key={i}
    type="button"
    onClick={() => setAvatar(url)}
    className={`w-10 h-10 rounded-full overflow-hidden border-2 transition ${avatar === url ? "ring-2 ring-indigo-500 border-slate-300 dark:border-white" : "border-transparent opacity-60 hover:opacity-100"}`}
  >
                  <img src={url} alt={`avatar-${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>)}
            </div>
          </div>

          {
    /* Password box */
  }
          <div className="space-y-1">
            <label className="text-slate-700 dark:text-slate-330 font-semibold block">Password</label>
            <div className="relative">
              <input
    type={showPassword ? "text" : "password"}
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="••••••"
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2 px-3 text-slate-900 dark:text-slate-205 outline-none focus:border-indigo-500 text-xs"
  />
              <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-350"
  >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>

            {
    /* Password strength visual meter */
  }
            <div className="space-y-1 mt-2.5">
              <div className="flex justify-between items-center text-[10px] text-slate-600 dark:text-slate-400">
                <span>Password Strength Checklist:</span>
                <span className={`font-semibold ${getStrengthLabel().color}`}>{getStrengthLabel().text}</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 h-1">
                <div className={`h-full rounded ${strengthScore >= 1 ? "bg-rose-500" : "bg-slate-200 dark:bg-slate-800"}`} />
                <div className={`h-full rounded ${strengthScore >= 2 ? "bg-amber-500" : "bg-slate-200 dark:bg-slate-800"}`} />
                <div className={`h-full rounded ${strengthScore >= 3 ? "bg-emerald-500" : "bg-slate-200 dark:bg-slate-800"}`} />
              </div>
            </div>

            {
    /* Checklists items */
  }
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-[10px] mt-2 bg-slate-50 dark:bg-slate-950/40 p-2 border border-slate-205/65 border-slate-200 dark:border-slate-850/60 rounded-lg select-none">
              <span className={`flex items-center gap-1 ${reqLength ? "text-emerald-500 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"}`}>
                {reqLength ? <Check size={11} /> : <X size={11} />} Min 6 Chars
              </span>
              <span className={`flex items-center gap-1 ${reqUpper ? "text-emerald-500 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"}`}>
                {reqUpper ? <Check size={11} /> : <X size={11} />} 1 Uppercase
              </span>
              <span className={`flex items-center gap-1 ${reqLower ? "text-emerald-500 dark:text-emerald-400" : "text-slate-500 dark:text-slate-400"}`}>
                {reqLower ? <Check size={11} /> : <X size={11} />} 1 Lowercase
              </span>
            </div>
          </div>

          <button
    type="submit"
    disabled={loading || strengthScore < 3}
    className="w-full bg-primary hover:bg-primary/95 text-white py-2.5 font-bold rounded-lg transition-all shadow-lg shadow-primary/15 flex items-center justify-center gap-1 border-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
  >
            {loading ? <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <span>Create Account Profile</span>}
          </button>

        </form>

        <div className="border-t border-slate-200 dark:border-slate-800 mt-6 pt-5 flex justify-center text-xxs text-slate-500 dark:text-slate-455 dark:text-slate-450 gap-1 select-none">
          <span>Already registered?</span>
          <Link to="/login" className="text-cyan-500 dark:text-cyan-400 hover:underline">Sign In portal &gt;</Link>
        </div>

      </div>

    </div>;
};
