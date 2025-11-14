<!-- pages/about.vue -->
<template>
  <div class="bg-[#000C05] text-[#ECEBC7] min-h-screen">

    <!-- 1. HERO -->
    <section>
      <img
        src="/images/about-hero.png"
        alt="About Hero"
        class="w-full h-auto object-cover"
      />
    </section>

    <!-- 2. LETTER -->
    <section
      class="w-full bg-cover bg-center px-6 py-24 relative"
      style="background-image: url('/images/about-letter-bg.png');"
    >
      <div class="max-w-4xl mx-auto transition-opacity duration-500">
        <div class="w-full min-h-[600px] letter-columns-wrapper">
          <div
            :class="[
              locale === 'en'
                ? 'columns-2 gap-12 text-sm leading-relaxed'
                : 'text-sm leading-relaxed space-y-4'
            ]"
            class="text-[#ECEBC7]/85"
          >
            <p
              v-for="(p, i) in letterText[locale]"
              :key="'letter-' + i"
              class="break-inside-avoid-column mb-4"
            >
              {{ p }}
            </p>
          </div>
        </div>

        <!-- Signature -->
        <div class="flex justify-end mt-10 mb-2 signature-block">
          <img
            src="/images/signature.png"
            alt="Signature"
            class="h-14 w-auto opacity-90"
          />
        </div>

        <p class="text-right text-sm text-[#ECEBC7]/90 leading-relaxed mb-6">
          Regards,<br />
          <span class="font-semibold tracking-wide">Demi Young</span>
        </p>
      </div>
    </section>

    <!-- 3. MAIN CONTENT -->
    <main class="max-w-6xl mx-auto px-6 pt-24 pb-32">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <!-- LEFT COLUMN -->
        <div class="space-y-20">
          <!-- INTRO -->
          <div>
            <p class="text-sm tracking-[0.22em] text-[#ECEBC7]/70 mb-6">
              简介 | INTRODUCTION
            </p>

            <div class="space-y-4 text-sm leading-relaxed text-[#ECEBC7]/80">
              <p
                v-for="(p, i) in introText[locale]"
                :key="'intro-' + i"
              >
                {{ p }}
              </p>
            </div>
          </div>

          <!-- BIO CARD -->
          <div
            class="max-w-xl bg-[#111C14] rounded-2xl p-8 shadow-lg border border-[#ECEBC7]/10 overflow-hidden bio-card-transition"
            :class="bioCardClass"
          >
            <h2 class="text-lg font-semibold tracking-[0.16em] mb-2">
              <span v-if="active.group === 'chinese'">
                {{ active.nameEn }} | {{ active.nameCn }}
              </span>
              <span v-else>
                {{ active.nameEn }}
              </span>
            </h2>

            <p class="text-sm text-[#ECEBC7]/80 mb-4">
              {{ active.role[locale] }}
            </p>

            <div
              class="space-y-3 text-sm leading-relaxed text-[#ECEBC7]/80 transition-opacity duration-700"
              :class="bioTextVisible ? 'opacity-100' : 'opacity-0'"
            >
              <p
                v-for="(p, i) in active.bio[locale]"
                :key="'bio-' + i"
              >
                {{ p }}
              </p>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN (TEAM GRID) -->
        <div class="space-y-10 lg:mt-[30%]">
          <!-- Chinese Creativity -->
          <div>
            <p class="text-xs tracking-[0.56em] text-[#ECEBC7]/55">
              李 亚 历 李 亚 历
            </p>
            <p class="text-sm tracking-[0.14em] text-[#ECEBC7]/80">
              Chinese Creativity
            </p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-10">
            <button
              v-for="m in chineseMembers"
              :key="m.id"
              class="flex flex-col items-center text-center group focus:outline-none"
              @click="selectMember(m.id)"
            >
              <div
                class="relative rounded-full overflow-hidden w-28 h-28 border border-transparent transition-all duration-500 ease-out group-hover:border-[#ECEBC7]/60"
                :class="avatarClass(m.id)"
              >
                <img
                  :src="m.avatar"
                  :alt="m.nameEn"
                  class="w-full h-full object-cover"
                />
              </div>

              <p
                class="text-xs mt-3 tracking-[0.16em]"
                :class="{
                  'text-[#ECEBC7] font-semibold': activeId === m.id,
                  'text-[#ECEBC7]/70': activeId !== m.id
                }"
              >
                {{ m.nameEn }} | {{ m.nameCn }}
              </p>

              <p class="text-[11px] text-[#ECEBC7]/60">
                {{ m.role[locale] }}
              </p>
            </button>
          </div>

          <!-- International Perspective -->
          <div class="pt-10">
            <p class="text-xs tracking-[0.56em] text-[#ECEBC7]/55">
              李 亚 历 李 亚 历
            </p>
            <p class="text-sm tracking-[0.14em] text-[#ECEBC7]/80">
              International Perspective
            </p>
          </div>

          <div class="grid grid-cols-2 gap-10">
            <button
              v-for="m in internationalMembers"
              :key="m.id"
              class="flex flex-col items-center text-center group focus:outline-none"
              @click="selectMember(m.id)"
            >
              <div
                class="relative rounded-full overflow-hidden w-28 h-28 border border-transparent transition-all duration-500 ease-out group-hover:border-[#ECEBC7]/60"
                :class="avatarClass(m.id)"
              >
                <img
                  :src="m.avatar"
                  :alt="m.nameEn"
                  class="w-full h-full object-cover"
                />
              </div>

              <p
                class="text-xs mt-3 tracking-[0.16em]"
                :class="{
                  'text-[#ECEBC7] font-semibold': activeId === m.id,
                  'text-[#ECEBC7]/70': activeId !== m.id
                }"
              >
                {{ m.nameEn }}
              </p>

              <p class="text-[11px] text-[#ECEBC7]/60">
                {{ m.role[locale] }}
              </p>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import { useLocale } from '~/composables/useLocale';
