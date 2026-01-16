<template>
  <div class="relative" ref="root">
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

    <transition name="dsadrop">
      <div
        v-if="isOpen"
        class="absolute left-0 right-0 z-50 rounded-md shadow-lg overflow-hidden"
        :style="{
          marginTop: UI.MENU_OFFSET,
          backgroundColor: UI.MENU_BG,
          border: '1px solid ' + UI.MENU_BORDER
        }"
      >
        <div class="p-2 border-b" :style="{ borderColor: UI.MENU_BORDER }">
          <input
            ref="searchInput"
            v-model="search"
            :placeholder="searchPlaceholder"
            class="w-full px-2 py-2 rounded border"
            :style="{
              borderColor: UI.INPUT_BORDER,
              color: UI.INPUT_TEXT_COLOR,
              backgroundColor: UI.INPUT_BG,
              fontSize: UI.OPTION_FONT_SIZE
            }"
            @keydown.enter.prevent="selectFromSearch"
          />
        </div>
        <ul class="max-h-56 overflow-auto">
          <li
            v-if="canUseCustom"
            @click="selectCustom"
            class="cursor-pointer w-full transition"
            :style="{
              padding: UI.OPTION_PADDING,
              fontSize: UI.OPTION_FONT_SIZE,
              letterSpacing: UI.OPTION_TRACKING,
              color: UI.OPTION_SELECTED_TEXT,
              backgroundColor: UI.OPTION_SELECTED_BG
            }"
          >
            Use {{ normalizedSearchCode }}
          </li>
          <li
            v-for="opt in filteredOptions"
            :key="opt.name + opt.code"
            @click="select(opt)"
            class="cursor-pointer w-full transition"
            :style="{
              padding: UI.OPTION_PADDING,
              fontSize: UI.OPTION_FONT_SIZE,
              letterSpacing: UI.OPTION_TRACKING,
              color: opt.code === modelValue ? UI.OPTION_SELECTED_TEXT : UI.OPTION_TEXT,
              backgroundColor:
                opt.code === modelValue ? UI.OPTION_SELECTED_BG : UI.MENU_BG
            }"
          >
            <span class="option-row flex items-center justify-between gap-2">
              <span class="flex items-center gap-2">
                <span aria-hidden="true">{{ opt.emoji || getAcronym(opt.name) }}</span>
                <span class="sr-only">{{ opt.name }}</span>
              </span>
              <span>{{ opt.code }}</span>
            </span>
          </li>
          <li
            v-if="!filteredOptions.length && !canUseCustom"
            class="w-full"
            :style="{
              padding: UI.OPTION_PADDING,
              fontSize: UI.OPTION_FONT_SIZE,
              letterSpacing: UI.OPTION_TRACKING,
              color: UI.OPTION_TEXT
            }"
          >
            No results
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from "vue";
import type { CountryCallingCode } from "~/content/contact";
import { CONTACT_COLORS } from "~/content/contact";

const props = defineProps({
  modelValue: { type: String, default: "" },
  options: { type: Array as () => CountryCallingCode[], required: true },
  placeholder: { type: String, default: "Code" },
  searchPlaceholder: { type: String, default: "Search country or code" },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const search = ref("");
const root = ref<HTMLElement | null>(null);
const searchInput = ref<HTMLInputElement | null>(null);

function toggle() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    nextTick(() => searchInput.value?.focus());
  }
}

function select(opt: CountryCallingCode) {
  emit("update:modelValue", opt.code);
  isOpen.value = false;
}

function selectCustom() {
  if (!normalizedSearchCode.value) return;
  emit("update:modelValue", normalizedSearchCode.value);
  isOpen.value = false;
}

function selectFromSearch() {
  const query = search.value.trim().toLowerCase();
  if (!query) return;
  const normalized = normalizedSearchCode.value;
  const exact =
    props.options.find((opt) => opt.code === normalized) ||
    props.options.find((opt) => opt.name.toLowerCase() === query);
  if (exact) {
    select(exact);
    return;
  }
  if (normalized) selectCustom();
}

const filteredOptions = computed(() => {
  const query = search.value.trim().toLowerCase();
  if (!query) return props.options;
  return props.options.filter((opt) => {
    const nameMatch = opt.name.toLowerCase().includes(query);
    const codeMatch = opt.code.includes(query.replace(/\s+/g, ""));
    return nameMatch || codeMatch;
  });
});

const normalizedSearchCode = computed(() => {
  const raw = search.value.trim();
  if (!raw) return "";
  const digits = raw.replace(/[^0-9+]/g, "");
  if (!digits) return "";
  return digits.startsWith("+") ? digits : `+${digits}`;
});

const canUseCustom = computed(() => {
  if (!normalizedSearchCode.value) return false;
  return !props.options.some((opt) => opt.code === normalizedSearchCode.value);
});

function handleClickOutside(e: MouseEvent) {
  if (!root.value) return;
  if (!root.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() => document.removeEventListener("click", handleClickOutside));

const UI = computed(() => ({
  INPUT_HEIGHT: "3rem",
  INPUT_PADDING: "0 0.75rem",
  INPUT_FONT_SIZE: "0.9rem",
  INPUT_TRACKING: "0.02em",
  INPUT_TEXT_COLOR: "#828282",
  INPUT_BG: "#FFFFFF",
  INPUT_BORDER: "#E0E0E0",
  INPUT_BORDER_ACTIVE: "#8EB29E",
  ICON_SIZE: "18px",
  MENU_OFFSET: "0.35rem",
  MENU_BG: "#FFFFFF",
  MENU_BORDER: "#E0E0E0",
  OPTION_PADDING: "0.65rem 0.85rem",
  OPTION_FONT_SIZE: "0.85rem",
  OPTION_TRACKING: "0.01em",
  OPTION_TEXT: "#8C8C8C",
  OPTION_SELECTED_TEXT: "#FFFFFF",
  OPTION_SELECTED_BG: "#8EB29E",
  REQUIRED_STAR_COLOR: CONTACT_COLORS.accentPurple,
}));

function getAcronym(name: string) {
  const overrides: Record<string, string> = {
    China: "CN",
    "Hong Kong": "HK",
    Macau: "MO",
    "United States": "US",
    "United Kingdom": "UK",
    "South Korea": "KR",
    "North Korea": "KP",
    "Chinese Taipei": "CT",
  };
  if (overrides[name]) return overrides[name];
  const words = name
    .replace(/[^A-Za-z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (words.length > 1) {
    return words
      .filter((w) => !["and", "of", "the", "island", "islands"].includes(w.toLowerCase()))
      .map((w) => w[0])
      .join("")
      .slice(0, 3)
      .toUpperCase();
  }
  return words.join("").slice(0, 3).toUpperCase();
}
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.option-row {
  white-space: nowrap;
}
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
