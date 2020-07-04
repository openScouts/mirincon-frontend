<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Detalle Experiencia</titulo>
    </template>
    <div v-if="contador.length !== 0" class="row">
      <div class="col-md-6 col-sm-4 col-xl-2">
        <!-- START card-->
        <div class="card">
          <div class="card-body text-center" style="cursor: pointer;" title="Ver Todos" @click="getPorEstado(0)">
            <div class="text-lg m-0">{{ total }}</div>
            <p>Total</p>
          </div>
        </div>
        <!-- END card-->
      </div>
      <template v-for="estado in contador">
        <div :key="estado.id" class="col-md-6 col-sm-4 col-xl-2">
          <div
            :class="`card-counter bg-${estado.color} ${estado.color}`"
            :title="'Filtrar por ' + estado.estado"
            style="cursor: pointer;"
            @click="getPorEstado(estado.id)"
          >
            <i :class="`fas ${estado.icono}`"></i>
            <span class="count-numbers">sssssss{{ estado.total }}</span>
            <span class="count-name">{{ estado.estado }}</span>
          </div>
        </div>
      </template>
    </div>

    <div class="card card-accent-primary">
      <div class="card-body">
        <v-server-table ref="tabla" :columns="columns" :options="options" url="/formacion/trabajos/participantes">
          <template slot="rel_persona.apellidoynombre" slot-scope="props">
            <div-persona :persona="props.row.rel_persona" />
          </template>
          <template slot="rel_persona.rel_funciones" slot-scope="props">
            <div-funciones :funciones="props.row.rel_persona.rel_funciones" />
          </template>

          <template slot="opciones" slot-scope="props">
            <btn-persona-ver :uuid="props.row.rel_persona.uuid" />
            <nuxt-link :to="'/main/trabajos/' + props.row.uuid" class="btn btn-primary btn-sm">
              <i class="fas fa-binoculars" />
              Ver
            </nuxt-link>
          </template>
        </v-server-table>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: {
      //  permiso: 'formacion.trabajos',
      //  rol: 'Formador'
    },
  },
  data() {
    return {
      columns: ['rel_persona.apellidoynombre', 'rel_asiganado.apellidoynombre', 'rel_estado.nombre', 'opciones'],
      options: {
        params: {
          trabajo_uuid: this.$route.params.uuid,
          estado: 0,
        },
        headings: {
          'rel_persona.apellidoynombre': 'Nombre',
          'rel_asiganado.apellidoynombre': 'Formador',
          'rel_estado.nombre': 'Estado',
        },
      },
      contador: {},
      total: 0,
    }
  },

  created() {
    this.getContador()
  },
  methods: {
    getContador() {
      this.$axios.get(`/formacion/trabajos/participantes/contador/${this.$route.params.uuid}`).then((response) => {
        this.contador = response.data
        this.contador.forEach((element) => {
          this.total += element.total
        })
      })
    },
    getPorEstado(estadoId) {
      this.options.params.estado = estadoId
      if (estadoId === 0) {
        this.$refs.tabla.filteredQuery = ''
        this.$refs.tabla.query = ''
        // this.$refs.tabla.setFilter(null);
      }
      this.$refs.tabla.refresh()
    },
  },
}
</script>