import {
  letterText,
  introText,
  members as membersData,
} from '~/content/about';

definePageMeta({ layout: 'default' });

const { locale } = useLocale();

/* TEAM + BIOS */
const members = ref(membersData);
const activeId = ref('demi');

const active = computed(() =>
  members.value.find((m) => m.id === activeId.value)!
);

const chineseMembers = computed(() =>
  members.value.filter((m) => m.group === 'chinese')
);

const internationalMembers = computed(() =>
  members.value.filter((m) => m.group === 'international')
);

/* BIO CARD ANIMATION */
const bioTextVisible = ref(true);
const bioCardClass = ref('scale-100 opacity-100');

async function selectMember(id: string) {
  if (id === activeId.value) return;

  // 1) Fade OUT old text
  bioTextVisible.value = false;

  // Slight scale effect while fading
  bioCardClass.value =
    "scale-95 opacity-80 origin-top-left transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]";

  // 2) Wait for fade-out to finish
  await new Promise(r => setTimeout(r, 350));

  // 3) NOW swap to new member (after fade-out)
  activeId.value = id;

  // 4) Wait for DOM to update before fade-in
  await nextTick();

  // Fade IN new text + scale back
  bioCardClass.value =
    "scale-100 opacity-100 origin-top-left transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]";

  // 5) Fade in new text after slight delay
  setTimeout(() => {
    bioTextVisible.value = true;
  }, 50);
}

function avatarClass(id: string) {
  return id === activeId.value
    ? [
        'scale-[1.04]',
        'shadow-[0_0_12px_rgba(236,235,199,0.35)]',
        'transition-all',
        'duration-500',
        'ease-out',
        'ring-2',
        'ring-[#ECEBC7]',
        'ring-offset-4',
        'ring-offset-[#000C05]',
      ].join(' ')
    : 'transition-all duration-500 ease-out';
}
</script>

<style scoped>
.letter-columns-wrapper {
  break-inside: avoid;
  column-fill: balance;
}
.break-inside-avoid-column {
  break-inside: avoid-column;
}
.bio-card-transition {
  transition-property: transform, opacity;
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
  transition-duration: 500ms;
}
.signature-block {
  break-inside: avoid;
}
@supports (-webkit-touch-callout: none) {
  .columns-2 {
    column-gap: 3rem;
  }
}
</style>