<script lang="ts">
  import {
    Coins,
    Handshake,
    ArrowRight,
    PartyPopper,
    Gauge,
    Wallet,
    ChartPie,
    Lock,
    ExternalLink,
    Database,
    Check,
    Copy,
    HandHeart
  } from 'lucide-svelte';
  import ButtonCta from '$lib/components/ButtonCTA.svelte';
  import OmnisMetrics from '$lib/components/OmniMetrics.svelte';
  import GradientHeading from '$lib/components/GradientHeading.svelte';
  import Button from '$lib/components/Button.svelte';

  const lockContractAddress =
    'https://lock.jup.ag/token/G6iRK8kN67HJFrPA1CDA5KZaPJMiBu3bqdd9vdKBpump';
  const vestedTreasuryContractAddress =
    'https://lock.jup.ag/token/G6iRK8kN67HJFrPA1CDA5KZaPJMiBu3bqdd9vdKBpump';
  const rnDVestingContractAddress =
    'https://lock.jup.ag/token/G6iRK8kN67HJFrPA1CDA5KZaPJMiBu3bqdd9vdKBpump';
  const deployerWalletAddress = '62TsurAEV9LFf7HbsS8HS1JRbbnyEXiHvLwMfsmXE5VT';
  const rnDWalletAddress = '54kpNYwHFPcMZhvFjSkQkgdsNfgfvTfbdkYkYDfiWpFo';
  const marketingWalletAddress = '9hfChuqu3UkEqNi9QQ4R4xUjfSspuNChu5GoiPxACKBG';
  const trainingWalletAddress = '8U5qFfRvhZpoqJrWaCyJ94Mky8qDoNrFoCg7B6mXgCPr';
  const kolsnPartnersWalletAddress = '23fNGGhSHD9NUBHdztKSYPvdf6Wy2Y5qJ2mVq4wdfMNV';

  const TOKEN_DATA = {
    contractAddress: 'G6iRK8kN67HJFrPA1CDA5KZaPJMiBu3bqdd9vdKBpump',
    dexscreenerUrl: 'https://dexscreener.com/solana/G6iRK8kN67HJFrPA1CDA5KZaPJMiBu3bqdd9vdKBpump'
  };

  let copied = false;
  function copyAddress() {
    navigator.clipboard.writeText(TOKEN_DATA.contractAddress);
    copied = true;
    setTimeout(() => (copied = false), 1000);
  }

  function handleInputClick(event: MouseEvent & { currentTarget: EventTarget & HTMLInputElement }) {
    event.currentTarget.select();
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
        <ButtonCta href={TOKEN_DATA.dexscreenerUrl} target="_blank">
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
              Buy or sell $OMNIS with $USDC or $SOL through secure exchanges:
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
        <div
          class="group mb-8 rounded-2xl p-4 transition-all hover:scale-[1.02] hover:shadow-xl sm:p-8">
          <img src="/tokenomics-piechart.png" alt="Tokenomics chart" class="mx-auto" />
        </div>
        <div class="grid gap-4 sm:p-8 md:grid-cols-2">
          <!-- Locked supply 4.5% -->
          <div
            class="flex flex-col items-center justify-between rounded-3xl border border-white/10 p-10 lg:flex-row gap-2">
            <div class="flex-1">
              <GradientHeading class="mb-4 text-3xl sm:text-4xl">Locked Supply</GradientHeading>

              <GradientHeading class="mb-6 text-sm leading-relaxed sm:text-base">
                4.5% of the total supply is locked using Jupiter Lock
              </GradientHeading>
            </div>

            <ul class="flex-1">
              <li class="flex items-start gap-3">
                <GradientHeading>Locked until May 2026</GradientHeading>
              </li>
              <li class="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div class="min-w-0">
                  <GradientHeading>Redeemed on the pump.fun creator wallet:</GradientHeading>
                  <a
                    href="https://solscan.io/account/{deployerWalletAddress}"
                    target="_blank"
                    class="inline-flex items-center gap-2 break-all text-white underline underline-offset-2 hover:opacity-80">
                    {deployerWalletAddress}
                    <ExternalLink class="h-4 w-4" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <!-- Treasury supply 4.875% -->
          <div
            class="flex flex-col items-center justify-between rounded-3xl border border-white/10 p-10 lg:flex-row gap-2">
            <div class="flex-1">
              <GradientHeading class="mb-4 text-3xl sm:text-4xl">Vested Treasury</GradientHeading>

              <GradientHeading class="mb-6 text-sm leading-relaxed sm:text-base">
                4.875% of the total supply is vested over a 6 month period using Jupiter Lock
              </GradientHeading>
            </div>

            <ul class="flex-1">
              <li class="flex items-start gap-3">
                <GradientHeading>Vested until November 2025</GradientHeading>
              </li>
              <li class="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div class="min-w-0">
                  <GradientHeading>View Vesting Contract:</GradientHeading>
                  <a
                    href={vestedTreasuryContractAddress}
                    target="_blank"
                    class="inline-flex items-center gap-2 break-all text-white underline underline-offset-2 hover:opacity-80">
                    View Vesting Contract
                    <ExternalLink class="h-4 w-4" />
                  </a>
                </div>
              </li>
              <li class="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div class="min-w-0">
                  <GradientHeading>Redeemed on the pump.fun creator wallet:</GradientHeading>
                  <a
                    href="https://solscan.io/account/{deployerWalletAddress}"
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
              <GradientHeading class="mb-4 text-3xl sm:text-4xl">Marketing</GradientHeading>

              <GradientHeading class="mb-6 text-sm leading-relaxed sm:text-base">
                5.875% of the total supply is budgeted for marketing
              </GradientHeading>
            </div>

            <ul class="flex-1">
              <li class="flex items-start gap-3">
                <GradientHeading>
                  Supply is available for use to fund ongoing marketing activities
                </GradientHeading>
              </li>
              <li class="flex items-start gap-3">
                <GradientHeading>Used to pay for marketing and listing activities</GradientHeading>
              </li>
              <li class="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div class="min-w-0">
                  <GradientHeading>Wallet Address:</GradientHeading>
                  <a
                    href="https://solscan.io/account/{marketingWalletAddress}"
                    target="_blank"
                    class="inline-flex items-center gap-2 break-all text-white underline underline-offset-2 hover:opacity-80">
                    {marketingWalletAddress}
                    <ExternalLink class="h-4 w-4" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <!-- R&D supply 7.25% -->
          <div
            class="flex flex-col items-center justify-between rounded-3xl border border-white/10 p-10 lg:flex-row gap-2">
            <div class="flex-1">
              <GradientHeading class="mb-4 text-3xl sm:text-4xl">Technology R&D</GradientHeading>

              <GradientHeading class="mb-6 text-sm leading-relaxed sm:text-base">
                7.25% of the total supply is vested over a 6 months period using Jupiter Lock
              </GradientHeading>
            </div>

            <ul class="flex-1">
              <li class="flex items-start gap-3">
                <GradientHeading>Vested until November 2025</GradientHeading>
              </li>
              <li class="flex items-start gap-3">
                <GradientHeading>
                  Supply to be used to pay different members working on developing our technology
                </GradientHeading>
              </li>
              <li class="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div class="min-w-0">
                  <GradientHeading>View Vesting Contract:</GradientHeading>
                  <a
                    href={rnDVestingContractAddress}
                    target="_blank"
                    class="inline-flex items-center gap-2 break-all text-white underline underline-offset-2 hover:opacity-80">
                    View Vesting Contract
                    <ExternalLink class="h-4 w-4" />
                  </a>
                </div>
              </li>
              <li class="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div class="min-w-0">
                  <GradientHeading>Vested to R&D Wallet:</GradientHeading>
                  <a
                    href="https://solscan.io/account/{rnDWalletAddress}"
                    target="_blank"
                    class="inline-flex items-center gap-2 break-all text-white underline underline-offset-2 hover:opacity-80">
                    {rnDWalletAddress}
                    <ExternalLink class="h-4 w-4" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <!-- Community & Training supply 4.5% -->
          <div
            class="flex flex-col items-center justify-between rounded-3xl border border-white/10 p-10 lg:flex-row gap-2">
            <div class="flex-1">
              <GradientHeading class="mb-4 text-3xl sm:text-4xl">
                Community & Training
              </GradientHeading>

              <GradientHeading class="mb-6 text-sm leading-relaxed sm:text-base">
                4.5% of the total supply is budgeted for community & training incentives
              </GradientHeading>
            </div>

            <ul class="flex-1">
              <li class="flex items-start gap-3">
                <GradientHeading>
                  Supply is available for use to fund any community incentives and newly launched
                  trainings
                </GradientHeading>
              </li>
              <li class="flex items-start gap-3">
                <GradientHeading>
                  Used to pay for incentivizing community initiatives
                </GradientHeading>
              </li>
              <li class="flex items-start gap-3">
                <GradientHeading>
                  Used to escrow training funds till disbursed to trainers
                </GradientHeading>
              </li>
              <li class="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div class="min-w-0">
                  <GradientHeading>Wallet Address:</GradientHeading>
                  <a
                    href="https://solscan.io/account/{trainingWalletAddress}"
                    target="_blank"
                    class="inline-flex items-center gap-2 break-all text-white underline underline-offset-2 hover:opacity-80">
                    {trainingWalletAddress}
                    <ExternalLink class="h-4 w-4" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <!-- KOLS & Partners 8% -->
          <div
            class="flex flex-col items-center justify-between rounded-3xl border border-white/10 p-10 lg:flex-row gap-2">
            <div class="flex-1">
              <GradientHeading class="mb-4 text-3xl sm:text-4xl">KOLs & Partners</GradientHeading>

              <GradientHeading class="mb-6 text-sm leading-relaxed sm:text-base">
                8% of the total supply is budgeted for paying KOLs & facilitating different
                partnerships
              </GradientHeading>
            </div>

            <ul class="flex-1">
              <li class="flex items-start gap-3">
                <GradientHeading>Supply is available for use</GradientHeading>
              </li>
              <li class="flex items-start gap-3">
                <GradientHeading>Paid initatives from this pool will be vested</GradientHeading>
              </li>
              <li class="flex items-start gap-3">
                <GradientHeading>Used to incentivize a vibrant partner ecosystem</GradientHeading>
              </li>
              <li class="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div class="min-w-0">
                  <GradientHeading>Wallet Address:</GradientHeading>
                  <a
                    href="https://solscan.io/account/{kolsnPartnersWalletAddress}"
                    target="_blank"
                    class="inline-flex items-center gap-2 break-all text-white underline underline-offset-2 hover:opacity-80">
                    {kolsnPartnersWalletAddress}
                    <ExternalLink class="h-4 w-4" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <!-- $VIRAL Holders Airdrop 20% -->
          <div
            class="flex flex-col items-center justify-between rounded-3xl border border-white/10 p-10 lg:flex-row gap-2">
            <div class="flex-1">
              <GradientHeading class="mb-4 text-3xl sm:text-4xl">
                $VIRAL Holders Airdrop
              </GradientHeading>

              <GradientHeading class="mb-6 text-sm leading-relaxed sm:text-base">
                20% were bundled on launch to airdrop to previous $VIRAL holders
              </GradientHeading>
            </div>

            <ul class="flex-1">
              <li class="flex items-start gap-3">
                <GradientHeading>Airdrop completed right after launch</GradientHeading>
              </li>
              <li class="flex flex-col gap-3 sm:flex-row sm:items-start">
                <div class="min-w-0">
                  <GradientHeading>View Details:</GradientHeading>
                  <a
                    href="https://github.com/omniminds-ai/viralmind-airdrop"
                    target="_blank"
                    class="inline-flex items-center gap-2 break-all text-white underline underline-offset-2 hover:opacity-80">
                    View Details
                    <ExternalLink class="h-4 w-4" />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <!-- Open Market 55% -->
          <div
            class="flex flex-col items-center justify-between rounded-3xl border border-white/10 p-10 lg:flex-row gap-2">
            <div class="flex-1">
              <GradientHeading class="mb-4 text-3xl sm:text-4xl">Open Market</GradientHeading>

              <GradientHeading class="mb-6 text-sm leading-relaxed sm:text-base">
                65% are available on the open market post-airdrop (45% at launch + 20% after
                airdrop.
              </GradientHeading>
            </div>

            <ul class="flex-1">
              <li class="flex flex-col gap-3 sm:flex-row sm:items-start lg:items-center">
                <div class="min-w-0">
                  <GradientHeading>Trade $OMNIS:</GradientHeading>
                  <a
                    href={TOKEN_DATA.dexscreenerUrl}
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
</main>

<style>
.glass-effect {
  box-shadow: 
    inset 0px 32px 64px rgba(92, 58, 228, 0.08),
    inset 1px 1px 1px rgba(92, 58, 228, 0.5),
    inset 0px 0px 1px rgba(255, 255, 255, 0.4);
}
</style>
