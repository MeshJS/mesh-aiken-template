import { newValidationTx } from "../common";
import { applyParamsToScript } from "@meshsdk/core-csl";
import blueprint from "../../aiken-workspace/plutus.json";
import { resolveScriptHash } from "@meshsdk/core";

const mintingScriptCompiledCode = blueprint.validators[0].compiledCode;

export const mintingAlwaysSucceed = async () => {
  const scriptCbor = applyParamsToScript(mintingScriptCompiledCode, []);
  const policyId = resolveScriptHash(scriptCbor, "V2");

  const txBuilder = await newValidationTx();
  const txHex = txBuilder
    .mintPlutusScriptV2()
    .mint("1", policyId, "")
    .mintingScript(scriptCbor)
    .mintRedeemerValue("")
    .complete();

  return txHex;
};
