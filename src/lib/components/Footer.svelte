<script lang="ts">
  import logo from '$lib/assets/logo.png';
  import logoTitle from '$lib/assets/Logo_Standard_light.svg';
</script>

<!-- Spacer to prevent content from going under fixed navbar -->
<div class="h-16"></div>

<footer class="!bg-primary-200 py-20">
  <div class="relative">
    <div class="mx-auto max-w-7xl px-6 py-4">
      <div class="grid grid-cols-1 text-white md:grid-cols-4">
        <div class="mb-auto flex space-x-8">
          <a href="/" class="group flex">
            <img
              src={logoTitle}
              alt="OmniMinds"
              class="hidden w-[140px] transition-transform group-hover:scale-105 lg:block" />
            <img src={logo} alt="OmniMinds" class="block h-10 transition-transform lg:hidden mb-10" />
          </a>
        </div>

        <div class="space-y-7">
          <h4>Ecosystem</h4>
          <ul class="space-y-2">
            <li class="hover:text-accent-200">
              <a href="/token">$OMNIS Tokenomics</a>
            </li>
            <li class="hover:text-accent-200">
              <a href="/download">Omniminds Desktop</a>
            </li>
            <li class="hover:text-accent-200">
              <a href="/desktop#arena">The Arena</a>
            </li>
            <!-- <li class="hover:text-accent-200">
              <a href="#">Custom integration builder</a>
            </li> -->
            <li class="hover:text-accent-200">
              <a href="/desktop#dojo">The Dojo</a>
            </li>
          </ul>
        </div>

        <div class="space-y-7 mt-7 lg:mt-0">
          <h4>Community</h4>
          <ul class="space-y-2">
            <li class="hover:text-accent-200">
              <a href="https://discord.com/invite/YxP6yv9tAV" target="_blank">Discord</a>
            </li>
            <li class="hover:text-accent-200">
              <a href="https://t.me/omnimindsai" target="_blank">Telegram</a>
            </li>
            <li class="hover:text-accent-200">
              <a href="https://x.com/omnimindsai" target="_blank">X (ex Twitter)</a>
            </li>
            <li class="hover:text-accent-200">
              <a href="https://github.com/omniminds-ai" target="_blank">Github</a>
            </li>
          </ul>
        </div>

        <div class="mt-5 lg:mt-0">
          <h4 class="hover:text-accent-200">
            <a href="https://omniminds-ai.gitbook.io/whitepaper" target="_blank" rel="noopener noreferrer">Whitepaper</a></h4>
        </div>
      </div>
    </div>
  </div>
</footer>
