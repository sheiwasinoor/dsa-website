<template>
  <div class="min-h-screen bg-[#000C05] text-[#ECEBC7] py-14 px-6">
    <div class="max-w-3xl mx-auto">

      <!-- HEADER -->
      <h1 class="text-2xl font-semibold tracking-[0.18em] uppercase mb-10">
        Create News Post
      </h1>

      <!-- SUCCESS MESSAGE -->
      <p v-if="successMessage" class="text-green-400 text-sm mb-4">
        {{ successMessage }}
      </p>

      <!-- FORM -->
      <form @submit.prevent="submitForm" class="space-y-10">

        <!-- BASIC FIELDS -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="text-xs text-[#ECEBC7]/70">Slug (URL)</label>
            <input
              v-model="form.slug"
              type="text"
              placeholder="qianhai-opening"
              class="w-full mt-1 rounded-md border border-[#334036]/50 bg-[#000C05] px-3 py-2 text-sm outline-none focus:border-[#ECEBC7]"
              required
            />
          </div>

          <div>
            <label class="text-xs text-[#ECEBC7]/70">Published?</label>
            <select
              v-model="form.published"
              class="w-full mt-1 rounded-md border border-[#334036]/50 bg-[#000C05] px-3 py-2 text-sm focus:border-[#ECEBC7]"
            >
              <option value="true">Yes (default)</option>
              <option value="false">No (draft)</option>
            </select>
          </div>
        </div>

        <!-- TITLES -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="text-xs text-[#ECEBC7]/70">Title (EN)</label>
            <input
              v-model="form.titleEn"
              type="text"
              class="w-full mt-1 rounded-md border border-[#334036]/50 bg-[#000C05] px-3 py-2 text-sm focus:border-[#ECEBC7]"
              required
            />
          </div>

          <div>
            <label class="text-xs text-[#ECEBC7]/70">Title (ZH)</label>
            <input
              v-model="form.titleZh"
              type="text"
              class="w-full mt-1 rounded-md border border-[#334036]/50 bg-[#000C05] px-3 py-2 text-sm focus:border-[#ECEBC7]"
              required
            />
          </div>
        </div>

        <!-- BODY TEXT -->
        <div>
          <label class="text-xs text-[#ECEBC7]/70">Body (EN)</label>
          <textarea
            v-model="form.bodyEn"
            rows="6"
            class="w-full mt-1 rounded-md border border-[#334036]/50 bg-[#000C05] px-3 py-2 text-sm leading-relaxed focus:border-[#ECEBC7]"
            required
          ></textarea>
        </div>

        <div>
          <label class="text-xs text-[#ECEBC7]/70">Body (ZH)</label>
          <textarea
            v-model="form.bodyZh"
            rows="6"
            class="w-full mt-1 rounded-md border border-[#334036]/50 bg-[#000C05] px-3 py-2 text-sm leading-relaxed focus:border-[#ECEBC7]"
            required
          ></textarea>
        </div>

        <!-- IMAGE UPLOAD -->
        <div>
          <label class="text-xs text-[#ECEBC7]/70">News Image (optional)</label>

          <input
            type="file"
            accept="image/*"
            @change="handleImage"
            class="block mt-2 text-[#ECEBC7]"
          />

          <!-- PREVIEW -->
          <div v-if="previewImage" class="mt-4">
            <img :src="previewImage" class="w-48 h-32 object-cover rounded border" />
          </div>
        </div>

        <!-- SUBMIT BUTTON -->
        <button
          type="submit"
          class="px-8 py-3 bg-[#336341] hover:bg-[#3f7a4d] rounded text-[#ECEBC7] tracking-widest"
        >
          CREATE NEWS POST
        </button>

      </form>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const form = ref({
  slug: "",
  titleEn: "",
  titleZh: "",
  bodyEn: "",
  bodyZh: "",
  published: "true",
});

const imageFile = ref<File | null>(null);
const previewImage = ref<string | null>(null);
const successMessage = ref("");

function handleImage(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    imageFile.value = target.files[0];
    previewImage.value = URL.createObjectURL(imageFile.value);
  }
}

async function submitForm() {
  const fd = new FormData();

  Object.entries(form.value).forEach(([key, value]) => {
    fd.append(key, value);
  });

  if (imageFile.value) {
    fd.append("image", imageFile.value);
  }

  try {
    const res = await $fetch("/api/news/create", {
      method: "POST",
      body: fd,
    });

    successMessage.value = "News post created!";
  } catch (err: any) {
    alert(err?.data?.statusMessage || "Error creating news post.");
  }
}
</script>