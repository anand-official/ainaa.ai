import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, Space_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import Cursor from '@/components/Cursor'
import PageLoader from '@/components/PageLoader'
import FloatingCTA from '@/components/FloatingCTA'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ainaa.ai — Clarity before you leave the house.',
  description:
    'A personal outfit operating system. Stop wasting decisions on what to wear. Your wardrobe, intelligently organised.',
  openGraph: {
    title: 'ainaa.ai — Clarity before you leave the house.',
    description: 'A personal outfit operating system. Coming soon.',
    url: 'https://ainaa.ai',
    siteName: 'ainaa.ai',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ainaa.ai — Clarity before you leave the house.',
    description: 'A personal outfit operating system. Coming soon.',
  },
  metadataBase: new URL('https://ainaa.ai'),
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        {/* Prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('ainaa-theme')||'dark';document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${spaceMono.variable} antialiased`}
      >
        <ThemeProvider>
          {/* Branded page loader — cinematic intro */}
          <PageLoader />
          {/* Grain texture overlay — always present */}
          <div className="grain-overlay" aria-hidden="true" />
          {/* Custom cursor — desktop only */}
          <Cursor />
          {/* Persistent conversion CTA */}
          <FloatingCTA />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
