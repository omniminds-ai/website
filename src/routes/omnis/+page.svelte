<script lang="ts">
  import {
    ExternalLink,
    Check,
    Copy,
  } from 'lucide-svelte';
  import ButtonCta from '$lib/components/ButtonCTA.svelte';
  import OmnisMetrics from '$lib/components/OmniMetrics.svelte';
  import GradientHeading from '$lib/components/GradientHeading.svelte';
  import Button from '$lib/components/Button.svelte';

  const vestedTreasuryContractAddress =
    'https://app.uncx.network/vesting-v2/flux/1-4729?wallet=0xd3B9f665f0eF48072a95b5C3D5FC13d1C212Ea16&chain=1';
  const deployerWalletAddress = '0xd3b9f665f0ef48072a95b5c3d5fc13d1c212ea16';
  const taxWalletAddress = '0x65eAe045386dff93094E5896Ceb6aD54a221260D';

  const TOKEN_DATA = {
    contractAddress: '0x0478F82a19269e7593a6F99E2865e6F026997B74',
    dexscreenerUrl: 'https://dexscreener.com/ethereum/0xf8F46E8130d7B29E509f64525793a33C717D74fB',
    tradeUrl: 'https://app.uniswap.org/explore/tokens/ethereum/0x0478F82a19269e7593a6F99E2865e6F026997B74'
  };

  let copied = false;
  function copyAddress() {
    navigator.clipboard.writeText(TOKEN_DATA.contractAddress);
    copied = true;
    setTimeout(() => (copied = false), 1000);
  }

  function handleInputClick(event: MouseEvent & { currentTarget: EventTarget & HTMLInputElement }) {
    event.currentTarget.select();
    copyAddress();
  }
</script>

<svelte:head>
  <title>Omniminds.ai - $OMNIS</title>
  <meta property="og:title" content="Omniminds.ai - $OMNIS" />
  <meta name="twitter:title" content="Omniminds.ai - $OMNIS" />
  <meta
    name="description"
    content="Incentivizing high-quality AI training data at scale through instant, quality-based rewards." />
  <meta
    name="twitter:description"
    content="Incentivizing high-quality AI training data at scale through instant, quality-based rewards." />
  <meta
    property="og:description"
    content="Incentivizing high-quality AI training data at scale through instant, quality-based rewards." />
</svelte:head>

