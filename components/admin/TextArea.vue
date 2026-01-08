<template>
  <div class="flex flex-col">
    <label class="mb-1 tracking-wider text-sm">{{ label }}</label>
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :rows="rows"
      class="px-3 py-2 bg-[#FFFFFF] border border-[#E0E0E0] rounded text-[#828282] focus:outline-none"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup>
defineOptions({ inheritAttrs: false });

defineProps({
  label: String,
  modelValue: {
    type: String,
    default: "",
  },
  rows: {
    type: [Number, String],
    default: 4,
  },
});

defineEmits(["update:modelValue"]);
</script>
