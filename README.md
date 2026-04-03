<div align="center">
  <h1>💰 FinDash</h1>
  <p>A modern, responsive Finance Dashboard UI built to handle robust state, role-based controls, and beautiful visual analytics.</p>

  <h3>🚀 <a href="https://fin-dash-lime.vercel.app/">View Live Demo</a></h3>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Zustand-informational?style=for-the-badge&logo=react&logoColor=white" alt="Zustand" />
  </p>
</div>

<br />

## ✨ Features

- 🧠 **Store & State Management**: Entire state handled efficiently via a centralized Zustand store.
- 🔐 **Role-Based Access Control (RBAC)**: Toggle between `Admin` and `Viewer` roles. Viewers are restricted from creating or deleting transactions.
- 🌙 **Dark Mode**: Switch between a sleek Light mode and an immersive Dark mode with beautiful tailored color palettes.
- 📊 **Visualizations**: 
  - Dynamic Line Chart tracking your Balance Trend.
  - Interactive Donut Chart showing Spending by Category.
- 📱 **Responsive**: Fully responsive design that works beautifully on mobile and desktop.
- 💳 **Transactions Table**: Search, filter, and modify 20+ mock transactions.

## 🛠️ Tools & Libraries Used

| Technology | Purpose |
| ---------- | ------- |
| **Vite & React** | Fast, modern scaffolding and UI rendering. |
| **Tailwind CSS** | Layout, utilities, and rich styling. |
| **Lucide-React** | Premium SVG icons. |
| **Recharts**     | Building the analytics visualizations. |
| **Zustand**      | Lightweight and perfectly optimized state management. |
| **Clsx & Tailwind-Merge** | Dynamic class merging and utility combinations. |

## 🚀 Setup Instructions

1. **Clone & Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 💡 Why Zustand Instead of Context?

This dashboard utilizes Zustand rather than the React Context API. 

Zustand provides significant performance benefits specifically for a dashboard. While the Context API triggers a re-render for every component listening to its provider when *any* property changes, Zustand subscribes components purely to the specific pieces of state they use. It also cuts out `<Provider>` wrapping boilerplate entirely!