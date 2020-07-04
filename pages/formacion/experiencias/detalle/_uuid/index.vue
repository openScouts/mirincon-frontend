<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo v-if="curso.organismo">
        Detalle Experiencia
        <br />
        <small>{{ curso.nombre }} - Fecha {{ curso.fecha | Date }}</small>
        <br />
        <small>Responsable: {{ curso.responsable }} - Organismo: {{ curso.organismo.full }}</small>
        <template slot="acciones">
          <template v-if="puedeEditar()">
            <b-dropdown text="Acciones" variant="success" size="sm">
              <b-dropdown-item :to="`/formacion/experiencias/detalle/${$route.params.uuid}/edicion_masiva`"
                >Edicion Masiva</b-dropdown-item
              >
            </b-dropdown>
          </template>
        </template>
      </titulo>
    </template>
    <div v-if="contador.length !== 0" class="row">
      <div class="col-md-6 col-sm-4 col-xl-2">
        <!-- START card-->
        <div class="card-counter" style="cursor: pointer;" title="Ver Todos" @click="getPorEstado(0)">
          <i class="fas fa-database"></i>
          <span class="count-numbers">{{ total }}</span>
          <span class="count-name">Total</span>
        </div>
        <!-- END card-->
      </div>
      <template v-for="estado in contador">
        <div :key="estado.id" class="col-md-6 col-sm-4 col-xl-2">
          <div
            :class="`card-counter text-white bg-${estado.color}`"
            :title="'Filtrar por ' + estado.estado"
            style="cursor: pointer;"
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
    <div class="card card-accent-primary">
      <v-server-table ref="tabla" :columns="columns" :options="options" url="/formacion/participantes">
        <template slot="datos" slot-scope="props">
          <div-persona :persona="props.row.persona" />
        </template>
        <template slot="funciones" slot-scope="props">
          <div-funciones :funciones="props.row.persona.funciones" />
        </template>
        <template slot="detalle" slot-scope="props">
          <div-experiencia-estado :estado="props.row.estado">
            <strong>Estado:</strong>
          </div-experiencia-estado>
          <div-rama v-if="curso.solicita_rama" :rama="props.row.rama">
            <strong>Rama:</strong>
          </div-rama>
          <div v-if="props.row.libro_folio !== ''">
            <strong>Libro y Folio:</strong>
            {{ props.row.libro_folio }}
          </div>
          <!-- libro y folio -->
        </template>

        <template slot="acciones" slot-scope="props">
          <template v-if="puedeEditar()">
            <btn-persona-ver :uuid="props.row.persona.uuid" />
            <button title="Editar" class="btn-warning btn btn-sm" @click="$refs.modalEditar.open(props.row)">
              <i class="fas fa-edit" />
            </button>
          </template>
          <template v-for="uuid in props.row.trabajo_uuid">
            <nuxt-link
              :key="uuid"
              :to="'/formacion/trabajos/detalle/participante/' + uuid"
              class="btn-success btn btn-sm"
              title="Ver Trabajo Practico"
            >
              <i class="icon fa fa-briefcase"></i>
            </nuxt-link>
          </template>
        </template>
      </v-server-table>
    </div>
    <modal-editar ref="modalEditar" :curso="curso" :get-contador="getContador" @recargarDatos="recargar" />
  </ContentWrapper>
</template>

<style scoped>
/* Defino el Ancho de la primer columna*/
.VueTables >>> * tr th:nth-child(1) {
  width: 35%;
}

.VueTables >>> * tr th:nth-child(2) {
  width: 35%;
}

.VueTables >>> * tr th:nth-child(3) {
  width: 20%;
}

.VueTables >>> * tr th:nth-child(4) {
  width: 10%;
}
</style>

<script>
import Vue from 'vue'
import modalEditar from '@/components/formacion/experiencia/modalEditarEstadoCursante'

Vue.component('modal-editar', modalEditar)
export default {
  meta: {
    auth: {
      permiso: 'formacion.experiencias',
    },
  },
  data() {
    return {
      // 'rama', 'estado', 'libro_folio'
      columns: ['datos', 'funciones', 'detalle', 'acciones'],
      options: {
        params: {
          curso_uuid: this.$route.params.uuid,
          estado: 0,
        },
        headings: {
          libro_folio: 'Libro y Folio',
        },
      },
      curso: {},
      contador: {},
      total: 0,
    }
  },
  created() {
    if (this.$_.size(this.$route.query) !== 0) {
      this.options.params.estado = this.$route.query.estado
    }
    this.getCurso()
    this.getContador()
  },
  methods: {
    recargar() {
      console.log('Se llamo a la recarga de Datos')
      this.$refs.tabla.refresh()
      this.getContador()
    },
    puedeEditar() {
      return this.$can('formacion.experiencias.abm')
    },
    getCurso() {
      this.$axios.get(`/formacion/cursos/${this.$route.params.uuid}`).then((response) => {
        this.curso = response.data.data
      })
    },
    getContador() {
      this.total = 0
      this.$axios.get(`/formacion/participantes/contador/${this.$route.params.uuid}`).then((response) => {
        this.contador = response.data
        this.contador.forEach((element) => {
          this.total += element.total
        })
      })
    },
    getPorEstado(estadoId) {
      this.options.params.estado = estadoId
      this.$router.push({ query: {} })
      this.$router.push({ query: { estado: this.options.params.estado } })
      if (estadoId === 0) {
        this.$refs.tabla.query = ''
      }
      this.$refs.tabla.refresh()
    },
  },
}
</script>
