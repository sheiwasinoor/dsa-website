<template>
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

    <!-- EXISTING IMAGES (EDIT MODE) -->
    <div v-if="mode === 'edit' && existingImages.length" class="mb-6">
      <p class="font-semibold mb-2 tracking-wider">Existing Images</p>

      <div
        class="flex gap-4 flex-wrap"
        @dragover.prevent
      >
        <div
          v-for="img in existingImages"
          :key="img.id"
          class="relative w-28"
          draggable="true"
          @dragstart="startExistingDrag(img.id)"
          @dragenter.prevent="enterExistingDrag(img.id)"
          @dragend="endExistingDrag"
        >
          <img :src="img.url" class="h-28 w-28 object-cover rounded border" />

          <button
            type="button"
            class="absolute top-1 right-1 bg-red-600 text-xs px-2 py-0.5 rounded"
            @click="removeExistingImage(img.id)"
          >
            ✕
          </button>

          <div class="mt-1 space-y-1 text-xs">
            <label class="flex items-center gap-1">
              <input
                type="radio"
                name="existingCover"
                :value="img.id"
                v-model="selectedCoverId"
                class="accent-[#336341]"
              />
              Cover
            </label>
            <label class="flex items-center gap-1">
              <input
                type="checkbox"
                :checked="heroImageIds.includes(img.id)"
                @change="toggleHero(img.id)"
                class="accent-[#336341]"
              />
              Hero
            </label>
          </div>
        </div>
      </div>
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
      >
        <div
          v-for="(file, i) in previewImages"
          :key="i"
          class="relative"
          draggable="true"
          @dragstart="startDrag(i)"
          @dragenter.prevent="enterDrag(i)"
          @dragend="endDrag"
        >
          <img :src="file" class="h-28 w-28 object-cover rounded border" />
          <label
            class="absolute bottom-1 left-1 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded text-xs cursor-pointer"
          >
            <input
              type="radio"
              name="cover"
              :value="i"
              v-model="coverIndex"
              class="accent-[#336341]"
            />
            Cover
          </label>
          <label
            class="absolute bottom-1 right-1 flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded text-xs cursor-pointer"
          >
            <input
              type="checkbox"
              :checked="isHeroFlags[i]"
              @change="toggleNewHero(i)"
              class="accent-[#336341]"
            />
            Hero
          </label>
        </div>
      </div>
    </div>

    <!-- SUBMIT -->
    <button
      type="submit"
      class="px-8 py-3 bg-[#336341] hover:bg-[#3d7a54] transition rounded text-[#ECEBC7] tracking-widest"
    >
      {{ mode === 'edit' ? 'UPDATE PROJECT' : 'CREATE PROJECT' }}
    </button>

  </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import TextField from "~/components/admin/TextField.vue";
import TextArea from "~/components/admin/TextArea.vue";

const props = defineProps<{
  mode: "create" | "edit";
  initialData?: any;
}>();

const emit = defineEmits<{
  (e: "submit", payload: FormData): void;
}>();

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
  destination: "",

  descriptionEn: "",
  descriptionZh: "",
});

const existingImages = ref<any[]>([]);
const deletedImageIds = ref<string[]>([]);
const heroImageIds = ref<string[]>([]);
const selectedCoverId = ref<string>("");
const existingDragSource = ref<string | null>(null);

onMounted(() => {
  if (props.mode === "edit" && props.initialData) {
    Object.assign(form.value, {
      slug: props.initialData.slug,
      titleEn: props.initialData.titleEn,
      titleZh: props.initialData.titleZh,
      categoryEn: props.initialData.categoryEn,
      categoryZh: props.initialData.categoryZh,
      location: props.initialData.location,
      locationZh: props.initialData.locationZh,
      client: props.initialData.client,
      clientZh: props.initialData.clientZh,
      status: props.initialData.status,
      statusZh: props.initialData.statusZh,
      service: props.initialData.service,
      serviceZh: props.initialData.serviceZh,
      keywords: props.initialData.keywords,
      destination: props.initialData.destination,
      descriptionEn: props.initialData.descriptionEn,
      descriptionZh: props.initialData.descriptionZh,
    });

    existingImages.value = props.initialData.images ?? [];
    heroImageIds.value = existingImages.value
      .filter((i) => (i.isHero ?? i.isCover))
      .map((i) => i.id);

    const existingCover = existingImages.value.find((i) => i.isCover);
    selectedCoverId.value = existingCover?.id || existingImages.value[0]?.id || "";
  }
});

