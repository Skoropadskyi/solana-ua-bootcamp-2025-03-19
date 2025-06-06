import { Keypair } from "@solana/web3.js";
import "dotenv/config";

const pk = process.env.PK;

if (!pk) {
    console.log("No private key provided");
    process.exit(1);
}

const asBytes = Uint8Array.from(JSON.parse(pk));
const keypair = Keypair.fromSecretKey(asBytes);

console.log("Public key", keypair.publicKey.toBase58());

// 3Hrfnu3vwSnJ9DvLB4zmhDSU3UkH3bq5ZnCNH6iAsx9c