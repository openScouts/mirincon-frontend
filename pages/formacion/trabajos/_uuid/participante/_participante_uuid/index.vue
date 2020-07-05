<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>
        Detalle de Trabajos
      </titulo>
    </template>
    <template v-if="trabajo.estado">
      <template v-if="trabajo.estado === 'Aprobado'">
        <alerta tipo="correcto">Trabajo Aprobado</alerta>
      </template>
      <template v-else-if="trabajo.estado !== 'Aprobado' && trabajo.estado !== 'Desaprobado'">
        <div v-if="!trabajo.permite_entrega && trabajo.permite_mensaje" class="col-12">
          <alerta tipo="alerta">
            Finalizo la fecha de Entrega el dia {{ trabajo.fecha_entrega | Date }}, envie un correo al formador, si
            arreglo algo diferente.
          </alerta>
        </div>
        <div v-else class="col-12">
          <alerta tipo="info">Fecha Limite de Entrega el dia {{ trabajo.fecha_entrega | Date }} </alerta>
        </div>
        <div class="col-12">
          <btn-app
            v-if="trabajo.permite_entrega"
            :to="'/formacion/trabajos/' + trabajoUuid + '/participante/' + participanteUuid + '/entrega'"
            icon="fa fa-edit"
          >
            Realizar una Entrega
          </btn-app>

          <btn-app
            v-if="trabajo.permite_mensaje"
            :to="'/formacion/trabajos/' + trabajoUuid + '/participante/' + participanteUuid + '/mensaje'"
            icon="fa
            fa-envelope-open-text"
          >
            Enviar Mensaje
          </btn-app>
          <btn-app
            v-if="trabajo.permite_devolucion"
            :to="'/formacion/trabajos/' + trabajoUuid + '/participante/' + participanteUuid + '/devolucion'"
            icon="fa fa-tasks"
          >
            Cargar Devolucion
          </btn-app>
        </div>
      </template>
    </template>
    <div class="card card-accent-primary">
      <div class="card-body">
        <div role="tabpanel">
          <b-nav class="nav-tabs" fill>
            <b-nav-item :active="tab === 1" @click="tabs(1)">Detalle</b-nav-item>
            <b-nav-item :active="tab === 2" @click="tabs(2)">Pauta del TP</b-nav-item>
            <b-nav-item :active="tab === 3" @click="tabs(3)">Datos Personales</b-nav-item>
          </b-nav>
          <div class="tab-content">
            <!-----------------------------------  INICIO BLOQUE DETALLE TP --------------------------------------->
            <div id="detalle" :class="{ active: tab === 1 }" class="tab-pane" role="tabpanel">
              <template v-if="grid.data.length === 0">
                <vacio></vacio>
              </template>
              <template v-if="!grid.data">
                <vacio texto="No existe trabajos subidos"></vacio>
              </template>
              <template v-for="data in grid.data">
                <div :key="data.id" class="row">
                  <div class="col-12">
                    <div class="alert alert-info m-2">
                      <strong>{{ data.persona.apellidoynombre }}</strong>
                      <span class="text-right float-right">
                        Creado el
                        <em>{{ data.fecha | DateTime }}</em>
                      </span>
                    </div>
                  </div>
                  <div class="col-xs-12 col-lg-2 text-center">
                    <foto :uuid="data.persona.uuid" :size="100" />
                  </div>
                  <div class="col-xs-12 col-lg-10 border-left">
                    Tipo :
                    <template v-if="data.tipo == 'E'">
                      <b-badge variant="success">Entrega</b-badge>
                    </template>
                    <template v-if="data.tipo == 'M'">
                      <b-badge variant="secondary">Mensaje</b-badge>
                    </template>
                    <template v-if="data.tipo == 'D'">
                      <b-badge variant="primary">Devolucion</b-badge>
                    </template>
                    <hr />
                    <template v-if="data.texto">
                      <div v-html="data.texto" />
                    </template>
                    <template v-else>
                      <div class="row">
                        <div class="col-5">
                          <button v-promise-btn class="btn btn-primary" @click="getAdjuntoTp(data.adjunto)">
                            <i class="fas fa-file-pdf" /> Descargar Trabajo
                          </button>
                        </div>
                        <div v-if="data.duplicado" class="col-7">
                          <alerta tipo="error">Este documento Fue subido por Otro Cursante</alerta>

                          <div v-for="duplicado in data.duplicado" :key="duplicado.id" class="clearfix">
                            El trabajo fue subido el dia {{ duplicado.fecha | DateTime }}Hs, para la experiencia
                            {{ duplicado.experiencia }}, por {{ duplicado.persona.apellidoynombre }} con documento
                            {{ duplicado.persona.documento }}

                            <hr />
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div class="col-12 pb-2" />
                </div>
              </template>
            </div>
            <!-----------------------------------  FIN BLOQUE DETALLE TP --------------------------------------->
            <!-----------------------------------  INICIO BLOQUE CONSIGNA/PAUTA --------------------------------------->
            <div v-if="trabajo.consigna" id="pauta" :class="{ active: tab === 2 }" class="tab-pane" role="tabpanel">
              <div class="p-3" v-html="trabajo.consigna" />
            </div>
            <!-----------------------------------  FIN BLOQUE CONSIGNA --------------------------------------->
            <!-----------------------------------  INICIO BLOQUE DATOS PERSONALES --------------------------------------->
            <div
              v-if="trabajo.consigna"
              id="datosPersonales"
              :class="{ active: tab === 3 }"
              class="tab-pane"
              role="tabpanel"
            >
              <div class="m-2">
                <div class="clearfix">
                  <div-persona :persona="trabajo.persona" />
                </div>

                <table v-if="trabajo.persona.datos" class="mt-3 clearfix table table-striped">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Telefono</strong>
                      </td>
                      <td>{{ trabajo.persona.datos.telefono }}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Celular</strong>
                      </td>
                      <td>{{ trabajo.persona.datos.celular }}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Correo Electronico</strong>
                      </td>
                      <td>{{ trabajo.persona.datos.email }}</td>
                    </tr>
                  </tbody>
                </table>

                <div v-else>
                  La persona no tiene datos personales por mi rincon, esto es poco probrable. por lo general sucede
                  cuando un administrador inscribe a una persona a un evento y esta persona nunca se registro en mi
                  rincon
                </div>
              </div>
            </div>
            <!-----------------------------------  FIN BLOQUE DATOS PERSONALES --------------------------------------->
          </div>
        </div>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  data() {
    return {
      tab: 1 /* TAB SELECCIONADA */,
      grid: {
        data: {},
      },
      trabajo: { editable: false },
    }
  },
  computed: {
    // a computed getter
    trabajoUuid() {
      return this.$route.params.uuid
    },
    participanteUuid() {
      return this.$route.params.participante_uuid
    },
  },

  created() {
    this.getParticipanteTrabajo()
    this.getDetalleTrabajo()
  },

  methods: {
    tabs(tab) {
      this.tab = tab
    },
    getParticipanteTrabajo() {
      this.$axios
        .get(`/formacion/trabajos/${this.trabajoUuid}/participantes/${this.participanteUuid}`)
        .then((response) => {
          this.trabajo = response.data.data
        })
    },
    getAdjuntoTp(file) {
      return this.$axios({
        url: '/formacion/trabajos/participante/' + this.participanteUuid + '/descargar/' + file,
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', atob(file).split('/').pop())
        document.body.appendChild(link)
        link.click()
      })
    },

    getDetalleTrabajo() {
      this.$axios.get('/formacion/trabajos/participante/' + this.participanteUuid).then((response) => {
        this.grid.data = response.data.data
      })
    },
  },
}
</script>
