<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Lugares</titulo>
    </template>
    <div class="card card-accent-primary">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label">Nombre</label>
              <input v-model="form.nombre" class="form-control input-sm" type="text" required />
              <error input="nombre" />
            </div>
            <div class="form-group">
              <label class="control-label">Apellido</label>
              <input v-model="form.apellido" class="form-control input-sm" type="text" required />
              <error input="apellido" />
            </div>
            <div class="form-group">
              <label class="control-label">celular</label>
              <input v-model="form.celular" class="form-control input-sm" type="text" required />
              <error input="celular" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label">Organismo</label>
              <select-organismos v-model="form.organismos_id"></select-organismos>
              <error input="maps" />
            </div>
            <div class="form-group">
              <label class="control-label">Funcion</label>
              <select v-model="form.personas_funciones_tipo_id" class="form-control">
                <option v-for="funcion in comboFunciones" :key="funcion.id" :value="funcion.id">
                  {{ funcion.nombre }}
                </option>
              </select>
              <error input="comentario" />
            </div>
          </div>
          <button v-promise-btn class="btn-block btn btn-success" @click="submitCrear">Crear Lugar</button>
        </div>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'eventos.lugares.abm' },
  },
  data() {
    return {
      form: {}, // aca van los datos del formulario completado
      comboFunciones: {},
    }
  },
  created() {
    this.getDatos()
    this.getComboFunciones()
  },
  methods: {
    getDatos() {
      this.$axios.get('/administrador/registro_pendiente/' + this.$route.params.uuid).then((response) => {
        this.form = response.data
      })
    },
    submitCrear() {
      return this.$axios
        .post('/administrador/registro_pendiente', this.form)
        .then(() => {
          this.$router.back()
        })
        .catch((err) => {
          return err
        })
    },
    getComboFunciones() {
      this.$axios.get('/varios/funciones/').then((response) => {
        this.comboFunciones = response.data
      })
    },
  },
}
</script>
