<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Legajo de {{ persona_full.apellidoynombre }}</titulo>
    </template>
    <template v-if="persona">
      <b-alert v-if="persona.afiliacion === false" show variant="danger">
        La Persona no se encuentra Afiliada, Verifique los datos en CDS
      </b-alert>
    </template>
    <b-row>
      <b-col sm="12" lg="3" class="p-2">
        <div class="text-center">
          <foto :uuid="persona.uuid" :size="250" :borde="true" rounded="0" />
        </div>
        <hr />
        <h4 class="text-center text-cyan">{{ persona_full.apellidoynombre }}</h4>
        <hr />
        <ul v-if="datos" class="list-group">
          <li v-if="datos.telefono" class="list-group-item list-group-item-action">
            <i class="fa fa-phone" />
            {{ datos.telefono }}
          </li>
          <li v-if="datos.celular" class="list-group-item list-group-item-action">
            <i class="fa fa-mobile" />
            {{ datos.celular }}
          </li>
          <li v-if="datos.email" class="list-group-item list-group-item-action">
            <i class="fa fa-envelope-o" />
            {{ datos.email }}
          </li>
          <li v-if="datos.profesion" class="list-group-item list-group-item-action">
            Profesion:
            <br />
            {{ datos.profesion }}
          </li>
          <li v-if="datos.alimentacion_especial_detalle" class="list-group-item list-group-item-action">
            Dieta:
            <br />
            {{ datos.alimentacion_especial_detalle }}
          </li>
          <li v-if="datos.actualizacion" class="list-group-item list-group-item-action">
            Ultima Actualizacion {{ datos.actualizacion | DateTime }}hs
          </li>
        </ul>
      </b-col>
      <b-col sm="12" lg="9">
        <div class="card card-accent-primary">
          <div class="card-body">
            <div role="tabpanel">
              <b-nav class="nav-tabs">
                <!--v-if="persona.adulto"
                    agregar a futuro, que si es beneficiario, verifique si tiene alguna experiencia para mostrar
                 -->
                <b-nav-item :active="tab === 'datos'" @click="tabs('datos')">Datos Personales</b-nav-item>
                <b-nav-item :active="tab === 'formacion'" @click="tabs('formacion')">Formación</b-nav-item>
              </b-nav>
              <div class="tab-content">
                <br />
                <div id="DatosPersonales" :class="{ active: tab === 'datos' }" class="tab-pane" role="tabpanel">
                  <b-alert variant="danger">Estos Datos son Obtenidos automáticamente desde CDS</b-alert>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="pmb-block">
                        <div class="pmbb-header">
                          <h2>Personales</h2>
                          <hr />
                          <div class="pmbb-body p-l-30">
                            <dl>
                              <dt>Nro documento</dt>
                              <dd>{{ persona_full.documento }}</dd>
                            </dl>
                            <dl>
                              <dt>Nacionalidad</dt>
                              <dd>{{ persona_full.nacionalidad }}</dd>
                            </dl>
                            <dl>
                              <dt>Nombre</dt>
                              <dd>{{ persona_full.apellido }}</dd>
                            </dl>
                            <dl>
                              <dt>Nombre</dt>
                              <dd>{{ persona_full.nombre }}</dd>
                            </dl>
                            <dl>
                              <dt>Nacimiento</dt>
                              <dd>{{ persona_full.f_nacimiento | Date }}</dd>
                            </dl>
                            <dl>
                              <dt>Sexo</dt>
                              <dd>{{ persona_full.sexo }}</dd>
                            </dl>
                            <dl>
                              <dt>civil</dt>
                              <dd>{{ persona_full.estado_civil }}</dd>
                            </dl>
                            <dl>
                              <dt>Idioma</dt>
                              <dd>{{ persona_full.Idioma }}</dd>
                            </dl>
                            <dl>
                              <dt>Religion</dt>
                              <dd>{{ persona_full.religion }}</dd>
                            </dl>
                          </div>
                          <h2>Domicilio</h2>
                          <hr />
                          <div class="pmbb-body p-l-30">
                            <dl>
                              <dt>Domicilio</dt>
                              <dd>{{ persona_full.domicilio }}</dd>
                            </dl>
                            <dl>
                              <dt>Codigo postal</dt>
                              <dd>{{ persona_full.codigo_postal }}</dd>
                            </dl>
                            <dl>
                              <dt>Localidad</dt>
                              <dd>{{ persona_full.localidad }}</dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="pmb-block">
                        <div class="pmbb-header">
                          <h2>Contacto</h2>
                          <hr />
                          <div class="pmbb-body p-l-30">
                            <dl>
                              <dt>Telefono</dt>
                              <dd>{{ persona_full.telefono }}</dd>
                            </dl>
                            <dl>
                              <dt>celular</dt>
                              <dd>{{ persona_full.celular }}</dd>
                            </dl>
                            <dl>
                              <dt>Email</dt>
                              <dd>{{ persona_full.email }}</dd>
                            </dl>
                          </div>
                        </div>
                        <div class="pmbb-header">
                          <h2>Otros</h2>
                          <hr />
                          <div class="pmbb-body p-l-30">
                            <dl>
                              <dt>Estudios</dt>
                              <dd>{{ persona_full.estudios }}</dd>
                            </dl>
                            <dl>
                              <dt>Trabaja en</dt>
                              <dd>{{ persona_full.empresa_donde_trabaja }}</dd>
                            </dl>
                            <dl>
                              <dt>Nec. Esp.</dt>
                              <dd>{{ persona_full.necesidad_especial }}</dd>
                            </dl>
                            <dl>
                              <dt>Tipo de Nec. Esp</dt>
                              <dd>{{ persona_full.tipo_de_necesidad_especial }}</dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div id="Formacion" :class="{ active: tab === 'formacion' }" class="tab-pane" role="tabpanel">
                  <div id="detalleIM" class="card card-accent-primary">
                    <!-- v-show="gridIm.items.length"  -->
                    <div class="card-header"><span class="fas os-accion-im" /> Datos de Insignia de Madera</div>
                    <insignia-madera :uuid="uuid" />
                  </div>
                  <div v-show="verHabilitaciones" id="detalleHabilitacion" class="card card-accent-primary">
                    <!-- v-show="gridHabilitacion.items.length"  -->
                    <div class="card-header">
                      <span class="fas os-accion-im" /> Mis Habilitaciones
                      <habilitaciones :uuid="uuid" />
                    </div>
                  </div>
                  <div class="card card-accent-primary">
                    <div class="card-header" :uuid="uuid">
                      <span class="fas os-area-ams" /> Experiencias Específicas para la Función
                    </div>
                    <experiencias :uuid="uuid" tipo="FA" />
                  </div>

                  <div class="card card-accent-primary">
                    <div class="card-header" :uuid="uuid">
                      <span class="fas os-area-ams" /> Mis Experiencias Realizadas
                    </div>
                    <experiencias :uuid="uuid" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </ContentWrapper>
