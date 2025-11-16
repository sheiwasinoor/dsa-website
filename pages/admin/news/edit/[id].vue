

<template>
  <div class="min-h-screen bg-[#000C05] text-[#ECEBC7] py-14 px-6">
    <div class="max-w-4xl mx-auto">

      <h1 class="text-2xl font-semibold tracking-[0.18em] uppercase mb-10">
        Edit News Post
      </h1>

      <!-- LOADING -->
      <p v-if="loading" class="text-[#ECEBC7]/60">Loading…</p>

      <form v-else @submit.prevent="savePost" class="space-y-8">

        <!-- BASIC -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField label="Title (EN)" v-model="form.titleEn" required />
          <TextField label="Title (ZH)" v-model="form.titleZh" required />
        </div>

        <TextField label="Slug" v-model="form.slug" disabled />

        <!-- BODY -->
        <div class="grid grid-cols-1 gap-6">
          <TextArea label="Body (EN)" v-model="form.bodyEn" rows="6" />
          <TextArea label="Body (ZH)" v-model="form.bodyZh" rows="6" />
        </div>

        <!-- PUBLISH -->
        <label class="flex items-center gap-3 text-sm tracking-wider">
          <input type="checkbox" v-model="form.published" />
          <span>Published</span>
        </label>

        <!-- IMAGE -->
        <div>
          <label class="block font-semibold mb-2 tracking-wider">Image</label>

          <div v-if="currentImage" class="mb-4">
            <p class="text-xs mb-2 text-[#ECEBC7]/60">Current image:</p>
            <img :src="currentImage" class="h-32 rounded border" />
          </div>

          <input type="file" accept="image/*" @change="handleFile" />
        </div>

        <!-- SAVE -->
        <button
          type="submit"
          class="px-8 py-3 bg-[#336341] hover:bg-[#3d7a54] rounded text-[#ECEBC7] tracking-widest"
        >
          Save Changes
        </button>

        <p v-if="successMessage" class="text-green-400 mt-3">{{ successMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, navigateTo } from "#imports";
import TextField from "~/components/admin/TextField.vue";
import TextArea from "~/components/admin/TextArea.vue";

const route = useRoute();
const id = route.params.id as string;

const loading = ref(true);
const successMessage = ref("");

const form = ref({
  titleEn: "",
  titleZh: "",
  bodyEn: "",
  bodyZh: "",
  slug: "",
  published: true,
});

const currentImage = ref<string | null>(null);
const newImage = ref<File | null>(null);

function handleFile(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files?.length) {
    newImage.value = target.files[0];
  }
}

async function loadPost() {
  const data = await $fetch("/api/news/get", {
    query: { id }
  });

  form.value = {
    titleEn: data.titleEn,
    titleZh: data.titleZh,
    bodyEn: data.bodyEn,
    bodyZh: data.bodyZh,
    slug: data.slug,
    published: data.published,
  };

  currentImage.value = data.imageUrl || null;
  loading.value = false;
}

async function savePost() {
  const fd = new FormData();
  fd.append("id", id);
  fd.append("titleEn", form.value.titleEn);
  fd.append("titleZh", form.value.titleZh);
  fd.append("bodyEn", form.value.bodyEn);
  fd.append("bodyZh", form.value.bodyZh);
  fd.append("slug", form.value.slug);
  fd.append("published", String(form.value.published));

  if (newImage.value) {
    fd.append("image", newImage.value);
  }

  await $fetch("/api/news/update", {
    method: "POST",
    body: fd,
  });

  successMessage.value = "Saved successfully!";
}

onMounted(loadPost);

definePageMeta({
  middleware: "auth",
});
</script>