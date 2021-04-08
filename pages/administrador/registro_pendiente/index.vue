<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Registro de usuarios Pendientes de autorizacion</titulo>
    </template>

    <div class="card card-accent-primary">
      <v-server-table ref="tabla" :columns="columns" url="/administrador/registro_pendiente">
        <template slot="datos" slot-scope="props">
          <dl>
            <dd>Nombre: {{ props.row.nombre }}</dd>
            <dd>Apellido: {{ props.row.apellido }}</dd>
            <dd>Documento: {{ props.row.documento }}</dd>
            <dd>f_nacimiento: {{ props.row.f_nacimiento }}</dd>
            <dd>email: {{ props.row.email }}</dd>
          </dl>
        </template>
        <template slot="organismo" slot-scope="props">
          <dl>
            <dd>zona: {{ props.row.zona }}</dd>
            <dd>distrito: {{ props.row.distrito }}</dd>
            <dd>grupo: {{ props.row.grupo }}</dd>
            <dd>organismo: {{ props.row.organismo }}</dd>
            <dd>funcion: {{ props.row.funcion }}</dd>
          </dl>
        </template>
        <template slot="opciones" slot-scope="props">
          <dl>
            <dd>fecha: {{ props.row.created_at | DateTime }}</dd>
          </dl>
          <router-link
            :to="'/administrador/registro_pendiente/autorizacion/' + props.row.uuid"
            class="btn btn-success btn-sm text-white"
          >
            Procesar
          </router-link>
        </template>
      </v-server-table>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'administrador.usuarios' },
  },
  data() {
    return {
      columns: ['datos', 'organismo', 'opciones'],
    }
  },
  methods: {},
}
</script>

<style scoped>
/* Defino el Ancho de la primer columna */
.VueTables >>> * tr th:nth-child(1) {
  width: 40% !important;
}

.VueTables >>> * tr th:nth-child(2) {
  width: 40% !important;
}
</style>
