import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Consett Marketing',
  description: 'Meet the husband-and-wife team behind Consett Marketing, combining technical strategy with brand, content and campaign expertise.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
