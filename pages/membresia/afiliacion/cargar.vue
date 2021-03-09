<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo><span class="fas os-saac-isologo" /> Carga de Afiliaciones</titulo>
    </template>
    <div class="row">
      <div class="col-12">
        <b-form-file
          id="afiliacion"
          ref="fileinput"
          v-model="afiliacion"
          accept=".csv"
          placeholder="Subir Nuevo archivo de afiliacion"
          browse-text="Buscar"
        />
        <error input="afiliacion" />
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'membresia.afiliacion.abm' },
  },
  data() {
    return {
      afiliacion: null,
    }
  },
  watch: {
    afiliacion() {
      this.subirAfiliacion()
    },
  },
  methods: {
    subirAfiliacion() {
      const data = new FormData()
      data.append('afiliacion', document.getElementById('afiliacion').files[0])
      this.$axios.post('/persona/afiliacion/procesar', data).then(() => {
        // this.$refs.fileinput.reset()
        this.$router.replace('/membresia/afiliacion/')
      })
    },
  },
}
</script>
