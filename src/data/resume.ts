export type NavItem = {
  label: string;
  href: string;
};

export const profile = {
  name: 'Harsh Vardhan Bhanot',
  shortName: 'Harsh Bhanot',
  initials: 'HV',
  role: 'Undergraduate Researcher & Builder',
  university: 'Texas A&M University – Corpus Christi',
  degree: 'B.S. Computer Science',
  minor: 'Applied Mathematics',
  graduation: 'May 2026',
  location: 'Corpus Christi, TX',
  email: 'hvbhanot1@gmail.com',
  linkedin: 'https://linkedin.com/in/hvbhanot',
  github: 'https://github.com/hvbhanot',
  bio: 'Undergraduate researcher working at the intersection of computational genetics, machine learning, and reproducible tooling. I build things that make research easier to audit, repeat, and explain.',
  tagline: 'Computational genetics · AI systems · Research tooling',
};

export const navItems: NavItem[] = [
  { label: 'Work', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];