watch(
  () => form.value.titleEn,
  (val) => {
    if (!form.value.slug && val) {
      form.value.slug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    }
  }
);

const images = ref<File[]>([]);
const previewImages = ref<string[]>([]);
const coverIndex = ref(0);
const isHeroFlags = ref<boolean[]>([]);
const dragSourceIndex = ref<number | null>(null);

function removeExistingImage(id: string) {
  deletedImageIds.value.push(id);
  existingImages.value = existingImages.value.filter((i) => i.id !== id);
  heroImageIds.value = heroImageIds.value.filter((x) => x !== id);

  if (selectedCoverId.value === id) {
    selectedCoverId.value = existingImages.value[0]?.id || "";
  }
}

function startExistingDrag(id: string) {
  existingDragSource.value = id;
}

function enterExistingDrag(targetId: string) {
  if (!existingDragSource.value || existingDragSource.value === targetId) return;

  const sourceIdx = existingImages.value.findIndex((i) => i.id === existingDragSource.value);
  const targetIdx = existingImages.value.findIndex((i) => i.id === targetId);
  if (sourceIdx === -1 || targetIdx === -1) return;

  const reordered = [...existingImages.value];
  const [moved] = reordered.splice(sourceIdx, 1);
  reordered.splice(targetIdx, 0, moved);
  existingImages.value = reordered;
}

function endExistingDrag() {
  existingDragSource.value = null;
}

function toggleHero(id: string) {
  if (heroImageIds.value.includes(id)) {
    heroImageIds.value = heroImageIds.value.filter((x) => x !== id);
  } else {
    heroImageIds.value.push(id);
  }
}

function handleFiles(event: Event) {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  const newFiles = Array.from(target.files);
  images.value = [...images.value, ...newFiles];
  previewImages.value = [
    ...previewImages.value,
    ...newFiles.map((f) => URL.createObjectURL(f)),
  ];
  isHeroFlags.value = [...isHeroFlags.value, ...newFiles.map(() => false)];
}

function handleDropUpload(e: DragEvent) {
  e.preventDefault();
  if (!e.dataTransfer?.files) return;
  const dropped = Array.from(e.dataTransfer.files).filter((f) =>
    f.type.startsWith("image/")
  );
  if (!dropped.length) return;

  images.value = [...images.value, ...dropped];
  previewImages.value = [
    ...previewImages.value,
    ...dropped.map((f) => URL.createObjectURL(f)),
  ];
  isHeroFlags.value = [...isHeroFlags.value, ...dropped.map(() => false)];
}

function startDrag(i: number) {
  dragSourceIndex.value = i;
}

function enterDrag(i: number) {
  if (dragSourceIndex.value === null || dragSourceIndex.value === i) return;

  const imgs = [...images.value];
  const previews = [...previewImages.value];

  const [movedImg] = imgs.splice(dragSourceIndex.value, 1);
  const [movedPrev] = previews.splice(dragSourceIndex.value, 1);
  const heroFlags = [...isHeroFlags.value];
  const [movedHero] = heroFlags.splice(dragSourceIndex.value, 1);

  imgs.splice(i, 0, movedImg);
  previews.splice(i, 0, movedPrev);
  heroFlags.splice(i, 0, movedHero);

  images.value = imgs;
  previewImages.value = previews;
  isHeroFlags.value = heroFlags;

  dragSourceIndex.value = i;
}

function endDrag() {
  dragSourceIndex.value = null;
}

function toggleNewHero(index: number) {
  isHeroFlags.value = isHeroFlags.value.map((flag, i) =>
    i === index ? !flag : flag
  );
}

function submitForm() {
  const fd = new FormData();

  Object.entries(form.value).forEach(([key, value]) => {
    fd.append(key, value ?? "");
  });

  fd.append("coverExistingId", selectedCoverId.value || "");
  fd.append(
    "existingOrder",
    JSON.stringify(existingImages.value.map((img) => img.id))
  );
  fd.append("coverIndex", String(coverIndex.value));
  fd.append("deletedImageIds", JSON.stringify(deletedImageIds.value));
  fd.append("heroImageIds", JSON.stringify(heroImageIds.value));

  images.value.forEach((img) => {
    fd.append("images", img);
  });

  // Encode hero flags for newly uploaded images
  isHeroFlags.value.forEach((flag, i) => {
    fd.append(`isHero_${i}`, String(flag));
  });

  emit("submit", fd);
}
</script>
