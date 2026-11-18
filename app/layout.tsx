import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SendSure | Email Checklist for Executive Assistants',
  description: 'Review important emails and meeting invitations with a structured pre-send checklist. SendSure helps executive assistants reduce repetitive checking and send with greater confidence.',
  alternates: { canonical: process.env.NEXT_PUBLIC_SITE_URL || '/' },
  openGraph: { title: 'SendSure | Email Checklist for Executive Assistants', description: 'A calmer, more consistent final review for important professional email.', type: 'website', siteName: 'SendSure' },
  twitter: { card: 'summary_large_image', title: 'SendSure | Email Checklist for Executive Assistants', description: 'A calmer, more consistent final review for important professional email.' },
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
