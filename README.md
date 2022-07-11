# FUNDRAR

A crowdfunding dapp project.

## Dapp Link

https://fundrar.vercel.app/

## Features

- Light/dark mode toggle
- Responsive
- Cross platform

## Tech Stack

**Frontend:** Next.js, TailwindCSS

**Backend:** Ethereum (Solidity)

**Data Storage:** IPFS (Pinata)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`NEXT_PUBLIC_PROVIDER="Your RPC provider address"`

`NEXT_PUBLIC_DEVELOPMENT=true`

`NEXT_PUBLIC_PINATA_API_KEY="Your api key"`

`NEXT_PUBLIC_PINATA_SECRET_API_KEY="Your api_secret key"`

`NEXT_PUBLIC_CONTRACT_ADDRESS="added when you deploy contract"`

`NEXT_PUBLIC_PRIVATE_KEY="Your account private key"`

## Run Locally

Clone the project

```bash
  git clone https://github.com/ianujshringi/fundrar.git
```

Go to the project directory

```bash
  cd fundrar
```

Install dependencies

```bash
  npm install
```

Deploy Smart Contract

```bash
  npx hardhat run scripts/deploy.js --network ganache
```

Start the server

```bash
  npm run dev
```

## Lessons Learned

I learned a lot while building this project the following are my major learnings:

- Smart contract integration with frontend.
- Importance of solidity events.
- React state management.
- Next.js static site generation.
- Designing responsive ui.

## Demo

[Watch Video](https://twitter.com/i/status/1546191273232838656)

## Screenshots

<p align="left">
    <img src="https://github.com/ianujshringi/fundrar/blob/main/assets/home01.png" width="340" height="181">&emsp;&emsp;
    <img src="https://github.com/ianujshringi/fundrar/blob/main/assets/home02.png" width="340" height="181">
    <img src="https://github.com/ianujshringi/fundrar/blob/main/assets/detail01.png" width="340" height="181">&emsp;&emsp;
    <img src="https://github.com/ianujshringi/fundrar/blob/main/assets/detail02.png" width="340" height="181">
    <img src="https://github.com/ianujshringi/fundrar/blob/main/assets/create_campaign01.png" width="340" height="181">&emsp;&emsp;
    <img src="https://github.com/ianujshringi/fundrar/blob/main/assets/create_campaign02.png" width="340" height="181">
    <img src="https://github.com/ianujshringi/fundrar/blob/main/assets/dashboard01.png" width="340" height="181">&emsp;&emsp;
    <img src="https://github.com/ianujshringi/fundrar/blob/main/assets/dashboard02.png" width="340" height="181">
</p>
