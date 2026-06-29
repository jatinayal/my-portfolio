export type ProjectType = "personal" | "professional" | "freelance" | "opensource";

export type Project = {
  id: string;
  title: string;
  description: string;
  overview?: string;
  purpose?: string;
  image: string;
  technologies: string[];
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
    id: "devmorph",
    title: "DevMorph",
    description: "DevMorph is a production-grade AI-powered SaaS website builder that enables users to create complete websites using natural language prompts.",
    overview: "DevMorph is a production-grade AI-powered SaaS website builder that enables users to create complete websites using natural language prompts. Users can describe their ideas in plain English, and the AI generates clean, responsive HTML and Tailwind CSS code that can be previewed, modified through conversational AI, exported, or deployed with a single click. The platform includes live responsive previews for desktop, tablet, and mobile devices, version history with rollback support, a secure authentication system using JWT and HttpOnly cookies, and a credit-based monetization architecture with transaction-safe deduction and refund logic.",
    purpose: "To provide a seamless, AI-driven website creation experience for non-developers, enabling rapid prototyping and deployment.",
    image: "/projects/devmorph.png",
    technologies: ["React", "Vite", "Tailwind CSS", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "JWT Authentication", "Google Gemini API", "OpenAI API", "Nodemailer", "SMTP", "Vercel", "Render"],
    liveUrl: "https://devmorph.vercel.app",
    github: "https://github.com/jatinayal/devmorph",
    type: "personal",
    timeline: "FEB 2026",
    status: "Completed",
    featured: true,
    role: "Full Stack Developer",
    features: [
      "AI-driven conversational interface for code generation",
      "Live responsive previews for desktop, tablet, and mobile",
      "Version history with full rollback support",
      "Secure credit-based monetization system",
      "One-click deployment and code export"
    ]
  },
  {
    id: "codeforge",
    title: "CodeForge",
    description: "A comprehensive full-stack coding platform designed to help developers practice programming problems, improve problem-solving skills, and monitor their learning journey.",
    overview: "CodeForge is a comprehensive full-stack coding platform designed to help developers practice programming problems, improve problem-solving skills, and monitor their learning journey. The platform allows users to solve coding challenges using the Monaco code editor, submit solutions, receive AI-powered coding assistance, watch solution videos, and track their progress through a personalized dashboard.",
    purpose: "To deliver an online coding experience similar to modern competitive programming platforms while integrating AI to make learning more interactive and efficient.",
    image: "/projects/codeforge.png",
    technologies: ["React", "Tailwind CSS", "Redux Toolkit", "Monaco Editor", "Node.js", "Express.js", "MongoDB", "Redis", "JWT Authentication", "Google Gemini API", "Cloudinary", "React Hook Form", "Zod"],
    liveUrl: "https://codeforge-3-rvwm.onrender.com",
    github: "https://github.com/jatinayal/codeforge",
    type: "personal",
    timeline: "JAN 2026",
    status: "Completed",
    featured: true,
    role: "Full Stack Developer",
    features: [
      "Interactive code execution via Monaco Editor",
      "AI-powered coding assistance and feedback",
      "Personalized learning dashboard and progress tracking",
      "Role-based admin functionality for problem management",
      "Optimized performance with Redis caching"
    ]
  },
  {
    id: "pagelet",
    title: "Pagelet",
    description: "A Notion-inspired block-based editor built as a learning-focused project to deeply understand the architecture and advanced capabilities of Next.js.",
    overview: "Pagelet is a Notion-inspired block-based editor built as a learning-focused project to deeply understand the architecture and advanced capabilities of Next.js. The application allows users to create and organize content using flexible editable blocks, interact with an AI assistant for writing support, upload and manage images through Cloudinary, and publish documents as public read-only pages.",
    purpose: "To explore real-world frontend architecture, state management, and performance optimization in modern React and Next.js applications.",
    image: "/projects/pagelet.png",
    technologies: ["Next.js", "React", "TipTap", "Tailwind CSS", "Google Gemini API", "Cloudinary", "MongoDB", "JWT Authentication", "Framer Motion", "Shiki"],
    liveUrl: "https://pagelet.vercel.app",
    github: "https://github.com/jatinayal/pagelet",
    type: "personal",
    timeline: "FEB 2026",
    status: "Completed",
    featured: true,
    role: "Frontend Developer",
    features: [
      "Flexible block-based rich text editor",
      "AI assistant integration for intelligent writing support",
      "Public read-only document publishing",
      "Efficient state management and performance optimization",
      "Smooth formatting controls and animations"
    ]
  },
  {
    id: "havn",
    title: "HAVN",
    description: "A full-stack accommodation booking platform inspired by Airbnb, built to provide users with a complete property listing and booking experience.",
    overview: "HAVN is a full-stack accommodation booking platform inspired by Airbnb, built to provide users with a complete property listing and booking experience. The platform enables users to register securely, create and manage property listings, upload property images using Cloudinary, leave reviews with star ratings, and interact with listings through an intuitive responsive interface.",
    purpose: "To create a robust property marketplace emphasizing backend architecture, authentication, cloud media management, and scalable deployment.",
    image: "/projects/havn.png",
    technologies: ["Node.js", "Express.js", "MongoDB", "Passport.js", "EJS", "Bootstrap 5", "Cloudinary", "Multer", "Mapbox", "Render"],
    liveUrl: "https://havn-1.onrender.com",
    github: "https://github.com/jatinayal/HAVN",
    type: "personal",
    timeline: "JUN 2025",
    status: "Completed",
    featured: true,
    role: "Full Stack Developer",
    features: [
      "Secure user registration and property listing management",
      "Cloudinary integration for scalable media uploads",
      "Owner-based authorization and content security",
      "Interactive property reviews with star ratings",
      "Mapbox integration for future location-based search"
    ]
  },
  {
    id: "moviebinger",
    title: "MovieBinger",
    description: "A movie and TV show discovery platform designed to help users explore entertainment content through an organized and user-friendly interface.",
    overview: "MovieBinger is a movie and TV show discovery platform designed to help users explore entertainment content through an organized and user-friendly interface. The application presents curated collections of movies, television series, and children's content along with detailed information such as genres, ratings, streaming platforms, and comprehensive descriptions.",
    purpose: "To provide a highly scalable, serverless architecture for querying and discovering entertainment content with a custom API.",
    image: "/projects/moviebinger.png",
    technologies: ["React", "Netlify", "Netlify Functions", "JavaScript", "REST API", "CSS3"],
    liveUrl: "https://moviebingerjatinnayal.netlify.app",
    github: "",
    type: "personal",
    timeline: "NOV 2024",
    status: "Completed",
    featured: true,
    role: "Frontend Developer",
    features: [
      "Curated collections of movies and TV shows",
      "Custom serverless backend powered by Netlify Functions",
      "Modular React architecture with scalable API design",
      "Clean data organization and responsive UX"
    ]
  },
  {
    id: "personal-portfolio-3d",
    title: "Personal Portfolio",
    description: "A modern and interactive developer portfolio designed to showcase my professional experience, technical skills, and software development projects.",
    overview: "A modern and interactive developer portfolio designed to showcase my professional experience, technical skills, and software development projects through an engaging user experience. The portfolio features immersive 3D graphics powered by Three.js and React Three Fiber, smooth page transitions and micro-interactions using Framer Motion, draggable and interactive UI components, responsive layouts, and carefully crafted animations.",
    purpose: "To create a visually appealing, technically polished platform that highlights my real-world projects and expertise.",
    image: "/projects/portfolio.png",
    technologies: ["Next.js", "React", "Tailwind CSS", "Three.js", "React Three Fiber", "React Three Drei", "Rapier Physics", "Framer Motion", "DnD Kit", "Lucide React"],
    liveUrl: "https://jatinayal.vercel.app",
    github: "https://github.com/jatinayal/my-portfolio",
    type: "personal",
    timeline: "JUN 2026",
    status: "Completed",
    featured: true,
    role: "Frontend Developer",
    features: [
      "Immersive 3D graphics via Three.js & React Three Fiber",
      "Physics-based interactions using Rapier",
      "Smooth Framer Motion page transitions",
      "Draggable UI components powered by DnD Kit",
      "Premium, responsive, component-driven design"
    ]
  },


  {
    id: "oneatta-landing",
    title: "OneAtta Landing",
    description: "Developed a modern AI-powered landing page for OneAtta, showcasing personalized multigrain flour recommendations, nutrition insights, custom blend creation, and seamless customer engagement with responsive design and smooth animations.",
    image: "/projects/oneatta-landing.png",
    technologies: ["React", "React Router", "Tailwind CSS", "Framer Motion", "Express.js", "Node.js", "Nodemailer", "Lucide React", "QR Code", "Cloudflare Turnstile"],
    liveUrl: "https://www.oneatta.com",
    type: "professional",
    timeline: "Feb 2026 - Jul 2026",
    status: "Completed",
    featured: true,
    role: "Web Developer Intern",
  },

  {
    id: "printdash",
    title: "PrintDash",
    description: "Built a modern industrial solutions website featuring responsive UI, secure authentication, contact workflows, cloud-based media management, interactive dashboards, and performance-focused design.",
    image: "/projects/printdash.png",
    technologies: ["Next.js", "React", "Tailwind CSS", "MongoDB", "NextAuth.js", "Cloudinary", "Framer Motion", "Nodemailer", "Recharts", "Zod"],
    liveUrl: "https://printdash-sigma.vercel.app",
    type: "professional",
    timeline: "Feb 2026 - Jul 2026",
    status: "Completed",
    featured: true,
    role: "Web Developer Intern",
  },

  {
    id: "women-s-synergy",
    title: "Women's Synergy",
    description: "Developed a scalable content-driven website powered by Payload CMS with PostgreSQL, featuring responsive layouts, rich content management, cloud media integration, and modern UI components.",
    image: "/projects/women-s-synergy.png",
    technologies: ["Next.js", "React", "Payload CMS", "PostgreSQL", "Cloudinary", "Tailwind CSS", "Framer Motion", "React Hook Form", "Shadcn UI", "GraphQL", "Zod"],
    liveUrl: "https://ws-demo-nine.vercel.app",
    type: "professional",
    timeline: "Feb 2026 - Jul 2026",
    status: "Completed",
    featured: true,
    role: "Web Developer Intern",
  },

  {
    id: "sabka-saath-society",
    title: "Sabka Saath Society",
    description: "Designed and developed a responsive website for a social organization with modern layouts, smooth animations, and optimized user experience across desktop and mobile devices.",
    image: "/projects/sabka-saath-society.png",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Lucide React"],
    liveUrl: "https://sabkasaath.vercel.app",
    type: "professional",
    timeline: "Feb 2026 - Jul 2026",
    status: "Completed",
    featured: false,
    role: "Web Developer Intern",
  },

  {
    id: "ggsipu-university-website",
    title: "GGSIPU University Website",
    description: "Created a modern university website interface with responsive pages, intuitive navigation, and engaging animations to enhance accessibility and user experience.",
    image: "/projects/ggsipu-university-website.png",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Lucide React"],
    liveUrl: "https://ipu-demo.vercel.app",
    type: "professional",
    timeline: "Feb 2026 - Jul 2026",
    status: "Completed",
    featured: false,
    role: "Web Developer Intern",
  },

  {
    id: "kyrex",
    title: "Kyrex Official Website",
    description: "Contributed to the official company website by implementing UI improvements, refining layouts, fixing visual inconsistencies, and enhancing the overall user experience.",
    image: "/projects/kyrex.png",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: "https://www.kyrex.org",
    type: "professional",
    timeline: "Feb 2026 - Jul 2026",
    status: "Completed",
    featured: false,
    role: "Web Developer Intern",
  },

  {
    id: "horeka",
    title: "Horeka",
    description: "Improved the Discover pages by implementing UI enhancements, fixing layout issues, and refining the overall frontend experience for better usability.",
    image: "/projects/horeka.png",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    liveUrl: "https://horeka.co",
    type: "professional",
    timeline: "Feb 2026 - Jul 2026",
    status: "Completed",
    featured: false,
    role: "Web Developer Intern",
  },

  {
    id: "ask-kubeir-maintenance-page",
    title: "Ask Kubeir Maintenance Page",
    description: "Designed and developed a lightweight maintenance page with responsive design, clean UI, and optimized performance for temporary service downtime.",
    image: "/projects/ask-kubeir-maintenance-page.png",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "https://delicate-sundae-94a394.netlify.app/",
    type: "professional",
    timeline: "Feb 2026 - Jul 2026",
    status: "Completed",
    featured: false,
    role: "Web Developer Intern",
  },

  {
    id: "caratly-software-ui",
    title: "Caratly Software UI",
    description: "Designed modern software interface concepts and high-fidelity UI screens using Google Stitch, focusing on clean layouts, usability, and consistent design systems.",
    image: "/projects/caratly-software-ui.png",
    technologies: ["Google Stitch", "UI/UX Design", "Wireframing", "Prototyping"],
    liveUrl: "https://docs.google.com/document/d/1Fnp6-9ZwmZ7wMt3KH9YAupDDnwD5VlQoDYZrg7HvYH8/edit?usp=sharing",
    type: "professional",
    timeline: "Feb 2026 - Jul 2026",
    status: "Completed",
    featured: false,
    role: "Web Developer Intern",
  }
];
