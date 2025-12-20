<template>
  <footer
    class="border-t bg-[#000C05] text-[#F1F5F7]"
    style="
      position: relative;
      z-index: 0;
      margin-top: var(--footer-margin-top, 6rem);
      border-color: var(--footer-border, rgba(93,103,98,0.40));
      background-color: var(--footer-bg, #000C05);
      color: var(--footer-text, #F1F5F7);
    "
  >
    <div class="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row md:justify-between gap-8">
      <!-- Left: Logo -->
      <div class="flex items-start">
        <img
          src="/images/navbar-logo.png"
          alt="DSA Logo"
          class="h-8 w-auto object-contain"
        />
      </div>

      <!-- Middle: Locations -->
      <div
        class="flex flex-col md:flex-row gap-3"
        :style="{ fontSize: '10px' }"
      >
        <!-- Shenzhen -->
        <div class="max-w-none" :style="{ width: '220px' }">
          <h3
            class="tracking-[0.12em] text-xs font-semibold mb-2"
            style="color: var(--footer-logo-color, #D9D9D9);"
          >
            Shenzhen
          </h3>
          <p v-if="locale === 'zh'" style="color: #8C8C8C;">
            深圳市福田区福田体育公园文化体育产业总部<br />
            大厦十三A层（中国深圳新媒体广告产业园内）
          </p>
          <p v-else style="color: #8C8C8C;">
            13A Floor, Cultural & Sports <br />
            Industry HQ Tower, <br />
            Futian Sports Park, Futian District,<br />
            Shenzhen, China
          </p>
        </div>

        <!-- Shanghai -->
        <div class="max-w-none" :style="{ width: '220px' }">
          <h3
            class="tracking-[0.12em] text-xs font-semibold mb-2"
            style="color: var(--footer-logo-color, #D9D9D9);"
          >
            Shanghai
          </h3>
          <p v-if="locale === 'zh'" style="color: #8C8C8C;">
            上海市黄浦区北京东路270号中一大楼7层
          </p>
          <p v-else style="color: #8C8C8C;">
            270‑1b ZhongYi Building,<br />
            Nanjing East Road, Huangpu District,<br />
            Shanghai, China
          </p>
        </div>

        <!-- Singapore -->
        <div class="max-w-none" :style="{ width: '142px' }">
          <h3
            class="tracking-[0.12em] text-xs font-semibold mb-2"
            style="color: var(--footer-logo-color, #D9D9D9);"
          >
            Singapore
          </h3>
          <p style="color: #8C8C8C;">
            73 Holland Grove View,<br />
            Singapore 276230
          </p>
        </div>
      </div>

      <!-- Right: QR Codes -->
      <div class="flex flex-col md:flex-row gap-8">
        <div class="flex flex-col items-center text-center">
          <span class="tracking-[0.12em] text-xs font-light mb-2" style="color: var(--footer-logo-color, #D9D9D9);">
            Wechat
          </span>
          <img
            src="/images/Wechat.jpg"
            alt="WeChat QR Code"
            class="object-contain"
            :style="{ width: '70px', height: '70px' }"
          />
        </div>
        <div class="flex flex-col items-center text-center">
          <span
            class="tracking-[0.12em] text-xs font-light mb-2 whitespace-nowrap"
            style="color: var(--footer-logo-color, #D9D9D9);"
          >
            Wechat Video
          </span>
          <img
            src="/images/Wechat-video.jpg"
            alt="WeChat Video QR Code"
            class="object-contain"
            :style="{ width: '70px', height: '70px' }"
          />
        </div>
        <div class="flex flex-col items-center text-center">
          <span class="tracking-[0.12em] text-xs font-light mb-2" style="color: var(--footer-logo-color, #D9D9D9);">
            Xiaohongshu
          </span>
          <img
            src="/images/xhs.jpg"
            alt="Xiaohongshu QR Code"
            class="object-contain"
            :style="{ width: '70px', height: '70px' }"
          />
        </div>
      </div>
    </div>
    <!-- Footer Credit -->
    <div
      class="w-full text-center mt-8"
      :style="{
        fontSize: '10px',
        color: '#5D6762',
        letterSpacing: '0.12em',
        paddingBottom: '50px'
      }"
    >
      designed by pakhicreatif©
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useLocale } from '~/composables/useLocale';
const { locale } = useLocale();

import { useTheme } from '~/composables/useTheme';

const { theme } = useTheme();
</script>