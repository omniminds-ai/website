<script lang="ts">
  import logo_full from '$lib/assets/Logo_Standard_dark.png';
  import logo from '$lib/assets/logo.png';
  import exampleUsage from '$lib/assets/exampleusage.mp4';
  import gym from '$lib/assets/gym.png';
  import Button from '$lib/components/Button.svelte';
  import HeroSection from '$lib/components/HeroSection.svelte';
  import GradientHeading from '$lib/components/GradientHeading.svelte';
  import ParticlesBackground from '$lib/components/ParticlesBackground.svelte';
  import ButtonCTA from '$lib/components/ButtonCTA.svelte';
  import { onMount } from 'svelte';

  let copied = false;
  function copyToClipboard() {
    navigator.clipboard.writeText('coming soon ---');
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }
  import {
    PlayCircle,
  } from 'lucide-svelte';
  import type { SettingsRes } from '$lib/types';
  import VideoPopup from '$lib/components/VideoPopup.svelte';
  import posthog from 'posthog-js';

  // Dataset sample type definition
  type DatasetSample = {
    input: {
      screenshot: string;
      instruction: string;
    };
    action: string;
  };

  // Dataset samples
  let datasetSamples: DatasetSample[] = [];

  let dreamAgentInput = '';
  let placeholderIndex = 0;
  let estimatedAmount = 75000; // Default value
  let pricePerDemo = 5.5; // Default value
  let settings: SettingsRes;
  let showTrainingVideo = false;
  let showForgeVideo = false;
  let showAgentVideo = false;

  const placeholders = [
    'An agent that can book flights and hotels...',
    'An agent that can edit videos in Premiere Pro...',
    'An agent that can manage my email inbox...',
    'An agent that can create presentations...'
  ];

  onMount(() => {
    // Cycle through placeholders
    setInterval(() => {
      placeholderIndex = (placeholderIndex + 1) % placeholders.length;
    }, 3000);

    // Update estimates
    setInterval(() => {
      estimatedAmount = Math.floor(Math.random() * (100000 - 50000) + 50000);
      pricePerDemo = Math.floor(Math.random() * (6 - 5) * 10 + 50) / 10;
    }, 5000);

    // Fetch dataset samples
    fetch('/dataset_preview.json')
      .then(async (res) => {
        if (!res.ok) throw Error(res.status + ': ' + res.statusText);
        const data = await res.json();
        // Add data URI prefix to base64 encoded screenshots
        datasetSamples = data.map((sample: any) => ({
          ...sample,
          input: {
            ...sample.input,
            screenshot: sample.input.screenshot.startsWith('data:')
              ? sample.input.screenshot
              : `data:image/jpeg;base64,${sample.input.screenshot}`
          }
        }));
      })
      .catch((error) => {
        console.error('Failed to fetch dataset samples:', error);
        // Fallback data in case the fetch fails
        datasetSamples = [
          {
            input: {
              screenshot: 'data:image/png;base64,iVBOR...',
              instruction: 'Create a spreadsheet with monthly budget data'
            },
            action: 'click(156, 234)'
          },
          {
            input: {
              screenshot: 'data:image/png;base64,iVBOR...',
              instruction: 'Find and open the settings menu in Photoshop'
            },
            action: "type('Budget 2025')"
          },
          {
            input: {
              screenshot: 'data:image/png;base64,iVBOR...',
              instruction: 'Search for flights from New York to London'
            },
            action: 'doubleClick(450, 120)'
          }
        ];
      });

    // Fetch settings
    fetch('https://api.omniminds.ai/v1/settings')
      .then(async (res) => {
        console.log({ res });
        if (!res.ok) throw Error(res.status + ': ' + res.statusText);
        const result = await res.json();
        settings = result.success ? result.data : result;
      })
      .catch((error) => {
        console.error('Failed to fetch settings:', error);
      });
  });

  function handleGenerateGym() {
    window.location.href = `/download`;
  }
</script>

<!-- Hero Section -->
<HeroSection />

