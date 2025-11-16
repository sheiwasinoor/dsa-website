<template>
  <div class="min-h-screen bg-[#000C05] text-[#ECEBC7] py-14 px-6">
    <div class="max-w-4xl mx-auto">

      <h1 class="text-3xl font-semibold mb-10 tracking-widest">
        CREATE NEW PROJECT
      </h1>

      <!-- FORM -->
      <form @submit.prevent="submitForm" class="space-y-8">

        <!-- BASIC TEXT FIELDS -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField label="Slug" v-model="form.slug" required />
          <TextField label="Title (EN)" v-model="form.titleEn" required />
          <TextField label="Title (ZH)" v-model="form.titleZh" required />
          <TextField label="Category (EN)" v-model="form.categoryEn" required />
          <TextField label="Category (ZH)" v-model="form.categoryZh" required />
        </div>

        <!-- OPTIONAL DETAILS -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField label="Location" v-model="form.location" />
          <TextField label="Client" v-model="form.client" />
          <TextField label="Status" v-model="form.status" />
          <TextField label="Service" v-model="form.service" />
          <TextField label="Keywords (comma separated)" v-model="form.keywords" />
        </div>

        <!-- DESCRIPTIONS -->
        <div class="grid grid-cols-1 gap-6">
          <TextArea label="Description (EN)" v-model="form.descriptionEn" />
          <TextArea label="Description (ZH)" v-model="form.descriptionZh" />
        </div>

        <!-- IMAGE UPLOADER -->
        <div>
          <label class="block font-semibold mb-2 tracking-wider">Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            @change="handleFiles"
            class="block text-[#ECEBC7]"
          />

          <div class="flex gap-4 mt-4 flex-wrap">
            <div v-for="(file, i) in previewImages" :key="i" class="relative">
              <img :src="file" class="h-28 w-28 object-cover rounded border" />
            </div>
          </div>
        </div>

        <!-- SUBMIT -->
        <button
          type="submit"
          class="px-8 py-3 bg-[#336341] hover:bg-[#3d7a54] transition rounded text-[#ECEBC7] tracking-widest"
        >
          CREATE PROJECT
        </button>

        <!-- SUCCESS MESSAGE -->
        <p v-if="successMessage" class="text-green-400 mt-4">
          {{ successMessage }}
        </p>
      </form>
    </div>
  </div>
</template>


<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
import { ref } from "vue";
import TextField from "~/components/admin/TextField.vue";
import TextArea from "~/components/admin/TextArea.vue";

const form = ref({
  slug: "",
  titleEn: "",
  titleZh: "",
  categoryEn: "",
  categoryZh: "",
  location: "",
  client: "",
  status: "",
  service: "",
  keywords: "",
  descriptionEn: "",
  descriptionZh: "",
});

const images = ref<File[]>([]);
const previewImages = ref<string[]>([]);
const successMessage = ref("");

function handleFiles(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  images.value = Array.from(target.files);
  previewImages.value = images.value.map(f => URL.createObjectURL(f));
}

async function submitForm() {
  const fd = new FormData();

  // append all fields
  Object.entries(form.value).forEach(([key, value]) => {
    fd.append(key, value ?? "");
  });

  // append images
  images.value.forEach(img => {
    fd.append("images", img);
  });

  try {
    const res = await $fetch("/api/projects/create", {
      method: "POST",
      body: fd,
    });

    successMessage.value = "Project created!";
  } catch (err: any) {
    console.error(err);
    alert("Error creating project.");
  }
}
</script>