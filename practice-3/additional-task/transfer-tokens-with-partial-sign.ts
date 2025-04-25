import "dotenv/config";
import { Connection, Keypair, PublicKey, Transaction, sendAndConfirmTransaction, clusterApiUrl } from "@solana/web3.js";
import { createTransferInstruction, TOKEN_PROGRAM_ID } from "@solana/spl-token";

const pk = process.env.PK;
const pk2 = process.env.PK2;

if (!pk) {
    console.log("No private key provided_1");
    process.exit(1);
}

if (!pk2) {
  console.log("No private key provided_2");
  process.exit(1);
}

const asBytes = Uint8Array.from(JSON.parse(pk));
const sender = Keypair.fromSecretKey(asBytes);

const asBytes2 = Uint8Array.from(JSON.parse(pk2));
const receiver  = Keypair.fromSecretKey(asBytes2);

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

const senderTokenAccount = new PublicKey('3Hrfnu3vwSnJ9DvLB4zmhDSU3UkH3bq5ZnCNH6iAsx9c');
const receiverTokenAccount = new PublicKey('KszJ5EeKo5Pxh58FLkBa6t9yTXYYgKhupkFzP7mQymp');
// const mint = new PublicKey('AxeWYAXntSZWGvv4qCtUYV3Ar3hTZDD3TEC2i99mXyT1');   
// KszJ5EeKo5Pxh58FLkBa6t9yTXYYgKhupkFzP7mQymp
const amount = 1_000_000;

const transaction = new Transaction();

const transferIx = createTransferInstruction(
  senderTokenAccount,
  receiverTokenAccount,
  sender.publicKey,  // authority
  amount,
  [],
  TOKEN_PROGRAM_ID
);

transaction.add(transferIx);

const latestBlockhash = await connection.getLatestBlockhash();
transaction.recentBlockhash = latestBlockhash.blockhash;
transaction.feePayer = receiver.publicKey;

transaction.partialSign(sender);

console.log('✍️ Відправник підписав транзакцію (partialSign)');

transaction.partialSign(receiver); // тепер транзакція має всі необхідні підписи

  const rawTx = transaction.serialize();
  const signature = await connection.sendRawTransaction(rawTx);
  await connection.confirmTransaction(signature, 'confirmed');

  console.log('✅ Готово! Транзакція виконана.');
  console.log('🔗 https://explorer.solana.com/tx/' + signature + '?cluster=devnet');