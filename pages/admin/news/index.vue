<template>
  <div class="min-h-screen bg-[#000C05] text-[#ECEBC7] py-14 px-6">
    <div class="max-w-5xl mx-auto">

      <!-- HEADER -->
      <div class="flex items-center justify-between mb-10">
        <h1 class="text-2xl font-semibold tracking-[0.18em] uppercase">
          News Posts
        </h1>

      </div>

      <p class="text-xs text-[#ECEBC7]/60 mb-3">
        Drag and drop rows to change the order.
      </p>

      <!-- TABLE -->
      <div class="overflow-x-auto rounded-xl border border-[#334036]/40 bg-[#050F0A]">
        <table class="w-full text-sm">
          <thead class="bg-[#0A1912] text-[#ECEBC7]/70 uppercase tracking-widest text-xs">
            <tr>
              <th class="p-3 text-left">Order</th>
              <th class="p-3 text-left">Image</th>
              <th class="p-3 text-left">Title (EN)</th>
              <th class="p-3 text-left">Slug</th>
              <th class="p-3 text-left">Status</th>
              <th class="p-3 text-left">Created</th>
              <th class="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(post, idx) in news"
              :key="post.id"
              class="border-t border-[#334036]/30 hover:bg-[#0A1912] cursor-move"
              draggable="true"
              @dragstart="startDrag(idx)"
              @dragover.prevent
              @drop.prevent="onDrop(idx)"
            >
              <td class="p-3 text-[#ECEBC7]/50 select-none">⋮⋮</td>
              <td class="p-3">
                <img
                  v-if="post.imageUrl"
                  :src="post.imageUrl"
                  class="w-20 h-14 object-cover rounded border border-[#334036]/40"
                />
                <span v-else class="text-xs text-[#ECEBC7]/40">No Image</span>
              </td>

              <td class="p-3 font-medium">
                {{ post.titleEn }}
              </td>

              <td class="p-3 text-[#ECEBC7]/60">
                {{ post.slug }}
              </td>

              <td class="p-3">
                <span
                  :class="post.published ? 'text-green-300' : 'text-yellow-300'"
                  class="text-xs tracking-wider"
                >
                  {{ post.published ? 'Published' : 'Draft' }}
                </span>
              </td>

              <td class="p-3 text-[#ECEBC7]/50">
                {{ formatDate(post.createdAt) }}
              </td>

              <td class="p-3 text-right space-x-3">
                <NuxtLink
                  :to="`/admin/news/edit/${post.id}`"
                  class="text-blue-300 hover:text-blue-200 text-xs"
                >
                  Edit
                </NuxtLink>

                <button
                  @click="deletePost(post.id)"
                  class="text-red-400 hover:text-red-300 text-xs"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- EMPTY -->
      <p
        v-if="news.length === 0"
        class="text-center text-[#ECEBC7]/60 mt-10 tracking-wider"
      >
        No news posts yet.
      </p>

      <p v-if="orderError" class="text-red-400 text-sm mt-4">
        {{ orderError }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// All posts
const news = ref<any[]>([]);
const draggingIndex = ref<number | null>(null);
const orderError = ref("");

// Format date
function formatDate(dateString: string) {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

async function loadNews() {
  news.value = await $fetch("/api/news/list");
}

async function deletePost(id: string) {
  if (!confirm("Delete this post?")) return;

  try {
    await $fetch(`/api/news/delete?id=${id}`, {
      method: "DELETE",
    });

    // Remove deleted item locally
    news.value = news.value.filter((p) => p.id !== id);
  } catch (err) {
    alert("Failed to delete post.");
  }
}

onMounted(() => {
  loadNews();
});

definePageMeta({
  middleware: "auth",
});

function startDrag(index: number) {
  draggingIndex.value = index;
}

async function onDrop(targetIndex: number) {
  if (draggingIndex.value === null || draggingIndex.value === targetIndex) return;

  const list = [...news.value];
  const [moved] = list.splice(draggingIndex.value, 1);
  list.splice(targetIndex, 0, moved);
  news.value = list;
  draggingIndex.value = null;

  orderError.value = "";
  try {
    await $fetch("/api/news/reorder", {
      method: "POST",
      body: {
        orderedIds: news.value.map((p) => p.id),
      },
    });
  } catch (err: any) {
    orderError.value =
      err?.data?.statusMessage || "Failed to save new order.";
  }
}
</script>
