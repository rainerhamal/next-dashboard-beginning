## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## Next.js Dashboard Application

This project is a modern dashboard application built with [Next.js](https://nextjs.org/) using the App Router, TypeScript, and Tailwind CSS. It demonstrates best practices for building full-stack web apps with authentication, dynamic routing, and a responsive UI.

### Features

- **Dashboard Overview**: Visualize key metrics with cards and charts.
- **Invoices Management**: List, search, create, edit, and view invoices with pagination.
- **Customers Management**: View customer details and images.
- **Authentication**: Secure login and sign-out functionality using NextAuth.
- **Theming**: Light/dark mode toggle with persistent user preference.
- **Responsive Design**: Mobile-friendly layouts using Tailwind CSS.
- **Postgres Integration**: Data fetching and manipulation via Vercel Postgres.
- **Component-Based UI**: Reusable components for forms, tables, navigation, and more.

### Getting Started

1. **Install dependencies**:  
   `npm install`

2. **Run the development server**:  
   `npm run dev`

3. **Seed the database (optional)**:  
   `npm run seed`

4. **Build for production**:  
   `npm run build`

### Folder Structure

- `app/` – Main application pages and layouts
- `app/dashboard/` – Dashboard routes (overview, invoices, customers)
- `app/ui/` – Reusable UI components
- `app/lib/` – Data fetching, type definitions, and utilities
- `public/` – Static assets and images
- `scripts/` – Database seed script

### Customization

- Update styles in `app/ui/global.css` and `tailwind.config.ts`
- Add new pages or components in the `app/` and `app/ui/` folders

### Learn More

For more information, see the [Next.js App Router Course](https://nextjs.org/learn).
