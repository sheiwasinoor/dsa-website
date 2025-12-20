<template>
  <div class="flex flex-col">
    <label class="mb-1 tracking-wider text-sm">{{ label }}</label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="px-3 py-2 bg-[#FFFFFF] border border-[#E0E0E0] rounded text-[#828282] focus:outline-none"
      :required="required"
    />
  </div>
</template>

<script setup>
defineProps({
  label: String,
  modelValue: String,
  required: Boolean,
});
defineEmits(["update:modelValue"]);
</script>