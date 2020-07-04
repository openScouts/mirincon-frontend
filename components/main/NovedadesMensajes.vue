<template>
  <div>
    <div v-for="novedad in novedades" :key="novedad.id">
      <a :href="novedad.link">
        <alerta :tipo="novedad.tipo" to="/sss">
          <h4 class="alert-heading">{{ novedad.titulo }}</h4>
          {{ novedad.detalle }}
        </alerta>
      </a>
    </div>
  </div>
</template>
<style scoped>
a {
  text-decoration: none;
}
</style>
<script>
export default {
  data: () => ({
    novedades: {},
  }),
  mounted() {
    this.getNovedades()
  },
  methods: {
    getNovedades() {
      this.$axios.get('/varios/novedades').then((respuesta) => {
        this.novedades = respuesta.data
      })
    },
  },
}
</script>
