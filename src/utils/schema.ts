import {
  SITE_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  ALTERNATE_NAMES,
  JOB_TITLE,
  CONTACT_EMAIL,
  SOCIAL_LINKS,
} from '@/consts';

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: SITE_TITLE,
  alternateName: ALTERNATE_NAMES,
  url: SITE_URL,
  image: `${SITE_URL}/profile-1.jpg`,
  jobTitle: JOB_TITLE,
  description: SITE_DESCRIPTION,
  email: `mailto:${CONTACT_EMAIL}`,
  sameAs: SOCIAL_LINKS,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'North Jakarta',
    addressRegion: 'Jakarta',
    addressCountry: 'ID',
  },
  knowsAbout: [
    'Full Stack Development',
    'Software Engineering',
    'Web Development',
    'React',
    'Next.js',
    'Node.js',
    'Laravel',
    'Vue.js',
    'TypeScript',
    'Astro',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: `${SITE_TITLE} Portfolio`,
  alternateName: 'Josh Trilenggu Portfolio',
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: ['en', 'id'],
  author: { '@id': `${SITE_URL}/#person` },
};

export function breadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}
