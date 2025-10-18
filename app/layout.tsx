import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Shun Kakinoki',
  description: 'Shun Kakinoki\'s personal website',
  generator: 'shunkakinoki.com',
  openGraph: {
    title: 'Shun Kakinoki',
    description: 'Shun Kakinoki\'s personal website',
    images: ['/shunkakinoki.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shun Kakinoki',
    description: 'Shun Kakinoki\'s personal website',
    images: ['/shunkakinoki.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
