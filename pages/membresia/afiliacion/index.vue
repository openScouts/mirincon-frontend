<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Procesamiento de Afilaiciones</titulo>
    </template>
    <div class="row">
      <div class="col-md-6 col-12">
        <btn-app to="/membresia/afiliacion/cargar" icon="fa fa-upload"> Carga afiliacion</btn-app>
        <btn-app to="/membresia/afiliacion/dni_conflictos" icon="fas fa-user-secret"> Dni Conflictos </btn-app>
      </div>
    </div>
    <br />
    <div class="card card-accent-primary">
      <v-server-table ref="tabla" :columns="columns" url="/persona/afiliacion">
        <template slot="datos" slot-scope="props">
          Usuario : {{ props.row.rel_persona.apellidoynombre }}<br />
          Fecha : {{ props.row.created_at | DateTime }}<br />
          Zona Procesada : {{ props.row.zona_id }}<br />
          Estado : {{ props.row.rel_estado.nombre }}
        </template>
        <template slot="resumen" slot-scope="props">
          <div v-for="(resumen, index) in props.row.resumen" :key="index">
            <template v-if="index !== 'organismos'">
              <span>Documento => {{ index }}</span
              ><br />
              {{ resumen }}
              <hr />
            </template>
          </div>
        </template>
      </v-server-table>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'membresia.afiliacion' },
  },
  data() {
    return {
      columns: ['datos', 'resumen', 'opciones'],
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
  width: 10%;
}
</style>
