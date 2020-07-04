<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>
        <span class="fas cis-im" />
        Detalle de Insignia de Madera de {{ persona.apellidoynombre }}
      </titulo>
    </template>
    <b-card id="detalleIM" class="card-accent-primary">
      <div slot="header"><span class="fas cis-im" /> Datos de Insignia de Madera</div>
      <insignia-madera :uuid="UUID"></insignia-madera>
    </b-card>
    <b-card id="detalleIM" class="card-accent-primary">
      <div slot="header">
        <span class="fas cis-im" /> Actualizaciones
        <button v-b-modal.modal-1 class="float-right btn btn-primary">
          <em class="fas cis-im"></em> Cargar Actualizacion
        </button>
      </div>
      <b-table :items="grid.items" :fields="grid.fields" striped hover small responsive>
        <template v-slot:cell(fecha)="data">{{ data.value | Date }}</template>
      </b-table>
    </b-card>
    <b-modal id="modal-1" ref="modal" :title="'Cargar Nueva Actualización a ' + persona.apellidoynombre" centered>
      <div class="row">
        <div class="col-6">
          <b-input-group label="Folio: ">
            <input
              v-model="form.libro"
              class="form-control input-sm"
              required="required"
              placeholder="Ingrese un Folio"
              type="text"
            />
            <error input="libro" />
          </b-input-group>
        </div>
        <div class="col-6">
          <b-input-group label="Libro: ">
            <input
              v-model="form.folio"
              class="form-control input-sm"
              required="required"
              placeholder="Ingrese un Libro"
              type="text"
            />
            <error input="folio" />
          </b-input-group>
        </div>
        <div class="col-12 pt-2">
          <b-form-group label="Fecha de Revalida: ">
            <b-input-group>
              <b-form-input v-model="form.fecha" size="sm" type="date" />
              <b-input-group-append>
                <span class="input-group-text">
                  <i class="fas fa-calendar-alt" />
                </span>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </div>
      </div>
      <div slot="modal-footer">
        <button v-promise-btn class="btn btn-success" @click="sendActualizacion">Enviar Actualizacion</button>
      </div>
    </b-modal>
  </ContentWrapper>
</template>

<script>
import InsigniaMadera from '~/components/formacion/persona/insigniaMadera.vue'
export default {
  meta: {
    auth: { permiso: 'formacion.maestro_scout' },
  },
  components: { InsigniaMadera },
  data() {
    return {
      form: {},
      persona: {},
      grid: {
        fields: [
          { key: 'rel_organismo.codigo_full', label: 'Organismo' },
          'libro',
          'folio',
          { key: 'fecha', label: 'Actualizada' },
          'observaciones',
        ],
        items: [],
      },
    }
  },
  computed: {
    UUID() {
      return this.$route.params.persona_uuid
    },
  },
  mounted() {
    this.getPersona()
    this.getActualizaciones()
  },
  methods: {
    sendActualizacion() {
      this.form.persona_uuid = this.persona.uuid
      return this.$axios.post('/formacion/im/actualizacion', this.form).then(() => {
        this.$refs.modal.hide()
        this.$router.back()
      })
    },
    getPersona() {
      this.$axios.get(`/persona/persona/${this.UUID}`).then((response) => {
        this.persona = response.data
      })
    },
    getActualizaciones() {
      this.$axios.get(`/formacion/im/actualizacion/${this.UUID}`).then((response) => {
        this.grid.items = response.data
      })
    },
  },
}
</script>
