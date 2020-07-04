<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Crear Nuevo Lugar</titulo>
    </template>
    <div class="card card-accent-primary">
      <div class="card-body">
        <div class="row" />
      </div>
    </div>
  </ContentWrapper>
</template>

<!-- MOSTRAR LISTADO EVNETOS RELACIONADOS EN EL LUGAR !! .. jaja .. no se como va a salir.. -->
<script>
export default {
  meta: {
    auth: { permiso: 'eventos.lugares' },
  },
  data() {
    return {
      data: [],
    }
  },
  created() {
    this.getExperiencias()
  },
  methods: {
    getExperiencias() {
      this.$axios.get('/formacion/experiencias/listado').then((response) => {
        this.data = response.data
      })
    },
  },
}
</script>