<main class="min-h-screen">
  <!-- Hero Section -->
  <section class="relative">
  <div class="py-24">
    <div class="mx-auto max-w-7xl px-4 text-center sm:px-8 lg:px-16">
      <GradientHeading class="text-5xl md:text-6xl">$OMNIS Token</GradientHeading>
      <GradientHeading class="mb-8 text-xl text-gray-600">
        Incentivizing high-quality AI training data at scale through instant, quality-based rewards.
      </GradientHeading>
      <div class="flex flex-col items-center justify-center gap-6 md:flex-row">
        <div
          class="flex w-full items-center justify-center gap-3 rounded-full border border-secondary-300 px-6 py-2 md:w-1/2">
          <input
            type="text"
            readonly
            value={TOKEN_DATA.contractAddress}
            on:click={handleInputClick}
            class="w-full cursor-pointer truncate bg-transparent font-mono text-white outline-none hover:text-gray-500" />
          <button
            class="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            on:click={copyAddress}>
            {#if copied}
              <Check class="h-4 w-4 text-green-500" />
            {:else}
              <Copy class="h-4 w-4" />
            {/if}
          </button>
        </div>
        <ButtonCta href={TOKEN_DATA.tradeUrl} target="_blank">
          Trade $OMNIS
        </ButtonCta>
      </div>
    </div>

    <!-- Get Started Section -->
    <section class="mt-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        <div class="grid gap-10 md:grid-cols-3">
          <!-- How to Earn -->
          <div class="glass-effect mx-auto rounded-2xl border border-gray-900 p-8">
            <GradientHeading class="mb-6 text-xl text-gray-900">
              How do I earn $OMNIS?
            </GradientHeading>
            <GradientHeading class="mb-6 text-gray-600">
              Use the Training Gym to earn tokens by providing AI training data. Rewards scale with
              data quality.
            </GradientHeading>
          </div>

          <!-- How to Spend -->
          <div class="glass-effect mx-auto rounded-2xl border border-gray-900 p-8">
            <GradientHeading class="mb-6 text-xl text-gray-900">
              How do I spend $OMNIS?
            </GradientHeading>
            <GradientHeading class="mb-6 text-gray-600">
              Create your own training gyms and fund reward pools. Export gym data to train
              specialized agents.
            </GradientHeading>
          </div>

          <!-- How to Trade -->
          <div class="glass-effect mx-auto rounded-2xl border border-gray-900 p-8">
            <GradientHeading class="mb-6 text-xl text-gray-900">
              Where do I trade $OMNIS?
            </GradientHeading>
            <GradientHeading class="mb-2 text-gray-600">
              Buy or sell $OMNIS with $ETH through secure exchanges:
            </GradientHeading>
            <Button
              class="border-none ps-0">
              <a href={TOKEN_DATA.dexscreenerUrl}
              target="_blank">
                View Market
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>

    <div class="py-16">
      <div class="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        <OmnisMetrics />
      </div>
    </div>

    <!-- Tokenomics Section -->
    <section class="py-24 container mx-auto">
      <div class="mx-auto px-4 sm:px-8 lg:px-16">
        <GradientHeading class="mb-16 text-center text-5xl">Tokenomics</GradientHeading>
        <div class="grid gap-4 sm:p-8 md:grid-cols-2">
          <!-- Locked supply 35% -->
          <div
            class="flex flex-col items-center justify-between rounded-3xl border border-white/10 p-10 lg:flex-row gap-2">
            <div class="flex-1">
              <GradientHeading class="mb-4 text-3xl sm:text-4xl">Vested Team Allocation</GradientHeading>

              <GradientHeading class="mb-6 text-sm leading-relaxed sm:text-base">
               35% of the total supply is vested for a year using UNCX Lock
              </GradientHeading>
            </div>

            <ul class="flex-1">
              <li class="flex items-start gap-3 mb-1">
                <GradientHeading>Vested until September 2026</GradientHeading>
              </li>
              <li class="flex flex-col gap-3 sm:flex-row sm:items-start mb-1">
                <div class="min-w-0">
                  <a
                    href={vestedTreasuryContractAddress}
                    target="_blank"
                    class="inline-flex items-center gap-2 break-all text-white underline underline-offset-2 hover:opacity-80">
                    View Vesting Contract
                    <ExternalLink class="h-4 w-4" />
                  </a>
                </div>
              </li>
              <li class="flex flex-col gap-3 sm:flex-row sm:items-start mb-1">
                <div class="min-w-0">
                  <GradientHeading>Redeemed on the deployer wallet:</GradientHeading>
                  <a
                    href="https://etherscan.io/address/{deployerWalletAddress}"
                    target="_blank"
                    class="inline-flex items-center gap-2 break-all text-white underline underline-offset-2 hover:opacity-80">
                    {deployerWalletAddress}
                    <ExternalLink class="h-4 w-4" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <!-- Marketing supply 5.875% -->
          <div
            class="flex flex-col items-center justify-between rounded-3xl border border-white/10 p-10 lg:flex-row gap-2">
            <div class="flex-1">
              <GradientHeading class="mb-4 text-3xl sm:text-4xl">Tax Wallet</GradientHeading>

              <GradientHeading class="mb-6 text-sm leading-relaxed sm:text-base">
               5% on Buys and 5% of Sells go to Tax Wallet
              </GradientHeading>
            </div>

            <ul class="flex-1">
              <li class="flex items-start gap-3 mb-1">
                <GradientHeading>Used to pay for marketing and team activities</GradientHeading>
              </li>
              <li class="flex flex-col gap-3 sm:flex-row sm:items-start mb-1">
                <div class="min-w-0">
                  <GradientHeading>Wallet Address:</GradientHeading>
                  <a
                    href="https://etherscan.io/address/{taxWalletAddress}"
                    target="_blank"
                    class="inline-flex items-center gap-2 break-all text-white underline underline-offset-2 hover:opacity-80">
                    {taxWalletAddress}
                    <ExternalLink class="h-4 w-4" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <!-- Open Market 65% -->
          <div
            class="flex flex-col items-center justify-between rounded-3xl border border-white/10 p-10 lg:flex-row gap-2">
            <div class="flex-1">
              <GradientHeading class="mb-4 text-3xl sm:text-4xl">Open Market</GradientHeading>

              <GradientHeading class="mb-6 text-sm leading-relaxed sm:text-base">
                65% are available on the open market
              </GradientHeading>
            </div>

            <ul class="flex-1">
              <li class="flex flex-col gap-3 sm:flex-row sm:items-start lg:items-center">
                <div class="min-w-0">
                  <a
                    href={TOKEN_DATA.tradeUrl}
                    target="_blank"
                    class="inline-flex items-center gap-2 break-all text-white underline underline-offset-2 hover:opacity-80">
                    Trade $OMNIS
                    <ExternalLink class="h-4 w-4" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
  </section>
</main>

<style>
.glass-effect {
  box-shadow: 
    inset 0px 32px 64px rgba(92, 58, 228, 0.08),
    inset 1px 1px 1px rgba(92, 58, 228, 0.5),
    inset 0px 0px 1px rgba(255, 255, 255, 0.4);
}
</style>
