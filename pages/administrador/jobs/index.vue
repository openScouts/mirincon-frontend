<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Estado Cron</titulo>
    </template>
    <hr />
    <div class="card card-accent-primary">
      <v-server-table ref="tabla" :columns="columns" url="/administrador/jobs">
        <template slot="data" slot-scope="props">
          Configuracion Cron: {{ props.row.cron_expression }}
          <br />
          Ultima Corrida : {{ props.row.last_started_at }}
          <br />
          Ultima Falla : {{ props.row.last_failed_at }}
        </template>
        <template slot="falla" slot-scope="props">
          <div v-if="props.row.last_failed_at">Fallo = {{ props.row.last_failed_at }}</div>
        </template>

        <template slot="fecha" slot-scope="props">
          <span> Comienza: {{ props.row.f_inicio | Date }}</span>
          <br />
          <span> Finaliza: {{ props.row.f_fin | Date }}</span>
        </template>
      </v-server-table>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'administrador.permisos' },
  },
  data() {
    return {
      columns: ['name', 'data', 'falla'],
    }
  },
}
</script>
