<script lang="ts">
  import pfp from '$lib/assets/pfp.png';
  import exampleUsage from '$lib/assets/exampleusage.mp4';
  import gym from '$lib/assets/gym.png';
  import { onMount } from 'svelte';
  import {
    Dumbbell,
    Hammer,
    Database,
    Brain,
    BarChart,
    Monitor,
    Sparkles,
    Download,
    Bot,
    User,
    Scale,
    ArrowRight,
    ArrowDown,
    Split,
    MonitorDot,
    Image,
    Keyboard,
    Joystick,
    Mouse,
    ListTree,
    Github,
    HammerIcon
  } from 'lucide-svelte';
  import ButtonCTA from '$lib/components/ButtonCTA.svelte';
  import Button from '$lib/components/Button.svelte';
  import VideoPopup from '$lib/components/VideoPopup.svelte';
  import GradientHeading from '$lib/components/GradientHeading.svelte';

  let showDemoVideo = false;

  onMount(() => {
    // Any initialization code here
  });
</script>

<svelte:head>
  <title>Omniminds.ai - Omniminds Desktop</title>
  <meta property="og:title" content="Omniminds.ai - Omniminds Desktop" />
  <meta name="twitter:title" content="Omniminds.ai - Omniminds Desktop" />
  <meta
    name="description"
    content="Your unified platform for contributing to, training, and evaluating computer-use agents, all in one powerful desktop application." />
  <meta
    name="twitter:description"
    content="Your unified platform for contributing to, training, and evaluating computer-use agents, all in one powerful desktop application." />
  <meta
    property="og:description"
    content="Your unified platform for contributing to, training, and evaluating computer-use agents, all in one powerful desktop application." />
</svelte:head>

