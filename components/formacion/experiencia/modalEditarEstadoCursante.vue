<template>
  <b-modal ref="myModalRef" centered hide-footer @close="cancelar()">
    <div v-if="form.persona" slot="modal-header">
      Editanto: {{ form.persona.apellidoynombre }}
      <div-experiencia-estado :estado="form.estado" />
    </div>
    <div v-if="curso.solicita_rama" class="form-group">
      <label class="control-label">Rama</label>
      <select-ramas v-model="form.rama" :value="form.rama" />
    </div>
    <div class="row">
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
    <div id="estado_id" class="form-group">
      <select v-model="form.estado_id" class="form-control" required="required">
        <option value="1">En Curso</option>
        <option value="2">Acreditado</option>
        <option value="3" disabled>Pendiente TP</option>
        <option value="4">Homologa</option>
        <option value="5">Recursar</option>
        <option value="6">Ausente</option>
      </select>
      <error input="estado_id" />
    </div>
    <button v-promise-btn class="btn-block btn btn-success" @click="saveData()">Guardar</button>
  </b-modal>
</template>
<script>
export default {
  meta: {
    auth: { permiso: 'formacion.experiencias' },
  },
  props: {
    curso: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {},
    }
  },
  methods: {
    open(obj) {
      this.form = {
        estado_id: obj.estado_id,
        folio: obj.folio,
        libro: obj.libro,
        rama: obj.rama,
        uuid: obj.uuid,
      }
      this.$refs.myModalRef.show()
    },
    cancelar() {
      // console.log('Evento Cancelado!!')
    },
    hideModal() {
      this.$refs.myModalRef.hide()
    },
    saveData() {
      return this.$axios.put('/formacion/participantes', this.form).then(() => {
        this.form = {} // borro x las dudas .. solo de molesto
        this.$emit('recargarDatos', 'recargar')
        this.$refs.myModalRef.hide()
      })
    },
  },
}
</script>
