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
    <section class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-28 mb-32">
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

        <template v-if="locale === 'en'">
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
        </template>
        <template v-else>
          <p class="leading-relaxed mb-4" :style="{ opacity: UI.DESCRIPTION_OPACITY }">
            业务合作 — dayoung@dayoung.work
          </p>
          <p class="leading-relaxed mb-1" :style="{ opacity: UI.DESCRIPTION_OPACITY }">
            +86 177 2268 4557
          </p>
          <p class="leading-relaxed mb-1" :style="{ opacity: UI.DESCRIPTION_OPACITY }">
            +86 755 88878571
          </p>

          <p class="leading-relaxed mt-6 mb-4 font-medium" :style="{ opacity: UI.DESCRIPTION_OPACITY }">
            招聘联系 — Job@dayoung.work
          </p>
          <p class="leading-relaxed mb-1" :style="{ opacity: UI.DESCRIPTION_OPACITY }">
            +86 177 2784 7995
          </p>
        </template>

      </div>
  <div>
    <h1 class="font-semibold mb-6" :style="{ fontSize: UI.HEADER_SIZE, letterSpacing: UI.HEADER_TRACKING }">
      Address
    </h1>

    <p class="uppercase tracking-[0.22em] mb-6 text-sm opacity-80">
      SHENZHEN | SHANGHAI | SINGAPORE | PARIS
    </p>

    <div class="space-y-8 text-sm leading-relaxed opacity-85">
      <template v-if="locale === 'en'">
        <div>
          <p class="font-semibold mb-1">Shenzhen</p>
          <p>13A Floor, Cultural and Sports Industry HQ Tower, Futian Sports Park, Futian District, Shenzhen, China</p>
        </div>

        <div>
          <p class="font-semibold mb-1">Shanghai</p>
          <p>270-1bZhongYi Building, Nanjin East Road, Huang Pu District, Shanghai, China</p>
        </div>

        <div>
          <p class="font-semibold mb-1">Singapore</p>
          <p>73 Holland Grove View, Singapore 276230</p>
        </div>
      </template>
      <template v-else>
        <div>
          <p class="font-semibold mb-1">Shenzhen</p>
          <p>深圳市福田区福田体育公园文化体育产业总部大厦-十三A层</p>
          <p>（中国深圳新媒体广告产业园内）</p>
        </div>

        <div>
          <p class="font-semibold mb-1">Shanghai</p>
          <p>上海市黄浦区北京东路270-1号中一大楼7层</p>
        </div>

        <div>
          <p class="font-semibold mb-1">Singapore</p>
          <p>73 Holland Grove View, Singapore 276230</p>
        </div>
      </template>
    </div>
  </div>
</section>

    <section class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-28">
      <div>
        <h1 class="font-semibold mb-6" :style="{ fontSize: UI.HEADER_SIZE, letterSpacing: UI.HEADER_TRACKING }">
          Join Us
        </h1>

        <template v-if="locale === 'en'">
          <p class="leading-relaxed mb-4 opacity-80">
            Our company is constantly seeking designers who are passionate about the aesthetic design of new ecological art, love landscape, light and shadow, public art, have graduated from relevant design majors, possess high artistic accomplishment and aesthetic sense, and have working experience in high-quality design companies to join the DSA team.
          </p>

          <p class="leading-relaxed mb-6 opacity-80">
            We offer job opportunities for project manager, environmental update designer, assistant designer and intern positions.
          </p>

          <p class="font-medium mb-1">Please submit your resume and portfolio.</p>
          <p class="opacity-70 mb-6">Each file should not exceed 50mb.</p>
        </template>
        <template v-else>
          <p class="leading-relaxed mb-4 opacity-80">
            我司长期寻找对跨学科设计充满热诚，热爱景观、光影、艺术设计的相关设计专业毕业、有较高的艺术修养和审美，有高品质设计公司工作经验的设计师加入我们。
          </p>

          <p class="leading-relaxed mb-6 opacity-80">
            长期提供项目经理、环境更新设计师、助理设计师、实习生岗位的工作机会。
          </p>

          <p class="font-medium mb-1">请提交你的履历和作品集。</p>
          <p class="opacity-70 mb-6">每个档案大小不得超过50MB。</p>
        </template>

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
    </section>

    <!-- ERROR MODAL -->
    <SubmissionError
      v-model="showError"
      :errors="errorList"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useLocale } from "~/composables/useLocale";
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

const { locale } = useLocale();

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