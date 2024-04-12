"use client"

import Image from "next/image";
import { useAccount } from "wagmi";
import { submitPassport } from "@/services/gitcoinPassport";
import { Button } from "@/components/ui/button";

export default function Home() {
  const account = useAccount();
  const handleSubmit = async () => {
    if (account) {
      await submitPassport(account?.address || '');
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={handleSubmit}>Submit Passport</Button>
    </main>
  );
}
