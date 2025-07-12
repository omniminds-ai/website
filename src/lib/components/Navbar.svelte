<!-- Navbar.svelte -->
<script lang="ts">
  import logo from '$lib/assets/logo.png';
  import logoTitle from '$lib/assets/Logo_Standard_dark.png';

  import {
    Download,
    Book,
    Coins,
    Menu,
    X,
    Database,
    ChevronDown,
    Users,
    Hammer,
    Dumbbell,
    Earth,
    Monitor,
    ChevronUp
  } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import { afterNavigate } from '$app/navigation';

  let isScrolled = false;
  let isMobileMenuOpen = false;
  let isDropdownOpen: 'community' | 'research' | 'ecosystem' | null = null;
  let isMobileCommunityDropdownOpen = true;

  afterNavigate(() => {
    if (isMobileMenuOpen) toggleMobileMenu();
  });

  onMount(() => {
    const handleScroll = () => {
      isScrolled = window.scrollY > 20;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
  }
</script>

<div class="fixed left-0 right-0 top-0 z-50 text-gray-600 transition-all duration-300">
  <div
    class="absolute inset-0 border-b border-gray-200 backdrop-blur-lg transition-opacity duration-300"
    class:opacity-0={!isScrolled}
    class:opacity-100={isScrolled}>
  </div>

  <div class="relative z-10 mx-auto max-w-7xl px-6">
    <div class="flex h-16 items-center justify-between">
      <!-- Left side with logo -->
      <div class="flex items-center space-x-8">
        <a href="/" class="group flex items-center">
          <img
            src={logo}
            alt="OmniMinds"
            class="hidden w-8 transition-transform group-hover:scale-105 lg:block" />
          <img src={logoTitle} alt="OmniMinds" class="block h-14 transition-transform lg:hidden" />
        </a>
      </div>

      <!-- Middle -->
        <!-- Desktop Navigation -->
        <nav class="hidden items-center space-x-8 lg:flex">
          <!-- Ecosystem Dropdown -->
          <div class="relative">
            <button
              class="navbar-dropdown-button group flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              onclick={() => (isDropdownOpen = isDropdownOpen === 'ecosystem' ? null : 'ecosystem')}
              onblur={(e) => {
                // Only close if not clicking another dropdown button
                const relatedTarget = e.relatedTarget as HTMLElement;
                if (!relatedTarget || !relatedTarget.closest('.navbar-dropdown-button')) {
                  setTimeout(() => (isDropdownOpen = null), 200);
                }
              }}>
              <Earth class="h-4 w-4 transition-transform group-hover:scale-110" />
              Ecosystem
              <ChevronDown class="h-4 w-4" />
            </button>

            {#if isDropdownOpen === 'ecosystem'}
              <div
                class="absolute left-0 mt-2 w-72 rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
                transition:slide>
                <a
                  href="/omnis"
                  class="flex items-center gap-3 rounded-lg p-3 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">
                  <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
                    <Coins class="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">$OMNIS</div>
                    <div class="text-xs text-gray-500">$OMNIS Tokenomics</div>
                  </div>
                </a>
                <a
                  href="/desktop"
                  class="flex items-center gap-3 rounded-lg p-3 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">
                  <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
                    <Monitor class="h-4 w-4 min-w-4 text-purple-500" />
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">Omniminds Desktop</div>
                    <div class="text-xs text-gray-500">All-in-one AI application</div>
                  </div>
                </a>
                <a
                  href="/desktop#arena"
                  class="ml-4 flex items-center gap-3 rounded-lg p-3 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">
                  <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
                    <Dumbbell class="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">The Arena</div>
                    <div class="text-xs text-gray-500">Contribute demonstrations</div>
                  </div>
                </a>
                <a
                  href="/desktop#dojo"
                  class="ml-4 flex items-center gap-3 rounded-lg p-3 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">
                  <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">
                    <Hammer class="h-4 w-4 text-purple-500" />
                  </div>
                  <div>
                    <div class="font-medium text-gray-900">The Dojo</div>
                    <div class="text-xs text-gray-500">Build custom agents</div>
                  </div>
                </a>
                <!--                <a-->
                <!--                  href="/gym"-->
                <!--                  class="flex items-center gap-3 rounded-lg p-3 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">-->
                <!--                  <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10">-->
                <!--                    <Earth class="h-4 w-4 text-purple-500" />-->
                <!--                  </div>-->
                <!--                  <div>-->
                <!--                    <div class="font-medium text-gray-900">Training Gym Classic</div>-->
                <!--                    <div class="text-xs text-gray-500">Browser-based version</div>-->
                <!--                  </div>-->
                <!--                </a>-->
              </div>
            {/if}
          </div>

          <!-- Community Dropdown -->
          <div class="relative">
            <button
              class="navbar-dropdown-button group flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              onclick={() => (isDropdownOpen = isDropdownOpen === 'community' ? null : 'community')}
              onblur={(e) => {
                // Only close if not clicking another dropdown button
                const relatedTarget = e.relatedTarget as HTMLElement;
                if (!relatedTarget || !relatedTarget.closest('.navbar-dropdown-button')) {
                  setTimeout(() => (isDropdownOpen = null), 200);
                }
              }}>
              <Users class="h-4 w-4 transition-transform group-hover:scale-110" />
              Community
              <ChevronDown class="h-4 w-4" />
            </button>

            {#if isDropdownOpen === 'community'}
              <div
                class="absolute left-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg"
                transition:slide>
                <a
                  href="https://discord.gg/YxP6yv9tAV"
                  target="_blank"
                  class="disabled flex items-center gap-2 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">
                  <i class="si si-discord h-4 w-4" />
                  Discord
                </a>
                <a
                  href="https://t.me/omnimindsai"
                  target="_blank"
                  class="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">
                  <i class="si si-telegram h-4 w-4" />
                  Telegram
                </a>
                <a
                  href="https://twitter.com/omnimindsai"
                  target="_blank"
                  class="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">
                  <i class="si si-twitter h-4 w-4" />
                  Twitter
                </a>
                <a
                  href="https://github.com/omniminds-ai"
                  target="_blank"
                  class="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">
                  <i class="si si-github h-4 w-4" />
                  GitHub
                </a>
              </div>
            {/if}
          </div>

          <!-- Docs -->
          <div class="relative">
            <a href="https://omniminds-ai.gitbook.io/whitepaper" target="_blank"
              class="navbar-dropdown-button group flex items-center gap-2 text-sm font-medium hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <Book class="h-4 w-4 transition-transform group-hover:scale-110" />
              Whitepaper
            </a>
          </div>

          <!--          &lt;!&ndash; Research Dropdown &ndash;&gt;-->
          <!--          <div class="relative">-->
          <!--            <button-->
          <!--              class="navbar-dropdown-button group flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"-->
          <!--              onclick={() => (isDropdownOpen = isDropdownOpen === 'research' ? null : 'research')}-->
          <!--              onblur={(e) => {-->
          <!--                // Only close if not clicking another dropdown button-->
          <!--                const relatedTarget = e.relatedTarget as HTMLElement;-->
          <!--                if (!relatedTarget || !relatedTarget.closest('.navbar-dropdown-button')) {-->
          <!--                  setTimeout(() => (isDropdownOpen = null), 200);-->
          <!--                }-->
          <!--              }}>-->
          <!--              <Database class="h-4 w-4 transition-transform group-hover:scale-110" />-->
          <!--              Research-->
          <!--              <ChevronDown class="h-4 w-4" />-->
          <!--            </button>-->

          <!--            {#if isDropdownOpen === 'research'}-->
          <!--              <div-->
          <!--                class="absolute left-0 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg"-->
          <!--                transition:slide>-->
          <!--                <a-->
          <!--                  href="/datasets"-->
          <!--                  class="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">-->
          <!--                  <Database class="h-4 w-4" />-->
          <!--                  Datasets-->
          <!--                </a>-->
          <!--                <a-->
          <!--                  href="https://docs.viralmind.ai/"-->
          <!--                  target="_blank"-->
          <!--                  class="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">-->
          <!--                  <Book class="h-4 w-4" />-->
          <!--                  Documentation-->
          <!--                </a>-->
          <!--              </div>-->
          <!--            {/if}-->
          <!--          </div>-->
        </nav>

      <!-- Right side -->
      <div class="flex items-center space-x-4">
        <!--        <div class="hidden md:block">-->
        <!--          <WalletMultiButton />-->
        <!--        </div>-->
                <a
                  href="/download"
                  class="group hidden items-center gap-3 rounded-full bg-gradient-to-r from-secondary-100 to-secondary-200 py-3 px-5 text-white text-sm shadow-purple-500/20 transition-all hover:scale-[1.02] sm:flex">
                  <div class="flex items-center gap-2">
                    <span>Book a demo</span>
                  </div>
                </a>

        <!-- Mobile menu button -->
        <button
          class="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 lg:hidden"
          onclick={toggleMobileMenu}>
          {#if isMobileMenuOpen}
            <X class="h-6 w-6" />
          {:else}
            <Menu class="h-6 w-6" />
          {/if}
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    {#if isMobileMenuOpen}
      <div
        transition:slide
        class="absolute left-0 right-0 top-16 border-b border-gray-200 bg-white/95 backdrop-blur-lg lg:hidden">
        <nav class="space-y-2 px-6 py-2">
          <!-- Ecosystem Section -->
          <div class="border-t border-gray-200 pt-2">
            <p class="px-2 py-1 text-xs font-semibold uppercase text-gray-500">Ecosystem</p>
            <a
              href="/omnis"
              class="flex items-center gap-3 px-2 py-2 text-gray-600 transition-colors hover:text-gray-900">
              <Coins class="h-5 w-5" />
              $OMNIS
            </a>
            <a
              href="/desktop"
              class="flex items-center gap-3 px-2 py-2 text-gray-600 transition-colors hover:text-gray-900">
              <Monitor class="h-5 w-5 min-w-5" />
              Omniminds Desktop
            </a>
            <a
              href="/desktop#arena"
              class="ml-5 flex items-center gap-3 px-2 py-2 text-gray-600 transition-colors hover:text-gray-900">
              <Dumbbell class="h-5 w-5" />
              The Arena
            </a>
            <a
              href="/desktop#dojo"
              class="ml-5 flex items-center gap-3 px-2 py-2 text-gray-600 transition-colors hover:text-gray-900">
              <Hammer class="h-5 w-5" />
              The Dojo
              </a>
          </div>

          <!-- Community Section -->
          <div class="border-t border-gray-200 pt-2">
            <button
              onclick={() => (isMobileCommunityDropdownOpen = !isMobileCommunityDropdownOpen)}
              class="flex w-full flex-row items-center text-left">
              <p class="grow px-2 py-1 text-xs font-semibold uppercase text-gray-500">Community</p>
              <ChevronUp
                class={`h-5 w-5 grow-0 ${isMobileCommunityDropdownOpen ? 'rotate-180' : ''} transition-transform`} />
            </button>
            {#if isMobileCommunityDropdownOpen}
              <div transition:slide>
                <a
                  href="https://discord.gg/YxP6yv9tAV"
                  target="_blank"
                  class="disabled flex items-center gap-3 px-2 py-2 text-gray-600 transition-colors hover:text-gray-900">
                  <i class="si si-discord h-5 w-5" />
                  Discord
                </a>
                <a
                  href="https://t.me/omnimindsai"
                  target="_blank"
                  class="flex items-center gap-3 px-2 py-2 text-gray-600 transition-colors hover:text-gray-900">
                  <i class="si si-telegram h-5 w-5" />
                  Telegram
                </a>
                <a
                  href="https://twitter.com/omnimindsai"
                  target="_blank"
                  class="flex items-center gap-3 px-2 py-2 text-gray-600 transition-colors hover:text-gray-900">
                  <i class="si si-twitter h-5 w-5" />
                  Twitter
                </a>
                <a
                  href="https://github.com/omniminds-ai"
                  target="_blank"
                  class="flex items-center gap-3 px-2 py-2 text-gray-600 transition-colors hover:text-gray-900">
                  <i class="si si-github h-5 w-5" />
                  <span class="animated-underline">GitHub</span>
                </a>
              </div>
            {/if}
          </div>

          <!-- Research Section -->
          <!--          <div class="border-t border-gray-200 pt-2">-->
          <!--            <p class="px-2 py-1 text-xs font-semibold uppercase text-gray-500">Research</p>-->
          <!--            <a-->
          <!--              href="/datasets"-->
          <!--              class="flex items-center gap-3 px-2 py-2 text-gray-600 transition-colors hover:text-gray-900">-->
          <!--              <Database class="h-5 w-5" />-->
          <!--              Datasets-->
          <!--            </a>-->
          <!--            <a-->
          <!--              href="https://docs.viralmind.ai/"-->
          <!--              target="_blank"-->
          <!--              class="flex items-center gap-3 px-2 py-2 text-gray-600 transition-colors hover:text-gray-900">-->
          <!--              <Book class="h-5 w-5" />-->
          <!--              Documentation-->
          <!--            </a>-->
          <!--          </div>-->

                    <div class="mt-2 border-t border-gray-200 pt-4">
                      <a
                        href="/download"
                        class="flex items-center gap-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-2.5 text-white transition-all hover:from-purple-500 hover:to-blue-400">
                        <Download class="h-5 w-5 text-white/90" />
                        <span class="font-medium">Download for Desktop</span>
                      </a>
                    </div>

          <!--          <div class="">-->
          <!--            <WalletMultiButton />-->
          <!--          </div>-->
        </nav>
      </div>
    {/if}
  </div>
</div>

<!-- Spacer -->
<div class="h-16"></div>
