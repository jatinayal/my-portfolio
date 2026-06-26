export type ProjectType = "personal" | "professional" | "freelance" | "opensource";

export type Project = {
  id: string;
  title: string;
  description: string; // Detailed description
  overview?: string; // Summary
  purpose?: string; // Goals
  image: string;
  technologies: string[]; // Technologies
  liveUrl?: string;
  github?: string;
  role?: string;
  responsibilities?: string[];
  challenges?: string[];
  features?: string[];
  achievements?: string[];
  status?: string;
  timeline?: string;
  type?: ProjectType;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "kyrex-main-platform",
    title: "Kyrex Core Platform",
    description: "The core enterprise platform designed to streamline business workflows, providing seamless data integration and real-time analytics. Built with performance and scalability in mind to support thousands of concurrent users.",
    overview: "A comprehensive B2B dashboard and analytics tool for Kyrex's premium enterprise clients.",
    purpose: "To replace legacy monolithic systems with a modern, modular React application that improves user retention and speeds up workflow execution.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    role: "Lead Frontend Developer",
    responsibilities: [
      "Architected the frontend data layer using React Query.",
      "Developed modular UI components integrated with Storybook.",
      "Optimized Webpack/Turbopack build times by 40%."
    ],
    features: [
      "Real-time WebSocket data streaming",
      "Interactive D3.js data visualizations",
      "Role-Based Access Control (RBAC)",
      "Dark mode support"
    ],
    status: "Live",
    timeline: "2023 - 2024",
    liveUrl: "https://example.com/kyrex-platform",
    github: "https://github.com",
    type: "professional",
    featured: true,
  },
  {
    id: "kyrex-customer-portal",
    title: "Customer Portal Redesign",
    description: "A complete overhaul of the Kyrex customer-facing portal, focusing on accessibility, modern design aesthetics, and a friction-free user journey.",
    overview: "Consumer-facing web portal handling user accounts, billing, and support tickets.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    responsibilities: [
      "Led the UI/UX migration to the new design system.",
      "Implemented complex animations using Framer Motion.",
      "Ensured WCAG 2.1 AA accessibility compliance."
    ],
    status: "Completed",
    timeline: "Q3 2023",
    liveUrl: "https://example.com",
    github: "https://github.com",
    type: "professional",
    featured: false,
  },
  {
    id: "kyrex-admin-dashboard",
    title: "Internal Admin Dashboard",
    description: "A secure internal tool used by Kyrex staff to manage user accounts, monitor system health, and configure global application settings.",
    overview: "Centralized admin interface for customer success and engineering teams.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800",
    technologies: ["React", "Redux", "Material UI", "Express"],
    challenges: [
      "Handling massive data tables without browser lag.",
      "Integrating legacy REST APIs securely."
    ],
    features: [
      "Virtual scrolling for 100k+ row tables",
      "Advanced filtering and multi-column sorting"
    ],
    status: "Internal",
    timeline: "Q1 2024",
    liveUrl: "https://example.com",
    github: "https://github.com",
    type: "professional",
    featured: false,
  },
  {
    id: "kyrex-marketing-site",
    title: "Marketing Website 2.0",
    description: "The primary marketing and lead-generation website for Kyrex, heavily optimized for SEO, Core Web Vitals, and conversion rate.",
    overview: "High-performance static site for Kyrex's public web presence.",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=800",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Sanity CMS"],
    features: [
      "Headless CMS integration",
      "Dynamic page generation",
      "Perfect 100/100 Lighthouse scores"
    ],
    liveUrl: "https://kyrex.example.com",
    github: "https://github.com",
    status: "Live",
    timeline: "Q2 2023",
    type: "professional",
    featured: true,
  },
  {
    id: "kyrex-auth-service",
    title: "SSO Authentication Gateway",
    description: "A centralized Single Sign-On (SSO) micro-frontend that handles authentication logic across all Kyrex product suites.",
    overview: "Unified login experience for the entire Kyrex ecosystem.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800",
    technologies: ["React", "TypeScript", "OAuth 2.0", "JWT"],
    challenges: [
      "Maintaining state securely across multiple subdomains.",
      "Implementing seamless silent token refresh."
    ],
    status: "Live",
    timeline: "Q4 2023",
    liveUrl: "https://example.com",
    github: "https://github.com",
    type: "professional",
    featured: false,
  },
  {
    id: "kyrex-analytics-engine",
    title: "Real-Time Analytics UI",
    description: "A specialized frontend module dedicated to rendering complex financial and usage analytics in real-time.",
    overview: "Analytics rendering engine for enterprise clients.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
    technologies: ["React", "D3.js", "WebSockets", "Tailwind CSS"],
    responsibilities: [
      "Built custom, interactive D3 charts from scratch.",
      "Optimized React rendering to handle 60fps streaming data."
    ],
    status: "Completed",
    timeline: "Q1 2024",
    liveUrl: "https://example.com",
    github: "https://github.com",
    type: "professional",
    featured: false,
  },
  {
    id: "portfolio-v1",
    title: "Personal Portfolio",
    description: "My personal digital space showcasing projects, experiences, and thoughts, built with premium aesthetics and smooth animations.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://example.com",
    github: "https://github.com",
    type: "personal",
    timeline: "Q1 2025",
    featured: true,
  }
];
