export const submitPassport = async (address: string) => {
  const submitUrl = 'https://api.scorer.gitcoin.co/registry/submit-passport';
  const scoreId = process.env.NEXT_PUBLIC_GITCOIN_SCORER_ID;
  const body = JSON.stringify({
    address: address,
    signature: "",
    scorer_id: scoreId,
    community: "deprecated",
    nonce: ""
  });

  const response = await callGitcoinApi(submitUrl, 'POST', body);

  if (response.ok) {
    const data = await response.json();
    const scoreUrl = `https://api.scorer.gitcoin.co/registry/score/${scoreId}/${address}`;
    const scoreResponse = await callGitcoinApi(scoreUrl, 'GET');
    if (scoreResponse.ok) {
      const scoreData = await scoreResponse.json();
      // Do something with the scoreData
      console.log(scoreData)
    } else {
      throw new Error('API request failed with status ' + scoreResponse.status);
    }
    return data;
  } else {
    throw new Error('API request failed with status ' + response.status);
  }
};

const callGitcoinApi = async (url: string, method: string, body?: any) => {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': process.env.NEXT_PUBLIC_GITCOIN_PASSPORT_API_KEY || ''
    }
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error('API request failed with status ' + response.status);
  }
}