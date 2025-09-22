import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  TransactionInstruction,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";

import {
  createTransferInstruction, getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID
} from '@solana/spl-token';

/**
 * Creates and sends a Solana transaction with multiple operations:
 * 1. SOL transfer
 * 2. SPL token transfer
 * 3. Message signing
 *
 * @param {string} solanaRpc - Solana connection object
 * @param {PublicKey} walletPublicKey - Wallet Public Address
 * @param {number} solAmount - Amount of SOL to transfer (in SOL, not lamports)
 * @param {string|PublicKey} solDestination - Destination address for SOL transfer
 * @param {number} tokenAmount - Amount of SPL tokens to transfer
 * @param {string|PublicKey} tokenMintAddress - SPL token mint address
 * @param {string|PublicKey} tokenDestination - Destination address for token transfer
 * @param {string} messageToSign - Signed message from wallet
 * @returns {Promise<Transaction>} Transaction result with signatures and message signature
 */
async function createMigrationTransaction(
  solanaRpc: string,
  walletPublicKey: PublicKey,
  solAmount : number,
  solDestination: string | PublicKey,
  tokenAmount: number,
  tokenMintAddress: string | PublicKey,
  tokenDestination: string | PublicKey,
  messageToSign: string) : Promise<{transaction: Transaction, sourceTokenAccountAddress : string, destinationTokenAccountAddress: string, tokenDecimals :number}> {
  try {
    const connection = createConnection(solanaRpc);

    // Convert string addresses to PublicKey objects if needed
    const solDestPubkey = typeof solDestination === 'string'
      ? new PublicKey(solDestination)
      : solDestination;

    const tokenMintPubkey = typeof tokenMintAddress === 'string'
      ? new PublicKey(tokenMintAddress)
      : tokenMintAddress;

    const tokenDestPubkey = typeof tokenDestination === 'string'
      ? new PublicKey(tokenDestination)
      : tokenDestination;

    console.log('🔨 Creating transaction with multiple operations...');

    // Create a new transaction
    const transaction = new Transaction();

    // ========================================
    // 1. SOL TRANSFER INSTRUCTION
    // ========================================
    console.log(`💰 Adding SOL transfer: ${solAmount} SOL to ${solDestPubkey.toString()}`);

    const solTransferInstruction = SystemProgram.transfer({
      fromPubkey: walletPublicKey,
      toPubkey: solDestPubkey,
      lamports: Math.floor(solAmount * LAMPORTS_PER_SOL) // Convert SOL to lamports
    });

    transaction.add(solTransferInstruction);

    // ========================================
    // 2. SPL TOKEN TRANSFER INSTRUCTION
    // ========================================
    console.log(`🪙 Adding SPL token transfer: ${tokenAmount} tokens to ${tokenDestPubkey.toString()}`);

    // Get or create associated token account for the payer (source)
    const sourceTokenAddress = await getAssociatedTokenAddress (
      tokenMintPubkey,
      // For browser wallets, we can't directly pay fees in this function
      // The wallet will handle fee payment during signing
      walletPublicKey, // payer - will be handled by wallet,
      false, // allowOwnerOffCurve
    );

    // Get or create associated token account for the destination
    const destinationTokenAddress = await getAssociatedTokenAddress(
      tokenMintPubkey,
      tokenDestPubkey, // payer - will be handled by wallet
      false
    );

    let decimals = 6;

    console.log(`   Token decimals: ${decimals}`);

    // Calculate token amount with decimals
    const tokenAmountWithDecimals = Math.floor(tokenAmount * Math.pow(10, decimals));

    // Note: The transfer function from @solana/spl-token returns a transaction signature,
    // but we need the instruction. Let's create it manually instead.
    const manualTokenTransferInstruction = createTransferInstruction(
      sourceTokenAddress, // Source
      destinationTokenAddress, // Destination
      walletPublicKey, // Owner
      tokenAmountWithDecimals, // Amount
      [], // Multisigners (empty for single signer)
      TOKEN_PROGRAM_ID // Token program
    );

    transaction.add(manualTokenTransferInstruction);

    // ========================================
    // 3. MESSAGE MEMO INSTRUCTION
    // ========================================
    console.log(`✍️  Adding message to transaction: "${messageToSign}"`);

    // Add message as memo instruction (included in the transaction)
    const MEMO_PROGRAM_ID = new PublicKey('MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr');

    const memoInstruction = new TransactionInstruction({
      keys: [],
      programId: MEMO_PROGRAM_ID,
      data: Buffer.from(messageToSign, 'utf8')
    });

    transaction.add(memoInstruction);
    const sourceTokenAccountAddress = sourceTokenAddress.toString();
    const destinationTokenAccountAddress = destinationTokenAddress.toString();

    return {
      transaction,
      sourceTokenAccountAddress,
      destinationTokenAccountAddress,
      tokenDecimals: decimals
    };

  } catch (error) {
    console.error('❌ Transaction failed:', error);
    throw error;
  }
}

function createConnection(solanaRpc: string) : Connection {
  return new Connection(solanaRpc, 'confirmed');
}



// Export the functions
export {
  createMigrationTransaction,
  createConnection
};
