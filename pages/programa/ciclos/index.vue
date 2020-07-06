<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Gestion de Ciclos de Programa</titulo>
    </template>
    <btn-app v-if="$can('programa.ciclos.abm')" to="/programa/ciclos/formulario" icon="fa fa-sync-alt">
      Cargar Ciclo
    </btn-app>
    <hr />
    <div class="card card-accent-primary">
      <v-server-table ref="tabla" :columns="columns" :options="options" url="/programa/ciclos">
        <template slot="organismos" slot-scope="props">
          {{ props.row.full }}
        </template>
        <template slot="rama" slot-scope="props">
          <div-rama :rama="props.row.rama"></div-rama>
        </template>

        <template slot="fecha" slot-scope="props">
          <span> Comienza: {{ props.row.f_desde | Date }}</span>
          <br />
          <span> Finaliza: {{ props.row.f_hasta | Date }}</span>
        </template>

        <template slot="opciones" slot-scope="props">
          <download title="Borrar" :url="'/programa/descargar/' + props.row.uuid">
            <i class="fas fa-file-pdf" /> Descargar
          </download>
        </template>
      </v-server-table>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'programa.ciclos' },
  },
  data() {
    return {
      columns: ['organismos', 'rama', 'fecha', 'opciones'],
      options: {
        filterable: false,
        params: {
          query: '',
        },
      },
    }
  },
}
</script>
