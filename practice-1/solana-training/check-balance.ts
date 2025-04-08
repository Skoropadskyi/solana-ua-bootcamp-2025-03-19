import { Connection, LAMPORTS_PER_SOL,PublicKey, clusterApiUrl } from "@solana/web3.js";
import { airdropIfRequired } from "@solana-developers/helpers";

const connection = new Connection(clusterApiUrl("devnet"));
console.log("Connected to devnet");

const pubKey = new PublicKey("3Hrfnu3vwSnJ9DvLB4zmhDSU3UkH3bq5ZnCNH6iAsx9c");
const balanceInLamports = await connection.getBalance(pubKey);

// First

// const airdrop1 = await airdropIfRequired(connection, pubKey,
//     1 * LAMPORTS_PER_SOL,
//     0.5 * LAMPORTS_PER_SOL
// );

// console.log("Airdrop1" ,airdrop1);


// Second 

// await connection.requestAirdrop(pubKey, 1 * LAMPORTS_PER_SOL);

const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

console.log(`The balance for the wallet at address ${pubKey} is: ${balanceInSol}`);
