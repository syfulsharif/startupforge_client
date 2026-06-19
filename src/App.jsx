import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { Navbar } from "./layouts/Navbar";
import { Footer } from "./layouts/Footer";
import { Home } from "./pages/Home";
import { BrowseStartups } from "./pages/BrowseStartups";
import { StartupDetails } from "./pages/StartupDetails";
import { BrowseOpportunities } from "./pages/BrowseOpportunities";
import { OpportunityDetails } from "./pages/OpportunityDetails";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Profile } from "./pages/Profile";
import { Payment } from "./pages/Payment";
import { NotFound } from "./pages/NotFound";
export default function App() {
  return <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 relative overflow-hidden">
          
          {
    /* Decorative Frosted Glass Orbs */
  }
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none z-0" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none z-0" />
          <div className="absolute top-[40%] left-[80%] w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none z-0" />

          {
    /* Navigation Bar */
  }
          <div className="relative z-10">
            <Navbar />
          </div>

          {
    /* Core Route Routing */
  }
          <main className="flex-grow flex flex-col relative z-100">
            <Routes>
              {
    /* Public Routes */
  }
              <Route path="/" element={<Home />} />
              <Route path="/startups" element={<BrowseStartups />} />
              <Route path="/startups/:id" element={<StartupDetails />} />
              <Route path="/opportunities" element={<BrowseOpportunities />} />
              <Route path="/opportunities/:id" element={<OpportunityDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {
    /* Protected / Dashboard Routes */
  }
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/payment" element={<Payment />} />

              {
    /* fallback 404 Route */
  }
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {
    /* Fluid footer parameters */
  }
          <Footer />

        </div>
      </Router>
    </AppProvider>;
}
