export type Experience = {
  id: string;
  company: string;
  logoUrl?: string;
  role: string;
  status: 'Current' | 'Past';
  startDate: string;
  endDate?: string;
  overview?: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
  projectIds: string[];
};

export const experiences: Experience[] = [
  {
    id: "kyrex-web-dev",
    company: "Kyrex",
    role: "Web Developer",
    status: "Current",
    startDate: "2023", // or whenever
    overview: "Kyrex is a forward-thinking technology company focused on delivering premium enterprise solutions. As a core member of the frontend team, I am responsible for architecting and building robust, scalable web applications that drive business value.",
    responsibilities: [
      "Designing and developing robust, responsive frontend architectures.",
      "Collaborating with cross-functional teams to deliver high-quality web applications.",
      "Optimizing performance and implementing sophisticated UI animations.",
    ],
    technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Node.js", "Team Collaboration"],
    achievements: [
      "Successfully delivered the core platform redesign ahead of schedule.",
      "Improved frontend performance metrics (LCP, CLS) by over 30%.",
    ],
    projectIds: [
      "kyrex-main-platform",
      "kyrex-customer-portal",
      "kyrex-admin-dashboard",
      "kyrex-marketing-site",
      "kyrex-auth-service",
      "kyrex-analytics-engine"
    ],
  }
];
