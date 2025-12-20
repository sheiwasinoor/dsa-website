<template>
  <div class="flex flex-col">
    <label class="mb-1 tracking-wider text-sm">{{ label }}</label>
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      rows="4"
      class="px-3 py-2 bg-[#FFFFFF] border border-[#E0E0E0] rounded text-[#828282] focus:outline-none"
    />
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: String,
});
defineEmits(["update:modelValue"]);
</script>