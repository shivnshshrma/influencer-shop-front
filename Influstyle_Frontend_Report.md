
# Influstyle Frontend – Technical Report

*Last generated: 2025-06-15*

---

## 1. Overview

This document provides a comprehensive explanation of the Influstyle frontend codebase and technology stack. You can use this to explain the project to colleagues, interviewers, or for documentation purposes.

---

## 2. Tech Stack

**Major Libraries & Frameworks:**
- **React**: UI library for component-driven development.
- **Vite**: Fast, modern frontend build tool & dev server.
- **TypeScript**: Strong static typing for maintainable, scalable code.
- **Tailwind CSS**: Utility-first CSS framework for rapid styling.
- **Shadcn UI**: Collection of accessible React components built on top of Radix UI and styled with Tailwind.
- **Radix UI**: Headless UI primitives for accessibility.
- **Lucide React**: Icon library.
- **React Router DOM v6**: Declarative routing for SPA navigation.
- **@tanstack/react-query**: For data fetching, caching, and server state management.
- **Supabase**: Backend-as-a-service for authentication, database, and file storage.
- **Embla Carousel, recharts**: For carousels and data visualizations.

**Other Tools:**
- **sonner**: For modern, beautiful toasts and notifications.
- **react-hook-form**: Easy, performant form management.

---

## 3. Project Structure

```
/src
  /components
    – [Reusable & custom UI components; e.g., Navbar, Footer, ProductShowcase, etc.]
    /ui
      – [Shadcn-wrapped UI primitives: Button, Input, etc.]
  /hooks
    – [Custom React hooks; eg. use-toast]
  /pages
    – [Page-level React components; each file corresponds to a route]
  /integrations
    /supabase
      – client.ts (Supabase JS SDK client config)
  /utils
    – [Helper functions, eg. for localStorage]
  /lib
    – [Helpers like Tailwind class merging]
  main.tsx
  App.tsx
```

### Key Files:
- **App.tsx**: Root component, sets up theme, routing, and QueryClient.
- **main.tsx**: Entrypoint, renders App.
- **index.html**: Root HTML template.

---

## 4. Routing

- **React Router v6** is used (`<Routes>`, `<Route>`).
- All main pages reside in `/src/pages`. Each page is imported and mapped to a route in `App.tsx`.
- Includes routes like `/`, `/for-you`, `/shop`, `/wishlist`, `/categories`, `/profile`, `/influencer/:id`, `/privacy-policy`, `/cookie-policy`, etc.
- 404s are handled by a catch-all `*` route rendering the NotFound page.

---

## 5. UI & Styling

- **Tailwind CSS** powers all styling—utility classes are used throughout.
- **Shadcn UI** components (like Button, Input, Tooltip, Dialog, Command, etc.) provide accessible building blocks with consistent design.
- **ThemeProvider** allows light/dark mode with system preference detection.
- Custom branding colors are set in the Tailwind config (e.g., brand-100 to brand-900 for pink/orange shades).
- Responsive: Uses Tailwind’s breakpoints and flex/grid utilities.

---

## 6. Components

- **Navbar**: Top navigation bar with links, responsive, handles login state, shopping, mobile drawer.
- **Footer**: Branding, legal, and policy links (routes to Privacy, Cookie Policy).
- **Hero, FeaturedInfluencers, ProductShowcase, Benefits, AIChatFAB/AIChatRoom, etc.**: Each encapsulated as their own component for modularity and reusability.
- All components are written as functional React components, typed with TypeScript for props.

---

## 7. Data Fetching & State

- **React Query/Tanstack Query**: Provides hooks for fetching, caching, and synchronizing server data.
- **LocalStorage utilities**: Used for lightweight persistence (e.g., login session).
- **Supabase integration**:
  - JS SDK client is configured in `/integrations/supabase/client.ts`.
  - Used for authentication, (potentially) reading/writing user data, product info, comments, etc.

---

## 8. Authentication

- **Supabase Auth**: User login/signup can be routed via `/auth?tab=login` or `/auth?tab=signup`.
- Login state and conditional rendering are handled in components based on localStorage/session/user context.

---

## 9. Notifications

- Both Sonner and a custom Toaster provide toast notifications.
- Can be triggered via the use-toast hook for important events (e.g., “Added to wishlist!”).

---

## 10. Forms

- Built with shadcn’s Form and Input components.
- Validation with `react-hook-form` and `zod` (if used).

---

## 11. How to Explain This Project (Talking Points)

- “The entire UI is built with modern React and is styled using utility classes from Tailwind CSS for rapid design workflow.”
- “UI components come from Shadcn UI and Radix UI, ensuring accessibility by default.”
- “Routing is handled client-side with React Router, making it a true SPA.”
- “All data is fetched and cached via Tanstack Query for performance, and persisted remotely using Supabase.”
- “Authentication and file storage are handled via Supabase as well, so there’s no custom backend required!”
- “The codebase is modular, with each component and page split logically for maintainability and scalability.”
- “We use sonner and toast/Toaster for user feedback with beautiful notification toasts.”
- “Everything is written in TypeScript end-to-end for type safety.”
- “Design system and branding are custom but built on top of tailwind config.”

---

## 12. How to Run / Develop

- Clone the repo & `npm install`
- Run `npm run dev` to start the local Vite server
- Open [http://localhost:8080](http://localhost:8080) in your browser
- All environmental variables (SupaBase URLs/keys) are in the code, so no extra setup is needed for frontend.

---

## 13. External Links

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Shadcn UI Docs](https://ui.shadcn.com/)
- [Radix UI Docs](https://www.radix-ui.com/)
- [Supabase Docs](https://supabase.com/docs)
- [React Query Docs](https://tanstack.com/query/latest/docs/react/overview)
- [Sonner Docs](https://sonner.emilkowal.ski/)

---

## 14. Recap Checklist

- [x] Modular component-driven project
- [x] Modern tools: React + Vite + TypeScript
- [x] Lightning-fast dev & build with Vite, HMR for instant reloads
- [x] Fully responsive & accessible layouts
- [x] Single-page app routing
- [x] Supabase for auth/data
- [x] Clean, understandable project structure

---

**Contact for Questions:**  
styleinflu@gmail.com

---

*You can freely update this file to better fit your team or audience!*