</template>

<script>
import Vue from 'vue'
import MiFormacion from '../../../main/miformacion'
import Experiencias from '~/components/formacion/persona/experiencias'
import Habilitaciones from '~/components/formacion/persona/habilitaciones'
import InsigniaMadera from '~/components/formacion/persona/insigniaMadera'

Vue.component('MiFormacion', MiFormacion)
export default {
  meta: {
    auth: { permiso: 'membresia.persona' },
  },
  components: { InsigniaMadera, Experiencias, Habilitaciones },
  data() {
    return {
      tab: 'datos' /* TAB SELECCIONADA */,
      persona: {},
      datos: {},
      persona_full: {},
      verHabilitaciones: false, // este propiedad se modifica internamente desde el componente Habilitaciones
    }
  },
  computed: {
    uuid() {
      return this.$route.params.uuid
    },
  },
  created() {
    this.getPersona()
  },
  methods: {
    tabs(tipo) {
      this.tab = tipo
    },
    getPersona() {
      this.$axios.get('/persona/personas/' + this.uuid).then((response) => {
        this.persona = response.data
      })
      this.$axios.get('/persona/personas/' + this.uuid + '/editar').then((response) => {
        this.persona_full = response.data
      })
      this.$axios.get('/persona/datos/' + this.uuid).then((response) => {
        this.datos = response.data
      })
    },
  },
}
</script>
