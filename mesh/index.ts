import { wallet } from "./common";
import { mintingAlwaysSucceed } from "./transactions/minting";

const testTx = async () => {
  const txHex = await mintingAlwaysSucceed();
  console.log("txHex", txHex);

  const signedTx = wallet.signTx(txHex);
  console.log("signedTx:", signedTx);

  const txHash = await wallet.submitTx(signedTx);
  console.log("txHash:", txHash);
};

testTx();
