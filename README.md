# FullStack E-Commerce

A full-stack e-commerce application built with React (Frontend) and Node.js/Express (Backend) with MongoDB Atlas.

## Tech Stack

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas
- **Auth:** JWT

---

## Deployment & Security Readiness

To ensure the application is secure and ready for deployment to platforms like Render or Vercel, the following changes have been made:

1. **Environment Variables**: Replaced hardcoded `localhost:5000` strings with dynamic environment variables (`VITE_API_URL` for the frontend and `CLIENT_URL` for the backend).
2. **HttpOnly Cookies for Auth**: Moved away from storing JWTs in `localStorage` to prevent Cross-Site Scripting (XSS) attacks. Both the short-lived `accessToken` and long-lived `refreshToken` are now securely set as HttpOnly cookies by the backend.
3. **Automated Token Refresh**: Implemented a custom API interceptor (`api.js`) on the frontend that automatically catches 401 Unauthorized errors and seamlessly calls a `/refresh` endpoint to obtain a new access token, ensuring uninterrupted user experience.
4. **Auto-Logout via Idle Timeout**: Added a `useIdleTimeout` hook that tracks user inactivity. If a user is inactive for a defined period (e.g., 15 minutes), the application automatically calls the backend `/logout` endpoint to clear cookies and redirects the user to the login screen.

---

## 🚀 Production-Grade Improvements

We're upgrading this project to production quality. Here's the roadmap — tackling one at a time:

### UI/UX Overhaul

- [ ] **1. Dashboard Redesign** — Complete redesign of the dashboard with modern aesthetics (glassmorphism, smooth gradients, premium card layouts, micro-animations)
- [ ] **2. Logo** — Design and integrate a proper brand logo across the app
- [ ] **3. Navbar Enhancement** — Add elevation, borders, polished styling, and smooth transitions to the navbar

### Planned (Future)

- [ ] Product listing & detail pages
- [ ] Cart & checkout flow
- [ ] User profile & order history
- [ ] Admin panel
- [ ] Payment gateway integration
- [ ] Responsive mobile design
- [ ] Performance optimization & SEO



### Planned (Todo)
-[ ] Make shop by category responsive
-[ ] Scrape real data with proper descriptions and images
-[ ] Make the load more button functional



