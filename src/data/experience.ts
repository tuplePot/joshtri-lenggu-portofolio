export interface WorkItem {
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  current?: boolean;
  description: string;
  tags: string[];
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
  gpa?: string;
  description: string;
}

export const workExperience: WorkItem[] = [
  {
    role: 'Full Stack Web Developer',
    company: 'Global Edge Teknologi',
    companyUrl: 'https://id.linkedin.com/company/globaledge-teknologi',
    period: 'Jan 2025 – Present',
    current: true,
    description:
      'Building and maintaining two production-grade full-stack web applications. Involved across the full lifecycle — from UI design to API development and deployment.',
    tags: ['Full Stack', 'Web App', 'Production'],
  },
  {
    role: 'Praktik Kerja Lapangan',
    company: 'Badan Pusat Statistik (BPS)',
    period: '2022',
    current: false,
    description:
      'Developed a village profile website and an information system for local SMEs and residents using Node.js, Express, Bootstrap, and EJS.',
    tags: ['Node.js', 'Express', 'Bootstrap'],
  },
];

export const education: EducationItem[] = [
  {
    degree: 'S1 Teknik Informatika',
    school: 'Universitas Nusa Cendana',
    period: '2020 – 2024',
    gpa: '3.82',
    description:
      'Studied algorithms, data structures, software engineering, web programming, databases, and computer networks.',
  },
  {
    degree: 'SMA — IPA',
    school: 'SMAN 7 Kota Kupang',
    period: '2017 – 2020',
    description: 'Completed general high school with a focus on natural sciences.',
  },
];
