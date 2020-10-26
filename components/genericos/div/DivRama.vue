<template>
  <div>
    <slot />
    <span :class="'text-' + valor.color">{{ valor.texto }}</span>
  </div>
</template>

<script>
export default {
  name: 'DivRama',
  props: {
    rama: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    valor() {
      return this.$getRama(this.rama)
    },
  },
}
</script>
