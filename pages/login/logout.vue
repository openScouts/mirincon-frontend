<template>
  <div class></div>
</template>
<script>
export default {
  layout: 'login',
  middleware: 'guest',
  mounted() {
    this.logout()
  },
  methods: {
    logout() {
      try {
        this.$auth.logout()
      } catch (e) {
        this.formError = e.message
      }
    },
  },
}
</script>
