# Rajpriya

**Nearby Services. Easy Booking. Student Friendly.**

Rajpriya is a modern, mobile-first local service discovery and booking web application designed for **DGU / DBS Global University MBA students** living in hostels around **Raipur Road, Dehradun**, who do not have personal vehicles.

> **Prototype Disclaimer:** All local service providers featured in this MVP (QuickWash Laundry, FreshBite Tiffin, Student Salon, Campus Print Hub, DailyNeeds Grocery, QuickFix Repair, CarePlus Pharmacy, and SparkleRoom Hostel Cleaning) are fictional sample businesses created to demonstrate the user experience and validate the MVP hypothesis during entrepreneurship evaluation.

---

## Problem & Value Proposition

- **Main Problem:** Students living in hostels around Raipur Road without personal transportation struggle to discover reliable, affordable local services and waste valuable time searching across disconnected shops.
- **Target Users:** DGU / DBS Global University MBA students staying in hostels and PGs along Raipur Road.
- **Value Proposition:** Discover trusted nearby services in one place, compare transparent student-friendly prices, and confirm pickup/delivery or walk-in slots in seconds—saving time, money, and travel effort.
- **Core MVP Assumption:** *"DGU students living around Raipur Road are willing to use Rajpriya to discover and book affordable nearby services."*
- **Core Success Metric:** Total number of successful service bookings made by students (tracked live on the Home and Profile screens).

---

## Screens & Features

| Screen | Key Capabilities |
| :--- | :--- |
| **1. Home Page** | Rajpriya branding & tagline, **Raipur Road** location selector, live search bar (*“What service do you need?”*), 8 service category shortcuts, live **Successful Bookings Tracked** counter, *Popular Near You*, and *Recommended for Students*. |
| **2. Explore (Service Discovery)** | Full-text search plus filters for **Category**, **Distance**, **Starting Price**, **Minimum Rating**, **Availability** (Open now / Hostel pickup & delivery), and sort order. |
| **3. Service Details** | Business details, location & walking distance, availability hours, estimated turnaround time, contact info, selectable **Services Offered** pricing menu, bookmark toggle, and sticky **Book Now** panel. |
| **4. Booking Form** | Simple pay-on-completion booking form: provider & package selector, date presets/picker, time slot selector, auto-filled student name/phone/hostel, special instructions, and estimated total. |
| **5. Booking Confirmation** | Displays **“Booking Confirmed!”**, unique Booking ID (e.g., `RJP-2026-4812`), service details, date & time, hostel location, estimated price, booking status, and quick **View Booking** navigation. |
| **6. My Bookings** | Filterable active and past bookings across **Confirmed**, **In Progress**, **Completed**, and **Cancelled** statuses, with inline cancellation, a **Mark Completed** demo helper, **Rate & Review**, and **Book Again**. |
| **7. Profile** | Editable student profile (name, phone, hostel/location), **My Bookings** summary, **Saved Services** list, **Help & Support** desk with working inquiry submission, and a **Reset Demo Data** button for live walkthroughs. |
| **8. Reviews & Ratings** | Interactive 1–5 star selector and short review form on every service page that immediately updates average ratings and review counts. |

### Sample Local Services Included
- **QuickWash Laundry** — Laundry (180m · from ₹49/kg)
- **FreshBite Tiffin** — Food & Tiffin (250m · from ₹80/meal)
- **Campus Print Hub** — Printing & Stationery (150m · from ₹30/pack)
- **Student Salon** — Salon & Beauty (320m · from ₹120)
- **DailyNeeds Grocery** — Grocery (210m · from ₹99)
- **CarePlus Pharmacy** — Pharmacy (290m · from ₹50)
- **QuickFix Repair** — Repair Services (450m · from ₹149)
- **SparkleRoom Hostel Cleaning** — Cleaning (380m · from ₹199)

All bookings, reviews, saved services, profile edits, and support inquiries are automatically persisted in browser `localStorage`.

---

## Tech Stack

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons:** Lucide React
- **Typography:** Bricolage Grotesque & Plus Jakarta Sans (Google Fonts)

---

## Project Structure

