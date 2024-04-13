"use client"

import {useAccount} from "wagmi";
import {submitPassport} from "@/services/gitcoinPassport";
import {Button} from "@/components/ui/button";
import {useEAS} from "@/hooks/useEAS";
import {useState} from "react";
import {useAddMemberToPassportLteFive} from "@/hooks/useAddMemberToPassportLteFive";

export default function Home() {
    const {attest} = useEAS();
    const account = useAccount();
    const {postMemberRequest} = useAddMemberToPassportLteFive();
    const [passport, setPassport] = useState<string>('');
    const handleSubmit = async () => {
        if (account) {
            const res = await submitPassport(account?.address || '');
            setPassport(res);

        }
    };
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col">
                <Button onClick={handleSubmit}>Submit Passport</Button>
                <p>Passport score {passport.score ?? "N/A"}</p>
                <Button onClick={() => attest('s', 's')}>Attest</Button>
                <Button onClick={() => postMemberRequest({memberId: account?.address as string})}>Add Member</Button>
            </div>
        </main>
    );
}
