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
    <section
      class="mx-auto grid grid-cols-1 md:grid-cols-[45%_55%] lg:grid-cols-[35%_65%] gap-16 md:gap-20 lg:gap-28 mb-32 items-start contact-hero"
    >
      <div class="max-w-[420px] contact-hero-col">
        <div>
          <h1
            class="mb-10 contact-heading"
            :style="{
              fontSize: '40px',
              letterSpacing: '0.08em',
              fontWeight: 500,
              color: '#8EB29E'
            }"
          >
            {{ contactSectionCopy.contactHeading }}
          </h1>

          <template v-if="locale === 'en'">
            <p class="mb-1" style="font-size: 1.25rem; font-weight: 600;color: #8C8C8C;">
              Business Collaboration
            </p>
            <p class="mb-2 opacity-90">
              dayoung@dayoung.work
            </p>
            <p class="mb-1 opacity-75">+86 177 2268 4557</p>
            <p class="mb-8 opacity-75">+86 755 88878571</p>

            <p class="mb-1" style="font-size: 1.25rem;font-weight: 600; color: #8C8C8C;">
              Career
            </p>
            <p class="mb-2 opacity-90">job@dayoung.work</p>
            <p class="opacity-75">+86 177 2784 7995</p>
          </template>
          <template v-else>
            <p class="mb-1" style="font-size: 1.25rem; font-weight: 600;color: #8C8C8C;">
              业务合作
            </p>
            <p class="mb-2 opacity-90">
              dayoung@dayoung.work
            </p>
            <p class="mb-1 opacity-75">+86 177 2268 4557</p>
            <p class="mb-8 opacity-75">+86 755 88878571</p>

            <p class="mb-1" style="font-size: 1.25rem;font-weight: 600; color: #8C8C8C;">
              招聘联系
            </p>
            <p class="mb-2 opacity-90">Job@dayoung.work</p>
            <p class="opacity-75">+86 177 2784 7995</p>
          </template>
        </div>
      </div>
      <div class="max-w-[520px] contact-hero-col-right">
        <div>
          <h1 class="font-semibold mb-6" :style="{ color: '#8EB29E',fontSize: UI.HEADER_SIZE, letterSpacing: UI.HEADER_TRACKING }">
            Address
          </h1>

          <div class="contact-address-line-wrap">
            <span class="uppercase tracking-[0.22em] text-sm opacity-80 contact-address-line">
              SHENZHEN | SHANGHAI | SINGAPORE
            </span>
          </div>

          <div class="space-y-8 text-sm leading-relaxed opacity-85">
            <template v-if="locale === 'en'">
              <div>
                <p class="font-semibold mb-1">Shenzhen</p>
                <p>13A Floor, Cultural and Sports Industry HQ Tower, <br></br> Futian Sports Park, Futian District, Shenzhen, China</p>
              </div>

              <div>
                <p class="font-semibold mb-1">Shanghai</p>
                <p>270-1bZhongYi Building, Nanjin East Road, <br></br> Huang Pu District, Shanghai, China</p>
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
      </div>
    </section>

    <section
      class="mx-auto grid grid-cols-1 md:grid-cols-[45%_55%] lg:grid-cols-[35%_65%] gap-16 md:gap-20 lg:gap-28 items-start contact-body"
    >
      <div class="contact-join">
        <div class="contact-join-inner">
        <h1 class="font-semibold mb-6 join-heading" :style="{ color: '#8EB29E', fontSize: UI.HEADER_SIZE, letterSpacing: UI.HEADER_TRACKING }">
          Join Us
        </h1>

        <template v-if="locale === 'en'">
          <p class="leading-relaxed mb-4 opacity-80 join-copy join-justify">
            Our company is constantly seeking designers who are passionate about the aesthetic design of new ecological art, love landscape, light and shadow, public art, have graduated from relevant design majors, possess high artistic accomplishment and aesthetic sense, and have working experience in high-quality design companies to join the DSA team.
          </p>

          <p class="leading-relaxed mb-6 opacity-80 join-copy join-justify">
            We offer job opportunities for project manager, environmental update designer, assistant designer and intern positions.
          </p>

          <p class="font-medium mb-1 join-copy">Please submit your resume and portfolio.</p>
          <p class="opacity-70 mb-6 join-copy">Each file should not exceed 50mb.</p>
        </template>
        <template v-else>
          <p class="leading-relaxed mb-4 opacity-80 join-copy join-justify">
            我司长期寻找对跨学科设计充满热诚，热爱景观、光影、艺术设计的相关设计专业毕业、有较高的艺术修养和审美，有高品质设计公司工作经验的设计师加入我们。
          </p>

          <p class="leading-relaxed mb-6 opacity-80 join-copy join-justify">
            长期提供项目经理、环境更新设计师、助理设计师、实习生岗位的工作机会。
          </p>

          <p class="font-medium mb-1 join-copy">请提交你的履历和作品集。</p>
          <p class="opacity-70 mb-6 join-copy">每个档案大小不得超过50MB。</p>
        </template>

        <!-- FILE BUTTONS -->
        <div
          class="flex gap-4 file-buttons"
          :style="{ marginTop: UI.JOIN_BUTTON_SPACING + 'px' }"
        >
          <label
            class="cursor-pointer px-5 py-3 rounded flex items-center justify-center gap-2"
            :style="{
              backgroundColor: UI.FILE_BUTTON_BG,
              color: UI.FILE_BUTTON_TEXT,
              width: '195px'
            }"
          >
            <input type="file" class="hidden" accept="application/pdf" @change="onResumeUpload" />
            <span class="inline-flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-4 h-4"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 5 17 10"/>
                <line x1="12" y1="5" x2="12" y2="21"/>
              </svg>
              <span :style="{ letterSpacing: UI.SUBMIT_TRACKING , fontWeight: 300,}">
                {{ locale === 'en' ? 'Resume' : '简历' }}
              </span>
            </span>
          </label>

          <label
            class="cursor-pointer px-5 py-3 rounded flex items-center justify-center gap-2"
            :style="{
              backgroundColor: UI.FILE_BUTTON_BG,
              color: UI.FILE_BUTTON_TEXT,
              width: '195px'
            }"
          >
            <input type="file" class="hidden" accept="application/pdf" @change="onPortfolioUpload" />
            <span class="inline-flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-4 h-4"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 5 17 10"/>
                <line x1="12" y1="5" x2="12" y2="21"/>
              </svg>
              <span :style="{ letterSpacing: UI.SUBMIT_TRACKING, fontWeight:300, }">
                {{ locale === 'en' ? 'Portfolio' : '作品集' }}
              </span>
            </span>
          </label>
        </div>
        </div>
      </div>

      <!-- ============================= -->
      <!-- RIGHT SIDE — FORM -->
      <!-- ============================= -->
      <div class="w-full max-w-[570px] contact-form">
        <form @submit.prevent="submitForm" class="space-y-6">

          <!-- NAME -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextField :label="formLabels.firstName" v-model="form.firstName" required />
            <TextField :label="formLabels.lastName" v-model="form.lastName" required />
          </div>

          <!-- CONTACT -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex flex-col contact-mobile-field">
              <label class="mb-1 tracking-wider text-sm">{{ formLabels.mobile }}</label>
              <div class="flex gap-2 contact-mobile-row">
                <PhoneCodeDropdown
                  v-model="form.mobileCode"
                  :options="COUNTRY_CALLING_CODES"
                  :placeholder="formLabels.mobileCodePlaceholder"
                  class="contact-code-dropdown"
                />
                <input
                  v-model="form.mobile"
                  type="tel"
                  class="flex-1 px-3 py-2 bg-[#FFFFFF] border border-[#E0E0E0] rounded text-[#828282] focus:outline-none contact-mobile-input"
                  :required="true"
                />
              </div>
            </div>
            <TextField :label="formLabels.email" v-model="form.email" required />
          </div>

          <!-- DROPDOWNS -->
          <div
            class="grid grid-cols-1 gap-4 contact-neutral-dropdowns md:grid-cols-[1fr_1fr_1fr]"
            :style="{ color: '#8C8C8C', gridTemplateColumns: '1fr 1fr 1.5fr' }"
          >
            <DSADropdown
              :label="formLabels.status"
              :options="statusOptions"
              v-model="form.status"
              size="compact"
            />

            <DSADropdown
              :label="formLabels.location"
              :options="locationOptions"
              v-model="form.location"
              size="compact"
            />

            <DSADropdown
              :label="formLabels.position"
              :options="positionOptions"
              v-model="form.position"
              size="compact"
            />
          </div>

          <!-- MESSAGE -->
          <TextArea
            :label="formLabels.message"
            v-model="form.message"
            :rows="6"
            required
          />

          <!-- SUBMIT BUTTON -->
          <button
            type="submit"
            class="w-full font-semibold py-3 rounded transition"
            :disabled="isSubmitting"
            :style="{
              backgroundColor: UI.FILE_BUTTON_BG,
              color: UI.FILE_BUTTON_TEXT,
              letterSpacing: UI.SUBMIT_TRACKING,
              fontWeight: 300,
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }"
          >
            {{ isSubmitting ? formLabels.submitting : formLabels.submit }}
          </button>
        </form>
        <div
          v-if="submitSuccess"
          class="mt-6 p-4 rounded text-sm tracking-wide"
          :style="{
            backgroundColor: '#0A1410',
            border: '1px solid #336341',
            color: '#ECEBC7'
          }"
        >
          Your submission has been received. We’ll be in touch.
        </div>
      </div>
    </section>

    <!-- ERROR MODAL -->
    <SubmissionError
      v-model="showError"
      :errors="errorList"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useLocale } from "~/composables/useLocale";