<div class="space-y-52">
  <!-- Features Section -->
  <section>
    <div class="mx-auto flex max-w-7xl flex-col gap-24 px-4">
      <!-- Training Gym -->
      <GradientHeading class="text-4xl">AI agents built from your data</GradientHeading>
      <div class="grid items-center gap-12 lg:grid-cols-2">
        <div class="border-l-4 border-l-secondary-100 ps-6 text-left">
          <GradientHeading class="text-2xl">Earn $OMNIS by sharing data</GradientHeading>
          <GradientHeading class="text-md mb-6">
            Show AI how to use apps, earn rewards. Get instant $OMNIS payments when you upload
            demonstrations.
          </GradientHeading>
          <Button
            onclick={() => {
              showTrainingVideo = true;
            }}>
            Watch Demo
          </Button>
          <VideoPopup
            videoSrc="https://drive.google.com/file/d/1w02RoN1MAQ0-WLEXFDRNNiJLGMaYoDNb/preview"
            bind:isOpen={showTrainingVideo} />
        </div>
        <div class="relative overflow-hidden rounded bg-gray-100 shadow-2xl">
          <img src={gym} alt="Arena Demo" class="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  </section>
  
  <section>
    <div class="mx-auto flex container flex-col gap-24 px-4">
      <!-- Training Gym -->
      <GradientHeading class="mx-auto max-w-[400px] text-3xl">
        Purpose-built products to implement every use case
      </GradientHeading>
      <div class="grid items-center gap-12 lg:grid-cols-2">
        <div class="flex h-full flex-col items-center rounded-2xl border p-10">
          <GradientHeading class="text-2xl">The Dojo</GradientHeading>
          <GradientHeading class="text-md mb-6 text-center">
            Specify your AI needs, we'll handle the rest. Quality demonstrations at scale train your
            specialized agent.
          </GradientHeading>
          <Button
          class="mb-5"
            onclick={() => {
              showTrainingVideo = true;
            }}>
            Watch Demo
          </Button>
  
          <!-- Dream Agent Section -->
          <div class="w-full max-w-md rounded-2xl border border-secondary-300 p-6">
            <h3 class="mb-4 text-lg font-medium text-white">Describe your dream agent</h3>
  
            <div class="mb-6">
              <input
                type="text"
                placeholder="An agent that can manage my email inbox..."
                class="w-full rounded-xl border border-secondary-300 bg-transparent p-2 text-white placeholder-gray-400 transition-colors focus:border-blue-500 focus:outline-none" />
            </div>
  
            <div class="space-y-4">
              <h4 class="text-sm font-medium text-white">Estimated Requirements</h4>
  
              <div class="flex items-start justify-between">
                <div class="text-center">
                  <div class="mb-1 text-3xl font-bold text-secondary-300">64,637</div>
                  <div class="text-sm text-gray-400">$OMNIS Required</div>
                </div>
                <div class="text-center">
                  <div class="mb-1 text-3xl font-bold text-secondary-300">11,969</div>
                  <div class="text-sm text-gray-400">Demonstrations</div>
                </div>
              </div>
  
              <div class="mt-4 text-sm text-gray-400">At 5.4 $OMNIS per demonstration</div>
            </div>
          </div>
        </div>
  
        <div class="flex h-full flex-col items-center rounded-2xl border p-10">
          <GradientHeading class="text-2xl">Computer Use Agent</GradientHeading>
          <GradientHeading class="text-md mb-6 text-center">
            Complete computer tasks with a state-of-the-art computer-use agent trained with the data
            generated by the community.
          </GradientHeading>
          <Button
          class="mb-5"
            onclick={() => {
              showTrainingVideo = true;
            }}>
            Watch Demo
          </Button>
  
          <!-- Chat Interface -->
          <div class="w-full max-w-md space-y-3 rounded-2xl border border-secondary-300 p-4 h-full flex flex-col justify-center">
            <!-- Assistant message -->
            <div class="flex items-start gap-3">
              <div class="h-8 w-8 flex-shrink-0 rounded-full bg-purple-500"></div>
              <div class="max-w-xs rounded-2xl bg-purple-600/30 px-4 py-3">
                <p class="text-sm text-white">
                  Hi! I'm your computer-use assistant. What would you like help with?
                </p>
              </div>
            </div>
  
            <!-- User message -->
            <div class="flex items-start justify-end gap-3">
              <div class="max-w-xs rounded-2xl bg-gray-700 px-4 py-3">
                <p class="text-sm text-white">
                  Can you help me find a good Italian restaurant nearby that's open late?
                </p>
              </div>
              <div
                class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
              </div>
            </div>
  
            <!-- Assistant response -->
            <div class="flex items-start gap-3">
              <div class="h-8 w-8 flex-shrink-0 rounded-full bg-purple-500"></div>
              <div class="max-w-xs rounded-2xl bg-purple-600/30 px-4 py-3">
                <p class="text-sm text-white">
                  I'll help you find a great Italian spot! Let me check DoorDash for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
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
        href="/download"
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
  
  
  <!-- Testimonials -->
   <!-- <section>
     <div class="flex">
       <div
         class="glass-effect mx-auto flex flex-col items-center justify-center rounded-2xl border border-gray-900 p-16 flex-1">
         <GradientHeading class="mb-6 text-4xl">Logo</GradientHeading>
         <GradientHeading class="mb-8 text-lg">
           " Get instant $OMNIS payments when you upload demonstrations.Get instant $OMNIS payments when
           you upload demonstrations.Get instant $OMNIS payments when you upload demonstrations."
         </GradientHeading>
         <div class="flex">
           <div class="h-20 w-20 rounded-full"></div>
           <div class="text-white flex flex-col">
             <span>Raphael Allstadt</span>
             <span>Co-Founder & CEO</span>
           </div>
         </div>
     
         <button class="text-secondary-100">Read Case Study</button>
       </div>
       <div
         class="glass-effect mx-auto flex flex-col items-center justify-center rounded-2xl border border-gray-900 p-16 flex-1">
         <GradientHeading class="mb-6 text-4xl">Logo</GradientHeading>
         <GradientHeading class="mb-8 text-lg">
           " Get instant $OMNIS payments when you upload demonstrations.Get instant $OMNIS payments when
           you upload demonstrations.Get instant $OMNIS payments when you upload demonstrations."
         </GradientHeading>
         <div class="flex">
           <div class="h-20 w-20 rounded-full"></div>
           <div class="text-white flex flex-col">
             <span>Raphael Allstadt</span>
             <span>Co-Founder & CEO</span>
           </div>
         </div>
     
         <button class="text-secondary-100">Read Case Study</button>
       </div>
       <div
         class="glass-effect mx-auto flex flex-col items-center justify-center rounded-2xl border border-gray-900 p-16 flex-1">
         <GradientHeading class="mb-6 text-4xl">Logo</GradientHeading>
         <GradientHeading class="mb-8 text-lg">
           " Get instant $OMNIS payments when you upload demonstrations.Get instant $OMNIS payments when
           you upload demonstrations.Get instant $OMNIS payments when you upload demonstrations."
         </GradientHeading>
         <div class="flex">
           <div class="h-20 w-20 rounded-full"></div>
           <div class="text-white flex flex-col">
             <span>Raphael Allstadt</span>
             <span>Co-Founder & CEO</span>
           </div>
         </div>
     
         <button class="text-secondary-100">Read Case Study</button>
       </div>
     </div>
   </section> -->
  
  <!-- Ready to get started? -->
   <section>
     <div
       class="glass-effect mx-auto flex max-w-7xl flex-col items-center justify-center rounded-2xl border border-gray-900 p-16">
       <!-- Left side content -->
       <GradientHeading class="mb-6 text-4xl">Ready to get started?</GradientHeading>
       <GradientHeading class="mb-8 text-lg">
         Get instant $OMNIS payments when you upload demonstrations.
       </GradientHeading>
       <div class="flex gap-4">
         <a
           href="/download"
           class="group hidden items-center gap-3 rounded-full bg-gradient-to-r from-secondary-100 to-secondary-200 py-3 px-5 text-white text-sm shadow-purple-500/20 transition-all hover:scale-[1.02] sm:flex">
           <div class="flex items-center gap-2">
             <span>Download Desktop Application</span>
           </div>
         </a>
       </div>
     </div>
   </section>
</div>

<style>
.glass-effect {
  box-shadow: 
    inset 0px 32px 64px rgba(92, 58, 228, 0.08),
    inset 1px 1px 1px rgba(92, 58, 228, 0.5),
    inset 0px 0px 1px rgba(255, 255, 255, 0.4);
}
</style>
