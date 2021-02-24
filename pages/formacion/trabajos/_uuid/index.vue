<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>
        Detalle Experiencia
        <template slot="subtitulo">
          Experiencia: {{ trabajoDetalle.experiencia }}, dictado el {{ trabajoDetalle.experiencia_fecha | Date }} <br />
          Responsable : {{ trabajoDetalle.responsable }} | Fecha Entrega : {{ trabajoDetalle.f_entrega | Date }}
        </template>
        <template slot="acciones">
          <nuxt-link :to="`/formacion/trabajos/${$route.params.uuid}/responsables`" class="btn btn-info btn-sm">
            Delegar
          </nuxt-link>
          <b-button size="sm" @click="$refs.modalGestionar.showModal()">Gestionar</b-button>
        </template>
      </titulo>
    </template>
    <div v-if="contador.length !== 0" class="row">
      <div class="col-md-6 col-sm-4 col-xl-2">
        <!-- START card-->
        <div class="card-counter" style="cursor: pointer" title="Ver Todos" @click="getPorEstado(0)">
          <i class="fas fa-database"></i>
          <span class="count-numbers">{{ total }}</span>
          <span class="count-name">Total</span>
        </div>

        <!-- END card-->
      </div>
      <template v-for="(estado, index) in contador">
        <div :key="index" class="col-md-6 col-sm-4 col-xl-2">
          <!-- START card-->
          <div
            :class="`card-counter text-white bg-${estado.color}`"
            :title="'Filtrar por ' + estado.estado"
            style="cursor: pointer"
            @click="getPorEstado(estado.id)"
          >
            <i :class="`fas ${estado.icono}`"></i>
            <span class="count-numbers">{{ estado.total }}</span>
            <span class="count-name">{{ estado.estado }}</span>
          </div>
          <!-- END card-->
        </div>
      </template>
    </div>
    <br />
    <button class="btn btn-primary" @click="solosMisTrabajos()">
      <template v-if="options.params.mis_asignados">
        <i class="fas fa-undo-alt"></i>
        Ver todos los Trabajos
      </template>
      <template v-else>
        <i class="fas fa-filter"></i>
        Ver solamente mis trabajos
      </template>
    </button>
    <hr />
    <div class="card card-accent-primary">
      <div class="card-body">
        <v-server-table
          ref="tabla"
          :columns="columns"
          :options="options"
          :url="'/formacion/trabajos/' + $route.params.uuid + '/participantes'"
        >
          <template slot="persona" slot-scope="props">
            <div-persona :persona="props.row.persona" />
          </template>
          <template slot="rama" slot-scope="props">
            <div-rama :rama="props.row.rama" />
          </template>
          <template slot="ultima_entraga" slot-scope="props">
            {{ props.row.ultima_entraga | Date }}
          </template>
          <template slot="estado" slot-scope="props">
            <div-trabajo-participante-estado :estado="props.row.estado" />
          </template>
          <template slot="opciones" slot-scope="props">
            <btn-persona-ver :uuid="props.row.persona.uuid" />
            <nuxt-link
              :to="'/formacion/trabajos/' + $route.params.uuid + '/participante/' + props.row.uuid"
              class="btn btn-primary btn-sm"
            >
              <i class="fas fa-binoculars" />
              Ver
            </nuxt-link>
          </template>
        </v-server-table>
      </div>
      <GestionarTP ref="modalGestionar" :trabajo="trabajoDetalle"></GestionarTP>
    </div>
  </ContentWrapper>
</template>

<script>
import GestionarTP from '@/components/formacion/trabajos/gestionarTpModal'
export default {
  components: {
    GestionarTP,
  },
  meta: {
    auth: {
      permiso: 'formacion.trabajos',
    },
  },
  data() {
    return {
      trabajoDetalle: {},
      columns: ['persona', 'asignado', 'rama', 'ultima_entraga', 'estado', 'opciones'],
      options: {
        params: {
          estado: 0,
          mis_asignados: false,
        },
        headings: {
          asignado: 'Formador',
          ultima_entraga: 'Ultima Entrega',
        },
      },
      contador: {},
      total: 0,
    }
  },

  created() {
    this.getContador()
    this.getDetalleTrabajo()
  },
  methods: {
    solosMisTrabajos() {
      // cambio entre verdadeto y falso en cada click y recaro la busqueda de la tabla
      this.options.params.mis_asignados = !this.options.params.mis_asignados
      this.getPorEstado(0)
    },
    getContador() {
      this.$axios.get(`/formacion/trabajos/${this.$route.params.uuid}/participantes/contador`).then((response) => {
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
      }
      this.$refs.tabla.refresh()
    },
    getDetalleTrabajo() {
      this.$axios.get(`formacion/trabajos/${this.$route.params.uuid}`).then((response) => {
        this.trabajoDetalle = response.data.data
      })
    },
  },
}
</script>
