<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>
        Detalle
        <!--  Si el evento es diferente de borrado .. muestro el menu-->
        <template v-if="!user.is.soloformador && !evento.borrado && evento.soy_propietario" slot="acciones">
          <b-dropdown variant="success" text="Acciones" size="sm" class="m-md-2">
            <b-dropdown-item @click="$refs.modalInscriptos.showModal()">Agregar Participantes</b-dropdown-item>
            <b-dropdown-item :to="`/eventos/creacion/formulario/${uuid}`">Editar Evento</b-dropdown-item>
            <b-dropdown-item @click="$refs.modalMail.showModal()">Enviar Mail Masivo</b-dropdown-item>
            <b-dropdown-item>------------</b-dropdown-item>
            <b-dropdown-item @click="reenvioPauta">Re Enviar Pauta Masivo</b-dropdown-item>
          </b-dropdown>
          <nuxt-link :to="`/eventos/creacion/formulario/${uuid}`" class="btn btn-warning btn-sm"> Editar </nuxt-link>
        </template>
      </titulo>
    </template>
    <div v-if="evento.uuid" id="evento" class="card card-accent-primary">
      <!--------------------------------------------------->
      <b-alert v-if="user.persona.apellidoynombre === evento.responsable" show variant="warning">
        Hola {{ user.persona.nombre }}, sos el responsable de esta experiencia, podes completar, tu equipo
      </b-alert>
      <!--------------------------------------------------->
      <b-alert v-if="evento.autorizado === 'N'" show variant="warning">
        El evento no fue autorizado por el organimo superior
      </b-alert>
      <alerta v-if="evento.borrado" tipo="error"> El evento esta en Estado BORRADO </alerta>

      <!--------------------------------------------------->
      <div class="card-body">
        <b-tabs>
          <b-tab title="Información" active>
            <b-row class="p-3">
              <b-col md="3">
                <dl>
                  <dt>Organismo</dt>
                  <dd>{{ evento.organismo }}</dd>
                </dl>
                <dl>
                  <dt>Nombre</dt>
                  <dd>{{ evento.evento }}</dd>
                </dl>
                <dl>
                  <dt>Tipo</dt>
                  <dd>{{ evento.tipo }}</dd>
                </dl>
                <dl>
                  <dt>Area</dt>
                  <dd>{{ evento.area }}</dd>
                </dl>
              </b-col>
              <b-col md="3">
                <dl>
                  <dt>Inicio Evento</dt>
                  <dd>{{ evento.evento_inicio | DateTime }}Hs</dd>
                </dl>
                <dl>
                  <dt>Fin Evento</dt>
                  <dd>{{ evento.evento_fin | DateTime }}Hs</dd>
                </dl>
                <dl>
                  <dt>Cierre Inscripciones</dt>
                  <dd>{{ evento.cierre_inscripcion | Date }} 23:59Hs</dd>
                </dl>
                <dl>
                  <dt>Lugar</dt>
                  <dd>{{ evento.lugar }}</dd>
                </dl>
              </b-col>

              <b-col md="3">
                <dl>
                  <dt>Costo</dt>
                  <dd>${{ evento.costo }}</dd>
                </dl>
                <!--
                <dl>
                  <dt>Compartido</dt>
                  <dd>{{ evento.privado }}</dd>
                </dl>
                <dl>
                  <dt>Tipo</dt>
                  <dd>{{ evento.inscripcion }}</dd>
                </dl>-->
                <dl>
                  <dt>Cupo</dt>
                  <dd>{{ evento.cupo }}</dd>
                </dl>
              </b-col>
              <b-col md="3">
                <dl v-if="evento.remera">
                  <dt>Remeras</dt>
                  <dd>Con Remeras</dd>
                </dl>

                <dl v-if="evento.beneficiarios">
                  <dt>Beneficiarios</dt>
                  <dd>{{ evento.ramas }}</dd>
                </dl>

                <dl>
                  <dt>Responsable</dt>
                  <dd>{{ evento.responsable }}</dd>
                </dl>

                <dl v-if="evento.crea_ams">
                  <dt>AMS</dt>
                  <dd>La Experiencia Revalida IM</dd>
                </dl>
              </b-col>
              <b-col v-if="evento.autorizado && !user.is.soloformador && evento.soy_propietario" md="12">
                <b-button
                  v-if="evento.eventos_estado_id === 1"
                  :disabled="BtnDisabled"
                  variant="danger"
                  @click="cambiarEstadoEvento(2)"
                >
                  Abrir Inscripcion
                </b-button>
                <b-button
                  v-if="evento.eventos_estado_id === 2"
                  :disabled="BtnDisabled"
                  variant="danger"
                  @click="cambiarEstadoEvento(3)"
                >
                  Cerrar Inscripcion
                </b-button>
                <b-button
                  v-if="evento.eventos_estado_id === 3"
                  :disabled="BtnDisabled"
                  variant="primary"
                  @click="cambiarEstadoEvento(2)"
                >
                  Reabrir Inscripciones
                </b-button>
                <b-button
                  v-if="evento.eventos_estado_id === 3"
                  :disabled="BtnDisabled"
                  variant="danger"
                  @click="cambiarEstadoEvento(4)"
                >
                  Finalizar Evento
                </b-button>
                <nuxt-link
                  v-if="evento.curso_uuid"
                  :to="'/formacion/experiencias/detalle/' + evento.curso_uuid"
                  class="btn btn-success"
                >
                  Ir a AMS
                </nuxt-link>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Descripcion">
            <div class="clearfix">
              <alerta class="m-2" tipo="info">Texto que sera enviado en la inscripcion al evento</alerta>
              <div v-html="evento.pauta" />
            </div>
          </b-tab>
          <b-tab title="Equipo">
            <detalle-equipo :evento-uuid="uuid"></detalle-equipo>
          </b-tab>
        </b-tabs>
      </div>
    </div>
    <template v-if="evento.uuid">
      <detalle-inscriptos :evento="evento" />
      <detalle-agregar-inscriptos ref="modalInscriptos" :evento="evento" />
    </template>
    <modal-mail-masivo ref="modalMail" :evento="evento" />
  </ContentWrapper>
