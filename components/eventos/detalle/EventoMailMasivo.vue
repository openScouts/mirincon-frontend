<template>
  <div>
    <b-modal
      id="modal-mail-masivo"
      ref="myModalRef"
      hide-footer
      centered
      size="lg"
      title="Envio de Mail masivo a los participantes adultos"
    >
      <div style="height: 400px;">
        <quill-editor v-model="texto" style="height: 300px;" />
      </div>
      <button v-promise-btn class="btn btn-success btn-block" @click="sendMailMasivo">Enviar Mail</button>
    </b-modal>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  components: { quillEditor },
  props: {
    evento: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      texto: '',
    }
  },
  methods: {
    showModal() {
      this.$refs.myModalRef.show()
    },
    hideModal() {
      this.$refs.myModalRef.hide()
    },
    sendMailMasivo() {
      this.$axios
        .post('/eventos/eventos/email/masivo', {
          texto: this.texto,
          evento_uuid: this.evento.uuid, // UUID del evento
        })
        .then(() => {
          this.texto = ''
          this.hideModal()
        })
    },
  },
}
</script>
