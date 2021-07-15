<template>
  <div class="card card-accent-primary">
    <div class="card-body">
      <div class="tab-container">
        <b-nav class="nav-tabs" fill>
          <b-nav-item :active="tab === 1" @click="tabs(1, 'inscriptos')"> Inscriptos </b-nav-item>
          <b-nav-item :active="tab === 2" @click="tabs(2, 'bajas')"> Bajas </b-nav-item>
        </b-nav>
      </div>
      <v-server-table ref="tabla" :columns="columns" :options="options" url="/eventos/inscriptos">
        <template #afterFilter>
          <download-excel
            :fetch="fetchDataExport"
            :before-generate="startDownload"
            :before-finish="finishDownload"
            :fields="xls_campos"
            :name="$moment(evento.evento_fin).format('YYYYMMDD') + ' - ' + evento.evento + '.xls'"
            class="btn btn-success m-2 mt-4"
          >
            Exportar Inscriptos
          </download-excel>
        </template>
        <template slot="persona.apellidoynombre" slot-scope="props">
          <div-persona :persona="props.row.persona" />
        </template>
        <template slot="funciones" slot-scope="props">
          <div-funciones :funciones="props.row.persona.funciones" />
        </template>
        <template slot="rama" slot-scope="props">
          <div-rama :rama="props.row.rama" />
        </template>
        <template slot="dieta" slot-scope="props">
          <template v-if="props.row.persona.datos">
            {{ props.row.persona.datos.alimentacion_especial_detalle }}
          </template>
        </template>

        <template v-if="!user.is.soloformador" slot="opciones" slot-scope="props">
          <btn-persona-ver :uuid="props.row.persona.uuid" />
          <!-- VALIDAR QUE SEA DUEñO DEL EVENTO !!!-->
          <template v-if="evento.soy_propietario">
            <button
              v-if="tab === 1"
              :key="props.row.persona.uuid"
              v-promise-btn
              title="Dar de baja del Evento"
              class="btn btn-danger btn-sm"
              @click="darDeBajaInscripto(props.row.uuid)"
            >
              <i class="fas fa-thumbs-down" />
            </button>
            <button
              v-else
              :key="props.row.persona.uuid"
              v-promise-btn
              class="btn btn-success btn-sm"
              title="Dar de alta del Evento"
              @click="darDeAltaInscripto(props.row.persona.uuid)"
            >
              <i class="fas fa-thumbs-up" />
            </button>
            <b-button
              v-if="evento.rama_obligatorio"
              v-promise-btn
              class="btn btn-warning btn-sm"
              title="Cambiar Rama"
              @click="cambiarRamaModal(props.row.uuid)"
            >
              <i class="fas fa-retweet"></i>
            </b-button>
          </template>
        </template>
      </v-server-table>
    </div>

    <b-modal id="modal" ref="myModalRef" title="Cambiar Rama" centered hide-footer>
      <div class="row">
        <div class="col-12 p-2">
          <select-ramas v-model="form.rama"></select-ramas>
        </div>
      </div>
      <button v-promise-btn class="btn-block btn btn-success" @click="cambiarRama()">Cambiar Rama</button>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    evento: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      form: {},
      tab: 1,
      columns: [],
      options: {
        params: {
          tipo: 'inscriptos',
          evento_uuid: this.evento.uuid,
        },
        headings: {
          'persona.apellidoynombre': 'Datos',
          'persona.categoria': 'Categoria',
          'persona.datos.alimentacion_especial_detalle': 'Dieta',
        },
      },
      xls_campos: {
        organismo: {
          field: 'persona.funciones',
          callback: (value) => {
            let out = ''
            try {
              value.forEach((element) => {
                out = out + element.organismo_full + ' <br/>'
              })
            } catch (e) {
              out = ''
            }
            return out
          },
        },
        funciones: {
          field: 'persona.funciones',
          callback: (value) => {
            let out = ''
            try {
              value.forEach((element) => {
                out = out + element.organismo_full + ' - ' + element.funcion + ' <br/>'
              })
            } catch (e) {
              return out
            }
            return out
          },
        },
        Documento: 'persona.documento',
        Nacimiento: {
          field: 'persona.nacimiento',
          callback: (value) => {
            return this.$moment(value).format('DD/MM/YYYY')
          },
        },
        Nombre: 'persona.apellidoynombre',
        Categoria: 'persona.categoria',
        rama: {
          field: 'rama',
          callback: (value) => {
            const out = this.$getRama(value)
            return out.texto
          },
        },
        dieta: 'persona.datos.alimentacion_especial_detalle',
        email: 'persona.datos.email',
        celular: 'persona.datos.celular',
        fecha_inscripcion: {
          field: 'f_inscripcion',
          callback: (value) => {
            return this.$moment(value).format('DD/MM/YYYY H:mm')
          },
        },
      },
    }
  },
  mounted() {
    if (this.requiere_rama) {
      this.columns = ['persona.apellidoynombre', 'funciones', 'persona.categoria', 'rama', 'dieta', 'opciones']
    } else {
      this.columns = ['persona.apellidoynombre', 'funciones', 'persona.categoria', 'dieta', 'opciones']
    }
  },
  methods: {
    /** **********************************************************************************************
     * Admiinistracion de Tabas
     ************************************************************************************************ */
    tabs(tab, texto) {
      this.tab = tab
      this.options.params.tipo = texto
      this.$refs.tabla.data = [] // Vacio la tabla, queda mas lindo
      this.$refs.tabla.loading = true // Muestro mensaje Cargando
      this.$refs.tabla.refresh() // Obtengo todos los datos
    },

    /** **********************************************************************************************
     * Manejo el Boton Download !!
     ************************************************************************************************ */
    fetchDataExport() {
      return this.$axios
        .get('/eventos/inscriptos', {
          params: {
            evento_uuid: this.evento.uuid,
            tipo: this.options.params.tipo,
            page: 1,
            limit: 9999,
          },
        })
        .then((response) => {
          return response.data.data
        })
    },

    startDownload() {
      this.$noti('Se esta generando la exportacion, Aguarde !')
    },
    finishDownload() {},
    cambiarRamaModal(uuid) {
      this.form.uuid = uuid
      this.form.rama = ''
      this.$refs.myModalRef.show()
    },
    cambiarRama() {
      return this.$axios.post(`/eventos/inscriptos/cambiar_rama`, this.form).then(() => {
        this.form = {}
        this.$refs.tabla.refresh()
        this.$refs.myModalRef.hide()
      })
    },

    /** **********************************************************************************************
     * Cambio de estado de Inscriptos
     ************************************************************************************************ */
    darDeBajaInscripto(uuid) {
      //
      return this.$swal
        .fire({
          title: 'Generacion de baja',
          text: 'Esta seguro de generar la baja ?',
          type: 'warning',
          showCancelButton: true,
        })
        .then((result) => {
          if (result.value) {
            return this.$axios.delete('/eventos/inscriptos', { params: { inscripto_uuid: uuid } }).then(() => {
              this.$refs.tabla.refresh()
            })
          } else {
            return this.$swal.fire('Cancelo la baja')
          }
        })
    },
    darDeAltaInscripto(personaUuid) {
      return this.$axios
        .post('/eventos/inscriptos', {
          persona_uuid: personaUuid,
          evento_uuid: this.evento.uuid,
        })
        .then(() => {
          this.$refs.tabla.refresh()
        })
    },
    /** ********************************************************************************************* */
  },
}
</script>

<style scoped>
/* Defino el Ancho de la primer columna */
.VueTables >>> * tr th:nth-child(1) {
  width: 30%;
}

.VueTables >>> * tr th:nth-child(2) {
  width: 35%;
}

.VueTables >>> * tr th:nth-child(3) {
  width: 12%;
}
.VueTables >>> * tr th:nth-child(4) {
  width: 13%;
}
.VueTables >>> * tr th:nth-child(5) {
  width: 10%;
}
</style>