<div class="min-h-screen">
  <!-- Hero Section -->
  <section class="relative">
    <div class="mx-auto max-w-7xl px-4 py-24">
      <div class="mb-8 text-center">
        <GradientHeading class="mb-0 text-5xl">Omniminds Desktop</GradientHeading>
        <GradientHeading class="mb-6">All-in-one app for computer-use agents</GradientHeading>
        <GradientHeading class="mx-auto mb-6 max-w-2xl text-center">
          Your unified platform for contributing to, training, and evaluating computer-use agents,
          all in one powerful desktop application.
        </GradientHeading>
        <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonCTA href="/download" class="inline-flex items-center gap-2">
            Download Now
          </ButtonCTA>
          <ButtonCTA>
            <a
              href="https://github.com/omniminds-ai/desktop"
              target="_blank">
              <GradientHeading class="animated-underline mb-0">View Source</GradientHeading>
            </a>
          </ButtonCTA>
        </div>
      </div>

      <div class="relative mt-16 overflow-hidden rounded-xl">
        <video
          src={exampleUsage}
          autoplay
          loop
          muted
          playsinline
          class="mx-auto w-full lg:w-[640px]">
        </video>
      </div>
    </div>
  </section>

  <!-- Arena Section -->
  <section id="arena" class="container mx-auto py-20">
    <div class="mx-auto px-4">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div class="border-l-4 border-secondary-300 ps-6">
          <GradientHeading class="mb-4 text-4xl">The Arena</GradientHeading>
          <GradientHeading class="mb-6 text-xl">
            Record your everyday computer tasks to train AI models and earn SOL. High-quality
            demonstrations earn more per task, rewarding expert skill.
          </GradientHeading>
          <ul class="mb-8 space-y-3">
            <li class="flex items-start gap-3">
              <GradientHeading class="mb-0">
                Complete simple tasks like ordering food or browsing websites
              </GradientHeading>
            </li>
            <li class="flex items-start gap-3">
              <GradientHeading class="mb-0">
                Earn rewards for each quality demonstration uploaded
              </GradientHeading>
            </li>
            <li class="flex items-start gap-3">
              <GradientHeading class="mb-0">
                Help build better AI assistants through your contributions
              </GradientHeading>
            </li>
          </ul>
          <div class="flex gap-4">
            <Button
              onclick={() => {
                showDemoVideo = true;
              }}>
              Watch Demo
            </Button>
            <a
              href="/download"
              class="inline-flex items-center gap-2 rounded-full border border-purple-600 bg-white px-6 py-3 text-purple-600 shadow transition-colors hover:bg-purple-50">
              Get Started
            </a>
          </div>
          <VideoPopup
            videoSrc="https://drive.google.com/file/d/1w02RoN1MAQ0-WLEXFDRNNiJLGMaYoDNb/preview"
            bind:isOpen={showDemoVideo} />
        </div>
        <div class="overflow-hidden rounded">
          <div>
            <img src={gym} alt="Training Gym" class="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- The Dojo Section -->
  <section id="dojo" class="container mx-auto py-20">
    <div class="mx-auto px-4">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div
          class="relative order-1 max-w-[500px] rounded-xl border border-secondary-300 p-6 px-10">
          <div class="mb-6">
            <div class="mb-3 flex items-center gap-2">
              <GradientHeading class="text-xl">Describe your dream agent</GradientHeading>
            </div>
            <div class="relative">
              <input
                type="text"
                placeholder="An agent that can book flights and hotels..."
                class="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500" />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              </div>
            </div>
          </div>

          <div class="mb-6 rounded-lg p-4">
            <GradientHeading class="mb-2 text-sm">Estimated Requirements</GradientHeading>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <div class="text-2xl font-bold text-blue-600">75,000</div>
                <GradientHeading class="text-sm">$OMNIS Required</GradientHeading>
              </div>
              <div>
                <div class="text-2xl font-bold text-blue-600">13,600</div>
                <GradientHeading class="text-sm">Demonstrations</GradientHeading>
              </div>
            </div>
          </div>

          <div>
            <a
              href="/download"
              class="inline-block w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 px-6 py-3 text-center text-accent-200 transition-colors hover:from-purple-700 hover:to-blue-600">
              Generate Dojo
            </a>
          </div>
        </div>
        <div class="order-2 border-l-4 border-secondary-300 ps-6">
          <GradientHeading class="mb-4 text-4xl">The Dojo</GradientHeading>
          <GradientHeading class="mb-6 text-xl ">
            Generate Dojo tasks by prompting skills and capabilities. Our community provides
            targeted demonstrations to automate your desired workflow.
          </GradientHeading>
          <ul class="mb-8 space-y-3">
            <li class="flex items-start gap-3">
              <GradientHeading class="mb-0">
                Define your custom agent's capabilities
              </GradientHeading>
            </li>
            <li class="flex items-start gap-3">
              <GradientHeading class="mb-0">
                Collect targeted demonstrations from our community
              </GradientHeading>
            </li>
            <li class="flex items-start gap-3">
              <GradientHeading class="mb-0">
                Build specialized AI models with real world data
              </GradientHeading>
            </li>
          </ul>
          <Button
              onclick={() => {
                showDemoVideo = true;
              }}>
              Watch Demo
            </Button>
          <VideoPopup
            videoSrc="https://drive.google.com/file/d/1w02RoN1MAQ0-WLEXFDRNNiJLGMaYoDNb/preview"
            bind:isOpen={showDemoVideo} />
        </div>
      </div>
    </div>
  </section>

  <!-- Quality Data Section -->
  <section class="py-20">
    <div class="mx-auto max-w-7xl px-4">
      <div class="mb-40 text-center">
        <GradientHeading class="mb-4 text-4xl">Quality Data, By Design</GradientHeading>
        <GradientHeading class="mx-auto max-w-2xl text-xl">
          Every aspect of our platform is designed to generate high-quality training data. From
          AI-generated tasks to expert demonstrations.
        </GradientHeading>
      </div>

      <!-- Horizontal Pipeline Graphic -->
      <div class="mx-auto mb-20 max-w-4xl">
        <!-- Desktop 3-Column Layout -->
        <div class="hidden md:block">
          <div class="relative mb-10 flex items-start justify-between">
            <!-- Card Row -->
            <div class="flex w-full justify-between">
              <!-- Forge Intelligence -->
              <div class="flex h-[200px] w-[200px] flex-col items-center justify-center">
                <div class="flex flex-col items-center text-center">
                  <Bot class="mb-6 h-20 w-20 text-secondary-200" />
                  <h2 class="text-lg font-bold text-secondary-200">Dojo AI</h2>
                  <p class="mt-2 text-sm text-accent-200">Generates diverse training scenarios</p>
                </div>
              </div>

              <!-- Arrow 1 -->
              <div class="mt-6 flex w-[100px] items-start justify-center">
                <ArrowRight class="h-8 w-8 text-secondary-200" />
              </div>

              <!-- Human Trainers -->
              <div
                class="z-10 flex h-[200px] w-[200px] flex-col items-center justify-center rounded-xl">
                <div class="flex flex-col items-center text-center">
                  <User class="mb-6 h-20 w-20 text-secondary-200" />
                  <h2 class="text-lg font-bold text-secondary-200">Human Trainers</h2>
                  <p class="mt-2 text-sm text-accent-200">Expert recordings, real environments</p>
                </div>
              </div>

              <!-- Arrow 2 -->
              <div class="mt-6 flex w-[100px] items-start justify-center">
                <ArrowRight class="h-8 w-8 text-secondary-200" />
              </div>

              <!-- AI Judge -->
              <div class="flex h-[200px] w-[200px] flex-col items-center justify-center rounded-xl">
                <div class="flex flex-col items-center text-center">
                  <Hammer class="mb-6 h-20 w-20 text-secondary-200" />
                  <h3 class="text-lg font-bold text-secondary-200">AI Judge</h3>
                  <p class="mt-2 text-sm text-accent-200">Quality assessment for dynamic rewards</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Vertical Layout -->
        <div class="flex flex-col items-center md:hidden">
          <!-- Forge Intelligence -->
          <div class="z-10 w-[240px] rounded-xl border border-gray-100 bg-white p-6 shadow-md">
            <div class="flex flex-col items-center text-center">
              <div
                class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Bot class="h-8 w-8 text-blue-600" />
              </div>
              <h3 class="text-lg font-bold text-gray-900">Forge AI</h3>
              <p class="mt-2 text-sm text-accent-200">Generates diverse training scenarios</p>
            </div>
          </div>

          <!-- Down arrow 1 -->
          <div class="my-2 flex h-16 items-center justify-center">
            <ArrowDown class="h-10 w-10 text-gray-400" />
          </div>

          <!-- Human Trainers -->
          <div class="z-10 w-[240px] rounded-xl border border-gray-100 bg-white p-6 shadow-md">
            <div class="flex flex-col items-center text-center">
              <div
                class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                <User class="h-8 w-8 text-purple-600" />
              </div>
              <h3 class="text-lg font-bold text-gray-900">Gym Trainers</h3>
              <p class="mt-2 text-sm text-accent-200">Expert recordings, real environments</p>
            </div>
          </div>

          <!-- Down arrow 2 -->
          <div class="my-2 flex h-16 items-center justify-center">
            <ArrowDown class="h-10 w-10 text-gray-400" />
          </div>

          <!-- AI Judge -->
          <div class="z-10 w-[240px] rounded-xl border border-gray-100 bg-white p-6 shadow-md">
            <div class="flex flex-col items-center text-center">
              <div
                class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Scale class="h-8 w-8 text-green-600" />
              </div>
              <h3 class="text-lg font-bold text-gray-900">AI Judge</h3>
              <p class="mt-2 text-sm text-accent-200">Quality assessment system</p>
            </div>
          </div>

          <!-- Return flow arrow -->
          <div class="mt-8 flex w-full flex-col items-center">
            <div class="flex flex-col items-center">
              <Split class="mb-2 h-10 w-10 text-gray-400" />
              <div
                class="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
                Better quality = more rewards earned
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Technical Details -->
  <section class="py-24">
    <div class="container mx-auto px-4">
      <div
        class="glass-effect grid grid-cols-1 items-center gap-16 rounded-2xl p-20 lg:grid-cols-2">
        <div>
          <GradientHeading class="mb-6 text-4xl">Powerful, Private Research</GradientHeading>
          <p class="mb-8 text-lg text-accent-200">
            Advanced, open-source tools for recording demonstrations and generating data in demand
            by cutting-edge AI research.
          </p>

          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <div>
                <GradientHeading class="mb-1 text-lg font-bold">Advanced ML Tools</GradientHeading>
                <p class="text-accent-200">
                  Powerful tools for replaying demonstrations and processing them into structured,
                  augmented trajectory data
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div>
                <GradientHeading class="mb-1 text-lg font-bold">
                  Local Storage First
                </GradientHeading>
                <p class="text-accent-200">
                  Keep all your sensitive data on your machine, with complete control over what you
                  share
                </p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div>
                <GradientHeading class="mb-1 text-lg font-bold">
                  Multimodal Recording
                </GradientHeading>
                <p class="text-accent-200">
                  Gather rich metadata demanded by cutting-edge AI research: screenshots,
                  keyboard/mouse input, and structured UI data
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="overflow-hidden rounded-2xl border border-secondary-300 w-fit mx-auto p-5">
          <div class="flex items-center justify-center">
            <!-- Technical diagram mockup -->
            <div class="mx-auto max-w-sm text-center">
              <div class="mb-4 grid grid-cols-3 gap-4">
                <div class="rounded-lg p-4">
                  <MonitorDot class="mx-auto mb-2 h-8 w-8 text-secondary-300" />
                  <p class="text-xs font-medium text-accent-200">Recording</p>
                </div>
                <div class="rounded-lg p-4">
                  <Database class="mx-auto mb-2 h-8 w-8 text-secondary-300" />
                  <p class="text-xs font-medium text-accent-200">Processing</p>
                </div>
                <div class="rounded-lg p-4">
                  <Dumbbell class="mx-auto mb-2 h-8 w-8 text-secondary-300" />
                  <p class="text-xs font-medium text-accent-200">Training</p>
                </div>
              </div>
              <div class="rounded-lg p-4">
                <img src={pfp} alt="Omniminds Desktop" class="mx-auto mb-2 h-16 w-16" />
                <p class="text-sm font-medium text-accent-200">Omniminds Desktop</p>
              </div>
              <div class="mt-4 rounded-lg border border-secondary-300 p-3">
                <p class="text-xs text-accent-200">Secure Local Database</p>
              </div>

              <!-- Data Collection Types -->
              <div class="mt-4 grid grid-cols-3 gap-2">
                <div class="rounded-lg border border-secondary-300 p-2">
                  <Image class="mx-auto mb-1 h-4 w-4 text-purple-800" />
                  <p class="text-xs text-accent-200">screenshots</p>
                </div>
                <div class="rounded-lg border border-secondary-300 p-2">
                  <div class="mb-1 flex justify-center gap-1">
                    <Mouse class="h-4 w-4 text-purple-800" />
                    <Keyboard class="h-4 w-4 text-purple-800" />
                    <Joystick class="h-4 w-4 text-purple-800" />
                  </div>
                  <p class="text-xs text-accent-200">actions</p>
                </div>
                <div class="rounded-lg border border-secondary-300 p-2">
                  <ListTree class="mx-auto mb-1 h-4 w-4 text-purple-800" />
                  <p class="text-xs text-accent-200">axtree</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

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
        <ButtonCTA class="rounded-full bg-secondary-100 px-8 py-3 text-white transition-colors">
          Signup for free
        </ButtonCTA>

        <Button class="border-none">
          <a href="/download">
            Download Desktop Application
          </a>
        </Button>
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