</template>

<script>
import modalMailMasivo from '@/components/eventos/detalle/EventoMailMasivo.vue'
import detalleAgregarInscriptos from '@/components/eventos/detalle/EventoDetalleAgregarInscriptos.vue'
import detalleEquipo from '@/components/eventos/detalle/EventoDetalleEquipo.vue'
import detalleInscriptos from '@/components/eventos/detalle/EventoDetalleInscripto.vue'

export default {
  meta: {
    auth: { permiso: 'eventos.administracion' },
  },
  components: {
    detalleAgregarInscriptos,
    detalleInscriptos,
    detalleEquipo,
    modalMailMasivo,
  },
  data() {
    return {
      evento: {},
      tab: 'inscriptos',
      BtnDisabled: false,
      modalDocumento: '',
    }
  },
  computed: {
    uuid() {
      return this.$route.params.uuid
    },
  },

  created() {
    this.getEvento()
  },
  methods: {
    /** **********************************************************************************************
     *  obtencion de datos del datagrid
     ************************************************************************************************ */
    getEvento() {
      this.$axios.get(`/eventos/eventos/${this.uuid}`).then((response) => {
        this.evento = response.data.data

        /// si el evento esta en estado 4, y crea ams,
        // deberia deberia tener un curso_uuid , si no lo tiene , vuelvo a recargar el evento cada
        // 4 segundos
        if (!this.evento.curso_uuid && this.evento.eventos_estado_id === 4 && this.evento.crea_ams) {
          setTimeout(this.getEvento(), 4000)
        }

        // Reactivo los botones una vez que recargue completamente el evento
        // esto lo hago depues de cambiar estado
        this.BtnDisabled = false
      })
    },

    reenvioPauta() {
      this.$axios.post('/eventos/eventos/email/reenviar_pauta', {
        evento_uuid: this.uuid,
      })
    },
    /** **********************************************************************************************
     * Cambio de estado del evento
     ************************************************************************************************ */
    cambiarEstadoEvento(nuevoEstado) {
      this.BtnDisabled = true
      // Ejecuto un alerta
      this.$swal
        .fire({
          title: 'Cambio de estado',
          text: 'Esta seguro que quiere cambiar el estado del evento, esta accion no podra ser revertida',
          type: 'warning',
          showCancelButton: true,
        })
        .then((result) => {
          // si el alerta devuelve OK, ejecuto el cambio de estado
          if (result.value) {
            this.$axios
              .put('/eventos/estado', {
                uuid: this.uuid,
                estado: nuevoEstado,
              })
              .then(() => {
                this.getEvento()
              })
          } else {
            // si cancela el alerta no hago nada
            this.BtnDisabled = false
            this.$swal.fire('Se cancelo el cambio de estado')
          }
        })
    },
    /** ********************************************************************************************* */
  },
}
</script>