```text
rajpriya/
├── index.html                   # HTML entry point, metadata, and Google Fonts
├── package.json                 # Dependencies and npm scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration (bundles & copies local assets)
├── vercel.json                  # Vercel SPA build & routing configuration
├── metadata.json                # Application metadata
├── .env.example                 # Optional environment template (no keys required)
├── .gitignore                   # Ignored files (node_modules, dist, .env*, .vercel)
└── src/
    ├── main.tsx                 # React root mount
    ├── App.tsx                  # Screen navigation, state management, & localStorage sync
    ├── index.css                # Tailwind CSS v4 import & base styles
    ├── types.ts                 # TypeScript enums & interfaces
    ├── data/
    │   └── sampleServices.ts    # Sample Raipur Road providers, initial bookings, & hostels
    ├── assets/
    │   └── images/              # Bundled hero and service photography
    └── components/
        ├── Navbar.tsx
        ├── HomePage.tsx
        ├── ExplorePage.tsx
        ├── ServiceCard.tsx
        ├── ServiceDetailsPage.tsx
        ├── BookingPage.tsx
        ├── BookingConfirmationPage.tsx
        ├── MyBookingsPage.tsx
        ├── ProfilePage.tsx
        ├── CategoryIcon.tsx
        └── ServiceImage.tsx
```

---

## Prerequisites

Before running the project locally, make sure you have installed:
- **Node.js** `v18.0.0` or higher (`v20+` LTS recommended) — [Download Node.js](https://nodejs.org/)
- **npm** `v9.0.0` or higher (included automatically with Node.js)

Verify your installation in a terminal:
```bash
node -v
npm -v
```

---

## Installation Instructions

1. **Clone the repository** (or extract your downloaded ZIP folder):
   ```bash
   git clone https://github.com/<YOUR_USERNAME>/rajpriya.git
   cd rajpriya
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

> **Note:** No API keys, database setup, or `.env` configuration are required to run Rajpriya.

---

## Local Development Instructions

Start the local Vite development server:
```bash
npm run dev
```

Once started, open your browser and visit:
```text
http://localhost:3000
```

### Additional Useful Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the local development server on port `3000`. |
| `npm run lint` | Runs TypeScript type-checking (`tsc --noEmit`) with zero output if clean. |
| `npm run build` | Builds the optimized production bundle into `dist/` and copies image assets. |
| `npm run preview` | Serves the production `dist/` build locally to test before deploying. |

---

## Deploying to Vercel

This project includes a pre-configured `vercel.json` file so Vercel automatically builds the Vite app and serves all pages and local images properly.

### Option 1: Deploy via the Vercel Dashboard (Recommended)

1. **Push your code to GitHub:**
   - Create a new public repository on [github.com/new](https://github.com/new) named `rajpriya`.
   - From inside your project folder, run:
     ```bash
     git init
     git add .
     git commit -m "Initial commit: Rajpriya MVP"
     git branch -M main
     git remote add origin https://github.com/<YOUR_USERNAME>/rajpriya.git
     git push -u origin main
     ```

2. **Import the repository in Vercel:**
   - Sign in to [vercel.com](https://vercel.com) using your GitHub account.
   - Click **Add New → Project**.
   - Find and click **Import** next to your `rajpriya` repository.

3. **Verify build settings:**
   Vercel auto-detects these settings from `vercel.json` and `package.json`:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. **Environment Variables:**
   - Leave this section empty—Rajpriya does not require any secrets or API keys.

5. **Click Deploy:**
   - Wait ~30–60 seconds for the build to finish.
   - Vercel will publish your app to a live public HTTPS URL (e.g., `https://rajpriya.vercel.app`).
   - Every future push to the `main` branch on GitHub will automatically trigger a fresh deployment.

---

### Option 2: Deploy via Vercel CLI

If you prefer deploying directly from your terminal:

1. **Install the Vercel CLI globally:**
   ```bash
   npm install -g vercel
   ```

2. **Log in to your Vercel account:**
   ```bash
   vercel login
   ```

3. **Deploy to production:**
   ```bash
   vercel --prod
   ```
   Accept the default prompts (Framework: Vite, Output Directory: `dist`) and Vercel will output your live deployment URL.

---

## Demo Walkthrough Tip

During a live MBA presentation, if you want to restore the initial sample bookings, ratings, and profile back to a fresh state between demos, open the **Profile** tab and click **Reset Demo Data**.

---

## License

Created for MBA Entrepreneurship & Innovation evaluation (DGU / DBS Global University prototype).
