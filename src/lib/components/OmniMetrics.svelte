<script lang="ts">
  import { onMount } from 'svelte';
  import GradientHeading from './GradientHeading.svelte';

  const TOKEN_DATA = {
    contractAddress: 'G6iRK8kN67HJFrPA1CDA5KZaPJMiBu3bqdd9vdKBpump',
    dexscreenerUrl: 'https://dexscreener.com/solana/G6iRK8kN67HJFrPA1CDA5KZaPJMiBu3bqdd9vdKBpump'
  };

  let omniPrice = 0;
  let solPrice = 0;
  let omniPerSol = 0;

  async function fetchPrices() {
    try {
      const response = await fetch(
        'https://lite-api.jup.ag/price/v3?ids=G6iRK8kN67HJFrPA1CDA5KZaPJMiBu3bqdd9vdKBpump,So11111111111111111111111111111111111111112'
      );
      const json = await response.json();

      omniPrice = parseFloat(json[TOKEN_DATA.contractAddress].usdPrice);
      solPrice = parseFloat(json.So11111111111111111111111111111111111111112.usdPrice);
      omniPerSol = solPrice / omniPrice;
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  }

  // Fetch prices on mount and every 30 seconds
  onMount(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  });
</script>

<!-- Token Metrics Grid -->
<div class="grid gap-8 md:grid-cols-2">
  <!-- SOL Price -->
  <div class="flex flex-col justify-between rounded-2xl rounded-l-none border-l-4 border-l-secondary-100 ps-6 p-8 transition-transform hover:scale-[1.02] bg-gradient-to-r from-[#D9D9D900] to-[#B7A6FB33]">
    <div class="mb-6 flex items-center gap-3">
      <GradientHeading class="text-3xl"><a href="{TOKEN_DATA.dexscreenerUrl}"><pre>$OMNIS</pre></a> per SOL</GradientHeading>
    </div>
    <div>
      <GradientHeading class="mb-2 text-4xl font-bol">
        {omniPerSol.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </GradientHeading>
      <GradientHeading class="text-base text-gray-600">
        1 SOL = ${solPrice.toFixed(2)}
      </GradientHeading>
    </div>
  </div>

  <!-- Market Cap -->
  <div class="flex flex-col justify-between rounded-2xl rounded-l-none border-l-4 border-l-secondary-100 ps-6 p-8 transition-transform hover:scale-[1.02] bg-gradient-to-r from-[#D9D9D900] to-[#B7A6FB33]">
    <div class="mb-6 flex items-center gap-3">
      <GradientHeading class="text-3xl">Market Cap</GradientHeading>
    </div>
    <div>
      <GradientHeading class="mb-2 text-4xl">
        ${(omniPrice * 1_000_000_000).toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </GradientHeading>
      <GradientHeading class="text-lg">Fully Diluted</GradientHeading>
    </div>
  </div>
</div>
