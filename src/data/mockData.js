export const mockUsers = [
  {
    id: "u-1",
    name: "Sarah Jenkins",
    email: "sarah@ecosphere.io",
    role: "founder",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    bio: "Serial entrepreneur focused on sustainable development and carbon capture technologies. Previously built and sold GreenLogistics.",
    skills: ["Product Strategy", "Sustainability", "Venture Capital", "Public Speaking"],
    experience: "8+ years as a startup founder and Product Director.",
    isPremium: true,
    status: "active"
  },
  {
    id: "u-2",
    name: "Alex Rivera",
    email: "alex@aetherai.tech",
    role: "founder",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    bio: "AI researcher and server engineer. building prompt orchestration for next-gen enterprises. Passionate about beautiful developer tools.",
    skills: ["Machine Learning", "Node.js", "PyTorch", "Distributed Systems"],
    experience: "6 years as Senior DevOps and Research Scientist at top tech firms.",
    isPremium: false,
    status: "active"
  },
  {
    id: "u-3",
    name: "Marcus Chen",
    email: "marcus.chen@gmail.com",
    role: "collaborator",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    bio: "Passionate Full Stack Developer specializing in React, TypeScript, and Node.js. Love building clean, interactive UIs.",
    skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Next.js", "Framer Motion"],
    experience: "4 years of experience as a software engineer at a mid-sized SaaS company.",
    isPremium: false,
    status: "active"
  },
  {
    id: "u-4",
    name: "Elena Rostova",
    email: "elena.rost@design.com",
    role: "collaborator",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    bio: "Senior UX/UI Designer obsessed with typographic discipline and minimalist aesthetic grids. Active contributor to open-source UI libraries.",
    skills: ["Framer", "Product Design", "UI/UX", "Figma", "Prototyping", "Design Systems"],
    experience: "5 years crafting enterprise B2B layouts and digital consumer experiences.",
    isPremium: false,
    status: "active"
  },
  {
    id: "u-5",
    name: "David Kojo",
    email: "david.kojo@growth.io",
    role: "collaborator",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
    bio: "Growth Marketer expert in SEO, paid acquisition, and viral loops. Enthusiastic about early stage startups and indie hacking communities.",
    skills: ["SEO", "Content Marketing", "Google Analytics", "Growth Hacking", "Copywriting"],
    experience: "3 years in startup scaling, helping series A startups grow from 10k to 1M users.",
    isPremium: false,
    status: "active"
  },
  {
    id: "u-admin",
    name: "Platform Moderator",
    email: "admin@startupforge.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
    bio: "StartupForge main developer and workspace administrator supervising community quality controls.",
    skills: ["System Operations", "Database Audit", "Community Supervision"],
    experience: "Developer of StartupForge",
    isPremium: true,
    status: "active"
  }
];
export const mockStartups = [
  {
    id: "s-1",
    name: "EcoSphere Solutions",
    logo: "\u{1F331}",
    description: "A platform to democratize voluntary carbon credits. We connect certified local forestry projects with climate-conscious businesses to automate carbon offsetting via clean serverless APIs.",
    industry: "Greentech",
    fundingStage: "Seed",
    founderId: "u-1",
    founderName: "Sarah Jenkins",
    teamSizeNeeded: 3,
    location: "San Francisco, CA (Hybrid)",
    website: "https://ecosphere.io",
    createdDate: "2026-02-15",
    pitch: "Carbon offsetting is broken. Over 70% of companies want to neutralize their operational footprint, but auditing carbon offset accuracy takes months. EcoSphere automates compliance. Using decentralized sensor telemetry and satellite imagery API mapping, we guarantee climate credit performance. We have signed letters of intent with five leading tech enterprises and are preparing our public Beta launch next quarter.",
    status: "approved"
  },
  {
    id: "s-2",
    name: "AetherAI Tech",
    logo: "\u26A1",
    description: "High-performance prompt management pipelines and latency-optimized routing engines for enterprise LLM workloads.",
    industry: "Artificial Intelligence",
    fundingStage: "Pre-seed",
    founderId: "u-2",
    founderName: "Alex Rivera",
    teamSizeNeeded: 2,
    location: "Remote",
    website: "https://aetherai.tech",
    createdDate: "2026-04-10",
    pitch: "Building LLM features in production gets expensive and sluggish. AetherAI acts as an edge router wrapper. It detects semantic redundancy, caches recurrent request outputs, and dynamically forwards client queries to the cheapest, fastest model instance (Gemini, Claude, GPT) depending on latency budgets. We currently route over 4 million requests per week for developer testbeds.",
    status: "approved"
  },
  {
    id: "s-3",
    name: "FitPulse Wearables",
    logo: "\u231A",
    description: "IoMT health metrics tracking integrated with custom patient-doctor feedback dashboards designed for cardiac rehab monitoring in real-time.",
    industry: "Medtech",
    fundingStage: "Series A",
    founderId: "u-1",
    founderName: "Sarah Jenkins",
    teamSizeNeeded: 1,
    location: "Boston, MA (Onsite)",
    website: "https://fitpulse-health.com",
    createdDate: "2025-11-20",
    pitch: "Continuous postoperative cardiac tracking saves lives. FitPulse manufactures lightweight clinical-grade bands that sync heart rate variability, SpO2, and respiratory rhythm straight to cloud patient files. Doctors receive unified, high-integrity graphs and smart alarms if trends degrade.",
    status: "approved"
  },
  {
    id: "s-4",
    name: "DevFlow Diagnostics",
    logo: "\u{1F6E0}\uFE0F",
    description: "Low-latency CPU profiling tools and system telemetry visualizers for Rust and multi-threaded systems development.",
    industry: "Developer Tools",
    fundingStage: "Bootstrapped",
    founderId: "u-2",
    founderName: "Alex Rivera",
    teamSizeNeeded: 4,
    location: "Remote",
    website: "https://devflow.dev",
    createdDate: "2026-05-01",
    pitch: "We built DevFlow because debugging complex multi-threaded concurrency locks in raw terminal systems is painful. DevFlow gives developers a real-time web workspace showing task dependencies, clock counts, and memory leaks as clear visual timelines. Extremely fast, lightweight, and setup in under two minutes.",
    status: "pending"
  }
];
export const mockOpportunities = [
  {
    id: "op-1",
    startupId: "s-1",
    startupName: "EcoSphere Solutions",
    title: "Lead Frontend Developer (React/TS)",
    skills: ["React", "TypeScript", "Tailwind CSS", "Recharts"],
    workType: "Hybrid",
    commitment: "Full-time",
    deadline: "2026-07-15",
    description: "Looking for a technical frontend leader to own the carbon credit bidding dashboard. You will craft responsive buyer panels, configure complex charting modules using Recharts, and design fluid transaction interfaces.",
    salaryRange: "$120k - $145k + 0.8% Equity",
    createdDate: "2026-06-01"
  },
  {
    id: "op-2",
    startupId: "s-1",
    startupName: "EcoSphere Solutions",
    title: "Product Marketing Manager",
    skills: ["Content Marketing", "SEO", "Launch Strategy", "SaaS Branding"],
    workType: "Remote",
    commitment: "Part-time",
    deadline: "2026-07-20",
    description: "We need an experienced marketer to translate voluntary carbon credit solutions into engaging enterprise campaigns. You will coordinate product launches, direct content SEO, and collaborate on pitch documents.",
    salaryRange: "$50/hr - $75/hr or 1.2% Equity",
    createdDate: "2026-06-05"
  },
  {
    id: "op-3",
    startupId: "s-2",
    startupName: "AetherAI Tech",
    title: "Senior UI/UX Designer",
    skills: ["Figma", "UI/UX", "Design Systems", "Prototyping"],
    workType: "Remote",
    commitment: "Contract",
    deadline: "2026-07-30",
    description: "Seeking a design wizard to model our system dashboards, playground panels, and documentation pages. You appreciate whitespace, high typographic precision, and consistent dark themes.",
    salaryRange: "$80/hr - $110/hr",
    createdDate: "2026-06-10"
  },
  {
    id: "op-4",
    startupId: "s-2",
    startupName: "AetherAI Tech",
    title: "ML Infrastucture Engineer",
    skills: ["Machine Learning", "PyTorch", "Rust", "Docker"],
    workType: "Remote",
    commitment: "Full-time",
    deadline: "2026-08-01",
    description: "Join us to optimize prompt delivery routing queues and establish latency benchmarks for our enterprise integrations.",
    salaryRange: "$140k - $170k + 1.5% Equity",
    createdDate: "2026-06-12"
  },
  {
    id: "op-5",
    startupId: "s-3",
    startupName: "FitPulse Wearables",
    title: "Embedded Firmware Developer",
    skills: ["C", "C++", "Bluetooth LE", "RTOS"],
    workType: "Onsite",
    commitment: "Full-time",
    deadline: "2026-07-25",
    description: "In collaboration with hardware production teams, you will develop, optimize and test power-efficient sensor communication loops on Nordic BLE microcontrollers.",
    salaryRange: "$110k - $130k + 0.5% Equity",
    createdDate: "2026-06-08"
  },
  {
    id: "op-6",
    startupId: "s-4",
    startupName: "DevFlow Diagnostics",
    title: "Rust Telemetry Architect",
    skills: ["Rust", "Systems Programming", "WASM"],
    workType: "Remote",
    commitment: "Equity Only",
    deadline: "2026-08-10",
    description: "Looking for a co-founder-level partner to design our multi-threaded telemetry agent and package it as high-performance WASM binaries.",
    salaryRange: "Equity: 10% - 25% Board Seat",
    createdDate: "2026-06-15"
  }
];
export const mockApplications = [
  {
    id: "app-1",
    opportunityId: "op-1",
    opportunityTitle: "Lead Frontend Developer (React/TS)",
    startupId: "s-1",
    startupName: "EcoSphere Solutions",
    applicantId: "u-3",
    applicantName: "Marcus Chen",
    applicantEmail: "marcus.chen@gmail.com",
    applicantBio: "Senior React builder proficient in high-throughput enterprise charts and interactive vector models.",
    applicantSkills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    applicantPortfolio: "https://marcuschen.dev",
    status: "Pending",
    appliedDate: "2026-06-16"
  },
  {
    id: "app-2",
    opportunityId: "op-3",
    opportunityTitle: "Senior UI/UX Designer",
    startupId: "s-2",
    startupName: "AetherAI Tech",
    applicantId: "u-4",
    applicantName: "Elena Rostova",
    applicantEmail: "elena.rost@design.com",
    applicantBio: "Obsessed with dark layout symmetry, clean micro-interactions, and functional whitespace systems.",
    applicantSkills: ["Figma", "UI/UX", "Design Systems"],
    applicantPortfolio: "https://elenarostova.myportfolio.com",
    status: "Accepted",
    appliedDate: "2026-06-14"
  },
  {
    id: "app-3",
    opportunityId: "op-2",
    opportunityTitle: "Product Marketing Manager",
    startupId: "s-1",
    startupName: "EcoSphere Solutions",
    applicantId: "u-5",
    applicantName: "David Kojo",
    applicantEmail: "david.kojo@growth.io",
    applicantBio: "Proven record scaling developer platforms from beta up to 100k active accounts.",
    applicantSkills: ["SEO", "Content Marketing", "Google Analytics"],
    applicantPortfolio: "https://davidkojo.growth.io",
    status: "Rejected",
    appliedDate: "2026-06-10"
  }
];
export const mockPayments = [
  {
    id: "p-1",
    userId: "u-1",
    userName: "Sarah Jenkins",
    amount: 149,
    planName: "Founder Premium (Annual)",
    transactionId: "TXN-9823120-SF",
    date: "2026-05-12",
    status: "Success"
  },
  {
    id: "p-2",
    userId: "u-2",
    userName: "Alex Rivera",
    amount: 29,
    planName: "Founder Monthly Boost",
    transactionId: "TXN-3829103-SF",
    date: "2026-06-10",
    status: "Success"
  }
];
