<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Trabajos</titulo>
    </template>
    <btn-app to="/formacion/trabajos/listado" icon="fa os-accion-trabajo-list">
      Listado
    </btn-app>
    <btn-app to="/formacion/trabajos/formulario" icon="fa os-accion-trabajo-add">
      Creacion
    </btn-app>
    <hr />
    <b-row>
      <b-col md="12" lg="6">
        <div class="card card-accent-primary">
          <div class="card-header">Mis Trabajos Pendientes de Correccion</div>
          <template v-if="asignado.items.length">
            <b-table
              :items="asignado.items"
              :fields="asignado.fields"
              striped
              hover
              small
              responsive
              stacked="md"
              class="table-sm"
            >
              <template v-slot:cell(detalle)="data">
                <div class="clearfix">
                  <div-persona :persona="data.item.persona"></div-persona>
                </div>
                <div class="pl-2">
                  <div><strong>Experiencia: </strong>{{ data.item.experiencia }}</div>
                  <div>
                    <strong>Estado: </strong>
                    <div-trabajo-participante-estado :estado="data.item.estado" />
                  </div>
                  <div><strong>Fecha Entrega: </strong>{{ data.item.fecha_entrega | Date }}</div>
                </div>
              </template>

              <template v-slot:cell(opciones)="data">
                <nuxt-link :to="'/formacion/trabajos/' + data.item.uuid" class="btn btn-primary btn-sm">
                  <i class="fas fa-binoculars" />
                  Ver
                </nuxt-link>
              </template>
            </b-table>
          </template>
          <template v-else>
            <vacio texto="No tiene trabajos asignados"></vacio>
          </template>
        </div>
      </b-col>
      <b-col md="12" lg="6">
        <div class="card card-accent-primary">
          <div class="card-header">Mis trabajos a Gestionar</div>
          <template v-if="responsable.items.length">
            <b-table
              :items="responsable.items"
              :fields="responsable.fields"
              striped
              hover
              small
              responsive
              stacked="md"
              class="table-sm"
            >
              <template v-slot:cell(entrega_fecha)="data">
                {{ data.item.entrega_fecha | Date }}
              </template>
              <template v-slot:cell(experiencia_fecha)="data">
                {{ data.item.experiencia_fecha | Date }}
              </template>
              <template v-slot:cell(opciones)="data">
                <nuxt-link :to="'/formacion/trabajos/' + data.item.uuid" class="btn btn-primary btn-sm">
                  <i class="fas os-accion-trabajo" />
                  Gestionar
                </nuxt-link>
              </template>
            </b-table>
          </template>
          <template v-else>
            <vacio texto="No tiene trabajos a gestionar"></vacio>
          </template>
        </div>
      </b-col>
    </b-row>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: {
      permiso: 'formacion.trabajos',
    },
  },
  data() {
    return {
      responsable: {
        items: {},
        fields: [
          { label: 'Experiencia', key: 'experiencia' },
          { label: 'Fecha Exp.', key: 'experiencia_fecha' },
          { label: 'Fecha Entrega', key: 'entrega_fecha' },
          { label: 'cantidad', key: 'participantes' },
          { label: 'Estado', key: 'estado' },
          { label: 'Opciones', key: 'opciones' },
        ],
      },
      asignado: {
        items: {},
        fields: [
          { label: 'Detalle', key: 'detalle' },
          { label: 'Opciones', key: 'opciones' },
        ],
      },
    }
  },
  mounted() {
    this.getResponsable()
    this.getAsignado()
  },
  methods: {
    getResponsable() {
      this.$axios.get('/formacion/mis_trabajos/responsable').then((response) => {
        this.responsable.items = response.data.data
      })
    },
    getAsignado() {
      this.$axios.get('/formacion/mis_trabajos/asignado').then((response) => {
        this.asignado.items = response.data.data
      })
    },
  },
}
</script>
