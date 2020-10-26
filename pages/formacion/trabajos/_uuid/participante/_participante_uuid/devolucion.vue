<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Devolucion de Trabajos</titulo>
    </template>
    <div class="card card-accent-primary">
      <div class="card-body">
        <select v-model="form.estado" class="form-control" required="required">
          <option value selected="selected">Defina un Estado</option>
          <option value="3">Devolver al participante para correccion</option>
          <option value="4">Aprobado</option>
          <option value="5">Desaprobado</option>
        </select>
        <error input="estado" />
        <hr />
        <button v-promise-btn type="button" class="btn btn-success" @click="sendDevolucion">Cargar devolucion</button>
        <b-button variant="danger" @click="$router.back()">Cancelar</b-button>
        <!--
        <b-button :to="'/formacion/trabajos/participante/' + this.$route.params.uuid" variant="danger">
          Cancelar
        </b-button>-->
        <hr />
        <label>Redactar Devolucion</label>
        <div style="height: 400px">
          <error input="mensaje" />
          <quill-editor v-model="form.mensaje" style="height: 350px" />
        </div>
        <hr />
        <button v-promise-btn type="button" class="btn btn-success" @click="sendDevolucion">Cargar devolucion</button>
        <b-button :to="'/formacion/trabajos/participante/' + this.$route.params.uuid" variant="danger">
          Cancelar
        </b-button>
      </div>
    </div>
  </ContentWrapper>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  meta: {
    auth: { rol: 'Formador' },
  },
  components: { quillEditor },
  data() {
    return {
      form: {},
    }
  },
  computed: {
    participanteUuid() {
      return this.$route.params.participante_uuid
    },
  },
  methods: {
    sendDevolucion() {
      return this.$axios
        .post(`/formacion/trabajos/participante/${this.participanteUuid}/devolucion`, this.form)
        .then(() => {
          this.$router.back()
        })
    },
  },
}
</script>
