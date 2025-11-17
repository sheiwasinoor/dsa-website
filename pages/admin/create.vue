<template>
  <div
    class="min-h-screen"
    :style="{
      backgroundColor: UI.PAGE_BG,
      color: UI.PAGE_TEXT,
      paddingTop: UI.PAGE_PADDING_Y + 'vh',
      paddingBottom: UI.PAGE_PADDING_Y + 'vh',
      paddingLeft: UI.PAGE_PADDING_X + 'rem',
      paddingRight: UI.PAGE_PADDING_X + 'rem'
    }"
  >
    <div class="max-w-3xl mx-auto text-center">

      <!-- Page Title -->
      <h1
        class="font-semibold uppercase"
        :style="{
          fontSize: UI.TITLE_SIZE,
          letterSpacing: UI.TITLE_TRACKING,
          marginBottom: UI.TITLE_MARGIN_BOTTOM
        }"
      >
        Create New Content
      </h1>

      <p
        :style="{
          color: UI.SUBTITLE_COLOR,
          marginBottom: UI.SUBTITLE_MARGIN_BOTTOM,
          letterSpacing: UI.SUBTITLE_TRACKING
        }"
      >
        Choose the type of content you want to create.
      </p>

      <!-- OPTIONS GRID -->
      <div class="grid grid-cols-1 md:grid-cols-2" :style="{ gap: UI.GRID_GAP }">

        <!-- PROJECT CREATOR -->
        <div
          class="cursor-pointer rounded-xl transition"
          :style="{
            border: '1px solid ' + UI.CARD_BORDER,
            backgroundColor: UI.CARD_BG,
            padding: UI.CARD_PADDING
          }"
          @mouseover="(e) => { e.currentTarget.style.borderColor = UI.CARD_BORDER_HOVER; e.currentTarget.style.backgroundColor = UI.CARD_BG_HOVER; }"
          @mouseleave="(e) => { e.currentTarget.style.borderColor = UI.CARD_BORDER; e.currentTarget.style.backgroundColor = UI.CARD_BG; }"
        >
          <h2
            class="font-semibold"
            :style="{
              fontSize: UI.CARD_TITLE_SIZE,
              letterSpacing: UI.CARD_TITLE_TRACKING,
              marginBottom: UI.CARD_TITLE_MARGIN_BOTTOM
            }"
          >
            Project
          </h2>

          <p
            :style="{
              color: UI.CARD_TEXT_COLOR,
              fontSize: UI.CARD_TEXT_SIZE,
              lineHeight: UI.CARD_TEXT_LINE_HEIGHT,
              marginBottom: '1.5rem'
            }"
          >
            Choose which project category you want to create.
          </p>

          <!-- Destination Buttons -->
          <div class="flex flex-col space-y-3 text-left">
            <button
              class="text-left font-semibold"
              :style="{
                color: UI.CARD_LINK_COLOR,
                letterSpacing: '0.12em'
              }"
              @click="goTo('/admin/projects/new?destination=landscape')"
              @mouseover="(e)=>{ e.currentTarget.style.color = UI.CARD_LINK_HOVER; }"
              @mouseleave="(e)=>{ e.currentTarget.style.color = UI.CARD_LINK_COLOR; }"
            >
              → Landscape Project
            </button>

            <button
              class="text-left font-semibold"
              :style="{
                color: UI.CARD_LINK_COLOR,
                letterSpacing: '0.12em'
              }"
              @click="goTo('/admin/projects/new?destination=lighting')"
              @mouseover="(e)=>{ e.currentTarget.style.color = UI.CARD_LINK_HOVER; }"
              @mouseleave="(e)=>{ e.currentTarget.style.color = UI.CARD_LINK_COLOR; }"
            >
              → Lighting Project
            </button>

            <button
              class="text-left font-semibold"
              :style="{
                color: UI.CARD_LINK_COLOR,
                letterSpacing: '0.12em'
              }"
              @click="goTo('/admin/projects/new?destination=young_art')"
              @mouseover="(e)=>{ e.currentTarget.style.color = UI.CARD_LINK_HOVER; }"
              @mouseleave="(e)=>{ e.currentTarget.style.color = UI.CARD_LINK_COLOR; }"
            >
              → Young Art Project
            </button>
          </div>
        </div>

        <!-- NEWS CREATOR -->
        <div
          @click="goTo('/admin/news/new')"
          class="cursor-pointer rounded-xl transition"
          :style="{
            border: '1px solid ' + UI.CARD_BORDER,
            backgroundColor: UI.CARD_BG,
            padding: UI.CARD_PADDING
          }"
          @mouseover="(e) => { e.currentTarget.style.borderColor = UI.CARD_BORDER_HOVER; e.currentTarget.style.backgroundColor = UI.CARD_BG_HOVER; }"
          @mouseleave="(e) => { e.currentTarget.style.borderColor = UI.CARD_BORDER; e.currentTarget.style.backgroundColor = UI.CARD_BG; }"
        >
          <h2
            class="font-semibold"
            :style="{
              fontSize: UI.CARD_TITLE_SIZE,
              letterSpacing: UI.CARD_TITLE_TRACKING,
              marginBottom: UI.CARD_TITLE_MARGIN_BOTTOM
            }"
          >
            News Post
          </h2>

          <p
            :style="{
              color: UI.CARD_TEXT_COLOR,
              fontSize: UI.CARD_TEXT_SIZE,
              lineHeight: UI.CARD_TEXT_LINE_HEIGHT
            }"
          >
            Publish articles for the Young News section, including title,
            body content, image thumbnail, and publish status.
          </p>

          <div
            class="font-semibold"
            :style="{
              color: UI.CARD_LINK_COLOR,
              marginTop: UI.CARD_LINK_MARGIN_TOP,
              letterSpacing: '0.15em'
            }"
            @mouseover="(e)=>{ e.currentTarget.style.color = UI.CARD_LINK_HOVER; }"
            @mouseleave="(e)=>{ e.currentTarget.style.color = UI.CARD_LINK_COLOR; }"
          >
            → Create News
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const UI = {
  PAGE_BG: "#000C05",
  PAGE_TEXT: "#ECEBC7",
  PAGE_PADDING_Y: "20",
  PAGE_PADDING_X: "6",

  TITLE_SIZE: "3rem",
  TITLE_TRACKING: "0.2em",
  TITLE_MARGIN_BOTTOM: "2.5rem",

  SUBTITLE_COLOR: "#ECEBC7B3",
  SUBTITLE_MARGIN_BOTTOM: "3rem",
  SUBTITLE_TRACKING: "0.1em",

  GRID_GAP: "2.5rem",

  CARD_BG: "#050F0A",
  CARD_BG_HOVER: "#0a1a14",
  CARD_BORDER: "#334036B3",
  CARD_BORDER_HOVER: "#ECEBC7",
  CARD_PADDING: "2.5rem",

  CARD_TITLE_SIZE: "1.25rem",
  CARD_TITLE_TRACKING: "0.25em",
  CARD_TITLE_MARGIN_BOTTOM: "0.75rem",

  CARD_TEXT_COLOR: "#ECEBC7B3",
  CARD_TEXT_SIZE: "0.9rem",
  CARD_TEXT_LINE_HEIGHT: "1.5",

  CARD_LINK_COLOR: "#336341",
  CARD_LINK_HOVER: "#3f7a4d",
  CARD_LINK_MARGIN_TOP: "1.5rem"
};

function goTo(path: string) {
  navigateTo(path);
}

definePageMeta({
  middleware: "auth",
});
</script>