import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  Key,
  Mail,
  Eye,
  EyeOff,
  ChevronRight,
  Zap
} from "lucide-react";
export const Login = () => {
  const { login } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const from = location.state?.from || "/dashboard";
  const handleManualLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!email || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setErrorMessage(res.message || "Credentials rejected. Invalid email or password.");
    }
  };
  const handleInstantSelection = async (userId) => {
    setLoading(true);
    let targetEmail = "";
    let targetPassword = "password123A"; // Standard seeded password

    if (userId === "u-1") {
      targetEmail = "sarah@ecosphere.com";
    } else if (userId === "u-3") {
      targetEmail = "marcus@dev.io";
    } else if (userId === "u-admin") {
      targetEmail = "admin@startupforge.com";
    }

    const res = await login(targetEmail, targetPassword);
    setLoading(false);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setErrorMessage("Failed to login as preset profile. Make sure the backend server has seeded database entries.");
    }
  };
  return <div className="min-h-[85vh] bg-transparent text-slate-800 dark:text-slate-200 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-grid-pattern relative">
      
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

        {
    /* Brand visual header */
  }
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold mx-auto mb-2">
            <Key size={20} />
          </div>
          <h2 className="font-display font-extrabold text-slate-900 dark:text-white text-xl sm:text-2xl">StartupForge Secure Portal</h2>
          <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-1">
            Select an active Sandbox profile or type in credentials to proceed.
          </p>
        </div>

        {
    /* Demo Fast Login Helper Panel */
  }
        <div className="bg-slate-50 dark:bg-slate-950/60 p-4 border border-slate-200 dark:border-slate-850 rounded-xl mb-6 space-y-2.5">
          <div className="flex items-center gap-1 text-indigo-400 text-[10px] font-bold uppercase tracking-wider font-mono">
            <Zap size={10} className="text-amber-500 fill-amber-500" />
            <span>Interactive Auto-Login Helpers:</span>
          </div>
          <p className="text-[10px] text-slate-650 dark:text-slate-500 select-none">
            Skip writing profiles. Click either button below to login with presets or preconfigured rights:
          </p>
          <div className="grid grid-cols-1 gap-2">
            <button
    onClick={() => handleInstantSelection("u-1")}
    className="w-full text-left bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-880 rounded-lg p-2 text-xxs flex items-center gap-2.5 transition active:scale-98"
  >
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" alt="Sarah J" className="w-6 h-6 rounded-full object-cover" referrerPolicy="no-referrer" />
              <div className="flex-1">
                <span className="text-slate-900 dark:text-white block font-bold">Sarah Jenkins (Founder / Premium)</span>
                <span className="text-slate-600 dark:text-slate-400">Manages EcoSphere, hires programmers</span>
              </div>
            </button>
            <button
    onClick={() => handleInstantSelection("u-3")}
    className="w-full text-left bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-xxs flex items-center gap-2.5 transition active:scale-98"
  >
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150" alt="Marcus C" className="w-6 h-6 rounded-full object-cover" referrerPolicy="no-referrer" />
              <div className="flex-1">
                <span className="text-slate-900 dark:text-white block font-bold">Marcus Chen (Developer Collaborator)</span>
                <span className="text-slate-600 dark:text-slate-400">Applies to open tech jobs</span>
              </div>
            </button>
            <button
    onClick={() => handleInstantSelection("u-admin")}
    className="w-full text-left bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-xxs flex items-center gap-2.5 transition active:scale-98"
  >
              <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 text-xs text-center font-mono uppercase">AD</span>
              <div className="flex-1">
                <span className="text-slate-900 dark:text-white block font-bold">Platform Moderator (Admin User)</span>
                <span className="text-slate-600 dark:text-slate-400">Drove transactions, blocked accounts</span>
              </div>
            </button>
          </div>
        </div>

        {
    /* Regular Login Form */
  }
        <form onSubmit={handleManualLogin} className="space-y-4 text-xs text-slate-650 dark:text-slate-350">
          
          {errorMessage && <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-lg text-xxs font-medium flex items-center gap-1.5 leading-relaxed">
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full shrink-0" />
              {errorMessage}
            </div>}

          {
    /* Email segment */
  }
          <div className="space-y-1">
            <label className="text-slate-700 dark:text-slate-350 block font-semibold">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-500 w-4 h-4" />
              <input
    type="email"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="developer@example.com"
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-slate-900 dark:text-slate-200 outline-none focus:border-indigo-500 text-xs font-mono"
  />
            </div>
          </div>

          {
    /* Password box */
  }
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <label className="text-slate-700 dark:text-slate-350 font-semibold">Password</label>
              <a href="#" className="text-primary hover:underline text-xxs">Forgot password?</a>
            </div>
            <div className="relative">
              <Key className="absolute left-3 top-3 text-slate-500 w-4 h-4" />
              <input
    type={showPassword ? "text" : "password"}
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="••••••••"
    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-10 pr-10 text-slate-900 dark:text-slate-200 outline-none focus:border-indigo-500 text-xs"
  />
              <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-3 text-slate-500 hover:text-slate-350"
  >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
    type="submit"
    disabled={loading}
    className="w-full bg-primary hover:bg-primary/95 text-white py-2.5 font-bold rounded-lg transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-1 border-0"
  >
            {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <>
                <span>Sign In Securely</span>
                <ChevronRight size={14} />
              </>}
          </button>

        </form>

        <div className="border-t border-slate-200 dark:border-slate-800 bg-transparent mt-6 pt-5 flex justify-center text-xxs text-slate-500 dark:text-slate-450 gap-1.5 select-none">
          <span>New to group team building on StartupForge?</span>
          <Link to="/register" className="text-indigo-500 dark:text-indigo-400 hover:underline font-semibold">Create account &gt;</Link>
        </div>

      </div>

    </div>;
};
