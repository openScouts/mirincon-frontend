<template>
  <div>
    <div v-if="dataset === null">
      <h5 class="m-5">Buscando Datos .......</h5>
    </div>
    <div v-else>
      <template v-if="dataset.length === 0">
        <vacio></vacio>
      </template>
      <template v-else>
        <b-table striped hover small responsive stacked="md" :items="dataset" :fields="columns">
          <template #cell(evento)="data">
            <b-row>
              <b-col sm="2">
                <img :src="'/img/areas/' + data.item.area_codigo.toLowerCase() + '.svg'" width="50" height="50" />
              </b-col>
              <b-col sm="10">
                {{ data.item.evento }}
                <div class="text-muted">
                  <span>Area :</span>
                  {{ data.item.area }}
                  <br />
                  <span>Org. :</span>
                  {{ data.item.organismo }}
                </div>
              </b-col>
            </b-row>
          </template>
          <template #cell(costo)="data"> ${{ data.value }} </template>
          <template #cell(pauta)="data">
            <button class="btn btn-primary" @click="modalPauta(data.item.pauta)">Ver Pauta</button>
          </template>
          <template #cell(fecha_evento)="data">
            <b-col sm="10">
              <div class="text-muted">
                <span>Fecha Evento :</span>
                {{ data.item.fecha_evento | DateTime }}
                <br />
                <span>Cierre Inscripcion. :</span>
                {{ data.item.cierre_inscripcion | Date }} 23:59
              </div>
            </b-col>
          </template>
          <template #cell(estado)="data">
            <template v-if="data.item.inscripto_uuid">
              <div class="text-success"><i class="fas fa-thumbs-up" /> Yo Participo</div>
            </template>
            <template v-else>
              <div class="text-danger"><i class="fas fa-thumbs-down" /> NO participo</div>
            </template>
          </template>
          <template #cell()="data">
            <div class="text-center">
              <template v-if="data.item.beneficiarios && user.is.grupo && user.persona.adulto">
                <b-button variant="info" :to="'/main/eventos/' + data.item.uuid">Avanzado</b-button>
              </template>
              <template v-else>
                <!-- Esta vista la muestro a beneficiarios y adultos que no trabajan en grupo -->
                <template v-if="validoEstadoEvento(data.item)">
                  <template v-if="data.item.inscripto_uuid">
                    <button v-promise-btn class="btn btn-danger" @click="darDeBajaInscripto(data.item.inscripto_uuid)">
                      Darme de Baja
                    </button>
                  </template>
                  <template v-else>
                    <template v-if="!data.item.cupo"> Sin Cupo </template>
                    <template v-else>
                      <button v-promise-btn class="btn btn-success" @click="anotarmeModal(data.item)">Anotarme</button>
                    </template>
                  </template>
                </template>
                <template v-else>
                  <div class="text-center small">
                    Inscripcion Cerrada el
                    <br />
                    {{ data.item.cierre_inscripcion | Date }}
                  </div>
                </template>
              </template>
            </div>
          </template>
        </b-table>
      </template>
    </div>

    <b-modal
      ref="myModalRef"
      centered
      hide-footer
      header-text-variant="light"
      title="Confirmacion de Inscripcion"
      header-bg-variant="primary"
    >
      <label>Confirma la lectua de la pauta</label>
      <b-form-select v-model="form.lectura" class="mb-3">
        <option value="N">NO he leído la pauta</option>
        <option value="S">SI he leído la pauta</option>
      </b-form-select>
      <template v-if="modalEvento.rama">
        <label>El evento requiere confirmar sobre que rama va realizar la cursada.</label>
        <select-ramas v-model="form.rama" solo="P"></select-ramas>
      </template>
      <hr />
      <template v-if="form.lectura === 'S'">
        <alerta tipo="info"> Usted y su Jefe de Grupo recibiran un mail con la confirmacion de Participacion </alerta>
        <button v-promise-btn class="btn btn-success" @click="darDeAltaInscripto()">Confirmar Participacion</button>
      </template>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    tipo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      columns: [
        { label: 'Evento', key: 'evento' },
        { label: 'Costo', key: 'costo' },
        { label: 'Fechas', key: 'fecha_evento' },
        { label: 'Pauta', key: 'pauta' },
        { label: 'Mi Estado', key: 'estado' },
        { label: 'Opciones', key: 'opciones' },
      ],
      dataset: null,
      pauta: null,
      form: { lectura: 'N' },
      modalEvento: {},
    }
  },
  created() {
    this.getEventos()
  },
  methods: {
    validoEstadoEvento(evento) {
      const fechaCierre = this.$moment(evento.cierre_inscripcion).format('YYYY-MM-DD')
      return this.$moment().diff(fechaCierre, 'days') < 1
      // return this.$moment(evento.f_cierre_inscripcion).format('YYYY-MM-DD') >= this.$moment().format('YYYY-MM-DD')
    },
    modalPauta(pauta) {
      this.$swal.fire({
        title: 'Detalle de la Pauta',
        html: pauta,
        width: '80%',
      })
    },
    anotarmeModal(evento) {
      this.form = { lectura: 'N' }
      this.info = false
      this.modalEvento = evento
      this.form.evento_uuid = evento.uuid
      this.$refs.myModalRef.show()
    },
    darDeAltaInscripto() {
      this.info = true
      return this.$axios.post('/eventos/inscriptos', this.form).then(() => {
        this.getEventos()
        this.$refs.myModalRef.hide()
      })
    },
    darDeBajaInscripto(inscriptoUuid) {
      this.$swal
        .fire({
          title: 'Generacion de baja',
          text: 'Esta seguro de generar la baja ?',
          icon: 'warning',
          showCancelButton: true,
        })
        .then((result) => {
          if (result.value) {
            this.$axios
              .delete('/eventos/inscriptos', {
                params: { inscripto_uuid: inscriptoUuid },
              })
              .then(() => {
                this.getEventos()
              })
          } else {
            this.$swal.fire('Cancelo la baja')
          }
        })
    },

    getEventos() {
      this.$axios.get('/eventos/eventos/disponibles', { params: { tipo: this.tipo } }).then((response) => {
        this.dataset = response.data.data
      })
    },
  },
}
</script>

<style scoped>
.VueTables >>> * tr th:nth-child(1) {
  width: 30%;
}

.VueTables >>> * tr th:nth-child(2) {
  width: 5%;
}

.VueTables >>> * tr th:nth-child(3) {
  width: 15%;
}

.VueTables >>> * tr th:nth-child(4) {
  width: 15%;
}

.VueTables >>> * tr th:nth-child(5) {
  width: 20%;
}
</style>
