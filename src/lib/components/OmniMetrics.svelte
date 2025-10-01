<script lang="ts">
  import { onMount } from 'svelte';
  import GradientHeading from './GradientHeading.svelte';

  const TOKEN_DATA = {
    omnisAddress: '0x0478F82a19269e7593a6F99E2865e6F026997B74',
    wethContractAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    dexscreenerUrl: 'https://dexscreener.com/ethereum/0xf8f46e8130d7b29e509f64525793a33c717d74fb'
  };

  let usdPerOmnis = 0;
  let ethPrice = 0
  let omnisPerEth = 0;

  async function fetchPrices() {
    try {
      let response = await fetch(
        `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${TOKEN_DATA.omnisAddress}&vs_currencies=usd`
      );
      let json = await response.json();
      usdPerOmnis = parseFloat(json[TOKEN_DATA.omnisAddress.toLowerCase()]['usd']);

      response = await fetch(
        `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${TOKEN_DATA.wethContractAddress}&vs_currencies=usd`
      );
      json = await response.json();
      ethPrice = parseFloat(json[TOKEN_DATA.wethContractAddress.toLowerCase()]['usd']);
      console.log({json, usdPerOmnis});

      omnisPerEth = ethPrice / usdPerOmnis;
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
      <GradientHeading class="text-3xl"><a href="{TOKEN_DATA.dexscreenerUrl}"><pre>$OMNIS</pre></a> per ETH</GradientHeading>
    </div>
    <div>
      <GradientHeading class="mb-2 text-4xl font-bol">
        {omnisPerEth.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </GradientHeading>
      <GradientHeading class="text-base text-gray-600">
        1 ETH = ${ethPrice.toFixed(2)}
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
        ${(usdPerOmnis * 1_000_000_000).toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </GradientHeading>
      <GradientHeading class="text-lg">Fully Diluted</GradientHeading>
    </div>
  </div>
</div>
