<script lang="ts">
  import { Download, Lock, UserX, Dumbbell, Hammer, Apple } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import GradientHeading from '$lib/components/GradientHeading.svelte';
  import ButtonCTA from '$lib/components/ButtonCTA.svelte';
  import gym from '$lib/assets/gym.png';
  import BgEffect from '$lib/assets/bg-effect.svg'

  let version = $state('0.15');

  // Define download URLs (placeholders for now)
  const downloads = {
    mac: {
      arm: {
        url: '#'
      }
    },
    windows: {
      x64: {
        url: '#'
      }
    }
  };

  // Auto-detect OS for highlighting the appropriate section
  let detectedOs: 'mac' | 'windows' = $state('windows');
  let selectedOs: 'mac' | 'windows' = $state('windows');
  let detectedArch: 'x64' | 'arm' = $state('x64');

  onMount(async () => {
    // load download information from our server endpoint
    try {
      const req = await fetch('/download');
      const release = (await req.json()) as {
        version: string;
        notes: string;
        pub_date: Date;
        platforms: {
          'windows-x86_64': {
            signature: string;
            url: string;
          };
          'darwin-aarch64': {
            signature: string;
            url: string;
          };
        };
      };

      version = release.version;
      downloads.mac = {
        arm: {
          url: release.platforms['darwin-aarch64'].url
        }
      };
      downloads.windows = {
        x64: {
          url: release.platforms['windows-x86_64'].url
        }
      };
    } catch (e) {
      console.log("in catch block", {e});
    }

    // Simple OS detection
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('mac')) {
      detectedOs = 'mac';
      selectedOs = 'mac';
    } else if (userAgent.includes('win')) {
      detectedOs = 'windows';
      selectedOs = 'windows';
    }

    // Simple architecture detection (not foolproof)
    if (
      userAgent.includes('arm') ||
      (!navigator.userAgent.match(/OS X 10_([789]|1[01234])/) && userAgent.includes('mac'))
    ) {
      detectedArch = 'arm';
    }
  });

  function getDownloadUrl() {
    if (selectedOs === 'windows') {
      return downloads.windows.x64.url;
    } else {
      return downloads.mac.arm.url;
    }
  }

  function getArchitecture() {
    return selectedOs === 'windows' ? '64-bit (x64)' : 'Apple Silicon (ARM)';
  }
</script>

<svelte:head>
  <title>Omniminds.ai - Download Omniminds Desktop</title>
  <meta property="og:title" content="Omniminds.ai - Download Omniminds Desktop" />
  <meta name="twitter:title" content="Omniminds.ai - Download Omniminds Desktop" />
  <meta
    name="description"
    content="Download Omniminds Desktop for all-in-one computer-use training." />
  <meta
    name="twitter:description"
    content="Download Omniminds Desktop for all-in-one computer-use training." />
  <meta
    property="og:description"
    content="Download Omniminds Desktop for all-in-one computer-use training." />
</svelte:head>

