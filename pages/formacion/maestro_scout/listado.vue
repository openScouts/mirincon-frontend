<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo> <span class="fas os-accion-im" />Listado de Insignias de Madera </titulo>
    </template>
    <div class="card card-accent-primary">
      <div class="card-body">
        <b-row>
          <b-col sm="12" lg="3" class="mb-0">
            <b-form-group label="Ingrese un parametro de busqueda" class="mb-0">
              <b-form-input
                v-model="options.params.query"
                size="sm"
                name="documento"
                placeholder="Nombre o Documento"
              />
            </b-form-group>
          </b-col>
          <!--
          <b-col sm="12" lg="3" class="mb-0">
            <b-form-group label="Estado de la IM" class="mb-0">
              <b-form-select v-model="options.params.estado" size="sm" class="mb-3">
                <option value selected>Todas</option>
                <option value="vigentes">Vigentes</option>
                <option value="vencidas">Vencidas</option>
              </b-form-select>
            </b-form-group>
          </b-col>
          -->
          <b-col sm="12" lg="3" class="mb-0">
            <b-form-group label="Rama" class="mb-0">
              <select-ramas v-model="options.params.rama" clase="custom-select-sm" />
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="3" class="mb-0">
            <b-form-group label="Estado Afiliacion" class="mb-0">
              <b-form-select v-model="options.params.afiliado" size="sm" class="mb-3">
                <option value="A">Miembros</option>
                <option value="I">Ex Miembros</option>
                <option value="T">Todos</option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="12">
            <button class="btn btn-primary btn-sm" @click.prevent="getBusqueda()">Filtrar</button>
            <button class="btn btn-secondary btn-sm" @click.prevent="resetFiltro()">Borrar Filtro</button>
            <download-excel
              :fetch="fetchDataExport"
              :fields="xls_campos"
              class="btn btn-sm btn-success m-2"
              name="exportacion_de_im.xls"
            >
              Exportar
            </download-excel>
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="card card-accent-primary">
      <div>
        <v-server-table
          id="tabla_listado_im"
          ref="tabla"
          class="tabla"
          :columns="columns"
          :options="options"
          url="/formacion/im"
        >
          <template slot="apellidoynombre" slot-scope="props">
            <div-persona :persona="props.row.persona" />
          </template>
          <template slot="funciones" slot-scope="props">
            <div-funciones :funciones="props.row.persona.funciones" />
          </template>

          <template slot="Insigania de Madera" slot-scope="props">
            <template v-for="(im, index) in props.row.ims">
              <div :key="index">
                <template v-if="im.nro_registro !== null">
                  Año : {{ im.anio }} / Nro de Registro: {{ im.nro_registro }}
                  <br />
                </template>
                <template v-else>
                  <div class="text-danger">
                    Pendiente de Entrega
                    <br />
                  </div>
                </template>
                Linea : {{ im.linea }} -
                <div-rama v-if="im.rama !== 'G'" :rama="im.rama" />
                <template v-if="index !== props.row.ims.length - 1">
                  <hr />
                </template>
              </div>
            </template>
          </template>
          <template slot="estado" slot-scope="props">
            <div v-if="$moment(props.row.ims[0].vencimiento, 'YYYY-MM-DD').isBefore()" class="text-danger">
              <i class="far fa-frown" /> Vencida
            </div>
            <div v-else class="text-success">
              <i class="far fa-hand-peace" /> Vigente
              <template v-if="props.row.persona.categoria !== 'Activo'">
                <br />
                <span class="text-danger">(No es miembro Activo)</span>
              </template>
            </div>
            <p>Fecha de Vencimiento : {{ props.row.ims[0].vencimiento | Date }}</p>
          </template>
          <template slot="opciones" slot-scope="props">
            <btn-persona-ver :uuid="props.row.persona.uuid" />
            <b-button
              v-if="user.is.zona"
              :to="'/formacion/maestro_scout/' + props.row.persona.uuid + ''"
              size="sm"
              variant="success"
              title="Detalle de la Insignia de Madera"
            >
              <i class="fas fa-search" />
            </b-button>
          </template>
        </v-server-table>
      </div>
    </div>
  </ContentWrapper>
</template>

<style scoped>
.VueTables >>> * tr th:nth-child(1) {
  width: 30% !important;
}
.VueTables >>> * tr th:nth-child(2) {
  width: 30% !important;
}
.VueTables >>> * tr th:nth-child(3) {
  width: 30% !important;
}
.VueTables >>> * tr th:nth-child(4) {
  width: 10% !important;
}

.VueTables >>> *tr td {
  vertical-align: middle !important;
}
</style>

<script>
export default {
  meta: {
    auth: { permiso: 'formacion.maestro_scout' },
  },
  data() {
    return {
      columns: ['apellidoynombre', 'funciones', 'Insigania de Madera', 'opciones'],
      options: {
        filterable: false,
        pagination: { chunk: 10 },
        params: {
          afiliado: 'A',
          estado: '',
          rama: '',
        },
        headings: {
          apellidoynombre: 'datos',
        },
        sortable: ['apellidoynombre'],
      },
      // ---------------------------------------------------------------------------
      //                  CONFIGUARACION DEL EXPORT
      // ---------------------------------------------------------------------------
      xls_campos: {
        Nombre: 'persona.apellidoynombre',
        Organismo: {
          field: 'persona.funciones',
          callback: (value) => {
            let out = ''
            try {
              value.forEach((element) => {
                out += element.organismo_full + ' - ' + element.funcion + '\n'
              })
            } catch (e) {
              return out
            }
            return out
          },
        },
        Rama: {
          field: 'ims',
          callback: (value) => {
            let out = ''
            value.forEach((element) => {
              out += this.$getRama(element.rama).texto + '\n'
            })

            return out
          },
        },
        Vencimiento: {
          field: 'ims',
          callback: (value) => {
            return this.$moment(value[0].vencimiento, 'YYYY-MM-DD').format('L')
          },
        },
        Estado: {
          field: 'ims',
          callback: (value) => {
            if (this.$moment(value[0].vencimiento, 'YYYY-MM-DD').isBefore()) {
              return 'Vencida'
            } else {
              return 'Vigente'
            }
          },
        },
      },
    }
  },
  created() {
    if (this.$_.size(this.$route.query) !== 0) {
      this.options.params = this.$route.query
    }
  },
  methods: {
    /** **********************************************************************************************
     * Manejo el Boton Download !!
     ************************************************************************************************ */
    fetchDataExport() {
      this.options.params.limit = 9999999
      return this.$axios.get('/formacion/im', { params: this.options.params }).then((response) => {
        this.options.params.limit = 10
        return response.data.data
      })
    },
    resetFiltro() {
      this.$router.push({ query: {} })
      this.options.params = { afiliado: 'A', estado: '', rama: '' }
      this.$refs.tabla.refresh()
    },
    getBusqueda() {
      // this.$router.push({ query: {} })
      // this.$router.push({ query: this.options.params })
      this.$refs.tabla.refresh()
    },
  },
}
</script>
