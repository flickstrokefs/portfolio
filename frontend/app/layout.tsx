import { Analytics } from '@vercel/analytics/next'
import { DM_Mono, Instrument_Serif, Kalam } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const serif = Instrument_Serif({ variable: '--font-serif', subsets: ['latin'], weight: '400' })
const mono = DM_Mono({ variable: '--font-mono', subsets: ['latin'], weight: ['400', '500'] })
const hand = Kalam({ variable: '--font-hand', subsets: ['latin'], weight: ['400', '700'] })

export const metadata: Metadata = {
  title: 'Sudhanshu — Multidisciplinary Systems',
  description: 'The working lab notebook of Sudhanshu, a B.Tech AI/ML student building at the edge of hardware, web, and intelligence.',
  generator: 'v0.app',
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#eee8d8' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="bg-background"><body className={`${serif.variable} ${mono.variable} ${hand.variable} antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
