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
          <TextField label="Location (EN)" v-model="form.location" />
          <TextField label="Location (ZH)" v-model="form.locationZh" />

          <TextField label="Client (EN)" v-model="form.client" />
          <TextField label="Client (ZH)" v-model="form.clientZh" />

          <TextField label="Status (EN)" v-model="form.status" />
          <TextField label="Status (ZH)" v-model="form.statusZh" />

          <TextField label="Service (EN)" v-model="form.service" />
          <TextField label="Service (ZH)" v-model="form.serviceZh" />

          <TextField label="Keywords (comma separated)" v-model="form.keywords" />
          <div class="space-y-2">
            <label class="block font-semibold tracking-wider">Destination</label>
            <select
              v-model="form.destination"
              class="w-full bg-[#0A1410] border border-[#2B3B33] rounded px-3 py-2 text-[#ECEBC7] focus:outline-none focus:ring-2 focus:ring-[#336341]"
              required
            >
              <option value="" disabled>Select destination</option>
              <option value="landscape">landscape</option>
              <option value="lighting">lighting</option>
              <option value="youngArt">youngArt</option>
            </select>
          </div>
        </div>

        <!-- DESCRIPTIONS -->
        <div class="grid grid-cols-1 gap-6">
          <TextArea label="Description (EN)" v-model="form.descriptionEn" />
          <TextArea label="Description (ZH)" v-model="form.descriptionZh" />
        </div>

        <!-- IMAGE UPLOADER -->
        <div>
          <div
            class="border border-[#2B3B33] rounded-lg p-6 text-center mb-4 bg-[#0A1410] cursor-pointer"
            @dragover.prevent
            @drop="handleDropUpload"
          >
            Drag & Drop Images Here
          </div>
          <label class="block font-semibold mb-2 tracking-wider">Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            @change="handleFiles"
            class="block text-[#ECEBC7]"
          />

          <div
            class="flex gap-4 mt-4 flex-wrap"
            @dragover.prevent
            @drop="handleDrop"
          >
            <div v-for="(file, i) in previewImages" :key="i" class="relative"
              draggable="true"
              @dragstart="startDrag(i)"
              @dragenter.prevent="enterDrag(i)"
              @dragend="endDrag"
            >
              <img :src="file" class="h-28 w-28 object-cover rounded border" />

              <div class="absolute top-1 left-1 flex gap-1">
                <label class="bg-black/60 text-xs px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="isHeroFlags[i]"
                    class="accent-[#336341]"
                  />
                  Hero
                </label>
              </div>

              <button
                type="button"
                class="absolute top-1 right-1 bg-black/60 text-xs px-2 py-0.5 rounded text-red-400"
                @click="removeImage(i)"
              >
                ✕
              </button>

              <label class="absolute bottom-1 left-1 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded text-xs cursor-pointer">
                <input
                  type="radio"
                  name="cover"
                  :value="i"
                  v-model="coverIndex"
                  class="accent-[#336341]"
                />
                Cover
              </label>
            </div>
          </div>

          <!-- LIVE PREVIEW -->
          <div class="mt-10 border border-[#2B3B33] rounded-lg p-6 bg-[#0A1410]">
            <h2 class="text-lg font-semibold tracking-wider mb-4">Live Preview</h2>

            <!-- Preview Title -->
            <h3 class="text-xl font-bold tracking-wide mb-2">
              {{ form.titleEn || "Project Title (EN)" }}
            </h3>
            <h3 class="text-xl font-bold tracking-wide mb-2 text-[#ECEBC7]/60">
              {{ form.titleZh || "项目标题 (ZH)" }}
            </h3>

            <!-- Preview Description -->
            <p class="text-sm text-[#ECEBC7]/80 mb-4 leading-relaxed">
              {{ form.descriptionEn || "Project description will appear here..." }}
            </p>
            <p class="text-sm text-[#ECEBC7]/60 mb-4 leading-relaxed">
              {{ form.descriptionZh || "中文项目描述会显示在这里…" }}
            </p>

            <!-- Preview Images -->
            <div class="flex gap-4 flex-wrap mt-4">
              <div
                v-for="(img, i) in previewImages"
                :key="'live'+i"
                class="relative"
              >
                <img
                  :src="img"
                  class="h-32 w-32 object-cover rounded border"
                />
                <div
                  v-if="coverIndex === i"
                  class="absolute bottom-1 left-1 bg-[#336341] text-xs px-2 py-0.5 rounded"
                >
                  Cover
                </div>
              </div>
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
import { useRoute } from 'vue-router';
const route = useRoute();

