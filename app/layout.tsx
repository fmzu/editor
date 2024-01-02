import { cn } from "@/lib/utils"
import "./globals.css"

import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next"
import { Hachi_Maru_Pop } from "next/font/google"

const font = Hachi_Maru_Pop({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

type Props = {
  children: React.ReactNode
}

export default function RootLayout(props: Props) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          font.variable,
        )}
      >
        {props.children}
        <Toaster />
      </body>
    </html>
  )
}
