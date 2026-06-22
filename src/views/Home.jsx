import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "../context/AppContext";
import {
  Sparkles,
  ArrowRight,
  Rocket,
  Users,
  Zap,
  CheckCircle2,
  Star,
  Quote,
  Flame,
  Award
} from "lucide-react";
import { motion } from "motion/react";
export const Home = () => {
  const { startups, opportunities, currentUser } = useApp();
  const router = useRouter();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const featuredStartups = startups.filter((s) => s.status === "approved").slice(0, 3);
  const featuredOpportunities = opportunities.slice(0, 3);
  const testimonials = [
    {
      quote: "StartupForge helped me assemble a high-fidelity React framework engineer and an AI researcher in just 8 days! We completed our prototype and received Pre-Seed backing within a month.",
      name: "Marcus Aurelius",
      role: "Founder, Chronos AI",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
      rating: 5
    },
    {
      quote: "As a product designer, finding trustworthy projects with equity was quite difficult. On StartupForge, I joined EcoSphere Solutions, fell in love with their mission, and we are launching our beta next week!",
      name: "Elena Rostova",
      role: "Lead Designer, EcoSphere Solutions",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      rating: 5
    },
    {
      quote: "The interface is professional and clean, and the ability to instantly check candidate credentials and host conversations saves hours compared to standard LinkedIn crawls.",
      name: "Sarah Jenkins",
      role: "CEO, EcoSphere",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      rating: 5
    }
  ];
  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  return <div className="min-h-screen bg-transparent text-slate-900 dark:text-slate-100 flex flex-col relative bg-grid-pattern">

    {
      /* Decorative Blur Orbs */
    }
    <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-primary/20 rounded-full blur-[140px] pointer-events-none" />
    <div className="absolute top-40 right-1/4 w-[350px] h-[350px] bg-secondary/15 rounded-full blur-[120px] pointer-events-none" />

    {
      /* Hero Section */
    }
    <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center max-w-7xl mx-auto flex flex-col items-center">

      {
        /* Glow Tagline Badge */
      }
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full py-1.5 px-4 mb-6 hover:border-indigo-500/30 transition-colors"
      >
        {/* <Sparkles className="w-4 h-4 text-secondary text-amber-400" /> */}
        {/* <span className="text-xs font-semibold tracking-wide text-slate-650 dark:text-slate-300">
            The Hub of High-Growth Teams — Now in Active Sandbox Mode
          </span> */}
      </motion.div>

      {
        /* Headline */
      }
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight leading-tight max-w-4xl"
      >
        Forge Teams. <br />
        <span className="bg-gradient-to-r from-primary via-indigo-400 to-secondary bg-clip-text text-transparent">
          Build Future Startups together.
        </span>
      </motion.h1>

      {
        /* Supporting description */
      }
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed"
      >
        StartupForge is the dedicated match platform connecting visionary entrepreneurs with top-tier developers, designer experts, and growth engineers to assemble co-founding dream teams.
      </motion.p>

      {
        /* Action Buttons */
      }
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-10 flex flex-wrap justify-center gap-4"
      >
        <Link
          href="/opportunities"
          className="bg-primary hover:bg-primary/95 text-white font-medium py-3.5 px-6 rounded-lg flex items-center gap-2 shadow-lg shadow-primary/25 cursor-pointer transform hover:-translate-y-0.5 transition-all"
        >
          <span>Explore Opportunities</span>
          <ArrowRight size={16} />
        </Link>
        <Link
          href="/startups"
          className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 hover:bg-slate-200 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white font-medium py-3.5 px-6 rounded-lg transition-all"
        >
          Browse Startups
        </Link>
      </motion.div>

      {
        /* Dynamic Launch Illustration Mockup */
      }
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 w-full max-w-4xl glass-card rounded-2xl p-6 shadow-2xl relative z-10"
      >
        <div className="absolute top-3 left-4 flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500/80" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <div className="border-b border-slate-200 dark:border-slate-800/80 pb-3 mb-4 mt-1 flex justify-center text-xs text-slate-550 dark:text-slate-400 font-mono">
          Onboarding Opportunities
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="bg-white/80 dark:bg-slate-950/80 p-4 rounded-xl border border-slate-200 dark:border-slate-850">
            <span className="text-[10px] uppercase font-mono text-indigo-400 font-bold block mb-1">Active Pipeline</span>
            <p className="font-display font-bold text-lg text-slate-900 dark:text-white">Find Co-Founders</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Filter candidate lists by exact required technical skills, previous exits, and location preferences.</p>
          </div>
          <div className="bg-white/80 dark:bg-slate-950/80 p-4 rounded-xl border border-slate-200 dark:border-slate-850">
            <span className="text-[10px] uppercase font-mono text-emerald-400 font-bold block mb-1">Durable Security</span>
            <p className="font-display font-bold text-lg text-slate-900 dark:text-white">Equity & Terms</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Formalize collaborative vesting tables directly under verified regulatory legal templates.</p>
          </div>
          <div className="bg-white/80 dark:bg-slate-950/80 p-4 rounded-xl border border-slate-200 dark:border-slate-850">
            <span className="text-[10px] uppercase font-mono text-amber-500 font-bold block mb-1">Verified Growth</span>
            <p className="font-display font-bold text-lg text-slate-900 dark:text-white">Launch Fast</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">Create startup records, build open opportunities, manage applicants with clean dashboard metrics.</p>
          </div>
        </div>
      </motion.div>
    </section>

    {
      /* Startup Statistics */
    }
    <section className="bg-slate-100/60 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-850 py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="p-4">
          <p className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
            420+
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1 font-mono">Total Startups</p>
        </div>
        <div className="p-4">
          <p className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight bg-gradient-to-r from-secondary to-cyan-400 bg-clip-text text-transparent">
            1,850+
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1 font-mono">Total Founders</p>
        </div>
        <div className="p-4">
          <p className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight bg-gradient-to-r from-indigo-400 to-secondary bg-clip-text text-transparent">
            3,200+
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1 font-mono">Collaborators Joined</p>
        </div>
        <div className="p-4">
          <p className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
            890+
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1 font-mono">Opportunities Filled</p>
        </div>
      </div>
    </section>

    {
      /* Featured Startups Section */
    }
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
      <div className="flex justify-between items-end mb-10">
        <div>
          <span className="text-xs font-bold font-mono uppercase tracking-widest text-primary">Discover Builders</span>
          <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-1">Featured Startups</h2>
        </div>
        <Link href="/startups" className="text-sm font-semibold text-secondary hover:underline flex items-center gap-1">
          <span>Browse All Startups</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredStartups.map((startup) => <div
          key={startup.id}
          className="glass-card rounded-2xl p-6 hover:border-indigo-500/35 transition duration-300 flex flex-col h-full shadow-lg hover:shadow-indigo-500/5"
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl bg-slate-100 dark:bg-slate-800 p-2.5 rounded-lg w-12 h-12 flex items-center justify-center border border-slate-200 dark:border-slate-700 overflow-hidden">
              {startup.logo && startup.logo.startsWith("http") ? <img src={startup.logo} alt={startup.name} loading="lazy" decoding="async" className="w-full h-full object-cover rounded-md" /> : startup.logo}
            </span>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white truncate max-w-[180px]">{startup.name}</h3>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <span className="bg-slate-200 dark:bg-slate-800 font-mono px-2 py-0.2.5 rounded text-slate-700 dark:text-white text-[10px]">
                  {startup.industry}
                </span>
                <span>•</span>
                <span>{startup.fundingStage}</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-650 dark:text-slate-400 mt-4 line-clamp-3 leading-relaxed">
            {startup.description}
          </p>
          <div className="border-t border-slate-200 dark:border-slate-800/85 mt-auto pt-4 flex justify-between items-center text-xs">
            <div>
              <span className="text-slate-500 block">Founder</span>
              <span className="text-slate-750 dark:text-slate-300 font-semibold">{startup.founderName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-right">Seeking</span>
              <span className="text-indigo-400 font-bold">{startup.teamSizeNeeded || 1} team members</span>
            </div>
          </div>
          <Link
            href={`/startups/${startup.id}`}
            className="mt-5 text-center bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white py-2 px-4 rounded-lg text-xs font-semibold transition"
          >
            View Details
          </Link>
        </div>)}
      </div>
    </section>

    {
      /* Featured Opportunities Section */
    }
    <section className="bg-slate-100/30 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-900 px-4 py-20 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-secondary">Apply Now</span>
            <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-1">Featured Opportunities</h2>
          </div>
          <Link href="/opportunities" className="text-sm font-semibold text-secondary hover:underline flex items-center gap-1">
            <span>Explore Roles</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredOpportunities.map((opp) => <div
            key={opp.id}
            className="glass-card rounded-2xl p-6 flex flex-col justify-between hover:border-cyan-500/35 transition duration-300 shadow-md hover:shadow-cyan-500/5"
          >
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-secondary bg-cyan-950/40 text-cyan-400 border border-cyan-800/30 px-2 py-0.5 rounded-full font-bold">
                  {opp.workType}
                </span>
                <span className="text-[11px] text-slate-500 font-mono">Deadline: {opp.deadline}</span>
              </div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-base mt-3.5 leading-tight">
                {opp.title}
              </h3>
              <p className="text-xs text-slate-650 dark:text-slate-400 mt-1 hover:underline">
                <Link href={`/startups/${opp.startupId}`}>{opp.startupName}</Link>
              </p>

              {
                /* Skills tags */
              }
              <div className="flex flex-wrap gap-1.5 mt-4">
                {opp.skills.map((skill, idx) => <span key={idx} className="bg-slate-200 dark:bg-slate-800 font-mono text-[9px] px-2 py-0.5 rounded text-slate-650 dark:text-slate-300">
                  {skill}
                </span>)}
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-850 mt-6 pt-4 flex gap-4 items-center">
              <div className="flex-1">
                <p className="text-[9px] text-slate-500 uppercase font-mono">Commitment</p>
                <p className="text-xs text-slate-900 dark:text-white font-medium">{opp.commitment}</p>
              </div>
              <Link
                href={`/opportunities/${opp.id}`}
                className="bg-primary hover:bg-primary/95 text-white py-2 px-3.5 rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                Apply Now
              </Link>
            </div>
          </div>)}
        </div>
      </div>
    </section>

    {
      /* Why Join Section */
    }
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full text-center">
      <span className="text-xs font-bold font-mono uppercase tracking-widest text-primary">Unify Expertise</span>
      <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white mt-1">Why Choose StartupForge?</h2>
      <p className="text-slate-650 dark:text-slate-400 text-sm max-w-xl mx-auto mt-4 leading-relaxed">
        The core asset of an early-stage startup is team cohesion. This platform is engineered around optimal user alignment.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
        <div className="glass-card rounded-2xl p-5 hover:border-indigo-500/30 transition">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
            <Users size={18} />
          </div>
          <h3 className="font-display font-bold text-slate-900 dark:text-white text-base">Elite Collaborators</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Skip static resumes. Connect directly with designers, builders, and marketers enthusiastic for equity.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 hover:border-cyan-500/30 transition">
          <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
            <Rocket size={18} />
          </div>
          <h3 className="font-display font-bold text-slate-900 dark:text-white text-base">Accelerate Launch</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Stop waiting on venture capital to begin coding. Form a joint group of contributors and ship code immediately.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 hover:border-amber-500/30 transition">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
            <Zap size={18} />
          </div>
          <h3 className="font-display font-bold text-slate-900 dark:text-white text-base">Dynamic Matching</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Filter requirements by commitment types (equity, contract, hybrid) to ensure full motivational alignment.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-5 hover:border-emerald-500/30 transition">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
            <CheckCircle2 size={18} />
          </div>
          <h3 className="font-display font-bold text-slate-900 dark:text-white text-base">SaaS-Grade Dashboard</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Fully optimized founder panels, applicant flow review engines, and moderator platforms all preconfigured.
          </p>
        </div>
      </div>
    </section>

    {
      /* Success Stories Carousel */
    }
    <section className="bg-slate-100/40 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-900 py-20 px-4 w-full">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-xs font-bold font-mono uppercase tracking-widest text-primary flex justify-center items-center gap-1">
          <Award size={14} className="text-amber-500" /> Success Stories
        </span>
        <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white mt-1 mb-10">Shared Wins</h2>

        <div className="glass-card rounded-2xl p-8 sm:p-12 relative shadow-xl overflow-hidden">
          <Quote className="absolute top-6 left-6 text-slate-800/20 w-16 h-16 pointer-events-none" />

          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 italic relative leading-relaxed">
            "{testimonials[activeTestimonial].quote}"
          </p>

          <div className="flex flex-col items-center justify-center mt-8">
            <img
              src={testimonials[activeTestimonial].img}
              alt={testimonials[activeTestimonial].name}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary"
              referrerPolicy="no-referrer"
            />
            <p className="text-xs font-bold text-slate-900 dark:text-white mt-2 mb-0.5">{testimonials[activeTestimonial].name}</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-450 font-mono">{testimonials[activeTestimonial].role}</p>

            {
              /* Rating */
            }
            <div className="flex gap-0.5 mt-2">
              {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => <Star key={i} size={12} className="text-amber-500 fill-amber-500" />)}
            </div>
          </div>

          {
            /* Slider triggers */
          }
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => <button
              key={idx}
              onClick={() => setActiveTestimonial(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === activeTestimonial ? "bg-indigo-500 w-6" : "bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600"}`}
            />)}
          </div>
        </div>
      </div>
    </section>

    {
      /* CTA upgrade block */
    }
    <section className="bg-gradient-to-tr from-primary/10 to-indigo-950/20 border-t border-slate-200 dark:border-slate-900 text-center py-16 px-4">
      <h2 className="font-display font-extrabold text-slate-900 dark:text-white text-2xl sm:text-3xl max-w-md mx-auto leading-tight">
        Ready to scale your next big venture?
      </h2>
      <p className="text-slate-600 dark:text-slate-400 text-xs max-w-xs mx-auto mt-2 block">
        Become a premium member to secure fast validation checks and priority listings.
      </p>
      <Link
        href="/payment"
        className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-slate-950 font-bold py-3 px-6 rounded-lg text-xs"
      >
        <Flame size={14} className="fill-slate-950" />
        <span>Unlock Founder Premium Upgrade</span>
      </Link>
    </section>

  </div>;
};
