<template>
  <div v-if="$errors.has(input)" class="text-danger">{{ $errors.first(input) }}</div>
</template>
<script>
export default {
  props: {
    input: {
      type: String,
      required: true,
    },
  },
}
</script>
