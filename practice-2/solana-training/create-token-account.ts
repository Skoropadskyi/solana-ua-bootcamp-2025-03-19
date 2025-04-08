import "dotenv/config";
import { getExplorerLink } from "@solana-developers/helpers";
import { Keypair, clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

const pk = process.env.PK;

if (!pk) {
    console.log("No private key provided");
    process.exit(1);
}

const asBytes = Uint8Array.from(JSON.parse(pk));
const keypair = Keypair.fromSecretKey(asBytes);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(`🔑 Our public key is: ${keypair.publicKey.toBase58()}`);

const tokenMintAccount = new PublicKey("AxeWYAXntSZWGvv4qCtUYV3Ar3hTZDD3TEC2i99mXyT1");
const recipient = new PublicKey("3Hrfnu3vwSnJ9DvLB4zmhDSU3UkH3bq5ZnCNH6iAsx9c");

const tokenAccount = await getOrCreateAssociatedTokenAccount (
    connection,
    keypair,
    tokenMintAccount,
    recipient
);

console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

const link = getExplorerLink (
    "address",
    tokenAccount.address.toBase58(),
    "devnet"
);

console.log(`✅ Created token account: ${link}`);
