import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600'],
})

const interDisplay = Inter({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'Aside Design System',
  description: 'Complete design system extracted from the Aside browser',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#121212' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${interDisplay.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  )
}