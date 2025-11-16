<template>
  <div class="min-h-screen flex items-center justify-center bg-[#000C05] text-[#ECEBC7] px-6">
    <div class="w-full max-w-md bg-[#050F0A] border border-[#334036] rounded-xl p-8">
      <h1 class="text-xl tracking-widest font-semibold mb-6 text-center">
        ADMIN LOGIN
      </h1>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="text-xs text-[#ECEBC7]/70">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full rounded-md border border-[#334036]/70 bg-[#000C05] px-3 py-2 text-sm outline-none focus:border-[#ECEBC7]"
            required
          />
        </div>

        <div>
          <label class="text-xs text-[#ECEBC7]/70">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full rounded-md border border-[#334036]/70 bg-[#000C05] px-3 py-2 text-sm outline-none focus:border-[#ECEBC7]"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full py-2 bg-[#336341] hover:bg-[#3f7a4d] transition rounded text-[#ECEBC7] tracking-[0.2em] uppercase"
        >
          Login
        </button>

        <p v-if="errorMessage" class="text-red-400 text-xs mt-2 text-center">
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");
const errorMessage = ref("");

async function handleLogin() {
  try {
    const res = await $fetch("/api/auth/login", {
      method: "POST",
      body: { email: email.value, password: password.value },

      // ⭐ THE ONLY REQUIRED FIX ⭐
      credentials: "include",
    });

    await navigateTo("/admin/projects/new");
  } catch (err: any) {
    errorMessage.value = err?.data?.statusMessage || "Login failed.";
  }
}
</script>