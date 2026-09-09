export interface Technology {
  name: string;
  iconUrl: string;
}

export interface Project {
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  technologies: Technology[];
  featured?: boolean;
}

export const projects: Project[] = [
  {
    title: 'Web Profil Kelurahan Oetete',
    description: 'Village profile website with news, events, administrative services, and community resources.',
    link: 'https://weboetete.kupangkota.go.id',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/bukutamuproject.appspot.com/o/projects%2Fweb-profil-oetete.PNG?alt=media&token=705519bc-4c2d-4b71-82a1-d3d10b8db5cd',
    technologies: [
      { name: 'Node.js', iconUrl: 'https://cdn.simpleicons.org/Node.js/5FA04E' },
      { name: 'Express', iconUrl: 'https://cdn.simpleicons.org/express/ffffff' },
      { name: 'MongoDB', iconUrl: 'https://cdn.simpleicons.org/mongodb/47A248' },
      { name: 'Bootstrap', iconUrl: 'https://cdn.simpleicons.org/bootstrap/7952B3' },
    ],
    featured: true,
  },
  {
    title: 'Yayasan Sirih Pinang Kebaikan',
    description: 'Platform for writers and publishers to manage book publishing and official ISBN creation.',
    link: 'https://yayasan-sirih-pinang-kebaikan.com/',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/bukutamuproject.appspot.com/o/projects%2Fyasipikan.PNG?alt=media&token=2dcd930b-6c31-40bc-8297-5a1f94250075',
    technologies: [
      { name: 'React', iconUrl: 'https://cdn.simpleicons.org/react/61DAFB' },
      { name: 'Node.js', iconUrl: 'https://cdn.simpleicons.org/Node.js/5FA04E' },
      { name: 'MongoDB', iconUrl: 'https://cdn.simpleicons.org/mongodb/47A248' },
      { name: 'Tailwind', iconUrl: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
    ],
    featured: true,
  },
  {
    title: 'SIBER CSMS Limau Field',
    description: 'Document verification system for CSMS compliance at Limau Field, ensuring safety standards.',
    link: 'https://siber-csms-v44.vercel.app',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/bukutamuproject.appspot.com/o/projects%2Fsiber-csms.PNG?alt=media&token=3e6d5eff-fa1e-426f-a341-64462fc2d381',
    technologies: [
      { name: 'Node.js', iconUrl: 'https://cdn.simpleicons.org/Node.js/5FA04E' },
      { name: 'Express', iconUrl: 'https://cdn.simpleicons.org/express/ffffff' },
      { name: 'MongoDB', iconUrl: 'https://cdn.simpleicons.org/mongodb/47A248' },
      { name: 'Bootstrap', iconUrl: 'https://cdn.simpleicons.org/bootstrap/7952B3' },
    ],
    featured: true,
  },
  {
    title: 'Tech Talk Blog',
    description: 'Tech blog platform with articles, tutorials, and discussions about the latest in software development.',
    link: 'https://tech-talk-blog-rho.vercel.app',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/bukutamuproject.appspot.com/o/projects%2Ftech-talks-blog.PNG?alt=media&token=01fc1c22-df28-4413-a1af-8f22ebcf6f1e',
    technologies: [
      { name: 'React', iconUrl: 'https://cdn.simpleicons.org/react/61DAFB' },
      { name: 'Node.js', iconUrl: 'https://cdn.simpleicons.org/Node.js/5FA04E' },
      { name: 'MongoDB', iconUrl: 'https://cdn.simpleicons.org/mongodb/47A248' },
      { name: 'Tailwind', iconUrl: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
    ],
    featured: true,
  },
  {
    title: 'SPK Pembebasan Bersyarat',
    description: 'Web-based decision support system using TOPSIS method for conditional release of inmates.',
    link: 'https://spk-lp-iia.vercel.app',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/bukutamuproject.appspot.com/o/projects%2Fspk-lp-iia.PNG?alt=media&token=718812ac-9e10-45e2-8796-b12d55913184',
    technologies: [
      { name: 'Node.js', iconUrl: 'https://cdn.simpleicons.org/Node.js/5FA04E' },
      { name: 'Express', iconUrl: 'https://cdn.simpleicons.org/express/ffffff' },
      { name: 'MySQL', iconUrl: 'https://cdn.simpleicons.org/mysql/4479A1' },
    ],
    featured: true,
  },
  {
    title: 'Litlane Book',
    description: 'Free book reading platform with multiple genres aimed at improving literacy.',
    link: 'https://litlane-book-app.vercel.app',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/bukutamuproject.appspot.com/o/projects%2Flitlane-book.PNG?alt=media&token=989d447d-3988-439c-8dfe-eb67875c8fb4',
    technologies: [
      { name: 'Node.js', iconUrl: 'https://cdn.simpleicons.org/Node.js/5FA04E' },
      { name: 'Express', iconUrl: 'https://cdn.simpleicons.org/express/ffffff' },
      { name: 'MongoDB', iconUrl: 'https://cdn.simpleicons.org/mongodb/47A248' },
      { name: 'Bootstrap', iconUrl: 'https://cdn.simpleicons.org/bootstrap/7952B3' },
    ],
    featured: true,
  },
  {
    title: 'Register Management ICAFFA',
    description: 'Registration system for the International Conference on Agriculture, Food, Forestry and Agribusiness 2024.',
    link: '#',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/bukutamuproject.appspot.com/o/projects%2Fregister-management.PNG?alt=media&token=14922ebf-5207-4119-9679-867b764b726f',
    technologies: [
      { name: 'React', iconUrl: 'https://cdn.simpleicons.org/react/61DAFB' },
      { name: 'Node.js', iconUrl: 'https://cdn.simpleicons.org/Node.js/5FA04E' },
      { name: 'MongoDB', iconUrl: 'https://cdn.simpleicons.org/mongodb/47A248' },
      { name: 'Tailwind', iconUrl: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
    ],
  },
  {
    title: 'Wedding Invitation',
    description: 'Interactive digital wedding invitation with dynamic animations and event information.',
    link: 'https://wedding-invitation-lofi-bwv3.vercel.app',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/bukutamuproject.appspot.com/o/projects%2Fwedding-invitation.PNG?alt=media&token=c9cf6cdf-50d9-440f-a85a-40bebbd3af61',
    technologies: [
      { name: 'React', iconUrl: 'https://cdn.simpleicons.org/react/61DAFB' },
      { name: 'Node.js', iconUrl: 'https://cdn.simpleicons.org/Node.js/5FA04E' },
      { name: 'Tailwind', iconUrl: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
    ],
  },
  {
    title: "Mbul's Adventure",
    description: 'Arcade game built during 4th semester coursework using Unity and C#.',
    link: 'https://itch.io/e/10612624/chipset-unc-updated-mbuls-adventure',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/bukutamuproject.appspot.com/o/projects%2Fmbul-adventures.png?alt=media&token=58c5bf99-aae4-453a-9926-e1b8b652cade',
    technologies: [
      { name: 'Unity', iconUrl: 'https://cdn.simpleicons.org/unity/ffffff' },
      { name: '.NET', iconUrl: 'https://cdn.simpleicons.org/dotnet/512BD4' },
    ],
  },
  {
    title: 'Top Up Game | Delta Store',
    description: 'Fast and secure game top-up platform with payment integration.',
    link: 'https://top-up-game-orcin.vercel.app',
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/bukutamuproject.appspot.com/o/projects%2Fdelta-store.PNG?alt=media&token=09cd961c-2c14-4af0-8cae-d02a2b1b3fb0',
    technologies: [
      { name: 'Node.js', iconUrl: 'https://cdn.simpleicons.org/Node.js/5FA04E' },
      { name: 'Express', iconUrl: 'https://cdn.simpleicons.org/express/ffffff' },
      { name: 'MySQL', iconUrl: 'https://cdn.simpleicons.org/mysql/4479A1' },
    ],
  },
];
