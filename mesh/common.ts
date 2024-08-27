import {
  MeshWallet,
  AppWalletKeyType,
  YaciProvider,
  MeshTxBuilder,
} from "@meshsdk/core";

export const provider = new YaciProvider("http://localhost:8080/api/v1/");

const signingKey: AppWalletKeyType = {
  type: "mnemonic",
  words: new Array(24).fill("summer") as string[],
};

export const wallet = new MeshWallet({
  key: signingKey,
  networkId: 0,
  fetcher: provider,
  submitter: provider,
});

export const newTx = async () => {
  const txBuilder = new MeshTxBuilder({
    fetcher: provider,
    evaluator: provider,
  });

  const utxos = await wallet.getUtxos();
  const address = wallet.getUsedAddresses()[0];
  txBuilder.changeAddress(address).selectUtxosFrom(utxos);
  return txBuilder;
};

export const newValidationTx = async () => {
  const txBuilder = await newTx();
  const collateral = (await wallet.getCollateral())[0];
  txBuilder.txInCollateral(
    collateral.input.txHash,
    collateral.input.outputIndex,
    collateral.output.amount,
    collateral.output.address
  );
  return txBuilder;
};
