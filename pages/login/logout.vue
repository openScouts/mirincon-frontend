<template>
  <div class></div>
</template>
<script>
export default {
  middleware: 'guest',
  layout: 'login',
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
