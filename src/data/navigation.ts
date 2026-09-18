export interface NavItem {
  text: string;
  url: string;
  /** false = not shown anywhere in navigation. Default true. */
  visible?: boolean;
}

export const navigation: NavItem[] = [{ text: 'Home', url: '/' }];
