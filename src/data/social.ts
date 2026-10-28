export interface SocialLink {
  name: string;
  url: string;
  icon: 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'github' | 'meetup' | 'community';
}

// Kept in sync with the canonical channel list at https://links.gdgpisa.it/
export const socialLinks: SocialLink[] = [
  { name: 'Facebook', url: 'https://facebook.com/gdg.pisa', icon: 'facebook' },
  { name: 'Instagram', url: 'https://instagram.com/gdgpisa', icon: 'instagram' },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/gdgpisa', icon: 'linkedin' },
  { name: 'YouTube', url: 'https://www.youtube.com/@gdgpisa4445', icon: 'youtube' },
  { name: 'Meetup', url: 'https://www.meetup.com/GDG-Pisa/', icon: 'meetup' },
  { name: 'GitHub', url: 'https://github.com/gdgPisa', icon: 'github' },
  { name: 'GDG community.dev', url: 'https://gdg.community.dev/gdg-pisa', icon: 'community' },
];
