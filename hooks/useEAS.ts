import  { EAS, SchemaEncoder, TransactionSigner }  from "@ethereum-attestation-service/eas-sdk";


import { useEffect, useState } from 'react';

import { useEthersProvider } from './useEthersSigner';

// EAS Schema https://optimism.easscan.org/schema/view/0x8a96480233ab2a15f56db4cdf03877956aaaefc4df9abf1d1707730f82c9a38c

const easContractAddress = "0x4200000000000000000000000000000000000021";
const schemaUID = "0x8a96480233ab2a15f56db4cdf03877956aaaefc4df9abf1d1707730f82c9a38c";
const eas = new EAS(easContractAddress);

export const useEAS = () => {
  const [connectedEAS, setConnectedEAS] = useState<EAS | null>(null);
  const provider = useEthersProvider({ chainId: 10 });

  useEffect(() => {
    const connectEAS = async () => {
      if (provider) {
        eas.connect(provider.getSigner() as unknown as TransactionSigner);
      }
      setConnectedEAS(eas);
    }
    connectEAS();
  }, [provider]);

  const attest = async (message: string, context: string) => {
    // Initialize SchemaEncoder with the schema string
      const schemaEncoder = new SchemaEncoder("bool vote,address contract,string tokenID,string proof");
      const encodedData = schemaEncoder.encodeData([
        { name: "vote", value: false, type: "bool" },
        { name: "contract", value: "0x0000000000000000000000000000000000000000", type: "address" },
        { name: "tokenID", value: "", type: "string" },
        { name: "proof", value: "", type: "string" }
      ]);
      const tx = await eas.attest({
        schema: schemaUID,
        data: {
          recipient: "0x0000000000000000000000000000000000000000",
          expirationTime: '0' as unknown as bigint,
          revocable: true, // Be aware that if your schema is not revocable, this MUST be false
          data: encodedData,
        },
      });
      const newAttestationUID = await tx.wait();
      console.log("New attestation UID:", newAttestationUID);
  };

  return { connectedEAS, attest };
};