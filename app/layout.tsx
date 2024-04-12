"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Web3Provider } from "@/services/web3provider";
import "./globals.css";
import { ConnectKitButton } from "connectkit";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Web3Provider>
        <body className={inter.className}>
          <ConnectKitButton />
          {children}
        </body>
      </Web3Provider>
    </html>
  );
}
