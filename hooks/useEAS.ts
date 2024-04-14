import  { EAS, SchemaEncoder, TransactionSigner }  from "@ethereum-attestation-service/eas-sdk";


import { useEffect, useState } from 'react';

import { useEthersProvider } from './useEthersSigner';

// EAS Schema https://sepolia.easscan.org/schema/view/0x384874900008756077fcdbc7ef7fe91d3e27b0e51d0671c977645440305bcd56

const easContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
const schemaUID = "0x384874900008756077fcdbc7ef7fe91d3e27b0e51d0671c977645440305bcd56";

const eas = new EAS(easContractAddress);

interface AttestData {
  recipient: string;
  expirationTime: bigint;
  revocable: boolean;
  data: string;
  memberIds: string[];
  vote: boolean;
  groupIds: bigint[];
  contractAddress: string;
  tokenId: bigint;
  chainId: bigint;
}

export const useEAS = () => {
  const [connectedEAS, setConnectedEAS] = useState<EAS | null>(null);
  const provider = useEthersProvider({ chainId: 11155111 });

  useEffect(() => {
    const connectEAS = async () => {
      const signer = await provider?.getSigner();
      if (signer) {
        eas.connect(signer);
      }
      setConnectedEAS(eas);
    }
    connectEAS();
  }, [provider]);

  const attest = async (attestData: Partial<AttestData>) => {
    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder("string[] memberIds,bool vote,uint256[] groupIds,address contractAddress,uint256 tokenId,uint256 chainId");
    const encodedData = schemaEncoder.encodeData([
      { name: "memberIds", value: attestData?.memberIds || [], type: "string[]" },
      { name: "vote", value: attestData.vote || false, type: "bool" },
      { name: "groupIds", value: attestData.groupIds || [], type: "uint256[]" },
      { name: "contractAddress", value: attestData?.contractAddress || '', type: "address" },
      { name: "tokenId", value: attestData.tokenId || 0, type: "uint256" },
      { name: "chainId", value: attestData?.chainId || 0, type: "uint256" },
    ]);
    const tx = await eas?.attest({
      schema: schemaUID,
      data: {
        recipient: attestData.contractAddress || "",
        expirationTime: 0 as unknown as bigint,
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        data: encodedData,
      },
    });
      console.log("New attestation UID:", tx);
  };

  return { connectedEAS, attest };
};