<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Formulario</titulo>
    </template>
    <template v-if="evento.autorizado">
      <alerta v-if="evento.autorizado !== 'S' && !user.is.zona" tipo="error">
        Debe Tener en cuenta que al crear un evento referente al area de adultos o que sirva para revalidar,
        <br />
        El mismo debe ser autorizado por zona para su realizacion
      </alerta>
      <alerta v-if="datos.lugar.length === 0" tipo="error">
        Debe tener cargado "Un lugar" para crear un nuevo evento
        <br />
        El mismo se crea en Eventos => Lugares => Nuevo
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
            <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutDown">
              <b-form-group
                v-if="evento.eventos_tipo_id === 9 && datos.experiencias.length > 0"
                label="Experiencia de Formación:"
              >
                <template v-if="datos.experiencias.length < 9999">
                  <b-form-select v-model="evento.ams_experiencias_id" size="sm">
                    <template v-for="tipo in datos.experiencias">
                      <option :key="tipo.id" :value="tipo.id">(Esquema {{ tipo.esquema }}) - {{ tipo.nombre }}</option>
                    </template>
                  </b-form-select>
                </template>
                <template v-else>
                  <!-- key-field="id"  -->
                  <v-selectmenu
                    v-model="evento.ams_experiencias_id"
                    :data="datos.experiencias"
                    key-field="id"
                    show-field="nombre"
                  />
                </template>
                <error input="ams_experiencias_id" />
              </b-form-group>
            </transition>
            <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutDown">
              <!-- CORREGIR ESTO .. cunado se tiene que mostrar !! me da paja hacerlo ahora -->
              <b-form-group
                v-if="
                  (evento.ams_experiencias_id === 2 && evento.eventos_tipo_id === 9) ||
                  (evento.eventos_tipo_id !== 9 && evento.eventos_tipo_id !== null && evento.eventos_tipo_id !== 12)
                "
                label="Nombre del Evento:"
              >
                <b-form-input
                  v-model="evento.nombre"
                  size="sm"
                  type="text"
                  placeholder="Ingrese el nombre del Evento"
                />
                <error input="nombre" />
              </b-form-group>
            </transition>
            <b-form-group v-if="evento.ams_experiencias_id === 2 || evento.crea_ams === 'S'" label="Carga Horaria:">
              <b-form-input
                v-model="evento.carga_horaria"
                size="sm"
                type="text"
                placeholder="Ingrese la Cantidad de Horas"
              />
              <error input="carga_horaria" />
            </b-form-group>
            <b-form-group label="Evento disponible: ">
              <b-form-select v-model="evento.participa" size="sm">
                <option v-if="!user.is.grupo" value="Z">Toda mi la Zona</option>
                <option v-if="user.is.grupo || user.is.distrito" value="D">Todo el Distrito</option>
                <option value="P">Solo mi Organismo (Privado)</option>
                <!--
                <option v-if="user.is.zona" value="R">Toda mi la Region</option>
                -->
                <option value="N">Todo el pais</option>
              </b-form-select>
              <error input="participa" />
            </b-form-group>
          </b-col>
          <b-col md="3">
            <b-form-group label="Lugar:">
              <!-- v-if="datos.area.lugar === 'S' && datos.lugar.length > 0" -->
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
              <input-persona
                v-model="evento.responsable_uuid"
                :value="evento.responsable_uuid"
                classe="input-group-sm"
              />
              <error input="responsable_uuid" />
            </b-form-group>
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
                style="font-family: caseroft-iconos-scout, sans-serif"
              >
                <option value="0" selected="selected">Sin Benerificarios</option>
                <option value="T"> Castores</option>
                <option value="L"> Lobatos y Lobeznas</option>
                <option value="S"> Scouts</option>
                <option value="C"> Caminates</option>
                <option value="R"> Rovers</option>
              </select>
              <error input="rama" />
            </b-form-group>
            <b-form-group label="Genera Certificado:">
              <b-form-select v-model="evento.genera_certificado" size="sm">
                <option value="S">Genera Certificado</option>
                <option value="N">No genera Certificado</option>
              </b-form-select>
              <error input="genera_certificado" />
            </b-form-group>
            <b-form-group v-if="datos.area.codigo !== 'AMS' && evento.eventos_tipo_id !== 12" label="Revalida IM:">
              <b-form-select v-model="evento.crea_ams" size="sm">
                <option value="S">Revalidar IM</option>
                <option value="N">No Revalida IM</option>
              </b-form-select>
              <error input="crea_ams" />
            </b-form-group>
          </b-col>

          <b-col md="12">
            <button v-if="!evento.id" v-promise-btn class="btn btn-primary" @click="submitCrear">Crear Evento</button>
            <button v-else v-promise-btn class="btn btn-primary" @click="submitActualizar">Actualizar Evento</button>
          </b-col>
        </b-row>
      </b-card>

      <b-card class="card-border-color card-border-color-success">
        <b-row>
          <b-col md="12" style="height: 400px">
            <error input="descripcion" />
            <quill-editor v-model="evento.descripcion" style="height: 300px" />
            <b-form-input v-show="false" v-model="evento.eventos_area_id" size="sm" type="text" />
            <b-form-input v-show="false" v-model="evento.id" size="sm" type="text" />
            <b-form-input v-show="false" v-model="evento.uuid" size="sm" type="text" />
          </b-col>
        </b-row>
      </b-card>
      <b-modal ref="nuevoLugar" size="lg" scrollable hide-footer title="Nuevo Lugar" centered style="z-index: 90000000">
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

