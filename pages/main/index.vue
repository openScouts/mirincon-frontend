<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Panel Principal</titulo>
    </template>
    <novedades></novedades>
    <b-row>
      <b-col md="12" lg="4">
        <btn-app to="/main/eventos" tipo="info" icon="fa os-accion-evento">Inscripciones</btn-app>
        <btn-app to="/main/miformacion" tipo="warning" icon="fa os-area-ams">Mi Formación</btn-app>
        <btn-app to="/main/trabajos" tipo="secondary" icon="fa os-accion-trabajo">Trabajos</btn-app>
        <template v-if="user.is.formador">
          <br />
          <br />
          <br />
          <h3>Menu de Formadores</h3>
          <hr />
          <btn-app to="/formacion/trabajos" tipo="info" icon="fa os-accion-trabajo-list">Trabajos</btn-app>
          <btn-app to="/formacion/experiencias" tipo="info" icon="fa os-area-ams">Experiencias</btn-app>
          <btn-app to="/eventos/administracion" tipo="info" icon="fa os-accion-evento-list">
            Eventos
          </btn-app>
        </template>
      </b-col>
      <b-col v-if="!user.is.nacion" md="12" lg="8" class="contenedorDerecho">
        <div id="cumpleanios" class="card card-accent-primary">
          <div class="card-header">Cumpleaños Cercanos</div>
          <b-table striped hover small responsive stacked="md" :items="grid.items" :fields="grid.fields">
            <template v-slot:cell(apellidoynombre)="data">
              <template v-if="grid.items.length < 15">
                <div-persona :persona="data.item" />
              </template>
              <template v-else>{{ data.item.apellidoynombre }}</template>
            </template>
            <template v-slot:cell(funciones)="data">
              <div-funciones :funciones="data.value" />
            </template>
            <template v-slot:cell(cumpleanios)="data">{{ data.value }}</template>
          </b-table>
        </div>
      </b-col>
    </b-row>
  </ContentWrapper>
</template>
<style scoped>
@media (max-width: 960px) {
  .contenedorDerecho {
    margin-top: 20px;
  }
}
</style>
<script>
import Novedades from '@/components/main/NovedadesMensajes'
export default {
  components: { Novedades },
  data() {
    return {
      grid: {
        fields: [
          {
            label: 'Datos',
            key: 'apellidoynombre',
          },
          {
            label: 'Funciones',
            key: 'funciones',
          },
          {
            label: 'Cumple',
            key: 'cumple',
            variant: 'info',
          },
          {
            label: 'Fecha',
            key: 'cumpleanios',
          },
        ],
        items: [],
      },
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$axios.get('/persona/personas/cumpleanios').then((response) => {
        this.grid.items = response.data.data
      })
    },
  },
  head() {
    return {
      titleTemplate: 'Panel de Control - %s ',
    }
  },
}
</script>
