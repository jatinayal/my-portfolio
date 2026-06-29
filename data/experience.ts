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
    company: "Kyrex Digitech Pvt. Ltd., Noida",
    logoUrl: "/exp/kyrex.png",
    role: "Web Developer Intern",
    status: "Current",
    startDate: "Feb 2026",
    endDate: "Jul 2026",
    overview: "Worked as a Web Developer Intern, contributing to modern web applications and collaborative development workflows in a startup environment. Focused on frontend development, API integration, version control, project collaboration, and real-world software development practices.",
    responsibilities: [
      "Developed and maintained web application features using Next.js, React, and modern JavaScript, with a strong focus on reusable components and responsive user interfaces.",
      "Assisted in building and integrating frontend components with backend APIs, ensuring reliable data flow and seamless functionality.",
      "Collaborated with team members using Git and GitHub, following professional version control practices including branching, commits, pull requests, and code reviews.",
      "Participated in debugging sessions, feature implementation, and technical discussions to improve application stability and user experience.",
      "Worked with WordPress for content and website management tasks where required.",
      "Used Jira for task management, sprint tracking, collaboration, and development workflow organization.",
      "Gained hands-on experience in collaborative software development, code management, problem-solving, and agile startup workflows."
    ],
    technologies: [
      "Next.js",
      "React",
      "JavaScript",
      "REST APIs",
      "Git",
      "GitHub",
      "WordPress",
      "Jira",
      "Responsive Design",
      "Debugging",
      "Team Collaboration",
      "Feature Development",
      "Version Control",
      "Agile Workflow"
    ],
    achievements: [],
    projectIds: [
      "oneatta-landing",
      "printdash",
      "women-s-synergy",
      "sabka-saath-society",
      "ggsipu-university-website",
      "kyrex",
      "horeka",
      "ask-kubeir-maintenance-page",
      "caratly-software-ui"
    ],
  }
];
