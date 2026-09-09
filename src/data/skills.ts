export interface Skill {
  name: string;
  icon: string;
  color?: string;
}

export const skills: Skill[] = [
  { name: 'TypeScript',   icon: 'simple-icons:typescript',  color: '#3178C6' },
  { name: 'JavaScript',   icon: 'simple-icons:javascript',  color: '#F7DF1E' },
  { name: 'React',        icon: 'simple-icons:react',       color: '#61DAFB' },
  { name: 'Next.js',      icon: 'simple-icons:nextdotjs',   color: '#ffffff' },
  { name: 'Node.js',      icon: 'simple-icons:nodedotjs',   color: '#5FA04E' },
  { name: 'Express',      icon: 'simple-icons:express',     color: '#ffffff' },
  { name: 'Tailwind CSS', icon: 'simple-icons:tailwindcss', color: '#06B6D4' },
  { name: 'PostgreSQL',   icon: 'simple-icons:postgresql',  color: '#4169E1' },
  { name: 'MongoDB',      icon: 'simple-icons:mongodb',     color: '#47A248' },
  { name: 'MySQL',        icon: 'simple-icons:mysql',       color: '#4479A1' },
  { name: 'Firebase',     icon: 'simple-icons:firebase',    color: '#DD2C00' },
  { name: 'Git',          icon: 'simple-icons:git',         color: '#F05032' },
  { name: '.NET',         icon: 'simple-icons:dotnet',      color: '#512BD4' },
  { name: 'Bootstrap',    icon: 'simple-icons:bootstrap',   color: '#7952B3' },
  { name: 'DaisyUI',      icon: 'simple-icons:daisyui',     color: '#5A0EF8' },
  { name: 'Bun',          icon: 'simple-icons:bun',         color: '#fbf0df' },
];
