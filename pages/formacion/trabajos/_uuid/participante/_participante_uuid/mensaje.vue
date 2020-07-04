<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Sistema de Mensajes de Trabajos</titulo>
    </template>
    <alerta tipo="info">
      El envió de mensajes es la forma más práctica de enviarle un mensaje al formador que está a cargo de tu trabajo y
      al director de la experiencia
    </alerta>
    <div class="card card-accent-primary">
      <div class="card-body">
        <label>Redactar Mensaje</label>
        <div style="height: 200px;">
          <quill-editor v-model="mensaje" style="height: 150px;"></quill-editor>
        </div>
        <hr />
        <button v-promise-btn class="btn btn-success" @click="enviarMensaje">Enviar Mensaje</button>
        <b-button variant="danger" @click="$router.back()">Cancelar</b-button>
        <!--
        <b-button :to="'/main/trabajos/participante/' + this.$route.params.uuid" variant="danger">Cancelar</b-button>
      --></div>
    </div>
  </ContentWrapper>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  components: { quillEditor },
  data() {
    return {
      mensaje: '',
    }
  },
  computed: {
    participanteUuid() {
      return this.$route.params.participante_uuid
    },
  },
  methods: {
    enviarMensaje() {
      return this.$axios
        .post(`/formacion/trabajos/participante/${this.participanteUuid}/mensaje`, {
          mensaje: this.mensaje,
        })
        .then(() => {
          this.$router.back()
        })
    },
  },
}
</script>
