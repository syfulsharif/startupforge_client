import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  Sun,
  Moon,
  Sparkles,
  User,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  UserCheck,
  Bell,
  Gem
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
export const Navbar = () => {
  const {
    theme,
    toggleTheme,
    currentUser,
    setCurrentUser,
    usersList
  } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showImpersonateDrop, setShowImpersonateDrop] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const activeLink = (path) => {
    return location.pathname === path ? "text-primary dark:text-secondary font-semibold" : "text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-secondary transition-colors";
  };
  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };
  const handleImpersonate = (userId) => {
    const targetUser = usersList.find((u) => u.id === userId);
    if (targetUser) {
      setCurrentUser(targetUser);
      setShowImpersonateDrop(false);
      navigate("/dashboard");
    }
  };
  const getRoleBadge = (role) => {
    switch (role) {
      case "founder":
        return "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30";
      case "admin":
        return "bg-amber-500/15 text-amber-400 border border-amber-500/30";
      default:
        return "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30";
    }
  };
  return <>
      <header className="sticky top-0 z-40 w-full glass-header transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {
    /* Logo */
  }
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/25 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary via-indigo-400 to-secondary bg-clip-text text-transparent dark:from-white dark:to-slate-300">
              StartupForge
            </span>
          </Link>

          {
    /* Desktop Navigation */
  }
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className={activeLink("/")}>Home</Link>
            <Link to="/startups" className={activeLink("/startups")}>Startups</Link>
            <Link to="/opportunities" className={activeLink("/opportunities")}>Opportunities</Link>
          </nav>

          {
    /* Right Side Tools */
  }
          <div className="hidden md:flex items-center gap-4">
            
            {
    /* Theme Toggle */
  }
            <button
    onClick={toggleTheme}
    className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
    title="Toggle Theme"
  >
              {theme === "dark" ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
            </button>

            {
    /* Notification drop */
  }
            {currentUser && <div className="relative">
                <button
    onClick={() => setShowNotifications(!showNotifications)}
    className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors relative"
  >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-950" />
                </button>

                <AnimatePresence>
                  {showNotifications && <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                      <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 15 }}
    className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50 text-slate-800 dark:text-slate-200"
  >
                        <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                          <span className="font-bold text-sm">Notifications</span>
                          <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900/40 text-primary dark:text-indigo-300 px-2 py-0.5 rounded-full font-semibold">2 New</span>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-64 overflow-y-auto">
                          <div className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors">
                            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">New match recommendation!</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">EcoSphere Solutions posted a new hybrid developer role matching your active profile details.</p>
                            <span className="text-[9px] text-indigo-500 mt-1 block">10 minutes ago</span>
                          </div>
                          <div className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors">
                            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">Application Approved! 🎉</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">Your pitch to join AetherAI Tech as Senior UI Specialist has been reviewed and accepted.</p>
                            <span className="text-[9px] text-emerald-500 mt-1 block">2 hours ago</span>
                          </div>
                        </div>
                      </motion.div>
                    </>}
                </AnimatePresence>
              </div>}

            {
    /* Auth Buttons */
  }
            {currentUser ? <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800">
                {
    /* Premium Badge */
  }
                {currentUser.isPremium && <Link to="/payment" className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1 py-1 px-2.5 rounded-full text-xs font-semibold tracking-wide transition-colors">
                    <Gem size={12} />
                    <span>Premium</span>
                  </Link>}
                
                {
    /* Avatar drop */
  }
                <div className="flex items-center gap-2">
                  <Link to="/profile">
                    <img
    src={currentUser.avatar}
    alt={currentUser.name}
    className="w-9 h-9 rounded-full object-cover border-2 border-indigo-500/50 hover:border-indigo-500 transition-colors"
    referrerPolicy="no-referrer"
  />
                  </Link>
                  <div className="text-left">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 max-w-[80px] truncate">{currentUser.name}</p>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded-md uppercase font-mono ${getRoleBadge(currentUser.role)}`}>
                        {currentUser.role}
                      </span>
                    </div>
                    <Link to="/dashboard" className="text-[10px] text-indigo-500 hover:underline flex items-center gap-0.5">
                      <LayoutDashboard size={10} />
                      Dashboard
                    </Link>
                  </div>
                </div>

                <button
    onClick={handleLogout}
    className="p-2 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
    title="Logout"
  >
                  <LogOut className="w-5 h-5" />
                </button>
              </div> : <div className="flex items-center gap-3">
                <Link to="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-secondary py-2 px-3 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-primary hover:bg-primary/95 text-white text-sm font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-primary/20 transition-all">
                  Register
                </Link>
              </div>}

          </div>

          {
    /* Menubar for mobile */
  }
          <div className="flex items-center md:hidden gap-3">
            <button
    onClick={toggleTheme}
    className="p-2 rounded-lg text-slate-500 dark:text-slate-400"
  >
              {theme === "dark" ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    className="p-2 text-slate-600 dark:text-slate-300"
  >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {
    /* Mobile Navigation Panel */
  }
        <AnimatePresence>
          {mobileMenuOpen && <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800"
  >
              <div className="px-4 py-3 flex flex-col gap-3">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-sm py-1 font-medium">Home</Link>
                <Link to="/startups" onClick={() => setMobileMenuOpen(false)} className="text-sm py-1 font-medium">Startups</Link>
                <Link to="/opportunities" onClick={() => setMobileMenuOpen(false)} className="text-sm py-1 font-medium">Opportunities</Link>
              </div>
              
              <div className="px-4 py-4 flex flex-col gap-3">
                {currentUser ? <>
                    <div className="flex items-center gap-3 mb-2">
                      <img
    src={currentUser.avatar}
    alt="User profile"
    className="w-10 h-10 rounded-full object-cover"
    referrerPolicy="no-referrer"
  />
                      <div>
                        <p className="font-bold text-sm text-slate-800 dark:text-slate-100">{currentUser.name}</p>
                        <p className="text-xs text-slate-400 capitalize">{currentUser.role} Account</p>
                      </div>
                    </div>
                    <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-sm text-indigo-500 py-1.5 font-medium">
                      <LayoutDashboard size={16} />
                      Go to Dashboard
                    </Link>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 py-1.5 font-medium">
                      <User size={16} />
                      My Profile
                    </Link>
                    <button
    onClick={() => {
      setMobileMenuOpen(false);
      handleLogout();
    }}
    className="flex items-center gap-2 text-sm text-rose-500 py-1.5 text-left font-medium cursor-pointer"
  >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </> : <div className="grid grid-cols-2 gap-3 pt-2">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-center py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-700 dark:text-slate-300">
                      Login
                    </Link>
                    <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="text-center py-2 bg-primary text-white rounded-lg text-sm font-medium">
                      Register
                    </Link>
                  </div>}
              </div>
            </motion.div>}
        </AnimatePresence>
      </header>
    </>;
};
