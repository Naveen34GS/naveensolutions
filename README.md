# Devmock — IT Services & Project Feasibility Platform

Devmock is a frontend prototype React application built for an IT services and software development enterprise. It features an interactive capability catalog, simulated client registration and authentication, a multi-step project evaluation wizard, a deterministic feasibility engine with indicative cost and milestone estimation, and an appointment booking system.

---

## Technical Stack

- **Framework**: React 19 + Vite (TypeScript)
- **Styling**: Tailwind CSS v4 with custom dark-navy SaaS aesthetic & design tokens
- **Routing**: React Router DOM v7 (`BrowserRouter`, `Routes`, `Route`, `Navigate`)
- **Icons**: Lucide React
- **Data Visualizations**: Recharts (`ResponsiveContainer`, `BarChart`, `Bar`, `XAxis`, `YAxis`, `Tooltip`)
- **Persistence**: Browser `LocalStorage` for authentication sessions, drafts, project dossiers, and consultation bookings

---

## Key Features

1. **Brand Identity & Landing Page (`/`)**
   - Brand tagline: *"Your Vision. Our Engineering."*
   - Hero headline: *"Your Next Big Idea. Engineered by Devmock."*
   - Categorized technical capability grid (Custom Software, Frontend, Backend, Mobile, API & Tools, DevOps & Cloud, AI & Automation, Data Engineering, QA Automation, Legacy Modernization).
   - Filter pills by engineering practice, technology tags, and illustrative use cases.

2. **Client Authentication & Protected Routing (`/login`, `/register`)**
   - Simulated LocalStorage session persistence.
   - Quick demo account selector for testing (`Rohan Sharma`, `Priya Patel`).
   - Protected route guards preserving intended destinations (e.g. redirecting after login directly into the project wizard).
   - Clear prototype notices stating authentication is local and secure for demonstrations.

3. **Client Dashboard (`/dashboard`)**
   - Welcome greetings with client organization details.
   - Overview KPI metrics: Total evaluations, likely feasible, pending clarifications, and confirmed consultations.
   - Assessment dossier history with match score indicators, target timelines, and cost ranges.
   - Upcoming consultation appointments and recommended solutions.

4. **Multi-Step Project Evaluation Wizard (`/assessment/new`)**
   - Step 1: Project title, service selection, and detailed problem description.
   - Step 2: Desired business outcomes, existing tools, third-party integrations, and conditional service-specific fields (API platforms, AI data sources, Cloud hosting).
   - Step 3: Complexity level (Small, Medium, Large, Unsure), indicative budget in INR, and delivery windows.
   - LocalStorage draft saving and recovery.

5. **Deterministic Feasibility Assessment Engine (`/src/lib/assessmentEngine.ts`)**
   - Transparent, repeatable scoring model (0–100) based on domain keywords, integration compatibility, complexity multipliers, and timeline buffers.
   - Three distinct outcomes:
     - **Likely Feasible**: Match score ≥ 75, itemized 5-phase roadmap, interactive Recharts cost chart, tech stack tags, squad roles, and risk register.
     - **Feasible With Clarifications**: Identifies architectural dependencies and missing information to confirm in discovery.
     - **Outside Current Mock Capabilities**: Transparent explanation of unsupported legacy protocols, recommended modern alternatives, and direct solutions desk escalation.

6. **Technical Consultation Booking (`/book-appointment`, `/booking-confirmation`)**
   - Fixed, configurable consultation slots in IST.
   - Duplicate-slot prevention in browser storage.
   - Meeting preference selector (Google Meet vs Direct Phone).
   - Booking reference generation (`DMK-CONS-XXXXXX`) and dashboard sync.

7. **Solutions Desk Contact Page (`/contact-sales`)**
   - Direct mock contact profile for Solutions Lead **Alex Morgan** (`sales@devmock.example`, `+91 90000 00000`).
   - Clickable `mailto:` and `tel:` links, one-click copy contact card, and inquiry submission form.

---

## Getting Started

### Prerequisites
- Node.js (version 18+ recommended)
- npm or yarn

### Installation
```bash
# Clone or navigate to the project directory
cd c:\Website

# Install dependencies
npm install

# Run the development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Building for Production
```bash
npm run build
```

---

## Prototype Scope & Limitations
- All feasibility scores, cost ranges, and durations are computed locally based on deterministic rules defined in `src/data/capabilities.ts` and `src/data/pricing.ts`.
- Authentication, drafts, and appointment reservations are saved to browser `LocalStorage`.
- No emails, SMS messages, or calendar invitations are dispatched to external servers.
