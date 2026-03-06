# Amago - SaaS Dashboard

A modern, responsive SaaS dashboard application built with React, TypeScript, and Vite. Amago is designed to manage campaigns, jobs, and provides comprehensive analytics through an intuitive user interface.

##  Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Architecture](#architecture)
- [Components](#components)
- [State Management](#state-management)
- [Services](#services)
- [Utilities](#utilities)
- [Contributing](#contributing)

##  Features

- **Dashboard Analytics**: Visual representation of campaigns and jobs with charts
- **Campaign Management**: Create, view, and manage marketing campaigns
- **Job Management**: Track and manage job statuses (pending, processing, completed, failed)
- **Search Functionality**: Quick search across campaigns and jobs
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Notifications**: Toast notifications for user feedback
- **Pagination**: Efficient data handling with pagination support
- **State Management**: Centralized state management using Redux Toolkit
- **Type Safety**: Full TypeScript support for improved code quality

##  Tech Stack

### Core Framework
- **React** 19.2.0 - UI library
- **TypeScript** 5.9.3 - Type safety and development experience
- **Vite** 7.3.1 - Fast build tool and dev server

### State Management
- **Redux Toolkit** 2.11.2 - State management
- **React Redux** 9.2.0 - React bindings for Redux

### Routing & Navigation
- **React Router DOM** 7.13.1 - Client-side routing

### UI & Styling
- **Tailwind CSS** 4.2.1 - Utility-first CSS framework
- **Recharts** 3.7.0 - Composable charting library
- **React Icons** 5.6.0 - Icon library
- **React Hot Toast** 2.6.0 - Toast notifications

### Development Tools
- **ESLint** 9.39.1 - Code linting
- **TypeScript ESLint** 8.48.0 - TypeScript linting

##  Project Structure

```
amago/
├── src/
│   ├── components/           # React components
│   │   ├── builders/        # Reusable UI components (Button, Input, Label, etc.)
│   │   ├── campaigns/       # Campaign-related components
│   │   ├── dashboard/       # Dashboard page
│   │   ├── header/          # Header component
│   │   ├── jobs/            # Job-related components
│   │   ├── search/          # Search modal
│   │   ├── sidebar/         # Sidebar navigation
│   │   └── Layout.tsx       # Main layout wrapper
│   ├── features/             # Redux slices
│   │   ├── globalSlice.ts   # Global state (loading, errors)
│   │   ├── companySlice.ts  # Company state
│   │   └── jobSlice.ts      # Job state
│   ├── hooks/                # Custom React hooks
│   │   ├── hooks.ts         # Redux hooks (useAppDispatch, useAppSelector)
│   │   └── useDebounce.ts   # Debounce hook
│   ├── mock/                 # Mock data
│   │   ├── campaigns.ts     # Campaign mock data
│   │   ├── jobs.ts          # Job mock data
│   │   └── jobTypes.ts      # Job type definitions
│   ├── routes/               # Routing configuration
│   │   └── routes.tsx       # Route definitions
│   ├── services/             # Service layer
│   │   ├── campaignService.ts   # Campaign API service
│   │   └── jobService.ts        # Job API service
│   ├── store/                # Redux store
│   │   └── store.ts         # Store configuration
│   ├── styles/               # Global styles
│   │   └── style.css        # Global CSS
│   ├── utils/                # Utility functions
│   │   ├── delay.ts         # Simulated delay utility
│   │   ├── pagination.ts    # Pagination logic
│   │   └── randomFail.ts    # Simulated failure utility
│   ├── App.tsx              # App root component
│   └── main.tsx             # Application entry point
├── public/                   # Static assets
├── index.html               # HTML entry point
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── eslint.config.js         # ESLint configuration
```

##  Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd amago
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173` (or the port specified by Vite).

##  Available Scripts

- **`npm run dev`** - Start the development server with hot module replacement
- **`npm run build`** - Build the application for production
- **`npm run lint`** - Run ESLint to check code quality
- **`npm run preview`** - Preview the production build locally

## Architecture

### Component Architecture
The application follows a hierarchical component structure:
- **Layout** - Main wrapper component with sidebar and header
- **Page Components** - Dashboard, Campaigns, Jobs (rendered via React Router)
- **Reusable Builders** - Button, Input, Label, Loader, Table components
- **Feature Modules** - Campaigns, Jobs, Search, Header components

### Data Flow
```
Components → Redux Actions → Redux Reducers → Global State
Components → Services → Mock Data
Services → Utils (pagination, delays, error simulation)
```

##  Components

### Layout Components
- **Layout.tsx** - Main layout with responsive sidebar and header
- **Header.tsx** - Top navigation bar with search functionality
- **SideBar.tsx** - Navigation sidebar with menu items

### Page Components
- **Dashboard.tsx** - Analytics dashboard with charts and statistics
- **Campaigns.tsx** - Campaign listing and management
- **Jobs.tsx** - Job listing and status tracking

### Builder Components (Reusable UI)
- **Button.tsx** - Customizable button component
- **Input.tsx** - Text input component
- **Label.tsx** - Label component
- **Loader.tsx** - Loading spinner
- **Table.tsx** - Data table component

### Modal Components
- **AddCampaignModal.tsx** - Modal for adding new campaigns
- **SearchModal.tsx** - Search functionality modal
- **CreateJob.tsx** - Modal for creating new jobs

## 🗂 State Management

### Redux Store Structure
```
store
├── global
│   ├── loading: boolean
│   └── error: string | null
├── companies
│   └── [company state]
└── jobs
    └── [job state]
```

### Redux Slices

**globalSlice.ts**
- Global loading and error states
- Actions: `setLoading`, `setError`, `clearError`

**companySlice.ts**
- Company-related state management

**jobSlice.ts**
- Job-related state management

##  Services

### campaignService
Methods for campaign CRUD operations:
- `getAllCampaigns()` - Get all campaigns
- `getCampaigns(page, limit, search)` - Get paginated campaigns with search
- `createCampaign(campaign)` - Create new campaign
- `updateCampaign(id, campaign)` - Update campaign
- `deleteCampaign(id)` - Delete campaign

### jobService
Methods for job CRUD operations:
- `getAllJobs()` - Get all jobs
- `getJobs(page, limit, campaignId)` - Get paginated jobs filtered by campaign
- `createJob(job)` - Create new job
- `updateJobStatus(id, status)` - Update job status
- `deleteJob(id)` - Delete job

## 🛠 Utilities

### pagination.ts
- `paginate<T>(data, page, limit)` - Paginate data array
- Returns paginated data with metadata

### delay.ts
- `delay(ms)` - Simulated network delay

### randomFail.ts
- `randomFail()` - Randomly throw error (for testing error handling)

### useDebounce.ts
- Custom hook for debouncing search queries

##  Styling

The project uses **Tailwind CSS** for styling. Custom styles are also available in the global CSS file. 

### Key Color Classes
- `bg-main-bck` - Main background color
- `bg-gray-900` - Header and sidebar background
- `bg-gray-200` - Content area background

##  Contributing

Contributions are welcome! Please follow these guidelines:

1. Create a new branch for your feature (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

##  License

This project is part of the TestFreshers JavaScript Project series.

##  Support

For questions or issues, please open an issue in the repository.

---

**Built with ❤️ using React, TypeScript, and Vite**
