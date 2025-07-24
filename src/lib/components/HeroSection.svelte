<script lang="ts">
    import exampleUsage from '$lib/assets/exampleusage.mp4';
    import GradientHeading from './GradientHeading.svelte';
    import BgEffect from '$lib/assets/bg-effect.svg'
      import partner_1 from "$lib/assets/partner_1.png"
  import partner_2 from "$lib/assets/partner_2.png"
  import partner_3 from "$lib/assets/partner_3.png"
  import partner_4 from "$lib/assets/partner_4.png"
  import partner_5 from "$lib/assets/partner_5.png"
</script>

<section class="relative min-h-screen overflow-hidden !bg-no-repeat !bg-cover" style={`background: url(${BgEffect})`}>
  <!-- Main Content Container -->
  <div class="relative z-20 flex flex-col items-center min-h-screen px-6 py-20">
    <!-- Header Content -->
    <div class="text-center mb-12 max-w-4xl">
      <GradientHeading class="text-5xl">
        Computer-Use AI
        for everyone.
      </GradientHeading>
      
      <p class="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
        We believe we can create a revolution.
      </p>
      
      <!-- CTA Button -->
      <a
        href="https://t.me/omnimindsai"
        target="_blank"
        class="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-secondary-100 to-secondary-200 py-3 px-5 text-white text-sm shadow-purple-500/20 transition-all hover:scale-[1.02]"
      >
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 4C10.4178 4 8.87103 4.46919 7.55544 5.34824C6.23985 6.22729 5.21447 7.47672 4.60897 8.93853C4.00347 10.4003 3.84504 12.0089 4.15372 13.5607C4.4624 15.1126 5.22433 16.538 6.34315 17.6569C7.46197 18.7757 8.88743 19.5376 10.4393 19.8463C11.9911 20.155 13.5997 19.9965 15.0615 19.391C16.5233 18.7855 17.7727 17.7602 18.6518 16.4446C19.5308 15.129 20 13.5823 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4ZM15.93 9.48L14.62 15.67C14.52 16.11 14.26 16.21 13.89 16.01L11.89 14.53L10.89 15.46C10.8429 15.5215 10.7824 15.5715 10.7131 15.6062C10.6438 15.6408 10.5675 15.6592 10.49 15.66L10.63 13.66L14.33 10.31C14.5 10.17 14.33 10.09 14.09 10.23L9.55 13.08L7.55 12.46C7.12 12.33 7.11 12.03 7.64 11.83L15.35 8.83C15.73 8.72 16.05 8.94 15.93 9.48Z" />
        </svg>
        Join Telegram
      </a>
    </div>

    <!-- Video/Image Showcase -->
    <div class="relative w-full max-w-4xl mb-16 z-20">
      <div class="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-1">
        <!-- Glowing border effect -->
        <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 rounded-2xl opacity-75 blur-sm animate-pulse"></div>
        
        <div class="relative bg-gray-900 rounded-xl overflow-hidden">
          <!-- Video Container -->
          <div class="aspect-video relative">
            <video 
              src={exampleUsage} 
              autoplay 
              loop 
              muted 
              playsinline 
              class="w-full h-full object-cover"
            ></video>
            
            <!-- Overlay for better integration -->
            <div class="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-gray-900/30"></div>
          </div>
          
          <!-- Interface Elements Overlay -->
          <div class="absolute top-4 left-4 right-4 flex items-center justify-between">
            <!-- Omnimind Logo/Brand -->
            <div class="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
              <div class="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
              <span class="text-white text-sm font-medium">Omnimind</span>
            </div>
            
            <!-- Window Controls -->
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 bg-red-400 rounded-full"></div>
              <div class="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div class="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Partners Section -->
<!--    <div class="w-full max-w-6xl z-20 relative">-->
<!--      <p class="text-center text-gray-400 text-sm mb-8 uppercase tracking-wider">-->
<!--        Partners & Development programs-->
<!--      </p>-->
<!--      -->
<!--      <div class="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">-->
<!--        &lt;!&ndash; Placeholder partner logos &ndash;&gt;-->
<!--        <div class="flex items-center justify-center h-12 opacity-60 hover:opacity-100 transition-opacity duration-300">-->
<!--          <img src="{partner_1}" alt="">-->
<!--        </div>-->
<!--        <div class="flex items-center justify-center h-12 opacity-60 hover:opacity-100 transition-opacity duration-300">-->
<!--          <img src="{partner_2}" alt="">-->
<!--        </div>-->
<!--        <div class="flex items-center justify-center h-12 opacity-60 hover:opacity-100 transition-opacity duration-300">-->
<!--          <img src="{partner_3}" alt="">-->
<!--        </div>-->
<!--        <div class="flex items-center justify-center h-12 opacity-60 hover:opacity-100 transition-opacity duration-300">-->
<!--          <img src="{partner_4}" alt="">-->
<!--        </div>-->
<!--        <div class="flex items-center justify-center h-12 opacity-60 hover:opacity-100 transition-opacity duration-300">-->
<!--            <img src="{partner_5}" alt="">-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</section>
