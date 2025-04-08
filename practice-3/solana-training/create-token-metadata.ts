import "dotenv/config";
import { Connection, clusterApiUrl, Keypair, PublicKey, sendAndConfirmTransaction, Transaction, } from "@solana/web3.js";
import { getExplorerLink } from "@solana-developers/helpers";
// Yes, createCreate! We're making an instruction for createMetadataV3...
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

const pk = process.env.PK;

if (!pk) {
    console.log("No private key provided");
    process.exit(1);
}

const asBytes = Uint8Array.from(JSON.parse(pk));
const keypair = Keypair.fromSecretKey(asBytes);

const connection = new Connection(clusterApiUrl("devnet"));

const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
  
const tokenMintAccount = new PublicKey("AxeWYAXntSZWGvv4qCtUYV3Ar3hTZDD3TEC2i99mXyT1");
  
const metadataData = {
    name: "Solana UA Bootcamp",
    symbol: "UAB-3",
    // Arweave / IPFS / Pinata etc link using metaplex standard for off-chain data
    uri: "https://arweave.net/1234",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null,
  };

  const [metadataPDA, _metadataBump] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      tokenMintAccount.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );
    
const transaction = new Transaction();
const createMetadataAccountInstruction =
  createCreateMetadataAccountV3Instruction(
    {
      metadata: metadataPDA,
      mint: tokenMintAccount,
      mintAuthority: keypair.publicKey,
      payer: keypair.publicKey,
      updateAuthority: keypair.publicKey,
    },
    {
      createMetadataAccountArgsV3: {
        collectionDetails: null,
        data: metadataData,
        isMutable: true,
      },
    }
  );
transaction.add(createMetadataAccountInstruction);

await sendAndConfirmTransaction(
    connection,
    transaction,
    [keypair]
  );
  
  const tokenMintLink = getExplorerLink(
    "address",
    tokenMintAccount.toString(),
    "devnet"
  );
  console.log(`✅ Look at the token mint again: ${tokenMintLink}!`);