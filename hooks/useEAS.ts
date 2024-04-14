import  { EAS, SchemaEncoder, TransactionSigner }  from "@ethereum-attestation-service/eas-sdk";


import { useEffect, useState } from 'react';

import { useEthersProvider } from './useEthersSigner';

// EAS Schema https://sepolia.easscan.org/schema/view/0x384874900008756077fcdbc7ef7fe91d3e27b0e51d0671c977645440305bcd56

const easContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e";
const schemaUID = "0x384874900008756077fcdbc7ef7fe91d3e27b0e51d0671c977645440305bcd56";

const eas = new EAS(easContractAddress);

export const useEAS = () => {
  const [connectedEAS, setConnectedEAS] = useState<EAS | null>(null);
  const provider = useEthersProvider({ chainId: 10 });

  useEffect(() => {
    console.log("Provider", provider?.getSigner());
    const connectEAS = async () => {
      const signer = await provider?.getSigner();
      if (signer) {
        eas.connect(signer);
      }
      setConnectedEAS(eas);
    }
    connectEAS();
  }, [provider]);

  const attest = async (message: string, context: string) => {
    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder("string[] memberIds,bool vote,uint256[] groupIds,address contractAddress,uint256 tokenId,uint256 chainId");
    const encodedData = schemaEncoder.encodeData([
      { name: "memberIds", value: [], type: "string[]" },
      { name: "vote", value: false, type: "bool" },
      { name: "groupIds", value: [], type: "uint256[]" },
      { name: "contractAddress", value: "0x0000000000000000000000000000000000000000", type: "address" },
      { name: "tokenId", value: "0", type: "uint256" },
      { name: "chainId", value: "0", type: "uint256" },
    ]);
    const tx = await eas.attest({
      schema: schemaUID,
      data: {
        recipient: "0x0000000000000000000000000000000000000000",
        expirationTime: 0 as unknown as bigint,
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        data: encodedData,
      },
    });
      console.log("New attestation UID:", tx);
  };

  return { connectedEAS, attest };
};