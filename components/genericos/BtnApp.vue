<template>
  <nuxt-link :class="`btn btn-app btn-${tipo} text-white`" :to="to">
    <span :class="icon" class="icon fa-2x" />
    <slot />
  </nuxt-link>
</template>
<style ang="sass" scoped>
.btn-app {
  display: block;
  width: 100%;
  margin: 2px;
  font-size: 12px;
  text-align: center;
  border-radius: 2px;
}
.btn-app:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
@media (min-width: 960px) {
  .btn-app {
    display: inline-block;
    width: auto;
    min-width: 100px;
    padding: 10px;
  }
  .btn-app > span {
    font-size: 20px;
    display: block;
  }
}
</style>
<script>
export default {
  props: {
    icon: {
      required: true,
      type: String,
    },
    to: {
      required: true,
      type: String,
    },
    tipo: {
      required: false,
      type: String,
      default: 'primary',
    },
  },
}
</script>
