# SoonerBoomer+: Claimable ERC-20 Token dApp

SoonerBoomer+ is a decentralized application (dApp) developed on the Ethereum Sepolia testnet that demonstrates secure, structured token distribution for university-level engagement systems. Inspired by the University of Oklahoma, it combines blockchain-based smart contracts with an interactive React-based frontend to simulate educational incentive mechanisms using ERC-20 tokens.

## Key Features

* ERC-20 token: SoonerBoomer (SBMR) deployed on Sepolia
* Two distribution methods:

  * Allowlist-based Claim
  * Merkle Tree Proof-based Claim
* One-time redemption logic
* Fully responsive React UI with MetaMask integration
* Smart contract deployment and verification using Hardhat

---

## Getting Started

### Prerequisites

* Node.js & npm installed
* MetaMask wallet set to Sepolia testnet
* Sepolia ETH from faucet for gas

### 1. Clone the Repository

```bash
git clone https://github.com/ayyagarisujanreddy123/soonerboomer-dapp.git
cd soonerboomer-dapp
```  
OR


Press Ctrl+Shift+P (or Cmd+Shift+P on Mac) to open the Command Palette

Type:

Git: Clone

Paste your GitHub repo URL: https://github.com/ayyagarisujanreddy123/soonerboomer-dapp.git





### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Deploy Contracts

```bash
npx hardhat run scripts/deploy-token.js --network sepolia
npx hardhat run scripts/deploy-allowlist.js --network sepolia
npx hardhat run scripts/deploy-merkle.js --network sepolia
```

### 4. Generate Merkle Proofs

```bash
node scripts/build-merkle.js
```

### 5. Fund Contracts with Tokens

```bash
npx hardhat run scripts/fund-merkle.js --network sepolia
```

---

## Contracts

| Contract       | Address                                      | Description                          |
| -------------- | -------------------------------------------- | ------------------------------------ |
| SoonerBoomer   | `0x19F58FdB268ae8fd4aEF1A79BA006A00BCBF3c4E` | ERC-20 token (SBMR)                  |
| AllowlistClaim | `0x514D5613B7927FC8F27Bc353602e335C203868a1` | Claim 1000 SBMR if allowlisted       |
| MerkleClaim    | `0x7edD1b58f191122a134EEAD162B992bA36808a81` | Claim using Merkle proof if eligible |

---

## Technologies Used

* Solidity + OpenZeppelin (ERC-20 base, MerkleProof)
* Hardhat (development, testing, deployment)
* merkletreejs + keccak256 for Merkle proofs
* Ethers.js (frontend and scripts)
* React + Vite (frontend)
* Tailwind CSS (UI styling)
* MetaMask (wallet interaction)
* Alchemy/Infura (Sepolia RPC)
* Etherscan (verification and analytics)

---

## Frontend Instructions

```bash
cd soonerboomer-ui
npm install
npm run dev
```

Then open: [http://localhost:5173](http://localhost:5173)

### UI Features:

* Wallet connection (via MetaMask)
* Address toggle (own vs. custom)
* Eligibility check (allowlist or Merkle)
* Token claim via chosen method
* Status display and transaction links

---

## Future Work

* Add admin dashboard to manage allowlists via UI
* Implement Chainlink oracle for dynamic claim criteria
* Enable batch reward distribution
* Integrate with LMS (e.g., Canvas) for event-driven incentives
* Add zero-knowledge proof (ZKP) support for private eligibility

---

## Useful Links

* [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)
* [Hardhat Documentation](https://hardhat.org/docs)
* [ethers.js Docs](https://docs.ethers.org/)
* [merkletreejs](https://github.com/miguelmota/merkletreejs)
* [Sepolia Etherscan](https://sepolia.etherscan.io)
* [MetaMask](https://metamask.io)


# Structure 

<pre> ```bash
soonerboomer-dapp/
│
├── contracts/                   # Solidity smart contracts
│   ├── AllowlistClaim.sol
│   ├── MerkleClaim.sol
│   └── SoonerBoomerToken.sol
│
├── ignition/modules/
│   └── Lock.js
│
├── scripts/                     # Deployment & utility scripts
│   ├── add-to-allowlist.js
│   ├── build-merkle.js
│   ├── Check-allowlist.js
│   ├── check-eligibility.js
│   ├── claim-from-merkle.js
│   ├── claim-tokens.js
│   ├── deploy.js
│   ├── deploy-allowlist.js
│   ├── deploy-merkle.js
│   └── fund-merkle.js
│
├── soonerboomer-ui/            # Frontend (React + Vite + Tailwind)
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   ├── react.svg
│   │   │   └── token-logo.png
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── proofs.json
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── README- Fornt end.md
│
├── test/
│   └── Lock.js
│
├── .env
├── allowlist.json
├── auto-commit.sh
├── hardhat.config.js
├── proofs.json
├── README.md
```</pre>
 
## License

MIT License © 2025 Sujan Reddy Ayyagari

---

## Presentation Video Link

<https://drive.google.com/file/d/1Qf_8V-tbW9ojPP_HcqT-Cj_-uSuE17Nz/view?usp=drivesdk>

---

## Team

* Sujan Reddy Ayyagari - sujan.reddy.ayyagari-1@ou.edu
* Surya Prabhav Gurram - surya.prabhav.gurram-1@ou.edu
