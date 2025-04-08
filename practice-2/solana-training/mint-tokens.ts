import "dotenv/config";
import { getExplorerLink } from "@solana-developers/helpers";
import { Keypair, clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { mintTo } from "@solana/spl-token";

const pk = process.env.PK;

if (!pk) {
    console.log("No private key provided");
    process.exit(1);
}

const asBytes = Uint8Array.from(JSON.parse(pk));
const keypair = Keypair.fromSecretKey(asBytes);

const connection = new Connection(clusterApiUrl("devnet"));

// Our token has two decimal places
const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const tokenMintAccount = new PublicKey("AxeWYAXntSZWGvv4qCtUYV3Ar3hTZDD3TEC2i99mXyT1");

const recipientAssociatedTokenAccount = new PublicKey("3XiU81FxJ1dXF1rTS5CVmdAYoEEVgq9zdba3idQTmxKz");
  
const transactionSignature = await mintTo(
    connection,
    keypair,
    tokenMintAccount,
    recipientAssociatedTokenAccount,
    keypair,
    10 * MINOR_UNITS_PER_MAJOR_UNITS
  );
  
  const link = getExplorerLink("transaction", transactionSignature, "devnet");
  
  console.log("✅ Success!");
  console.log(`Mint Token Transaction: ${link}`);
  