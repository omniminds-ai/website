<script lang="ts">
  import { onMount } from 'svelte'
  import { walletStore } from '$lib/walletStore';
  import { Clock, Coins, Download } from 'lucide-svelte';
  import { Buffer } from 'buffer';
  import BgEffect from '$lib/assets/bg-effect.svg';
  import { WalletReadyState } from '@solana/wallet-adapter-base';
  import TextInput from '$lib/components/TextInput.svelte';
  import { Transaction, Connection } from "@solana/web3.js";

  let ready = $state(false);
  let notDetected = $state(false);
  let connected = $state(false);
  let connecting = $state(false);
  let claiming =  $state(false);
  let loadingBalance = $state(true);
  let statusUpdates = $state(['']);
  let ethTransaction = $state('');
  let ogClaimDone = $state(false);
  let migrationComplete = $state(false);

  let walletAddress = $state('');
  let tokenBalance = $state(0);
  let eligibleTokenBalance = $state(0);
  let ethWalletAddress =  $state('');

  const solanaRpc = "https://api.mainnet-beta.solana.com"
  const baseUrl = 'https://api.omniminds.ai';

  onMount(async () => {
    // Use the wallet store to connect
    if (!$walletStore.wallets.length) {
      alert('No Solana wallets found. Please install Phantom wallet.');
      return;
    }

    const phantomWallet = $walletStore.wallets.find((w) => w.adapter.name === 'Phantom');
    if (!phantomWallet || phantomWallet.readyState == WalletReadyState.NotDetected) {
      notDetected = true;
      alert('Phantom wallet not found. Please install Phantom wallet.');
      return;
    }

    $walletStore.select(phantomWallet.adapter.name);
    ready = true;
  });

  function formatCompactNumber(number: number) {
    const formatter = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1,
    });
    return formatter.format(number);
  }

  async function claim(){
    if(!$walletStore.publicKey) {
      alert("Connect wallet to Claim!")
      return;
    }
    claiming = true;
    statusUpdates = [];
    statusUpdates.push("Started claiming process...");
    statusUpdates.push("Preparing migration transaction...");
    try {
      // Send address, signature and timestamp to backend
      const response = await fetch(`${baseUrl}/migration/${walletAddress}/to/${ethWalletAddress}`);
      const { success,  data } = await response.json();
      if(!success) {
        throw new Error('Unable to create migration transaction');
      }
      console.log(data)
      const claimId = data.claimId
      if(!data.claimExists) {
        const serializedTxBase64 = data.transaction;
        const transaction = Transaction.from(Buffer.from(serializedTxBase64, 'base64'));

        // const transaction = createMigrationTransaction(
        //   solanaRpc,
        // )
        const connection = new Connection(solanaRpc || '', 'confirmed');

        statusUpdates.push('📡 Sending transaction via wallet...');
        // Request wallet to sign and send the transaction
        const txSignature = await $walletStore.sendTransaction(transaction, connection);
        statusUpdates.push('✅ Transaction completed successfully!');

        statusUpdates.push('⏳ Confirming transaction...');
        // Wait for confirmation
        const validateTx = await fetch(`${baseUrl}/migration/${claimId}/validateTransaction`, {
          method: 'POST',
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({ transactionHash: txSignature })
        });

        const txValidationResponse = (await validateTx.json());
        if (!txValidationResponse.success) {
          throw new Error(`Transaction failed to validate: ${txSignature}`);
        }
        statusUpdates.push('✅ Transaction confirmed!');

        //reload balance
        loadingBalance = true
        const reloadBalance = await fetch(`${baseUrl}/migration/balance/${walletAddress}`);
        const reloadBalanceResponse = await reloadBalance.json();
        if(reloadBalanceResponse.success) {
          tokenBalance = reloadBalanceResponse.data.walletBalance;
          eligibleTokenBalance = reloadBalanceResponse.data.eligibleBalance;
          loadingBalance = false
        } else {
          throw new Error('Unable to query wallet balance');
        }
        // statusUpdates.push('📡 Registering your claimed tokens exemption...')
        // statusUpdates.push('📡 Initiating ERC-20 Transfer ...');

      } else {
        statusUpdates.push(`✅ Existing Claim found with Tx: ${data.solTransaction.slice(0,4)}....${data.solTransaction.slice(-4)}!`);

        if(!data.ogStatusDone) {
          statusUpdates.push('📡 Registering your claimed tokens exemption...')
        }

        if(!data.ethTransaction || data.ethTransaction.length == 0) {
          statusUpdates.push('📡 Initiating ERC-20 Transfer ...');
        }
      }
      await pollETHTransactionStatus(claimId);
    } catch (error) {
      statusUpdates.push('❌ Error: ' + error);
      claiming = false;
      console.log(error);
    }
  }

  async function pollETHTransactionStatus(claimId: string) {
    const response = await fetch(`${baseUrl}/migration/${claimId}/status`);
    const { success, data } = await response.json();
    if (!success) {
      throw new Error('Unable to get claim status');
    }

    if (data.ogClaimDone && !ogClaimDone) {
      ogClaimDone = data.ogClaimDone;
      statusUpdates.push('✅ Token exemption confirmed')
    }

    if (data.ethTransaction && data.ethTransaction.length > 0 && ethTransaction.length == 0) {
      ethTransaction = data.ethTransaction;
      statusUpdates.push('✅ Tokens Transferred');
    }

    if (ogClaimDone && ethTransaction.length > 0) {
      statusUpdates.push('✅ Migration process complete')
      migrationComplete = true;
      return;
    }

    if (!data.ogClaimDone || !data.ethTransaction || data.ethTransaction.length == 0) {
      if(!data.ethFlowTriggered) {
        const triggerEthFlow = await fetch(`${baseUrl}/migration/${claimId}/triggerEthFlow`, {
          method: 'POST',
        });
      }
      setTimeout(async () => await pollETHTransactionStatus(claimId), 500);
    }
  }
  async function connectWallet() {
    try {
      connecting = true;

      await $walletStore.connect();

      if (!$walletStore.publicKey) {
        throw new Error('Failed to connect wallet');
      }

      connected = true;
      walletAddress = $walletStore.publicKey.toBase58();


      // Sign the message
      if (!$walletStore.signMessage) {
        throw new Error('Wallet does not support message signing');
      }

      // Send address, signature and timestamp to backend
      const response = await fetch(`${baseUrl}/migration/balance/${walletAddress}`);
      const { success,  data} = await response.json();
      if(success) {
        tokenBalance = data.walletBalance;
        eligibleTokenBalance = data.eligibleBalance;
        loadingBalance = false
      } else {
        throw new Error('Unable to query wallet balance');
      }

    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : 'Unknown error occurred';
      alert('Failed to connect wallet: ' + message);
    } finally {
      connecting = false;
    }
  }
