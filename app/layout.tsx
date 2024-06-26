"use client"

import { ThemeProvider } from "@/components/theme";
import { Inter } from "next/font/google";
import { Web3Provider } from "@/services/web3provider";
import "./globals.css";
import { ConnectKitButton } from "connectkit";
import { Inter as FontSans } from "next/font/google" 
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] });

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Web3Provider>
        <body 
           className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div style={{ height: '5vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'right', paddingRight: '1em' }}>
              <ConnectKitButton />
            </div>
            {children}
          </ThemeProvider>
        </body>
      </Web3Provider>
    </html>
  );
}
