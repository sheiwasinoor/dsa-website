<template>
  <div class="min-h-screen bg-[#000C05] text-[#ECEBC7] py-14 px-6">
    <div class="max-w-4xl mx-auto">

      <h1 class="text-3xl font-semibold mb-10 tracking-widest">
        EDIT PROJECT
      </h1>

      <!-- Loading -->
      <p v-if="loading" class="text-[#ECEBC7]/60">
        Loading project…
      </p>

      <!-- Error -->
      <p v-if="error" class="text-red-400">
        {{ error }}
      </p>

      <p v-if="success" class="text-green-400 mt-4">
        Project updated successfully.
      </p>

      <!-- Form -->
      <ProjectForm
        v-if="project && !loading"
        mode="edit"
        :initialData="project"
        @submit="handleUpdate"
      />

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import ProjectForm from "~/components/admin/ProjectForm.vue";

definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const router = useRouter();

const project = ref<any>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const success = ref(false);

// Fetch project for editing
onMounted(async () => {
  try {
    loading.value = true;

    const id = route.params.id;
    if (!id) {
      throw new Error("Missing project ID");
    }

    const data = await $fetch(`/api/projects/${id}`, {
      method: "GET",
    });

    project.value = data;
  } catch (err: any) {
    console.error(err);
    error.value = "Failed to load project.";
  } finally {
    loading.value = false;
  }
});

// Handle update submission
async function handleUpdate(formData: FormData) {
  success.value = false;
  try {
    await $fetch(`/api/projects/${route.params.id}`, {
      method: "PUT",
      body: formData,
    });

    success.value = true;

    // Go back to admin list after save
    router.push("/admin/projects");
  } catch (err) {
    console.error(err);
    alert("Failed to update project.");
  }
}
</script>