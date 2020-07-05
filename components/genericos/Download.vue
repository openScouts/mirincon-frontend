<template>
  <button v-promise-btn class="btn btn-info btn-sm" @click="descargar()">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: false,
      default: null,
    },
  },
  methods: {
    descargar() {
      return this.$axios({
        url: this.url,
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        const blob = new Blob([response.data], { type: response.headers['content-type'] })
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        if (this.nombre !== null) {
          link.setAttribute('download', this.nombre)
        }
        link.click()
        URL.revokeObjectURL(link.href)
      })
    },
  },
}
</script>
