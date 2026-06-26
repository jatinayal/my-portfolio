export type ToolCategory = 
  | 'Language' 
  | 'Frontend' 
  | 'Backend' 
  | 'Database' 
  | 'DevOps' 
  | 'AI / LLM' 
  | 'Design' 
  | 'Productivity';

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  logo: string; // We'll map this string to a react-icons/si icon in the component
  website: string;
  description: string;
}

export const tools: Tool[] = [
  // Languages
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Language',
    logo: 'typescript',
    website: 'https://www.typescriptlang.org/',
    description: 'Strongly typed programming language that builds on JavaScript.',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Language',
    logo: 'javascript',
    website: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
    description: 'High-level, often just-in-time compiled language that conforms to the ECMAScript specification.',
  },
  
  // Frontend
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    logo: 'react',
    website: 'https://react.dev/',
    description: 'The library for web and native user interfaces.',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend',
    logo: 'next.js',
    website: 'https://nextjs.org/',
    description: 'The React Framework for the Web with built-in optimizations.',
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    category: 'Frontend',
    logo: 'tailwind',
    website: 'https://tailwindcss.com/',
    description: 'A utility-first CSS framework for rapid UI development.',
  },
  {
    id: 'framer-motion',
    name: 'Framer Motion',
    category: 'Frontend',
    logo: 'framer',
    website: 'https://www.framer.com/motion/',
    description: 'A production-ready motion library for React.',
  },

  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    logo: 'node.js',
    website: 'https://nodejs.org/',
    description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
  },
  {
    id: 'express',
    name: 'Express',
    category: 'Backend',
    logo: 'express',
    website: 'https://expressjs.com/',
    description: 'Fast, unopinionated, minimalist web framework for Node.js.',
  },

  // Database
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Database',
    logo: 'postgresql',
    website: 'https://www.postgresql.org/',
    description: 'The World\'s Most Advanced Open Source Relational Database.',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Database',
    logo: 'mongodb',
    website: 'https://www.mongodb.com/',
    description: 'A document-based, distributed database built for modern applications.',
  },

  // DevOps & Tools
  {
    id: 'git',
    name: 'Git',
    category: 'DevOps',
    logo: 'git',
    website: 'https://git-scm.com/',
    description: 'Free and open source distributed version control system.',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'DevOps',
    logo: 'docker',
    website: 'https://www.docker.com/',
    description: 'Platform designed to help developers build, share, and run modern applications.',
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'DevOps',
    logo: 'vercel',
    website: 'https://vercel.com/',
    description: 'Frontend cloud platform providing seamless deployment and edge delivery.',
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'Productivity',
    logo: 'vscode',
    website: 'https://code.visualstudio.com/',
    description: 'Code editor redefined and optimized for building and debugging modern applications.',
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'Productivity',
    logo: 'cursor',
    website: 'https://cursor.com/',
    description: 'The AI-first code editor built to write, refactor, and debug code instantly.',
  },

  // AI / LLMs
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'AI / LLM',
    logo: 'openai',
    website: 'https://chat.openai.com/',
    description: 'Advanced language model by OpenAI used for code generation and logic problem solving.',
  },
  {
    id: 'claude',
    name: 'Claude',
    category: 'AI / LLM',
    logo: 'anthropic',
    website: 'https://claude.ai/',
    description: 'Helpful and harmless AI assistant by Anthropic with a massive context window.',
  },
  
  // Design
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design',
    logo: 'figma',
    website: 'https://www.figma.com/',
    description: 'The collaborative interface design tool for building cohesive digital products.',
  }
];
