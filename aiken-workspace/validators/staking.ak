use aiken/transaction.{ScriptContext, WithdrawFrom, placeholder}
use aiken/transaction/credential.{Inline, ScriptCredential}
use mocktail/virgin_key_hex.{mock_script_hash}

validator {
  fn always_succeed_withdrawal_policy(_redeemer: Data, context: ScriptContext) {
    expect WithdrawFrom(_) = context.purpose
    True
  }
}

test test_always_succeed_withdrawal_policy() {
  let data = Void
  let context =
    ScriptContext {
      purpose: WithdrawFrom(Inline(ScriptCredential(mock_script_hash(0)))),
      transaction: placeholder(),
    }
  always_succeed_withdrawal_policy(data, context)
}
