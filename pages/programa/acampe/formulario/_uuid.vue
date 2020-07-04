<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Nuevo Permiso de Acampe</titulo>
    </template>
    <template v-if="evento.autorizado">
      <alerta v-if="user.is.grupo" tipo="error">
        Debe Tener en cuenta que al crear un Permiso de Acampe
        <br />El mismo debe ser autorizado por zona para su realizacion
      </alerta>
      <alerta v-if="datos.lugar.length === 0" tipo="error">
        Debe tener cargado "Un lugar" para crear un nuevo evento
        <br />El mismo se crea en Eventos => Lugares => Nuevo
      </alerta>
    </template>
    <div id="formulario">
      <b-card class="card-border-color card-border-color-success">
        <b-row>
          <b-col md="3">
            <b-form-group label="Tipo de evento: ">
              <b-form-select v-model="evento.eventos_tipo_id" size="sm" tabindex="1">
                <template v-for="tipo in datos.area.rel_tipos">
                  <option :key="tipo.id" :value="tipo.id">
                    {{ tipo.nombre }}
                  </option>
                </template>
              </b-form-select>
              <error input="eventos_tipo_id" />
            </b-form-group>
            <b-form-group label="Evento disponible: ">
              <b-form-select v-model="evento.participa" size="sm">
                <option v-if="!user.is.grupo" value="Z">
                  Toda la Zona
                </option>
                <option v-if="user.is.grupo || user.is.distrito" value="D">
                  Todo el Distrito
                </option>
                <option value="P">
                  Solo mi Organismo
                </option>
              </b-form-select>
              <error input="participa" />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group v-if="datos.lugar.length > 0" label="Lugar:">
              <b-form-select v-model="evento.eventos_lugar_id" size="sm">
                <template v-for="lugar in datos.lugar">
                  <option :key="lugar.id" :value="lugar.id">
                    {{ lugar.nombre }}
                  </option>
                </template>
              </b-form-select>
              <error input="eventos_lugar_id" />
            </b-form-group>
            <b-form-group label="Costo: ">
              <b-input-group>
                <b-form-input v-model="evento.costo" size="sm" type="text" placeholder="Ingrese el Costo" />
                <b-input-group-append>
                  <span class="input-group-text">
                    <i class="fas fa-dollar-sign" />
                  </span>
                </b-input-group-append>
              </b-input-group>
              <error input="costo" />
            </b-form-group>
            <b-form-group label="Responsable: ">
              <b-input-group @dblclick="ChangeResponsable()">
                <b-form-input
                  id="responsable"
                  v-model="evento.responsable"
                  size="sm"
                  type="text"
                  placeholder="Defina un responsable"
                />
                <b-input-group-append v-b-modal="'myModal'">
                  <span class="input-group-text">
                    <i class="fas fa-user-plus c-green" />
                  </span>
                </b-input-group-append>
              </b-input-group>
              <error input="responsable" />
            </b-form-group>
            <!-- the modal -->
            <b-modal id="myModal" centered ok-only title="Seleccione Un Responsable">
              <blockquote class="text-info">
                Al seleccionar a un responsable desde este listado, si el evento genera certificado el mismo salgra con
                la firma digital
              </blockquote>
              <b-form-select id="responsable_id" v-model="evento.responsable_id" @change="ChangeResponsableId()">
                <template v-for="responsable in datos.responsables">
                  <option :key="responsable.id" :value="responsable.id">
                    {{ responsable.apellidoynombre }}
                  </option>
                </template>
              </b-form-select>
              <error input="responsable_id" />
            </b-modal>
          </b-col>
          <b-col md="3">
            <b-form-group label="Cierre Incripcion: ">
              <b-input-group>
                <template v-if="!$browserDetect.isFirefox">
                  <b-form-input
                    v-model="evento.f_cierre_inscripcion"
                    size="sm"
                    type="date"
                    placeholder="Ingrese una fecha"
                  />

                  <b-input-group-append>
                    <span class="input-group-text">
                      <i class="fas fa-calendar-alt" />
                    </span>
                  </b-input-group-append>
                </template>
                <template v-else>
                  <VueCtkDateTimePicker
                    v-model="evento.f_cierre_inscripcion"
                    :only-date="true"
                    :overlay="true"
                    :no-button-now="false"
                    :auto-close="true"
                    :no-header="true"
                    label="Fecha cierre inscripciones"
                    input-size="sm"
                    format="YYYY-MM-DD"
                    formatted="ll"
                  />
                </template>
              </b-input-group>
              <error input="f_cierre_inscripcion" />
            </b-form-group>

            <b-form-group label="Inicio Evento: ">
              <template v-if="!$browserDetect.isFirefox">
                <b-input-group>
                  <b-form-input
                    v-model="evento.f_inicio_evento"
                    size="sm"
                    type="datetime-local"
                    placeholder="Ingrese una fecha"
                  />
                  <b-input-group-append>
                    <span class="input-group-text">
                      <i class="fas fa-calendar-alt" />
                    </span>
                  </b-input-group-append>
                </b-input-group>
              </template>
              <template v-else>
                <b-input-group>
                  <VueCtkDateTimePicker
                    v-model="evento.f_inicio_evento"
                    :overlay="true"
                    :no-button-now="false"
                    :no-header="true"
                    label="Fecha inicio evento"
                    input-size="sm"
                    minute-interval="15"
                    format="YYYY-MM-DD HH:mm"
                  />
                </b-input-group>
              </template>
              <error input="f_inicio_evento" />
            </b-form-group>
            <b-form-group label="Fin Evento: ">
              <template v-if="!$browserDetect.isFirefox">
                <b-input-group>
                  <b-form-input
                    v-model="evento.f_fin_evento"
                    size="sm"
                    type="datetime-local"
                    placeholder="Ingrese una fecha"
                  />
                  <b-input-group-append>
                    <span class="input-group-text">
                      <i class="fas fa-calendar-alt" />
                    </span>
                  </b-input-group-append>
                </b-input-group>
              </template>
              <template v-else>
                <b-input-group>
                  <VueCtkDateTimePicker
                    v-model="evento.f_fin_evento"
                    :overlay="true"
                    :no-button-now="false"
                    :no-header="true"
                    label="Fecha fin evento"
                    input-size="sm"
                    minute-interval="15"
                    format="YYYY-MM-DD HH:mm"
                  />
                </b-input-group>
              </template>
              <error input="f_fin_evento" />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <!--
            <b-form-group v-if="datos.area.remera === 'S'" label="Incluir Remera:">
              <b-form-select v-model="evento.remera" size="sm">
                <option value="S">Pedir Talle</option>
                <option value="N">No pedir Talle</option>
              </b-form-select>
              <error input="remera"/>
            </b-form-group>
            -->
            <b-form-group v-if="datos.area.cupo === 'S'" label="Cupo:">
              <b-form-input v-model="evento.cupo" size="sm" type="text" placeholder="Defina un cupo" />
              <error input="cupo" />
            </b-form-group>
            <b-form-group
              v-if="datos.area.rama === 'S' && evento.eventos_tipo_id !== 12"
              label="Ramas que pueden Participar:"
            >
              <select
                v-model="evento.rama"
                class="form-control ramas"
                multiple="multiple"
                size="6"
                style="font-family: caseroft-iconos-scout, sans-serif;"
              >
                <option value="T,L,S,C,R" selected="selected">
                  Totas las Ramas
                </option>
                <option value="T">
                   Castores
                </option>
                <option value="L">
                   Lobatos y Lobeznas
                </option>
                <option value="S">
                   Scouts
                </option>
                <option value="C">
                   Caminates
                </option>
                <option value="R">
                   Rovers
                </option>
              </select>
              <error input="rama" />
            </b-form-group>
          </b-col>

          <b-col md="12">
            <button v-if="!evento.id" v-promise-btn class="btn btn-primary" @click="submitCrear">
              Crear Evento
            </button>
            <button v-else v-promise-btn class="btn btn-primary" @click="submitActualizar">
              Actualizar Evento
            </button>
          </b-col>
        </b-row>
      </b-card>

      <b-card class="card-border-color card-border-color-success">
        <b-row>
          <b-col md="12" style="height: 400px;">
            <error input="descripcion" />
            <quill-editor v-model="evento.descripcion" style="height: 300px;" />
            <b-form-input v-show="false" v-model="evento.eventos_area_id" size="sm" type="text" />
            <b-form-input v-show="false" v-model="evento.id" size="sm" type="text" />
            <b-form-input v-show="false" v-model="evento.uuid" size="sm" type="text" />
          </b-col>
        </b-row>
      </b-card>
      <b-modal
        ref="nuevoLugar"
        size="lg"
        scrollable
        hide-footer
        title="Nuevo Lugar"
        centered
        style="z-index: 90000000;"
      >
        <div class="clearfix" />
      </b-modal>
    </div>
  </ContentWrapper>
