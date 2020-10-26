<template>
  <b-modal ref="myModalRef" title="Gestion del TP">
    <div class="form-group">
      <label>Estado del Trabajo</label>
      <select v-model="form.estado_id" class="form-control">
        <option v-for="estado in estados" :key="estado.id" :value="estado.id">
          {{ estado.nombre }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label>Fecha Limite Entrega</label>
      <input v-model="form.f_entrega" class="form-control" type="date" />
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    trabajo: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      form: {},
      estados: {},
    }
  },
  created() {
    this.form.estado_id = this.trabajo.estado_id
    this.form.f_entrega = this.trabajo.f_entrega
    this.getEstados()
  },
  methods: {
    showModal() {
      this.$refs.myModalRef.show()
    },
    hideModal() {
      // this.persona.items = null;
      this.$refs.myModalRef.hide()
    },
    saveTrabajo() {
      //
      this.$axios.post('/eventos/eventos/enviar_mail_masivo', {})
    },
    getEstados() {
      this.$axios.get('/varios/formacion/trabajos/estados/cursantes').then((response) => {
        this.estados = response.data
      })
    },
  },
}
</script>
