import "dotenv/config";
import { getExplorerLink } from "@solana-developers/helpers";
import { Keypair, clusterApiUrl, Connection } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";

const pk = process.env.PK;

if (!pk) {
    console.log("No private key provided");
    process.exit(1);
}

const asBytes = Uint8Array.from(JSON.parse(pk));
const keypair = Keypair.fromSecretKey(asBytes);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(`🔑 Our public key is: ${keypair.publicKey.toBase58()}`);

const tokenMint = await createMint(
    connection,
    keypair,
    keypair.publicKey,
    null,
    2
);

const link = getExplorerLink("address", tokenMint.toString(), "devnet");

console.log(`✅ Token Mint: ${link}`);
