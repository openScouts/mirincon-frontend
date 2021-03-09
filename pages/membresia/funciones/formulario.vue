<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo> Asignar Nueva Funcion </titulo>
    </template>
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6">
            <div id="formulario" class="card card-accent-primary">
              <div class="card-header">Cargar Nueva Funcion</div>
              <div class="card-body p-2">
                <div class="form-group">
                  <label class="control-label">Documento</label>
                  <input-persona v-model="form.documento" :value="form.documento" />
                  <error input="documento"></error>
                </div>

                <select-organismos v-model="organismoSeleccionado"></select-organismos>
                <div class="form-group">
                  <label class="control-label">Funciones Disponibles</label>
                  <select v-model="form.funciones_tipo_id" class="form-control">
                    <option v-for="funcion in comboFunciones" :key="funcion.id" :value="funcion.id">
                      {{ funcion.nombre }}
                    </option>
                  </select>

                  <error input="funciones_tipo_id"></error>
                </div>
              </div>

              <button v-promise-btn class="btn btn-success m-2" @click="crearFuncion()">Gurdar IM</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'membresia.persona' },
  },
  data() {
    return {
      form: {},
      comboFunciones: {},
      organismoSeleccionado: null,
    }
  },
  watch: {
    organismoSeleccionado(value) {
      this.form.organismos_id = value
      this.getComboFunciones(value)
    },
  },
  mounted() {
    // this.getComboFunciones()
  },
  methods: {
    crearFuncion() {
      return this.$axios.post('/persona/funcion', this.form).then(() => {
        this.$router.push({ path: '/membresia/funciones' })
      })
    },
    getComboFunciones(organismoId) {
      this.$axios.get('/varios/funciones/' + organismoId).then((response) => {
        this.comboFunciones = response.data
      })
    },
  },
}
</script>