</script>
<section class="relative min-h-screen overflow-hidden !bg-no-repeat !bg-cover" style={`background: url(${BgEffect})`}>
  <div class="flex min-h-screen flex-col items-center justify-center">
    {#if !connected}
    <div class="mx-4 max-w-md rounded-2xl border border-gray-700 bg-om-background-100 p-8 shadow-lg">
      <div class="mb-8 text-center">
        <div
          class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10">
          <Coins class="h-8 w-8 text-gray-200" />
        </div>
        <h1 class="mb-2 text-2xl font-bold text-gray-200">Connect Your Solana Wallet</h1>
        <p class="text-gray-400">Connect to claim your ERC-20 OMNIS</p>
      </div>

        <button
          on:click={connectWallet}
          disabled={connecting || !ready}
          class="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 font-medium text-white transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
          {#if connecting}
            <div class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white">
            </div>
            Connecting...
          {:else if notDetected}
            Phantom Wallet Not Detected
          {:else if !ready}
            Setting up...
          {:else}
            Connect Wallet
          {/if}
        </button>
      <a
          href="https://phantom.app/download"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-4 block text-center text-sm text-gray-500 transition-colors hover:text-gray-800">
          Don't have Phantom wallet? Click here to install
        </a>
    </div>
      {:else}
      <div class="mx-4 max-w-md w-2/3 rounded-2xl border border-gray-700 bg-om-background-100 p-8 shadow-lg">
        <div class="mb-8 left text-white text-xl justify-center text-weight-bold">
          Claim your ERC-20 $OMNIS
        </div>
          <div class="flex mb-2 mx-2 justify-between">
            <span class="text-white text-lg">
              Connected Wallet:
            </span>
            <span class="text-gray-400 text-lg text-weight end">
              {walletAddress.slice(0,4)}....{walletAddress.slice(-4)}
            </span>
          </div>
          <div class="flex mb-2 mx-2 justify-between">
            <div class="text-white text-lg">
              Eligible $OMNIS:
            </div>
            <div class="justify-end text-gray-400 text-lg">
              {#if loadingBalance}
                <div class="flex items-center gap-2">
                  <Clock class="h-4 w-4 text-gray-400" />
                  <span class="text-sm text-gray-400">Loading...</span>
                </div>
              {:else}
                <span title="{eligibleTokenBalance.toLocaleString()}">{formatCompactNumber(eligibleTokenBalance)}</span>
                /
                <span title="{tokenBalance.toLocaleString()}">{formatCompactNumber(tokenBalance)}</span>
              {/if}
            </div>
          </div>
          <div class="flex mt-4 mx-2 flex-col">
            <div class="text-white text-lg text-weight mb-2">
              ETH Wallet Address for claiming:
            </div>
            <TextInput
              placeholder="0x"
              variant="dark"
              bind:value={ethWalletAddress}
              validation="{/^0x[0-9a-fA-F]{40}$/}"
              validationErrorMessage="Please enter a valid Ethereum Wallet Address"
            ></TextInput>
          </div>
          <div class="pt-4">
            <button
              on:click={claim}
              disabled={!connected || loadingBalance || claiming}
              class="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-om-actions-400 to-om-actions-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {migrationComplete
                ? 'Claimed!'
                : claiming
                  ? "Claiming..." : "Claim"}
            </button>
          </div>
        <div class="mt-4 block text-center text-sm text-gray-500 transition-colors hover:text-gray-800">
          {#each statusUpdates as line}
          <p>{line}</p>
          {/each}
        </div>
      </div>
      {/if}
  </div>
</section>