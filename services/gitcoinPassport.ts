export const submitPassport = async (address: string) => {
  const url = 'https://api.scorer.gitcoin.co/registry/submit-passport';
  const body = JSON.stringify({
    address: address,
    signature: "",
    scorer_id: process.env.NEXT_PUBLIC_GITCOIN_SCORER_ID,
    community: "deprecated",
    nonce: ""
  });

  const response = await fetch(url, {
    method: 'POST',
    body,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.NEXT_PUBLIC_GITCOIN_PASSPORT_API_KEY || ''
    }
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('API request failed with status ' + response.status);
  }
};