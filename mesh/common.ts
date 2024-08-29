import {
  MeshWallet,
  AppWalletKeyType,
  YaciProvider,
  MeshTxBuilder,
} from "@meshsdk/core";
import axios from "axios";

const yaciBaseUrl = process.env.YACI_BASE_URL || "https://yaci-node.meshjs.dev";

export class MeshYaciProvider extends YaciProvider {
  constructor() {
    super(`${yaciBaseUrl}/api/v1`);
  }

  fundWallet = async (walletAddress: string, adaAmount: number) => {
    const res = await axios.post(`${yaciBaseUrl}/admin/topup`, {
      wallet_address: walletAddress,
      ada_amount: adaAmount,
    });
    return res.data;
  };
}

export const provider = new MeshYaciProvider();

export const newWallet = (providedMnemonic?: string[]) => {
  let mnemonic = providedMnemonic;
  if (!providedMnemonic) {
    mnemonic = MeshWallet.brew() as string[];
    console.log(
      "Wallet generated, if you want to reuse the same address, please save the mnemonic:"
    );
    console.log(mnemonic);
  }
  const signingKey: AppWalletKeyType = {
    type: "mnemonic",
    words: mnemonic as string[],
  };

  const wallet = new MeshWallet({
    key: signingKey,
    networkId: 0,
    fetcher: provider,
    submitter: provider,
  });
  return wallet;
};

export class MeshTx {
  constructor(public wallet: MeshWallet) {}

  newTx = async () => {
    const yaciProtocolParam = await provider.fetchProtocolParameters();

    const txBuilder = new MeshTxBuilder({
      fetcher: provider,
      evaluator: provider,
    });
    const utxos = await this.wallet.getUtxos();
    const address = this.wallet.getUsedAddresses()[0];
    txBuilder.changeAddress(address).selectUtxosFrom(utxos);
    return txBuilder;
  };

  newValidationTx = async () => {
    const txBuilder = await this.newTx();
    const collateral = (await this.wallet.getCollateral())[0];
    txBuilder.txInCollateral(
      collateral.input.txHash,
      collateral.input.outputIndex,
      collateral.output.amount,
      collateral.output.address
    );
    return txBuilder;
  };
}

export const sleep = (second: number) =>
  new Promise((resolve) => setTimeout(resolve, second * 1000));
