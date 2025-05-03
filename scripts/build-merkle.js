import fs from 'fs';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

async function main() {
  const allow = JSON.parse(fs.readFileSync('./allowlist.json', 'utf8'));
  const leaves = allow.map(a => keccak256(a));
  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });

  const proofs = {};
  allow.forEach(addr => {
    const proof = tree.getHexProof(keccak256(addr));
    proofs[addr] = proof;
  });

  const out = { root: tree.getHexRoot(), proofs };
  fs.writeFileSync('./proofs.json', JSON.stringify(out, null, 2));
  console.log('✅ proofs.json generated');
}

main().catch(console.error);