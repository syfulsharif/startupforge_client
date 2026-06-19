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
  return <div className="min-h-[85vh] bg-transparent text-slate-800 dark:text-slate-200 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-grid-pattern relative">
      
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

        {
          /* Brand visual header */
        }
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold mx-auto mb-2">
            <Key size={20} />
          </div>
          <h2 className="font-display font-extrabold text-slate-900 dark:text-white text-xl sm:text-2xl">StartupForge Secure Portal</h2>
          <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-1">
            Sign in with your credentials to access the platform.
          </p>
        </div>

        {
          /* Demo Sandbox Credentials Panel */
        }
        <div className="bg-slate-50 dark:bg-slate-950/60 p-4 border border-slate-200 dark:border-slate-850 rounded-xl mb-6 space-y-3">
          <div className="flex items-center gap-1.5 text-indigo-400 text-[10px] font-bold uppercase tracking-wider font-mono">
            <Zap size={10} className="text-amber-500 fill-amber-500" />
            <span>Role-Based Sandbox Credentials</span>
          </div>
          <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed">
            Click any account below to auto-fill the login fields, then sign in:
          </p>
          <div className="space-y-2 text-xxs">
            <div 
              onClick={() => { setEmail("sarah@ecosphere.com"); setPassword("password123A"); }}
              className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer hover:border-primary/50 transition-all flex justify-between items-center"
            >
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Founder Account (Sarah)</span>
                <span className="font-mono text-slate-500">sarah@ecosphere.com</span>
              </div>
              <span className="bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 px-1.5 py-0.5 rounded font-semibold text-[9px] uppercase">Founder</span>
            </div>
            <div 
              onClick={() => { setEmail("marcus@dev.io"); setPassword("password123A"); }}
              className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer hover:border-primary/50 transition-all flex justify-between items-center"
            >
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Collaborator Account (Marcus)</span>
                <span className="font-mono text-slate-500">marcus@dev.io</span>
              </div>
              <span className="bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 px-1.5 py-0.5 rounded font-semibold text-[9px] uppercase">Collaborator</span>
            </div>
            <div 
              onClick={() => { setEmail("admin@startupforge.com"); setPassword("password123A"); }}
              className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg cursor-pointer hover:border-primary/50 transition-all flex justify-between items-center"
            >
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Admin Account (Moderator)</span>
                <span className="font-mono text-slate-500">admin@startupforge.com</span>
              </div>
              <span className="bg-amber-500/10 text-amber-500 dark:text-amber-400 px-1.5 py-0.5 rounded font-semibold text-[9px] uppercase">Admin</span>
            </div>
          </div>
          <div className="text-[9px] text-slate-500 text-center font-mono border-t border-slate-200/60 dark:border-slate-850 pt-2">
            Standard Password: <strong className="text-slate-700 dark:text-slate-300 select-all">password123A</strong>
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
