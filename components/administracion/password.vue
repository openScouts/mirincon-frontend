<template>
  <b-modal
    id="modal-cambio-clave"
    ref="myModalRef"
    hide-footer
    centered
    size="lg"
    title="Cambiar la contraseña del usuario"
  >
    <alerta tipo="alerta">Tenga en cuenta que esta accion sera auditada</alerta>
    <div class="form-group">
      <label class="control-label">Contraseña</label>
      <input v-model="form.password" class="form-control input-sm" type="password" required />
      <error input="password" />
    </div>

    <div class="form-group">
      <label class="control-label">Repetir Contraseña</label>
      <input v-model="form.password_confirmation" class="form-control input-sm" type="password" required />
      <error input="password_confirmation" />
    </div>
    <div class="form-group">
      <label class="control-label">Motivo</label>
      <textarea v-model="form.motivo" class="form-control input-sm" required />
      <error input="motivo" />
    </div>
    <button v-promise-btn class="btn-block btn btn-success" @click="submitCambiarClave">
      Cambiar Contraseña
    </button>
  </b-modal>
</template>

<script>
export default {
  props: {
    uuid: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      form: {},
    }
  },

  methods: {
    showModal() {
      this.$refs.myModalRef.show()
    },
    hideModal() {
      this.$refs.myModalRef.hide()
    },
    submitCambiarClave() {
      this.form.uuid = this.uuid
      return this.$axios.put('/administrador/usuarios/password', this.form).then(() => {
        this.form = {}
        this.hideModal()
      })
    },
  },
}
</script>
