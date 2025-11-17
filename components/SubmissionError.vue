<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center"
      :style="{ backgroundColor: UI.BG_OVERLAY }"
    >
      <!-- MODAL -->
      <div
        class="rounded-xl shadow-xl text-center max-w-md w-full"
        :style="{
          padding: UI.MODAL_PADDING,
          backgroundColor: UI.MODAL_BG,
          color: UI.TEXT_COLOR
        }"
      >
        <!-- TITLE -->
        <h2
          class="font-semibold mb-4"
          :style="{
            fontSize: UI.TITLE_SIZE,
            letterSpacing: UI.TITLE_TRACKING
          }"
        >
          Submission Failed
        </h2>

        <!-- ERROR LIST -->
        <ul class="text-left space-y-2 mb-6">
          <li
            v-for="(e, i) in errors"
            :key="i"
            class="flex gap-2 items-start"
          >
            <span :style="{ color: UI.ERROR_BULLET }">•</span>
            <span :style="{ opacity: 0.9 }">{{ e }}</span>
          </li>
        </ul>

        <!-- BUTTONS -->
        <div class="flex justify-center gap-4 mt-6">
          <button
            class="rounded px-6 py-2 font-medium"
            :style="{
              backgroundColor: UI.BUTTON_CONFIRM_BG,
              color: UI.BUTTON_CONFIRM_TEXT
            }"
            @click="close"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { CONTACT_COLORS, DSA_PURPLE } from "~/content/contact";

const props = defineProps({
  errors: { type: Array as () => string[], default: () => [] },
  modelValue: { type: Boolean, default: false }
});

const emit = defineEmits(["update:modelValue"]);

const visible = ref(props.modelValue);

watch(
  () => props.modelValue,
  (v) => (visible.value = v)
);

function close() {
  visible.value = false;
  emit("update:modelValue", false);
}

// UI VARS
const UI = {
  BG_OVERLAY: "rgba(0,0,0,0.55)",
  MODAL_BG: CONTACT_COLORS.modalBg,
  MODAL_PADDING: "2rem",

  TEXT_COLOR: CONTACT_COLORS.textMain,
  TITLE_SIZE: "1.4rem",
  TITLE_TRACKING: "0.05em",

  ERROR_BULLET: DSA_PURPLE,

  BUTTON_CONFIRM_BG: DSA_PURPLE,
  BUTTON_CONFIRM_TEXT: "#ECEBC7",
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 180ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>