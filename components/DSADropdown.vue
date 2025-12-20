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
            color: opt === modelValue ? UI.OPTION_SELECTED_TEXT : '#F1F5F7',
            opacity: opt === modelValue ? 1:1,
            backgroundColor:
              opt === modelValue ? UI.OPTION_SELECTED_BG : UI.MENU_BG
          }"
        >
          {{ opt }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { CONTACT_COLORS, DSA_PURPLE } from "~/content/contact";

// ===============================
//     PROPS
// ===============================
const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: String, default: "" },
  options: { type: Array as () => string[], required: true },
  required: { type: Boolean, default: false },
  placeholder: { type: String, default: "Select…" },
  size: { type: String as () => "default" | "compact", default: "default" },
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
const UI = computed(() => ({
  LABEL_COLOR: '#F1F5F7',
  LABEL_SIZE: "0.9rem",
  LABEL_TRACKING: "0.05em",
  LABEL_MARGIN_BOTTOM: "0.4rem",

  REQUIRED_STAR_COLOR: CONTACT_COLORS.accentPurple,

  INPUT_HEIGHT: "3rem",
  INPUT_PADDING: "0 1rem",
  INPUT_FONT_SIZE: props.size === "compact" ? "0.88rem" : "0.95rem",
  INPUT_TRACKING: "0.02em",
  INPUT_TEXT_COLOR: '#828282',
  INPUT_BG: "#FFFFFF",
  INPUT_BORDER: '#E0E0E0',
  INPUT_BORDER_ACTIVE: '#8EB29E',

  ICON_SIZE: "20px",

  MENU_OFFSET: "0.35rem",
  MENU_BG: "#FFFFFF",
  MENU_BORDER: '#E0E0E0',

  OPTION_PADDING: "0.75rem 1rem",
  OPTION_FONT_SIZE: props.size === "compact" ? "0.86rem" : "0.9rem",
  OPTION_TRACKING: "0.01em",
  OPTION_TEXT: '#F1F5F7',
  OPTION_SELECTED_TEXT: '#FFFFFF',
  OPTION_SELECTED_BG: '#8EB29E',
}));
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