import TextField from "~/components/admin/TextField.vue";
import TextArea from "~/components/admin/TextArea.vue";
import DSADropdown from "~/components/DSADropdown.vue";
import PhoneCodeDropdown from "~/components/PhoneCodeDropdown.vue";
import SubmissionError from "~/components/SubmissionError.vue";

import {
  contactSectionCopy,
  contactFormLabels,
  COUNTRY_CALLING_CODES,
  STATUS_OPTIONS_EN,
  STATUS_OPTIONS_ZH,
  LOCATION_OPTIONS_EN,
  LOCATION_OPTIONS_ZH,
  POSITION_OPTIONS_EN,
  POSITION_OPTIONS_ZH,
  CONTACT_COLORS,
  DSA_PURPLE
} from "~/content/contact";

const { locale } = useLocale();

const formLabels = computed(() =>
  locale.value === "en" ? contactFormLabels.en : contactFormLabels.zh
);

const statusOptions = computed(() =>
  locale.value === "en" ? STATUS_OPTIONS_EN : STATUS_OPTIONS_ZH
);

const locationOptions = computed(() =>
  locale.value === "en" ? LOCATION_OPTIONS_EN : LOCATION_OPTIONS_ZH
);

const positionOptions = computed(() =>
  locale.value === "en" ? POSITION_OPTIONS_EN : POSITION_OPTIONS_ZH
);