// If ?destination=lighting was clicked
const rawDestination = String(route.query.destination || "");
const isValidDestination = ["landscape", "lighting", "youngArt"].includes(rawDestination);
const preselectedDestination = isValidDestination ? rawDestination : "";
import { ref, watch } from "vue";
import TextField from "~/components/admin/TextField.vue";
import TextArea from "~/components/admin/TextArea.vue";

const form = ref({
  slug: "",
  titleEn: "",
  titleZh: "",
  categoryEn: "",
  categoryZh: "",

  location: "",
  locationZh: "",

  client: "",
  clientZh: "",

  status: "",
  statusZh: "",

  service: "",
  serviceZh: "",

  keywords: "",
  destination: preselectedDestination,
  descriptionEn: "",
  descriptionZh: "",
});

watch(() => form.value.titleEn, (val) => {
  if (!form.value.slug) {
    form.value.slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
});


const images = ref<File[]>([]);
const previewImages = ref<string[]>([]);
const successMessage = ref("");
const coverIndex = ref(0);
const isHeroFlags = ref<boolean[]>([]);

const dragSourceIndex = ref<number|null>(null);

function startDrag(i: number) {
  dragSourceIndex.value = i;
}

function enterDrag(i: number) {
  if (dragSourceIndex.value === null || dragSourceIndex.value === i) return;

  const imgs = [...images.value];
  const previews = [...previewImages.value];

  const [movedImg] = imgs.splice(dragSourceIndex.value, 1);
  const [movedPrev] = previews.splice(dragSourceIndex.value, 1);

  imgs.splice(i, 0, movedImg);
  previews.splice(i, 0, movedPrev);

  images.value = imgs;
  previewImages.value = previews;

  dragSourceIndex.value = i;
}

function endDrag() {
  dragSourceIndex.value = null;
}

function handleDrop() {
  dragSourceIndex.value = null;
}

function handleDropUpload(e: DragEvent) {
  e.preventDefault();
  if (!e.dataTransfer?.files) return;
  const dropped = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
  images.value = [...images.value, ...dropped];
  previewImages.value = [
    ...previewImages.value,
    ...dropped.map(f => URL.createObjectURL(f))
  ];
  isHeroFlags.value = [
    ...isHeroFlags.value,
    ...dropped.map(() => true)
  ];
}

function handleFiles(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  const newFiles = Array.from(target.files);

  // append instead of replace
  images.value = [...images.value, ...newFiles];

  // append previews instead of replace
  previewImages.value = [
    ...previewImages.value,
    ...newFiles.map(f => URL.createObjectURL(f))
  ];
  isHeroFlags.value = [
    ...isHeroFlags.value,
    ...newFiles.map(() => true)
  ];
}

function removeImage(i: number) {
  images.value.splice(i, 1);
  previewImages.value.splice(i, 1);
  isHeroFlags.value.splice(i, 1);

  if (coverIndex.value === i) {
    coverIndex.value = 0;
  } else if (coverIndex.value > i) {
    coverIndex.value--;
  }
}

async function submitForm() {
  const fd = new FormData();

  // Validate destination before submitting
  if (!["landscape", "lighting", "youngArt"].includes(form.value.destination)) {
    alert("Please choose a project destination.");
    return;
  }

  // append all fields
  Object.entries(form.value).forEach(([key, value]) => {
    fd.append(key, value ?? "");
  });

  fd.append("coverIndex", String(coverIndex.value));

  isHeroFlags.value.forEach((flag, i) => {
    fd.append(`isHero_${i}`, String(flag));
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
