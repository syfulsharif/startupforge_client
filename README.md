# StartupForge — Startup Team Builder Platform (Client)

Welcome to the frontend client repository for **StartupForge**, a comprehensive full-stack SaaS platform designed for startup founders to showcase their ideas, build co-founding teams, and recruit collaborators. Developers, designers, marketers, and other professionals can search and apply to join early-stage startups.

🚀 **Live Deployment**: [Vercel Deployment Link](https://startupforge-client.vercel.app) *(or your deployed domain)*  
🎨 **Technology Stack**: React 19, React Router (HashRouter), Tailwind CSS, Framer Motion/Motion, Recharts, Lucide Icons.

---

## 📖 Table of Contents
- [Features](#-features)
- [Project Layout & Navigation](#-project-layout--navigation)
- [Design Aesthetics](#-design-aesthetics)
- [Installation and Local Setup](#-installation-and-local-setup)
- [Environment Variables](#-environment-variables)
- [Assignment Criteria Validation Checklist](#-assignment-criteria-validation-checklist)

---

## ⚡ Features

### 👤 User Roles & Dashboard Experience
- **Founder**:
  - Create and manage a Startup profile (including logo file upload).
  - Post and manage job/collaboration opportunity vacancies.
  - Review collaborator pitch applications, including approving or rejecting candidates.
  - Premium Founder billing: purchase premium packages via **Stripe Checkout** to bypass the free listing limit (3 opportunities).
- **Collaborator**:
  - Maintain a professional collaborator CV profile (bio, tool stacks, experience).
  - Search, filter, and apply for opportunities with a motivation pitch & portfolio link.
  - Track the status of application pitches in real-time.
- **Admin**:
  - Platform-wide overview statistics (users, startups, opportunities, revenue metrics).
  - Manage accounts: block/unblock users.
  - Moderate startups: approve or remove startup profiles.
  - Audit transactions: view a ledger of payments processed on Stripe.

### 🔍 Advanced Search, Filtering, and Pagination
- Server-side text-based search (using MongoDB regex indexes) matching role title and required skills.
- Multi-faceted filter options for Work Type (Remote, Onsite, Hybrid) and Industry matching.
- Native paginated listings for smooth and optimized content browsing.

### 🔒 Secure Auth Integration
- JWT-based persistent sessions with authentication cookies/tokens.
- Credentials and Google OAuth simulated sign-in.
- Automatic routing redirects for unauthorized routes.

---

## 📁 Project Layout & Navigation

```bash
starupforge_frontend/
├── public/                 # Static assets
├── src/
│   ├── context/
│   │   └── AppContext.jsx  # Global application context (State & API Methods)
│   ├── data/
│   │   └── mockData.js     # Standby seed/mock data
│   ├── layouts/
│   │   ├── Navbar.jsx      # Navigation bar (collapsible & responsive)
│   │   └── Footer.jsx      # Sticky branding footer
│   ├── pages/
│   │   ├── Home.jsx        # Landing page with banner & featured grids
│   │   ├── BrowseStartups.jsx      # Searchable startup cards
│   │   ├── BrowseOpportunities.jsx # Filterable job openings
│   │   ├── OpportunityDetails.jsx  # Pitch submission page
│   │   ├── StartupDetails.jsx      # Startup info profile
│   │   ├── Login.jsx       # Auth login page
│   │   ├── Register.jsx    # User registration page
│   │   ├── Dashboard.jsx   # Tabbed dashboards for Founder, Collaborator & Admin
│   │   ├── Profile.jsx     # Profile updates
│   │   ├── Payment.jsx     # Stripe success/cancel callback handler
│   │   └── NotFound.jsx    # Custom 404 page with illustration
│   ├── App.jsx             # Main Router structure
│   ├── index.css           # Tailwind configuration & global CSS variables
│   └── main.jsx            # React root mount point
```

---

## 🎨 Design Aesthetics
- **Dark Cosmic Theme**: A sleek, dark-slate background (`bg-slate-950`) combined with glowing indigo, purple, and cyan glassmorphism elements.
- **Responsive & Dynamic**: Fully optimized layouts from mobile up to widescreen desktop resolutions.
- **Micro-interactions**: Hover scaling, smooth transition durations, and Framer Motion layout animations for a premium SaaS feel.
- **Recharts Charts**: Interactive graphical reports showing platform asset proportions on the Admin and Founder dashboards.

---

## 🛠️ Installation and Local Setup

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:syfulsharif/startupforge_client.git
   cd starupforge_frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory (see the [Environment Variables](#-environment-variables) section below).

4. **Launch Local Development Server**:
   ```bash
   npm run dev
   ```
   The client will be running at `http://localhost:3000`.

---

## 🔑 Environment Variables

To connect to your local backend API, define the following variables in a `.env` file in the root directory:

```env
# The URL pointing to the StartupForge Express Backend API
VITE_API_URL="http://localhost:5000/api"
```

---

## ✅ Assignment Criteria Validation Checklist

- [x] **20+ Client Commits**: Satisfied with structured Git commits history.
- [x] **Secure Auth Configuration**: Handled through protected routes and JWT.
- [x] **Fully Responsive Layouts**: Tested on Mobile, Tablet, and Desktop.
- [x] **No Route Reload Issues**: Solved via `HashRouter` to prevent server-side 404s.
- [x] **Search & Filter**: Implemented regex text-based search and filters.
- [x] **Payment System Integration**: Integrated Stripe Checkout with automated callback redirects.
- [x] **Custom 404 Page**: Completed custom layout featuring interactive illustrations.
