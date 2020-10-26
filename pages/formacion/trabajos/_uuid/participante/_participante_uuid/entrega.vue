<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Cargar Trabajo</titulo>
    </template>
    <div class="card card-accent-primary">
      <div class="card-body">
        <div role="tabpanel">
          <b-nav class="nav-tabs" fill>
            <b-nav-item :active="tab === 1" @click="tabs(1)">Subir TP</b-nav-item>
            <b-nav-item :active="tab === 2" @click="tabs(2)">Redactar TP</b-nav-item>
          </b-nav>
          <div class="tab-content">
            <div :class="{ active: tab === 1 }" class="tab-pane" role="tabpanel">
              <label>Cargar trabajo (Solo se permiten archivos hasta 5 Mb)</label>
              <b-form-file id="adjunto" v-model="adjunto" placeholder="Seleccione su Trabajo" />
              <error input="adjunto" />
              <hr />
              <button v-promise-btn class="btn btn-success" @click="enviarAdjunto">Subir y Enviar Trabajo</button>
              <b-button variant="danger" @click="$router.back()">Cancelar</b-button>
            </div>
            <div :class="{ active: tab === 2 }" class="tab-pane" role="tabpanel">
              <hr />
              <label>Redactar trabajo</label>
              <div style="height: 350px">
                <quill-editor v-model="redactado" style="height: 300px" />
              </div>
              <hr />
              <button v-promise-btn class="btn btn-success" @click="enviarRedactado">Enviar Trabajo Redactado</button>
              <b-button :to="'/formacion/trabajos/participante/' + this.$route.params.uuid" variant="danger">
                Cancelar
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContentWrapper>
</template>
<style scoped>
.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: 'Seleccionar Trabajo';
}
</style>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  components: { quillEditor },
  data() {
    return {
      tab: 2 /* TAB SELECCIONADA */,
      redactado: '',
      adjunto: null,
    }
  },
  computed: {
    participanteUuid() {
      return this.$route.params.participante_uuid
    },
  },
  methods: {
    tabs(tab) {
      this.tab = tab
    },
    enviarRedactado() {
      return this.$axios
        .post('/formacion/trabajos/participante/' + this.participanteUuid + '/entrega', {
          redactado: this.redactado,
        })
        .then(() => {
          this.$router.back()
        })
    },
    enviarAdjunto() {
      const data = new FormData()
      data.append('adjunto', document.getElementById('adjunto').files[0])
      this.$axios.defaults.timeout = 1000 * 60 * 3 // Le doy 3 min de timeOut
      return this.$axios
        .post('/formacion/trabajos/participante/' + this.participanteUuid + '/entrega', data)
        .then(() => {
          this.$router.back()
        })
    },
  },
}
</script>