<main class="min-h-screen">
  <section class="relative min-h-screen overflow-hidden !bg-no-repeat !bg-cover" style={`background: url(${BgEffect})`}>
  <div class="py-24">
    <div class="mx-auto max-w-7xl px-4 text-center sm:px-8 lg:px-16">
      <!-- Version Badge -->
      <div>
        <span class="inline-block rounded-full px-4 py-2 text-sm text-gray-300">
          V{version}
        </span>
      </div>

      <!-- Main Heading -->
      <GradientHeading class="mb-2 text-5xl md:text-5xl">
        Download Omniminds Desktop
      </GradientHeading>
      
      <GradientHeading class="mb-16 text-lg text-gray-400">
        Get started with our desktop app for your platform and architecture
      </GradientHeading>

      <!-- Platform Selection -->
      <div class="mb-16 flex  justify-center gap-8">
        <!-- MacOS Option -->
        <button
          class="w-[377px] h-[215px]  group flex flex-col items-center justify-center p-8 rounded-2xl transition-all hover:scale-105 {selectedOs === 'mac' ? 'border border-secondary-300' : ''}"
          onclick={() => selectedOs = 'mac'}>
          <i class="si si-apple mb-3 text-4xl text-white"></i>
          <GradientHeading class="text-xl font-semibold">MacOS</GradientHeading>
          {#if detectedOs === 'mac'}
            <div class="mt-5">
              <span class="rounded-full border border-secondary-300 px-3 py-1 text-xs text-secondary-300">
                Recommended
              </span>
            </div>
          {/if}
        </button>

        <!-- Windows Option -->
        <button
          class="w-[377px] h-[215px] group flex flex-col items-center rounded-2xl p-8 transition-all hover:scale-105 {selectedOs === 'windows' ? 'border border-secondary-300' : ''}"
          onclick={() => selectedOs = 'windows'}>
          <i class="si si-windows mb-3 text-4xl text-white"></i>
          <GradientHeading class="text-xl font-semibold">Windows</GradientHeading>
          {#if detectedOs === 'windows'}
            <div class="mt-5">
              <span class="rounded-full border border-secondary-300 px-3 py-1 text-xs text-secondary-300">
                Recommended
              </span>
            </div>
          {/if}
        </button>
      </div>

      <!-- Download Section -->
      <div class="mb-12">
        <GradientHeading class="mb-8 text-2xl">
          Download for {selectedOs === 'windows' ? 'Windows' : 'MacOS'}
        </GradientHeading>
        
        <div class="glass-effect mx-auto max-w-md rounded-2xl border border-gray-700 p-8">
          <div class="mb-6 text-center">
            <GradientHeading class="mb-2 text-lg font-semibold">
              {getArchitecture()}
            </GradientHeading>
          </div>
          
          <ButtonCTA
            href={getDownloadUrl()}
            class="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-semibold text-white">
            <Download class="h-5 w-5" />
            Download Now
          </ButtonCTA>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="text-center">
        <GradientHeading class="text-gray-400">
          Don't see your platform? Check the latest 
          <a
            href="https://github.com/omniminds-ai/desktop/releases/latest/"
            target="_blank"
            class="text-white underline underline-offset-4">
            GitHub release
          </a>
          for more installers.
        </GradientHeading>
      </div>
    </div>
  </div>
  </section>

  <!-- App Features -->
  <div class="px-4 py-20">
    <GradientHeading class="mb-10 text-center text-3xl">Features</GradientHeading>

    <div class="mx-auto container grid grid-cols-1 gap-8 md:grid-cols-2">
      <!-- Training Gym -->
      <div class="rounded-3xl border border-gray-700 py-8">
        <div class="mb-4 flex items-start justify-center">
          <div class="ml-4">
            <GradientHeading class="text-4xl text-center mb-3">The Arena</GradientHeading>
            <GradientHeading class="mt-2 text-gray-400 max-w-md text-center">
              Train AI models by recording your computer interactions and earn rewards.
            </GradientHeading>
          </div>
        </div>
      </div>

      <!-- The Forge -->
      <div class="rounded-3xl border border-gray-700 py-8">
        <div class="mb-4 flex items-start justify-center">
          <div class="ml-4">
            <GradientHeading class="text-4xl text-center mb-3">The Dojo</GradientHeading>
            <GradientHeading class="mt-2 text-gray-400 max-w-md text-center">
              Create custom training dojos to collect high-quality data for computer-use AI agents.
            </GradientHeading>
          </div>
        </div>
      </div>

      <!-- Local by Default -->
      <div class="rounded-3xl border border-gray-700 py-8">
        <div class="mb-4 flex items-start justify-center">
          <div class="ml-4">
            <GradientHeading class="text-4xl text-center mb-3">Privacy by Default</GradientHeading>
            <GradientHeading class="mt-2 text-gray-400 max-w-md text-center">
              All of your data is stored locally on your machine until you press upload.
            </GradientHeading>
          </div>
        </div>
      </div>

      <!-- No Account Needed -->
      <div class="rounded-3xl border border-gray-700 py-8">
        <div class="mb-4 flex items-start justify-center">
          <div class="ml-4">
            <GradientHeading class="text-4xl text-center mb-3">No Account Needed</GradientHeading>
            <GradientHeading class="mt-2 text-gray-400 max-w-md text-center">
              No traditional account setup required - just connect your wallet and start using the app immediately.
            </GradientHeading>
          </div>
        </div>
      </div>
    </div>
  </div>

    <!-- Explore the platform section -->
   <section>
    <div
    class="glass-effect mx-auto flex container items-center rounded-2xl border border-gray-900 p-16">
    <!-- Left side content -->
    <div class="flex-1">
      <GradientHeading class="mb-6 text-4xl">Explore the platform</GradientHeading>
      <GradientHeading class="mb-8 text-lg">
        Get instant $OMNIS payments when you upload demonstrations.
      </GradientHeading>
      <ButtonCTA
        class="w-fit">
        Explore Now
      </ButtonCTA>
    </div>
  
    <!-- Right side - Platform mockup -->
    <div class="flex flex-1 justify-center">
      <img src={gym} alt="Arena Demo" class="h-full" />
    </div>
  </div>
   </section>
</main>

<style>
  .glass-effect {
    box-shadow: 
      inset 0px 32px 64px rgba(92, 58, 228, 0.08),
      inset 1px 1px 1px rgba(92, 58, 228, 0.5),
      inset 0px 0px 1px rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.02);
  }
</style>