import { quillEditor } from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker)
// Vue.use(VueQuillEditor, { placeholder: 'Ingrese el texto' })
Vue.use(browserDetect)
export default {
  meta: {
    auth: { permiso: 'eventos.abm' },
  },
  components: { VueCtkDateTimePicker, quillEditor },
  data() {
    return {
      datos: {
        area: {},
        lugar: {},
        experiencias: {},
      },
      area: null,
      evento: {
        eventos_tipo_id: 1,
        responsable_uuid: null,
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
    // Si es llamado como nuevo formulario, por parametro recibo el area,
    // si es una edicion, obtengo el area desde los datos del evento
    if (this.$route.query.area) {
      this.area = this.$route.query.area
      this.getData()
      return
    }
    // si paso un uuid obtengo todos los datos
    if (this.$route.params.uuid) {
      this.getEvento()
      return
    }
    // si no pase un uuid, redirecciono a la pantalla de creacion
    this.$router.push({ path: '/eventos/creacion/' })
  },

  methods: {
    getEvento() {
      this.$axios.get(`/eventos/eventos/${this.$route.params.uuid}/editar`).then((response) => {
        this.evento = response.data
        this.evento.f_inicio_evento = this.$moment(this.evento.f_inicio_evento).format('YYYY-MM-DDTHH:mm')
        this.evento.f_fin_evento = this.$moment(this.evento.f_fin_evento).format('YYYY-MM-DDTHH:mm')
        this.area = this.evento.eventos_area_id
        if (this.evento.rama != null) {
          // Convierto a array de nuevo las ramas, sino no lo muestra el listado
          this.evento.rama = this.evento.rama.split(',')
        }
        this.getData()
      })
    },
    // Obtengo todos los datos para llenar los select
    getData() {
      this.$nuxt.$loading.start()
      Promise.all([
        this.$axios.get(`/eventos/area/${this.area}`).then((response) => {
          this.datos.area = response.data
          this.evento.eventos_area_id = this.datos.area.id
          return Promise.resolve(true)
        }),
        this.$axios.get('/eventos/lugar').then((response) => {
          this.datos.lugar = response.data.data
          return Promise.resolve(true)
        }),
        this.$axios.get('/formacion/experiencias').then((response) => {
          this.datos.experiencias = response.data
          return Promise.resolve(true)
        }),
      ]).then(() => {
        this.$nuxt.$loading.finish()

        // Solo defino si genera certificado, si el valor de null
        if (this.evento.genera_certificado === undefined) {
          // una vez que obtengo todos los datos de la experiencia, si es de formacion pongo por default que si genera certificado
          if (this.datos.area.codigo !== 'AMS' && this.evento.eventos_tipo_id !== 12) {
            this.evento.genera_certificado = 'N'
          } else {
            this.evento.genera_certificado = 'S'
          }
        }
      })
    },

    submitCrear() {
      return this.$axios
        .post('/eventos/eventos', this.evento)
        .then((response) => {
          this.$router.push({
            path: '/eventos/administracion/detalle/' + response.data.uuid,
          })
        })
        .catch((err) => {
          return err
        })
    },
    submitActualizar() {
      return this.$axios.put('/eventos/eventos/', this.evento).then(() => {
        this.$router.push({
          path: '/eventos/administracion/detalle/' + this.$route.params.uuid,
        })
      })
    },
  },
}
</script>
