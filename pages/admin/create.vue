<template>
  <div class="min-h-screen bg-[#000C05] text-[#ECEBC7] py-20 px-6">
    <div class="max-w-3xl mx-auto text-center">

      <!-- Page Title -->
      <h1 class="text-3xl font-semibold tracking-[0.2em] uppercase mb-10">
        Create New Content
      </h1>

      <p class="text-[#ECEBC7]/70 mb-12 tracking-wider">
        Choose the type of content you want to create.
      </p>

      <!-- OPTIONS GRID -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10">

        <!-- PROJECT CREATOR -->
        <div
          @click="goTo('/admin/projects/new')"
          class="cursor-pointer rounded-xl border border-[#334036]/70 bg-[#050F0A] p-10 hover:border-[#ECEBC7] hover:bg-[#0a1a14] transition"
        >
          <h2 class="text-xl tracking-widest font-semibold mb-3">
            Project
          </h2>

          <p class="text-sm text-[#ECEBC7]/70 leading-relaxed">
            Create a new Landscape, Lighting, or Young Art project.
            Includes images, categories, descriptions, and metadata.
          </p>

          <div class="mt-6 text-[#336341] hover:text-[#3f7a4d] font-semibold tracking-widest">
            → Create Project
          </div>
        </div>

        <!-- NEWS CREATOR -->
        <div
          @click="goTo('/admin/news/new')"
          class="cursor-pointer rounded-xl border border-[#334036]/70 bg-[#050F0A] p-10 hover:border-[#ECEBC7] hover:bg-[#0a1a14] transition"
        >
          <h2 class="text-xl tracking-widest font-semibold mb-3">
            News Post
          </h2>

          <p class="text-sm text-[#ECEBC7]/70 leading-relaxed">
            Publish articles for the Young News section, including title,
            body content, image thumbnail, and publish status.
          </p>

          <div class="mt-6 text-[#336341] hover:text-[#3f7a4d] font-semibold tracking-widest">
            → Create News
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
function goTo(path: string) {
  navigateTo(path);
}

definePageMeta({
  middleware: "auth",
});
</script>