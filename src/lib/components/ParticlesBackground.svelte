<script>
  import { onMount, onDestroy } from 'svelte';
  
  // Browser check
  const browser = typeof window !== 'undefined';
  
  let canvas;
  let ctx;
  let particles = [];
  let animationFrame;
  let mounted = false;
  
  function createWavePatternDots() {
    if (!mounted || !canvas || !ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    particles = [];
    
    // Grid spacing - starts with a base grid
    const baseSpacing = 40;
    
    // Grid dimensions
    const cols = Math.ceil(width / baseSpacing) + 500;
    const rows = Math.ceil(height / baseSpacing) + 5;
    
    // Create the base grid with wave distortion
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        // Base position
        const baseX = x * baseSpacing - baseSpacing * 2;
        const baseY = y * baseSpacing - baseSpacing * 2;
        
        // Skip some dots randomly to create more natural look
        if (Math.random() < 0.1) continue;
        
        // Create wave distortion - this creates the flowing pattern
        // Multiple waves with different parameters create the complex pattern
        const wave1 = Math.sin((baseY / height) * Math.PI * 3) * 250; // Horizontal wave 1
        const wave2 = Math.cos((baseY / height) * Math.PI * 2) * 15; // Horizontal wave 2
        const wave3 = Math.sin((baseX / width) * Math.PI * 2) * 10;  // Vertical wave
        
        // Apply wave distortion to create curved grid
        const finalX = baseX + wave1 + wave2;
        const finalY = baseY + wave3;
        
        // Ensure dot is within canvas with margin
        if (finalX < -10 || finalX > width + 10 || finalY < -10 || finalY > height + 10) {
          continue;
        }
        
        // Calculate position for color gradient
        // Horizontal position (0-1) determines color
        const horizontalPos = finalX / width;
        
        // Create purple to cyan gradient
        const r = Math.round(120 - (horizontalPos * 60));
        const g = Math.round(80 + (horizontalPos * 120));
        const b = Math.round(200 + (horizontalPos * 55));
        
        // Calculate wave phase for dot size and opacity
        // Dots are larger and more visible along wave peaks and troughs
        const wavePhase = Math.abs(Math.sin((baseY / height) * Math.PI * 3));
        
        // Size based on wave position - larger in the wave peaks/troughs
        const sizeMultiplier = 0.7 + (wavePhase * 0.8);
        const size = 1.8 * sizeMultiplier;
        
        // Opacity also varies with wave position
        const opacity = 0.3 + (wavePhase * 0.3);
        
        // Add the particle
        particles.push({
          x: finalX,
          y: finalY,
          originalX: finalX,
          originalY: finalY,
          size: size,
          color: {r, g, b},
          opacity: opacity,
          wavePhase: (baseY / height) * Math.PI * 3, // Store for animation
          speed: 0.0004 + (Math.random() * 0.0002),  // Slight speed variation
          amplitude: 5 + Math.random() * 3           // Animation amplitude
        });
      }
    }
  }
  
  function animateWavePattern(timestamp) {
    if (!mounted || !ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw and animate particles
    particles.forEach(particle => {
      // Subtle wave movement animation
      particle.y = particle.originalY + 
                  Math.sin(timestamp * particle.speed + particle.wavePhase) * 
                  particle.amplitude;
      
      // Draw the dot
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.opacity})`;
      ctx.fill();
    });
    
    // Continue animation
    if (browser) {
      animationFrame = window.requestAnimationFrame(animateWavePattern);
    }
  }
  
  function handleResize() {
    if (!mounted || !canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createWavePatternDots();
  }
  
  onMount(() => {
    mounted = true;
    
    if (browser && canvas) {
      ctx = canvas.getContext('2d');
      
      // Initial setup
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createWavePatternDots();
      
      // Start animation
      animationFrame = window.requestAnimationFrame(animateWavePattern);
      
      // Handle resize
      window.addEventListener('resize', handleResize);
    }
    
    return () => {
      if (browser) {
        window.removeEventListener('resize', handleResize);
        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
        }
      }
    };
  });
  
  onDestroy(() => {
    if (browser) {
      window.removeEventListener('resize', handleResize);
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    }
  });
</script>

<canvas
  bind:this={canvas}
  class="absolute inset-0 w-full h-[600px] z-0"
></canvas>
