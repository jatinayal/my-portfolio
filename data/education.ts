export type Education = {
  id: string;
  degree: string;
  institution: string;
  logoUrl?: string;
  startDate: string;
  endDate: string;
  description?: string;
};

export const educations: Education[] = [
  {
    id: "bca-amrapali",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Amrapali University",
    startDate: "2021",
    endDate: "2024",
    description: "Focused on core computer science concepts, software engineering, and modern web technologies.",
  }
];
