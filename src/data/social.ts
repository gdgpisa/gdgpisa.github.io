export interface SocialLink {
  name: string;
  url: string;
  icon: 'email' | 'telegram' | 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'github' | 'community';
}

// Kept in sync (same channels, same order) with the canonical list at
// https://links.gdgpisa.it/ — GitHub and community.dev are extra, shown only here.
export const socialLinks: SocialLink[] = [
  { name: 'Email', url: 'mailto:pisagdg@gmail.com', icon: 'email' },
  { name: 'Telegram', url: 'https://gdgpisa.it/telegram', icon: 'telegram' },
  { name: 'Instagram', url: 'https://instagram.com/gdgpisa', icon: 'instagram' },
  { name: 'LinkedIn', url: 'https://linkedin.com/company/gdgpisa', icon: 'linkedin' },
  { name: 'Facebook', url: 'https://facebook.com/gdg.pisa', icon: 'facebook' },
  { name: 'YouTube', url: 'https://www.youtube.com/@gdgpisa4445', icon: 'youtube' },
  { name: 'GitHub', url: 'https://github.com/gdgPisa', icon: 'github' },
  { name: 'GDG community.dev', url: 'https://gdg.community.dev/gdg-pisa', icon: 'community' },
];
