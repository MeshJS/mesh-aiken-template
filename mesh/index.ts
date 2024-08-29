import { newWallet, provider, sleep } from "./common";
import { MeshContractTx } from "./transactions/minting";

const testTx = async () => {
  const wallet = newWallet([
    "file",
    "allow",
    "member",
    "sister",
    "rescue",
    "sound",
    "poverty",
    "occur",
    "hat",
    "amount",
    "verify",
    "fade",
    "now",
    "senior",
    "immense",
    "nest",
    "asthma",
    "fence",
    "torch",
    "permit",
    "figure",
    "gauge",
    "canvas",
    "gown",
  ]);

  const tx = new MeshContractTx(wallet);
  const address = wallet.getUsedAddresses()[0];

  await provider.fundWallet(address, 5);
  await sleep(1);
  await provider.fundWallet(address, 1000);
  await sleep(1);

  const txHex = await tx.mintingAlwaysSucceed();
  console.log("txHex", txHex);

  const signedTx = wallet.signTx(txHex);
  console.log("signedTx:", signedTx);

  const txHash = await wallet.submitTx(signedTx);
  console.log("txHash:", txHash);
};

testTx();
