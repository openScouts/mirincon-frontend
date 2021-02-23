<template>
  <b-modal ref="myModalRef" centered hide-footer @close="cancelar()">
    <div v-if="form.persona" slot="modal-header">
      Editanto: {{ form.persona.apellidoynombre }}
      <div-experiencia-estado :estado="form.estado" />
    </div>
    <alerta v-if="$_.size(participante) && participante.fehaciente !== 'S'" tipo="info">
      El evento no es Fehaciente, al guardar presionar el boton guardar, para a ser un evento info
    </alerta>
    <!--
    <div v-if="curso.solicita_rama" class="form-group">
      <label class="control-label">Rama</label>
      <select-ramas v-model="form.rama" :value="form.rama" />
    </div>
    -->
    <div v-if="!$_.size(participante)">
      <vacio texto="Buscando Datos"></vacio>
    </div>
    <div v-if="$_.size(participante)" class="row">
      <div class="col-6">
        <div id="libro" class="form-group">
          <label class="control-label">Libro</label>
          <input
            v-model="form.libro"
            v-focus
            class="form-control input-sm"
            required="required"
            placeholder="Ingrese un Libro"
            type="text"
          />
          <error input="libro" />
        </div>
      </div>
      <div class="col-6">
        <div id="folio" class="form-group">
          <label class="control-label">Folio</label>
          <input
            v-model="form.folio"
            class="form-control input-sm"
            required="required"
            placeholder="Ingrese un Folio"
            type="text"
          />
          <error input="folio" />
        </div>
      </div>
    </div>
    <!-- SI Esta pendiente de TP no permito corregir, a menos que tenga realmente un tp !!-->
    <div v-if="$_.size(participante)" id="estado_id" class="form-group">
      <select v-model="form.estado_id" class="form-control" required="required">
        <template v-for="estado in estados">
          <option :key="estado.id" :class="'bg-' + estado.color" :value="estado.id">
            {{ estado.nombre }}
          </option>
        </template>
      </select>
      <error input="estado_id" />
    </div>
    <button v-promise-btn class="btn-block btn btn-success" @click="saveData()">Guardar</button>
  </b-modal>
</template>
<script>
import Alerta from '~/components/genericos/Alerta.vue'
export default {
  components: { Alerta },
  meta: {
    auth: { permiso: 'formacion.experiencias' },
  },
  data() {
    return {
      form: {},
      cursante: {},
      participante: {},
      estados: {},
    }
  },
  created() {
    this.getEstados()
  },
  methods: {
    open(obj) {
      this.cursante = obj
      this.form = {}
      this.participante = {}
      this.getData()
      this.$refs.myModalRef.show()
    },
    cancelar() {},
    hideModal() {
      this.$refs.myModalRef.hide()
    },
    saveData() {
      return this.$axios.put('/formacion/participantes', this.form).then(() => {
        this.form = {}
        this.$refs.myModalRef.hide()
      })
    },
    getEstados() {
      this.$axios.get('/formacion/participantes/estados').then((response) => {
        this.estados = response.data
      })
    },
    getData() {
      this.$axios.get('/formacion/participantes/' + this.cursante.uuid + '/editar').then((response) => {
        this.participante = response.data
        this.form = {
          estado_id: this.participante.ams_participantes_estado_id,
          folio: this.participante.folio,
          libro: this.participante.libro,
          rama: this.participante.rama,
          uuid: this.participante.uuid,
        }
      })
    },
  },
}
</script>
