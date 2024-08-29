import { applyParamsToScript } from "@meshsdk/core-csl";
import blueprint from "../../aiken-workspace/plutus.json";
import { MeshWallet, resolveScriptHash } from "@meshsdk/core";
import { MeshTx } from "../common";

const mintingScriptCompiledCode = blueprint.validators[0].compiledCode;

export class MeshContractTx extends MeshTx {
  constructor(wallet: MeshWallet) {
    super(wallet);
  }

  mintingAlwaysSucceed = async () => {
    const scriptCbor = applyParamsToScript(mintingScriptCompiledCode, []);
    const policyId = resolveScriptHash(scriptCbor, "V2");

    const txBuilder = await this.newValidationTx();
    const txHex = await txBuilder
      .mintPlutusScriptV2()
      .mint("1", policyId, "")
      .mintingScript(scriptCbor)
      .mintRedeemerValue("")
      .complete();

    return txHex;
  };
}