//
// ======================================
// FORM STATE
// ======================================
//

const form = ref({
  firstName: "",
  lastName: "",
  mobileCode: "",
  mobile: "",
  email: "",
  status: "",
  location: "",
  position: "",
  message: "",
});

watch(
  () => locale.value,
  (nextLocale) => {
    if (form.value.mobileCode) return;
    if (nextLocale === "zh") {
      form.value.mobileCode = "+86";
    }
  },
  { immediate: true }
);

const resumeFile = ref<File | null>(null);
const portfolioFile = ref<File | null>(null);

const resumeName = ref("");
const portfolioName = ref("");

const showError = ref(false);
const errorList = ref<string[]>([]);

const isSubmitting = ref(false)
const submitSuccess = ref(false)

//
// ======================================
// UI CONSTANTS
// ======================================
//

const UI = {
  PAGE_BG: "#000C05",
  TEXT_MAIN: "#8C8C8C",

  PAGE_TOP_PADDING: 10,
  PAGE_BOTTOM_PADDING: 10,
  PAGE_PADDING_X: 6,

  HEADER_SIZE: "2.4rem",
  HEADER_TRACKING: "0.1em",

  SUBHEADER_SIZE: "1.1rem",
  DESCRIPTION_OPACITY: 0.85,

  FILE_BUTTON_BG: "#617D6E",
  FILE_BUTTON_TEXT: "#D9D9D9",

  SUBMIT_BG: '#617D6E',
  SUBMIT_TEXT: "#D9D9D9",
  SUBMIT_TRACKING: "0.12em",
  JOIN_BUTTON_SPACING: 30,
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
  if (!validate()) return

  isSubmitting.value = true
  submitSuccess.value = false

  const fd = new FormData()

  Object.entries(form.value).forEach(([k, v]) => {
    fd.append(k, v)
  })

  if (resumeFile.value) fd.append("resume", resumeFile.value)
  if (portfolioFile.value) fd.append("portfolio", portfolioFile.value)

  try {
    const res: any = await $fetch("/api/contact/submit", {
      method: "POST",
      body: fd,
    })

    if (!res?.success) {
      errorList.value = res?.errors || ["Submission failed."]
      showError.value = true
      return
    }

    submitSuccess.value = true

    // reset form
    Object.keys(form.value).forEach((k) => (form.value as any)[k] = "")
    resumeFile.value = null
    portfolioFile.value = null
    resumeName.value = ""
    portfolioName.value = ""

  } catch {
    errorList.value = ["Network error — please try again later."]
    showError.value = true
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Force neutral grey inside dropdowns (Status / Location / Position) */
:deep(.contact-neutral-dropdowns *) {
  color: #8C8C8C !important;
}

:deep(label) {
  color: #8EB29E;
}

.contact-hero-col {
  padding-left: 80px;
  padding-top: 120px;
}

.contact-hero-col-right {
  padding-top: 120px;
  padding-left: 32px;
}

.contact-join {
  padding-left: 80px;
}

.contact-join-inner {
  max-width: 420px;
}

.contact-form {
  padding-left: 32px;
}

.contact-mobile-row {
  align-items: center;
}

.contact-code-dropdown {
  width: 112px;
  min-width: 112px;
  flex-shrink: 0;
}

.contact-mobile-input {
  min-width: 0;
}

@media (min-width: 721px) and (max-width: 1100px) {
  .contact-hero-col {
    padding-left: 56px;
    padding-top: 104px;
  }

  .contact-hero-col-right {
    padding-top: 104px;
    padding-left: 24px;
  }

  .contact-join {
    padding-left: 56px;
  }

  .contact-form {
    padding-left: 24px;
  }

  .contact-hero,
  .contact-body {
    gap: 64px !important;
  }
}

@media (max-width: 720px) {
  .contact-hero,
  .contact-body {
    gap: 40px !important;
    text-align: center;
    justify-items: center;
  }

  .contact-body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .contact-hero > div,
  .contact-body > div {
    padding: 0 !important;
    margin: 0 auto;
  }

  .contact-hero-col-right {
    width: 100% !important;
    max-width: 100% !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin-left: auto !important;
    margin-right: auto !important;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .contact-hero-col-right > div {
    width: 100%;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .contact-hero h1,
  .contact-body h1 {
    text-align: center;
  }


  .contact-heading {
    white-space: nowrap;
    font-size: 28px !important;
    letter-spacing: 0.04em !important;
  }

  .contact-address-line {
    white-space: nowrap;
    letter-spacing: 0.16em !important;
    font-size: 0.72rem !important;
    text-align: center;
  }

  .contact-address-line-wrap {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .contact-form {
    max-width: 100% !important;
    margin: 0 auto;
  }

  .contact-form form {
    width: 100%;
  }

  .contact-neutral-dropdowns {
    grid-template-columns: 1fr !important;
  }

  .contact-neutral-dropdowns > * {
    width: 100%;
  }

  .contact-code-dropdown {
    width: 72px;
    min-width: 72px;
    flex: 0 0 72px;
  }

  .contact-join {
    width: 100%;
    padding: 0 !important;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }

  .contact-join-inner {
    width: 75vw;
    min-width: 75vw;
    max-width: 75vw;
    margin: 0 auto;
    text-align: center;
  }

  .join-copy {
    text-align: justify !important;
    text-justify: inter-word !important;
    text-wrap: pretty;
    width: 100% !important;
    max-width: 100% !important;
    margin-left: auto !important;
    margin-right: auto !important;
    padding-left: 0;
    padding-right: 0;
  }

  .file-buttons {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .file-buttons label {
    width: 100% !important;
    max-width: 320px;
  }

  .join-heading {
    text-align: center !important;
  }
}

.join-heading {
  text-align: left;
}

.join-copy {
  text-align: left;
  text-wrap: pretty;
  width: 100%;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}

.join-justify {
  text-align: justify;
  text-justify: inter-word;
}
</style>
