This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Features

##### Store credentials
```mermaid
sequenceDiagram
    User->>App: Store passport score
    App->>Passport: Give me my score
    Passport-->>App: "25"
    App->>EAS: Attest score for user
    EAS-->>App: return attestation UID "0xe7eyd3..823q4"
    App->zkSolution: Store link between user and score
    zkSolution-->>App: Return zkProof?
    App->>User: Return zkProof?
```

##### Attach credentials for evaluation
```mermaid
sequenceDiagram
    User->>App: create evaluation
    App-->>EAS: create attestation
    EAS-->>App: 'give me zkProof'
    App-->>EAS: zkProof for credentials
    EAS-->>Registry: create attestation with zkProofs
```

##### Verify credentials of evaluator
```mermaid
sequenceDiagram
    Evaluator->>App: fetch evaluation
    App->>Evaluation: get zkProof
    Evaluation-->>App: ['090s8a9dhiun...d89hd3adasa']
    App->>zkSolution: 'is passport above 20 while attesting?''
    zkSolution-->>App: yes
    App->>Evaluator: 'it's a credible attestation'
```



## Future improvements

### Use TLSNotary to validate the authenticity of the data source

[TLSNotary](https://pse.dev/en/projects/tlsn)

### Obfuscate the attestor address by submitting proof to an anonymity set

[AnonKlub](https://docs.anonklub.xyz/docs/intro)? to verify the claim was created by a user in the anonymity set without revealing the attestor address.

### Implement in MetaLinks

[MetaLinks](https://meta-links.vercel.app/)

### Connect with hypercerts ecosystem 

Hypercerts are the cornerstone of an interconnected impact funding network. Impact claims, evaluations and funding are all linked to a hypercert. By providing anonymous evaluations, we can improve the validity of an impact claim and the funding is well spent.