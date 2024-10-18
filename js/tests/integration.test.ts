import * as sdk from "../src";
import * as fs from "fs";
import * as solana from "@solana/web3.js";
import * as os from "os";

const getLocalWallet = () => {
  let homeDir = os.homedir();

  const localWalletFile = fs.readFileSync(homeDir + "/.config/solana/id.json");

  let jsonParsed = Uint8Array.from(JSON.parse(localWalletFile.toString()));

  return solana.Keypair.fromSecretKey(jsonParsed);
};

const localWallet = solana.Keypair.generate();
const wallet2 = solana.Keypair.generate();

const connection = new solana.Connection("http://127.0.0.1:8899");

console.log("Airdropping... for pubkey", localWallet.publicKey.toBase58());

const [txId1, txId2] = await Promise.all([
  connection.requestAirdrop(
    localWallet.publicKey,
    10 * solana.LAMPORTS_PER_SOL
  ),
  connection.requestAirdrop(wallet2.publicKey, 10 * solana.LAMPORTS_PER_SOL),
]);

await Promise.all([
  connection.confirmTransaction(txId1, "confirmed"),
  connection.confirmTransaction(txId2, "confirmed"),
]);

describe("Integration tests", () => {
  it("Create an account", async () => {
    try {
      let newAcc = solana.Keypair.generate();

      const ix = sdk.createCreateAccountInstruction(
        {
          feePayerAcc: localWallet.publicKey,
          newAcc: newAcc.publicKey,
          systemProgramAcc: solana.SystemProgram.programId,
        },
        {
          createMyAccountIx: {
            data: "new acc",
          },
        }
      );

      const tx = new solana.Transaction().add(ix);

      const blockhashWithHeight = await connection.getLatestBlockhash();

      tx.recentBlockhash = blockhashWithHeight.blockhash;

      tx.feePayer = localWallet.publicKey;

      tx.sign(newAcc, localWallet);

      const txSig = await connection.sendRawTransaction(tx.serialize(), {
        preflightCommitment: "confirmed",
      });

      console.log("Transaction signature", txSig);

      await connection.confirmTransaction(txSig, "confirmed");
    } catch (err) {
      console.error(err);
    }
  });
  it("Create a PDA account", async () => {
    try {
      const seeds = [Buffer.from("pda_accc"), localWallet.publicKey.toBuffer()];

      const [newAcc, bump] = solana.PublicKey.findProgramAddressSync(
        seeds,
        sdk.PROGRAM_ID
      );

      const ix = sdk.createCreatePDAAccountInstruction(
        {
          feePayerAcc: localWallet.publicKey,
          newPdaAcc: newAcc,
          systemProgramAcc: solana.SystemProgram.programId,
        },
        {
          createMyPdaAccountIx: {
            data: "new acc",
            bump,
          },
        }
      );

      const tx = new solana.Transaction().add(ix);

      const blockhashWithHeight = await connection.getLatestBlockhash();

      tx.recentBlockhash = blockhashWithHeight.blockhash;

      tx.feePayer = localWallet.publicKey;

      tx.sign(localWallet);

      const txSig = await connection.sendRawTransaction(tx.serialize(), {
        preflightCommitment: "confirmed",
      });

      console.log("Transaction signature", txSig);

      await connection.confirmTransaction(txSig, "confirmed");
    } catch (err) {
      console.error(err);
    }
  });
});
