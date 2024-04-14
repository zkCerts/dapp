"use client"

import {useAccount} from "wagmi";
import {submitPassport} from "@/services/gitcoinPassport";
import {Button} from "@/components/ui/button";
import {useEAS} from "@/hooks/useEAS";
import {useEffect, useState} from "react";
import {useAddMemberToPassportLteFive} from "@/hooks/useAddMemberToPassportLteFive";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AttestForm from "@/components/AttestForm";
import { GROUP_IDS } from "@/utils/constants";
import {generateMemberId} from "@/utils/generateMemberId";

export default function Home() {
    const {attest} = useEAS();
    const account = useAccount();
    const {postMemberRequest, getMembership} = useAddMemberToPassportLteFive();
    const [passport, setPassport] = useState<{ score: string }>({score: '0'});
    const handleSubmit = async () => {
        if (account) {
            const res = await submitPassport(account?.address || '');
            setPassport(res);
        }
    };

    useEffect(() => {
        async function fetchData() {
            if (account) {
                const res = await getMembership({memberId: account?.address || ''});
                console.log(res);
            }
        }

        fetchData();
    }, [account])

    const attestData = {
      memberIds: [generateMemberId(BigInt(GROUP_IDS.PASSPORT_LTE_FIVE), BigInt(Math.round(+passport.score)), account?.address)],
      vote: true,
      groupIds: [BigInt(GROUP_IDS.PASSPORT_LTE_FIVE)],
      contractAddress: '0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941',
      chainId: 11155111n,
      tokenId: 135772664401454446921886468365275516370944n,
    }

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Tabs defaultValue="1. Gitcoin Passport" className="w-[800px]">
          <TabsList className="w-[100%]">
          <TabsTrigger value="1. Gitcoin Passport">
            1. Gitcoin Passport
          </TabsTrigger>
          <TabsTrigger value="2. Validate Score">
            2. Validate Score
          </TabsTrigger>
          <TabsTrigger value="3. Submit Attestation">
            3. Attest
          </TabsTrigger>
          </TabsList>
          <TabsContent value="1. Gitcoin Passport" className="border-2 border-lightgray p-2">
          <p>Passport score {passport?.score ?? "N/A"}</p>
          <Button onClick={handleSubmit}>Submit Passport</Button>
          </TabsContent>
          <TabsContent value="2. Validate Score" className="border-2 border-lightgray p-2">
                    <Button
                        onClick={() => postMemberRequest({
                            memberId: attestData.memberIds[0],
                        })}>Add
                        Member</Button>
                </TabsContent>
          <TabsContent value="3. Submit Attestation" className="border-2 border-lightgray p-2">
            <AttestForm handleAttestSubmit={() => attest(attestData)} />
          </TabsContent>
        </Tabs>
      </main>
    );
}
