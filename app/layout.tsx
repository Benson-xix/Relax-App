import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import CartProvider from '@/providers/CartProvider'
import { Toaster } from 'react-hot-toast'



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Relax',
  description: 'E-commerce app',
  keywords: ["commerce", "Mall", "sleeping", "bed", "foam", "order", "comfort", "pillows", "rest", "Money", "Shopping" ]
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {




  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster toastOptions={{
          style: {
            background: 'rgb(148 163 184 )',
            color: '#fff',
          }
        }}/>
        <CartProvider>
          {children}
        </CartProvider>
        
        </body>
    </html>
  )
}
