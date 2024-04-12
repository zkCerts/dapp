"use client"

import {useAccount} from "wagmi";
import {submitPassport} from "@/services/gitcoinPassport";
import {Button} from "@/components/ui/button";
import {useAddMemberToPassportLteFive} from "@/hooks/useAddMemberToPassportLteFive";

export default function Home() {
    const account = useAccount();
    const {postMemberRequest} = useAddMemberToPassportLteFive();
    const handleSubmit = async () => {
        if (account) {
            await postMemberRequest({memberId: account?.address || ''});
        }
    };
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Button onClick={handleSubmit}>Submit Passport</Button>
        </main>
    );
}
