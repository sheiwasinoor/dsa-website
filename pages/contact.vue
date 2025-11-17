<template>
  <div
    class="min-h-screen"
    :style="{
      backgroundColor: UI.PAGE_BG,
      color: UI.TEXT_MAIN,
      paddingTop: UI.PAGE_TOP_PADDING + 'vh',
      paddingBottom: UI.PAGE_BOTTOM_PADDING + 'vh',
      paddingLeft: UI.PAGE_PADDING_X + 'rem',
      paddingRight: UI.PAGE_PADDING_X + 'rem',
    }"
  >
    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

      <!-- ============================= -->
      <!-- LEFT SIDE — CONTACT COPY -->
      <!-- ============================= -->
      <div>
        <h1
          class="font-semibold mb-6"
          :style="{
            fontSize: UI.HEADER_SIZE,
            letterSpacing: UI.HEADER_TRACKING
          }"
        >
          {{ contactSectionCopy.contactHeading }}
        </h1>

        <p class="leading-relaxed mb-4" :style="{ opacity: UI.DESCRIPTION_OPACITY }">
          {{ contactSectionCopy.business.title }} — {{ contactSectionCopy.business.email }}
        </p>
        <p v-for="(line, i) in contactSectionCopy.business.phoneLines" :key="'b' + i" class="leading-relaxed mb-1" :style="{ opacity: UI.DESCRIPTION_OPACITY }">
          {{ line }}
        </p>

        <p class="leading-relaxed mt-6 mb-4 font-medium" :style="{ opacity: UI.DESCRIPTION_OPACITY }">
          {{ contactSectionCopy.career.title }} — {{ contactSectionCopy.career.email }}
        </p>
        <p v-for="(line, i) in contactSectionCopy.career.phoneLines" :key="'c' + i" class="leading-relaxed mb-1" :style="{ opacity: UI.DESCRIPTION_OPACITY }">
          {{ line }}
        </p>

        <p
          class="mt-8 font-medium"
          :style="{ fontSize: UI.SUBHEADER_SIZE }"
        >
          Please submit your resume and portfolio.
        </p>

        <p class="opacity-70 mb-6">
          Each file should not exceed 50mb.
        </p>

        <!-- FILE BUTTONS -->
        <div class="flex gap-4">
          <label
            class="cursor-pointer px-5 py-3 rounded flex items-center gap-2"
            :style="{
              backgroundColor: UI.FILE_BUTTON_BG,
              color: UI.FILE_BUTTON_TEXT
            }"
          >
            <input type="file" class="hidden" @change="onResumeUpload" />
            <span>📄 Resume</span>
          </label>

          <label
            class="cursor-pointer px-5 py-3 rounded flex items-center gap-2"
            :style="{
              backgroundColor: UI.FILE_BUTTON_BG,
              color: UI.FILE_BUTTON_TEXT
            }"
          >
            <input type="file" class="hidden" @change="onPortfolioUpload" />
            <span>🗂 Portfolio</span>
          </label>
        </div>

        <!-- FILE PREVIEW -->
        <div class="mt-4 space-y-1 opacity-75 text-sm">
          <p v-if="resumeName">Resume: {{ resumeName }}</p>
          <p v-if="portfolioName">Portfolio: {{ portfolioName }}</p>
        </div>
      </div>

      <!-- ============================= -->
      <!-- RIGHT SIDE — FORM -->
      <!-- ============================= -->
      <form @submit.prevent="submitForm" class="space-y-6">

        <!-- NAME -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField label="First name" v-model="form.firstName" required />
          <TextField label="Last name" v-model="form.lastName" required />
        </div>

        <!-- CONTACT -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField label="Mobile" v-model="form.mobile" required />
          <TextField label="Email address" v-model="form.email" required />
        </div>

        <!-- DROPDOWNS -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DSADropdown
            label="Status"
            :options="STATUS_OPTIONS"
            v-model="form.status"
          />

          <DSADropdown
            label="Location"
            :options="LOCATION_OPTIONS"
            v-model="form.location"
          />

          <DSADropdown
            label="Position"
            :options="POSITION_OPTIONS"
            v-model="form.position"
          />
        </div>

        <!-- MESSAGE -->
        <TextArea
          label="Your message"
          v-model="form.message"
          required
        />

        <!-- SUBMIT BUTTON -->
        <button
          type="submit"
          class="w-full font-semibold py-3 rounded"
          :style="{
            backgroundColor: UI.SUBMIT_BG,
            color: UI.SUBMIT_TEXT,
            letterSpacing: UI.SUBMIT_TRACKING
          }"
        >
          Submit
        </button>
      </form>

    </div>

    <!-- ERROR MODAL -->
    <SubmissionError
      v-model="showError"
      :errors="errorList"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TextField from "~/components/admin/TextField.vue";
