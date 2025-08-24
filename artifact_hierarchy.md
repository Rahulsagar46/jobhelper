# Artifact Hierarchy

This document describes the code artifact hierarchy for the JobHelper project, showing the structure and purpose of each major module.

## Frontend (React + Vite)

- `src/`
  - `components/` — Reusable UI components (Header, Footer, Layout, JobCard, ProgressMeter)
  - `pages/` — Main pages (SignupLogin, Onboarding, Home)
  - `styles/` — CSS files for theming and layout
  - `theme/` — Central theme configuration (colors, fonts, spacing)
  - `data/` — Dummy data for development/testing
  - `App.jsx` — Main app component
  - `AppRouter.jsx` — Routing logic
  - `main.jsx` — Entry point

## Backend (Django)

- `backend/`
  - `api/` — Job listing and onboarding APIs
  - `auth/` — Authentication APIs
  - `README.md` — Backend API documentation

## Scraper

- `scraper/` — No changes made (per user instruction)

## Documentation

- `frontend/project_manifest.md` — UI requirements and design
- `frontend/deviations.md` — Documented deviations from requirements

This hierarchy is designed for maintainability, modularity, and future extensibility.
