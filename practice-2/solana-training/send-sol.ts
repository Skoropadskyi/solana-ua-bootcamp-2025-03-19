import { Connection, Keypair, PublicKey, SystemProgram, Transaction, TransactionInstruction, clusterApiUrl, sendAndConfirmTransaction } from "@solana/web3.js";
import "dotenv/config";

const pk = process.env.PK;

if (!pk) {
    console.log("No private key provided");
    process.exit(1);
}

const asBytes = Uint8Array.from(JSON.parse(pk));
const keypair = Keypair.fromSecretKey(asBytes);

const connection = new Connection(clusterApiUrl("devnet"));

const rec = new PublicKey("KszJ5EeKo5Pxh58FLkBa6t9yTXYYgKhupkFzP7mQymp");

const memoProgram = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"); 
const memoText = "Hello from Solana!";
  
const tx = new Transaction();

const sendSolIx = SystemProgram.transfer({
    fromPubkey: keypair.publicKey,
    toPubkey: rec,
    lamports: 5_000_000
});

const addMemoInstruction = new TransactionInstruction({
    keys: [{ pubkey: keypair.publicKey, isSigner: true, isWritable: false }],
    data: Buffer.from(memoText, "utf-8"),
    programId: memoProgram,
});
  
tx.add(sendSolIx);
tx.add(addMemoInstruction);

console.log(`📝 memo is: ${memoText}`);

// signature

const signed_tx = await sendAndConfirmTransaction(connection, tx, [keypair]);

console.log("Signature", signed_tx);
