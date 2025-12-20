

<template>
  <div
    class="min-h-screen"
    :style="{
      backgroundColor: UI.PAGE_BG,
      color: UI.PAGE_TEXT,
      paddingTop: '10vh',
      paddingBottom: '10vh',
      paddingLeft: '4rem',
      paddingRight: '4rem'
    }"
  >
    <div class="max-w-6xl mx-auto">

      <!-- Header -->
      <div class="flex justify-between items-center mb-6 gap-4">
        <div>
          <h1
            class="font-semibold uppercase tracking-widest"
            :style="{ fontSize: '2rem' }"
          >
            Edit Projects
          </h1>
          <div class="mt-3 flex gap-2 flex-wrap">
            <button
              v-for="opt in FILTERS"
              :key="opt.value ?? 'all'"
              class="px-3 py-1 rounded-full text-xs tracking-widest border transition"
              :class="filter === opt.value ? 'bg-[#336341] border-[#336341]' : 'border-[#2B3B33] bg-transparent'"
              @click="setFilter(opt.value)"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>

        <button
          class="px-6 py-2 rounded tracking-widest transition"
          :style="{ backgroundColor: '#336341' }"
          @click="navigateTo('/admin/projects/new')"
        >
          + Create Project
        </button>
      </div>

      <!-- Table -->
      <div class="border border-[#2B3B33] rounded-lg overflow-hidden">
        <table class="w-full border-collapse">
          <thead class="bg-[#0A1410]">
            <tr class="text-left text-sm tracking-widest">
              <th class="p-4">Title</th>
              <th class="p-4">Destination</th>
              <th class="p-4">Slug</th>
              <th class="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="(project, idx) in projects"
              :key="project.id"
              class="border-t border-[#2B3B33] hover:bg-[#0A1410] transition"
              :class="filter ? 'cursor-move' : 'cursor-default opacity-80'"
              :draggable="Boolean(filter)"
              @dragstart="filter && startDrag(idx)"
              @dragover.prevent
              @drop.prevent="filter && onDrop(idx)"
            >
              <td class="p-4">
                <div class="font-semibold">{{ project.titleEn }}</div>
                <div class="text-sm text-[#ECEBC7]/60">{{ project.titleZh }}</div>
              </td>

              <td class="p-4">
                <select
                  :value="project.destination"
                  @change="onDestinationChange(project, ($event.target as HTMLSelectElement).value)"
                  class="px-3 py-2 rounded border bg-[#0A1410] border-[#2B3B33] text-xs tracking-widest"
                  :style="{
                    color: themeColor(project.destination),
                    backgroundColor: themeColor(project.destination) + '22'
                  }"
                >
                  <option value="landscape">landscape</option>
                  <option value="lighting">lighting</option>
                  <option value="youngArt">youngArt</option>
                </select>
              </td>

              <td class="p-4 text-sm text-[#ECEBC7]/70">
                {{ project.slug }}
              </td>

              <td class="p-4 text-right space-x-4">
                <button
                  class="text-sm tracking-widest hover:underline"
                  @click="editProject(project.id)"
                >
                  Edit
                </button>

                <button
                  class="text-sm tracking-widest text-red-400 hover:underline"
                  @click="deleteProject(project.id)"
                >
                  Delete
                </button>
              </td>
            </tr>

            <tr v-if="projects.length === 0">
              <td colspan="4" class="p-6 text-center text-[#ECEBC7]/60">
                No projects found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

import { ref, onMounted } from 'vue'

const projects = ref<any[]>([])
const filter = ref<string | null>(null)
const draggingIndex = ref<number | null>(null)

const UI = {
  PAGE_BG: '#000C05',
  PAGE_TEXT: '#ECEBC7',
}

const FILTERS = [
  { label: 'All', value: null },
  { label: 'Landscape', value: 'landscape' },
  { label: 'Lighting', value: 'lighting' },
  { label: 'Young Art', value: 'youngArt' },
]

onMounted(async () => {
  await loadProjects()
})

async function loadProjects() {
  const query = filter.value ? `?destination=${filter.value}` : ''
  projects.value = await $fetch(`/api/projects/all${query}`)
}

function setFilter(value: string | null) {
  filter.value = value
  loadProjects()
}

function editProject(id: string) {
  navigateTo(`/admin/projects/${id}/edit`)
}

async function deleteProject(id: string) {
  if (!confirm('Are you sure you want to delete this project?')) return

  await $fetch(`/api/projects/delete`, {
    method: 'POST',
    body: { projectId: id },
  })

  projects.value = projects.value.filter(p => p.id !== id)
}

function themeColor(theme: string) {
  switch (theme) {
    case 'lighting':
      return '#ECEBC7'
    case 'youngArt':
      return '#9A96CC'
    default:
      return '#336341'
  }
}

function startDrag(index: number) {
  draggingIndex.value = index
}

async function onDrop(targetIndex: number) {
  if (draggingIndex.value === null || draggingIndex.value === targetIndex) return

  if (!filter.value) {
    alert('Set a destination filter before reordering. Reordering is per destination.');
    draggingIndex.value = null;
    return;
  }

  const list = [...projects.value]
  const [moved] = list.splice(draggingIndex.value, 1)
  list.splice(targetIndex, 0, moved)
  projects.value = list
  draggingIndex.value = null

  const orderedIds = projects.value.map(p => p.id)
  await $fetch('/api/projects/reorder', {
    method: 'POST',
    body: {
      destination: filter.value,
      orderedIds,
    },
  })
}

async function onDestinationChange(project: any, dest: string) {
  const prev = project.destination;
  project.destination = dest;
  try {
    await $fetch('/api/projects/destination', {
      method: 'POST',
      body: { id: project.id, destination: dest },
    });

    // If a filter is active and the project no longer matches, remove it locally
    if (filter.value && dest !== filter.value) {
      projects.value = projects.value.filter((p) => p.id !== project.id);
    }
  } catch (err) {
    project.destination = prev;
    alert('Failed to update destination.');
  }
}
</script>
