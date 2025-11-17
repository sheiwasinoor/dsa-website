<template>
  <div class="relative" ref="root">
    <!-- Label -->
    <label
      class="block font-medium"
      :style="{
        color: UI.LABEL_COLOR,
        fontSize: UI.LABEL_SIZE,
        letterSpacing: UI.LABEL_TRACKING,
        marginBottom: UI.LABEL_MARGIN_BOTTOM
      }"
    >
      {{ label }}
      <span v-if="required" :style="{ color: UI.REQUIRED_STAR_COLOR }">*</span>
    </label>

    <!-- SELECT BOX -->
    <div
      class="flex items-center justify-between cursor-pointer w-full rounded-md transition border"
      @click="toggle"
      :style="{
        height: UI.INPUT_HEIGHT,
        padding: UI.INPUT_PADDING,
        fontSize: UI.INPUT_FONT_SIZE,
        letterSpacing: UI.INPUT_TRACKING,
        color: UI.INPUT_TEXT_COLOR,
        borderColor: isOpen ? UI.INPUT_BORDER_ACTIVE : UI.INPUT_BORDER,
        backgroundColor: UI.INPUT_BG,
      }"
    >
      <span :style="{ opacity: modelValue ? 1 : 0.5 }">
        {{ modelValue || placeholder }}
      </span>

      <!-- ICON -->
      <svg
        :style="{
          width: UI.ICON_SIZE,
          height: UI.ICON_SIZE,
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 120ms ease'
        }"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>

    <!-- DROPDOWN MENU -->
    <transition name="dsadrop">
      <ul
        v-if="isOpen"
        class="absolute left-0 right-0 z-50 rounded-md shadow-lg overflow-hidden"
        :style="{
          marginTop: UI.MENU_OFFSET,
          backgroundColor: UI.MENU_BG,
          border: '1px solid ' + UI.MENU_BORDER
        }"
      >
        <li
          v-for="opt in options"
          :key="opt"
          @click="select(opt)"
          class="cursor-pointer w-full transition"
          :style="{
            padding: UI.OPTION_PADDING,
            fontSize: UI.OPTION_FONT_SIZE,
            letterSpacing: UI.OPTION_TRACKING,
            color: opt === modelValue ? UI.OPTION_SELECTED_TEXT : UI.OPTION_TEXT,
            backgroundColor:
              opt === modelValue ? UI.OPTION_SELECTED_BG : 'transparent'
          }"
        >
          {{ opt }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { CONTACT_COLORS, DSA_PURPLE } from "~/content/contact";

// ===============================
//     PROPS
// ===============================
const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: String, default: "" },
  options: { type: Array as () => string[], required: true },
  required: { type: Boolean, default: false },
  placeholder: { type: String, default: "Select…" }
});

const emit = defineEmits(["update:modelValue"]);

// ===============================
//     STATE
// ===============================
const isOpen = ref(false);
const root = ref<HTMLElement | null>(null);

function toggle() {
  isOpen.value = !isOpen.value;
}

function select(opt: string) {
  emit("update:modelValue", opt);
  isOpen.value = false;
}

// Close when clicking outside
function handleClickOutside(e: MouseEvent) {
  if (!root.value) return;
  if (!root.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() => document.removeEventListener("click", handleClickOutside));

// ===============================
//     UI CONSTANTS
// ===============================
const UI = {
  LABEL_COLOR: CONTACT_COLORS.textMain,
  LABEL_SIZE: "0.9rem",
  LABEL_TRACKING: "0.05em",
  LABEL_MARGIN_BOTTOM: "0.4rem",

  REQUIRED_STAR_COLOR: CONTACT_COLORS.accentPurple,

  INPUT_HEIGHT: "3rem",
  INPUT_PADDING: "0 1rem",
  INPUT_FONT_SIZE: "0.95rem",
  INPUT_TRACKING: "0.02em",
  INPUT_TEXT_COLOR: CONTACT_COLORS.textMain,
  INPUT_BG: "#ffffff0A",
  INPUT_BORDER: CONTACT_COLORS.borderSoft,
  INPUT_BORDER_ACTIVE: CONTACT_COLORS.accentPurple,

  ICON_SIZE: "20px",

  MENU_OFFSET: "0.35rem",
  MENU_BG: CONTACT_COLORS.cardBg,
  MENU_BORDER: CONTACT_COLORS.borderSoft,

  OPTION_PADDING: "0.75rem 1rem",
  OPTION_FONT_SIZE: "0.9rem",
  OPTION_TRACKING: "0.01em",
  OPTION_TEXT: CONTACT_COLORS.textSoft,
  OPTION_SELECTED_TEXT: CONTACT_COLORS.textMain,
  OPTION_SELECTED_BG: DSA_PURPLE + "55", // transparent purple
};
</script>

<style scoped>
.dsadrop-enter-active,
.dsadrop-leave-active {
  transition: opacity 130ms ease, transform 130ms ease;
}
.dsadrop-enter-from,
.dsadrop-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>