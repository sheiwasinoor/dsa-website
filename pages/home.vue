<template>
  <div
    class="min-h-screen bg-[#000C05] text-[#ECEBC7] flex flex-col items-center justify-center relative"
  >
    <!-- HERO WRAPPER -->
    <div
      ref="heroWrap"
      class="relative flex flex-col items-center cursor-pointer group select-none"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @click="goAbout"
    >
      <!-- Cursor Glow -->
      <div
        v-show="cursorActive"
        ref="cursorGlow"
        class="pointer-events-none absolute rounded-full mix-blend-screen"
        :style="cursorGlowStyle"
      ></div>

      <!-- Timed Glow (shine visual only) -->
      <div
        class="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-700"
        :class="{ 'opacity-100 animate-glow': showGlow }"
      ></div>

      <!-- HERO IMAGE -->
      <img
        ref="heroImg"
        src="/images/home-hero.png"
        alt="DSA Hero"
        class="w-[503px] max-w-full h-auto transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        :style="tiltStyle"
      />
    </div>

    <!-- CN Headline -->
    <h2
      class="mt-12 text-[28px] tracking-[0.12em] font-medium text-[#ECEBC7] text-center"
    >
      打造未来的美学空间
    </h2>

    <!-- EN Line -->
    <p
      class="mt-4 text-sm text-[#ECEBC7]/80 max-w-xl mx-auto text-center leading-relaxed"
    >
      Creating elevated spatial experiences with precision, emotion, and modern
      design.
    </p>

    <!-- Secondary paragraph -->
    <p
      class="mt-4 text-xs text-[#ECEBC7]/70 max-w-xl mx-auto text-center leading-relaxed"
    >
      Based in Asia, our multidisciplinary team integrates landscape architecture,
      lighting, and innovative design to transform environments across the globe.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'landing'
});

const router = useRouter();
const goAbout = () => router.push('/about');

/* --------------------------------
   STATE
-------------------------------- */
const showGlow = ref(false);
const cursorActive = ref(false);

const heroWrap = ref<HTMLElement | null>(null);
const heroImg = ref<HTMLElement | null>(null);
const cursorGlow = ref<HTMLElement | null>(null);

const tiltStyle = ref<Record<string, string>>({});
const cursorGlowStyle = ref<Record<string, string>>({});

const glowStarted = ref(false);

/* --------------------------------
   FIRST HOVER = TRIGGER GLOW
-------------------------------- */
const handleMouseEnter = () => {
  cursorActive.value = true;

  // Shine animation triggered only once
  if (!glowStarted.value) {
    glowStarted.value = true;

    setTimeout(() => {
      showGlow.value = true;

      setTimeout(() => {
        showGlow.value = false;
      }, 1200);
    }, 2000); // 2 seconds delay
  }
};

const handleMouseLeave = () => {
  cursorActive.value = false;
  tiltStyle.value = {
    transform: 'rotateX(0deg) rotateY(0deg)'
  };
};

/* --------------------------------
   MOUSE MOVE (Parallax + Glow Follow)
-------------------------------- */
const handleMouseMove = (e: MouseEvent) => {
  if (!heroWrap.value || !heroImg.value) return;

  const rect = heroWrap.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const percentX = x / rect.width - 0.5;
  const percentY = y / rect.height - 0.5;

  const maxTilt = 3;
  const tiltX = maxTilt * percentY;
  const tiltY = -maxTilt * percentX;

  tiltStyle.value = {
    transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`
  };

  const glowSize = 180;
  cursorGlowStyle.value = {
    width: `${glowSize}px`,
    height: `${glowSize}px`,
    top: `${y - glowSize / 2}px`,
    left: `${x - glowSize / 2}px`,
    background:
      'radial-gradient(circle, rgba(236,235,199,0.30) 0%, rgba(236,235,199,0.05) 60%, transparent 100%)',
    transition: 'top 0.05s linear, left 0.05s linear'
  };
};
</script>

<style scoped>
@keyframes glowPulse {
  0% {
    box-shadow: 0 0 0px rgba(236, 235, 199, 0);
  }
  50% {
    box-shadow: 0 0 40px rgba(236, 235, 199, 0.6);
  }
  100% {
    box-shadow: 0 0 0px rgba(236, 235, 199, 0);
  }
}

.animate-glow {
  animation: glowPulse 1.2s ease-out forwards;
}
</style>