</template>

<script>
import Vue from 'vue'

import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'
import browserDetect from 'vue-browser-detect-plugin'

Vue.use(browserDetect)

export default {
  meta: {
    auth: { permiso: 'programa.acampe.abm' },
  },
  components: { VueCtkDateTimePicker },
  data() {
    return {
      datos: {
        area: {},
        lugar: {},
        experiencias: {},
        responsables: {},
      },
      area: null,
      evento: {
        eventos_tipo_id: 1,
        responsable: null,
        rama: [],
      },
      selectFieldsExperiencias: [
        { title: 'Codigo', data: 'codigo' },
        { title: 'Experiencia', data: 'nombre' },
      ],
      selectFieldsLugar: [
        { title: 'Localidad', data: 'localidad' },
        { title: 'Lugar', data: 'nombre' },
      ],
    }
  },
  mounted() {
    //
    this.area = 'programa'
    this.getData()

    // si paso un uuid obtengo todos los datos
    if (this.$route.params.uuid) {
      this.getEvento()
    } else {
      // si no pase un uuid, redirecciono a la pantalla de creacion
      //   this.$router.push({ path: '/eventos/creacion/' }).catch(err => {})
    }
  },

  methods: {
    getEvento() {
      // si por accidente llegue a aca sin UUID, redirecciono
      if (!this.$route.params.uuid) {
        this.$router.push({ path: '/eventos/creacion/' })
      }

      this.$axios.get(`/eventos/eventos/${this.$route.params.uuid}`).then((response) => {
        this.evento = response.data
        // Formateo las fechas a un formato que los campos DateLocal reconosca, t0do por la T que lleva en el medio
        // this.evento.f_cierre_inscripcion = this.$moment(this.evento.f_cierre_inscripcion).format("YYYY-MM-DD");
        this.evento.f_inicio_evento = this.$moment(this.evento.f_inicio_evento).format('YYYY-MM-DDTkk:mm')
        this.evento.f_fin_evento = this.$moment(this.evento.f_fin_evento).format('YYYY-MM-DDTkk:mm')
        // this.area = this.evento.eventos_area_id
        this.area = this.evento.rel_area.codigo
        if (this.evento.rama != null) {
          this.evento.rama = this.evento.rama.split(',') // Convierto a array de nuevo las ramas, sino no lo muestra el listado
        }

        this.getData()
      })
    },
    // Obtengo todos los datos para llenar los select
    getData() {
      Promise.all([
        this.$axios.get('/eventos/area/programa').then((response) => {
          this.datos.area = response.data
          this.evento.eventos_area_id = this.datos.area.id
          return Promise.resolve(true)
        }),
        this.$axios.get('/eventos/lugar/listado').then((response) => {
          this.datos.lugar = response.data.data
          return Promise.resolve(true)
        }),

        this.$axios.get('/formacion/experiencias/listado').then((response) => {
          this.datos.experiencias = response.data
          return Promise.resolve(true)
        }),

        this.$axios.get('/eventos/firmas/listado').then((response) => {
          this.datos.responsables = response.data
          return Promise.resolve(true)
        }),
      ])
    },

    ChangeResponsableId() {
      /*
      this.evento.responsable = //$('#responsable_id option:selected')
        .text()
        .trim() */
      // $('#responsable').attr('readonly', true)
    },

    ChangeResponsable() {
      // $('#responsable').val('')
      // $('#responsable').attr('readonly', false)
      this.evento.responsable_id = null
    },
    submitCrear() {
      // console.log(this.evento.rama)
      // this.evento.rama = this.evento.rama_array.join(',') // Elimino el Array con concateno los Valores antes de enviar
      // console.log(this.evento.rama)

      return this.$axios.post('/eventos/eventos', this.evento).then((response) => {
        this.$router.push({
          path: '/eventos/administracion/detalle/' + response.data.uuid,
        })
      })
    },
    submitActualizar() {
      // if (this.evento.rama != null) {
      // this.evento.rama = this.evento.rama_array.join(',') // los datos del componente van en rama_array porque sino da error
      // }
      return this.$axios.post('/eventos/eventos/' + this.$route.params.uuid + '/actualizar', this.evento).then(() => {
        this.$router.push({
          path: '/eventos/administracion/detalle/' + this.$route.params.uuid,
        })
      })
    },
  },
}
</script>
