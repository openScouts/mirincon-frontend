<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Personas con conflictos de DNI</titulo>
    </template>
    <div class="card card-accent-primary">
      <v-server-table ref="tabla" :columns="columns" :options="options" url="/persona/personas/dni">
        <template slot="datos" slot-scope="props">
          <div-persona :persona="props.row" />
        </template>
        <template slot="funciones" slot-scope="props">
          <div-funciones :funciones="props.row.funciones" />
        </template>
        <template slot="opciones" slot-scope="props">
          <btn-persona-ver :uuid="props.row.uuid" />
        </template>
      </v-server-table>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: {
      permiso: 'membresia.afiliacion',
    },
  },
  data() {
    return {
      columns: ['datos', 'funciones', 'error', 'opciones'],
    }
  },
}
</script>

<style scoped>
/* Defino el Ancho de la primer columna */
.VueTables >>> * tr th:nth-child(1) {
  width: 25%;
}

.VueTables >>> * tr th:nth-child(3) {
  width: 20%;
}

.VueTables >>> * tr th:nth-child(5) {
  width: 10%;
}
</style>