import TextArea from "~/components/admin/TextArea.vue";
import DSADropdown from "~/components/DSADropdown.vue";
import SubmissionError from "~/components/SubmissionError.vue";

import {
  contactSectionCopy,
  STATUS_OPTIONS,
  LOCATION_OPTIONS,
  POSITION_OPTIONS,
  CONTACT_COLORS,
  DSA_PURPLE
} from "~/content/contact";

//
// ======================================
// FORM STATE
// ======================================
//

const form = ref({
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  status: "",
  location: "",
  position: "",
  message: "",
});

const resumeFile = ref<File | null>(null);
const portfolioFile = ref<File | null>(null);

const resumeName = ref("");
const portfolioName = ref("");

const showError = ref(false);
const errorList = ref<string[]>([]);

//
// ======================================
// UI CONSTANTS
// ======================================
//

const UI = {
  PAGE_BG: "#000C05",
  TEXT_MAIN: CONTACT_COLORS.textMain,

  PAGE_TOP_PADDING: 10,
  PAGE_BOTTOM_PADDING: 10,
  PAGE_PADDING_X: 6,

  HEADER_SIZE: "2.4rem",
  HEADER_TRACKING: "0.1em",

  SUBHEADER_SIZE: "1.1rem",
  DESCRIPTION_OPACITY: 0.85,

  FILE_BUTTON_BG: "#5D6762",
  FILE_BUTTON_TEXT: "#ECEBC7",

  SUBMIT_BG: DSA_PURPLE,
  SUBMIT_TEXT: "#ECEBC7",
  SUBMIT_TRACKING: "0.12em",
};

//
// ======================================
// FILE HANDLERS
// ======================================
//

function onResumeUpload(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  if (file.size > 50 * 1024 * 1024) {
    errorList.value = ["Resume file exceeds 50MB limit."];
    showError.value = true;
    return;
  }

  resumeFile.value = file;
  resumeName.value = file.name;
}

function onPortfolioUpload(e: Event) {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  if (file.size > 50 * 1024 * 1024) {
    errorList.value = ["Portfolio file exceeds 50MB limit."];
    showError.value = true;
    return;
  }

  portfolioFile.value = file;
  portfolioName.value = file.name;
}

//
// ======================================
// CLIENT VALIDATION
// ======================================
//

function validate() {
  const missing = [];

  Object.entries(form.value).forEach(([k, v]) => {
    if (!v) missing.push(k);
  });

  if (!resumeFile.value) missing.push("resume");
  if (!portfolioFile.value) missing.push("portfolio");

  if (missing.length) {
    errorList.value = ["Please fill in all fields and upload all files."];
    showError.value = true;
    return false;
  }

  // Basic email format check
  if (!form.value.email.includes("@")) {
    errorList.value = ["Please enter a valid email address."];
    showError.value = true;
    return false;
  }

  return true;
}

//
// ======================================
// SUBMIT TO SERVER
// ======================================
//

async function submitForm() {
  if (!validate()) return;

  const fd = new FormData();

  Object.entries(form.value).forEach(([k, v]) => {
    fd.append(k, v);
  });

  if (resumeFile.value) fd.append("resume", resumeFile.value);
  if (portfolioFile.value) fd.append("portfolio", portfolioFile.value);

  try {
    const res = await $fetch("/api/contact/submit", {
      method: "POST",
      body: fd,
    });

    if (!res.success) {
      errorList.value = res.errors || ["Unknown server error."];
      showError.value = true;
      return;
    }

    // Clear form
    Object.keys(form.value).forEach((k) => form.value[k] = "");
    resumeFile.value = null;
    portfolioFile.value = null;
    resumeName.value = "";
    portfolioName.value = "";

    alert("Submission received. Thank you!");
  } catch (err: any) {
    errorList.value = ["Network error — try again later."];
    showError.value = true;
  }
}
</script>