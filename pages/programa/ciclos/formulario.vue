<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Cargar Nuevo Ciclo de Programa</titulo>
    </template>
    <div class="card card-accent-primary">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label">Titulo</label>
              <input v-model="form.titulo" class="form-control input-sm" type="text" required placeholder="Titulo" />
              <error input="titulo" />
            </div>
            <div class="form-group">
              <label>Adjuntar Ciclo de Programa (Solo se permiten archivos hasta 5 Mb)</label>
              <b-form-file id="adjunto" placeholder="Seleccione el adjunto" />
              <error input="adjunto" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label">Fecha Inicio</label>
              <b-form-input v-model="form.f_desde" type="date" placeholder="Fecha Inicio" />
              <error input="f_desde" />
            </div>
            <div class="form-group">
              <label class="control-label">Fecha Fin</label>
              <b-form-input v-model="form.f_hasta" type="date" placeholder="Fecha Fin" />
              <error input="f_hasta" />
            </div>
          </div>

          <div class="form-group col-md-12">
            <label class="control-label">Descripcion</label>
            <textarea
              v-model="form.descripcion"
              rows="3"
              class="form-control input-sm"
              type="text"
              required
              placeholder="Ingrese descripcion "
            />
            <error input="descripcion" />
          </div>
          <template v-if="$route.params.uuid">
            <button v-promise-btn class="btn-block btn btn-success" @click="submitUpdate">Actualizar Novedad</button>
          </template>
          <template v-else>
            <button v-promise-btn class="btn-block btn btn-success" @click="submitCrear">Crear Novedad</button>
          </template>
        </div>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'programa.ciclos.abm' },
  },
  data() {
    return {
      form: {}, // aca van los datos del formulario completado
    }
  },
  created() {},
  methods: {
    submitCrear() {
      const formulario = new FormData()
      formulario.append('descripcion', this.form.descripcion)
      formulario.append('titulo', this.form.titulo)
      formulario.append('f_desde', this.form.f_desde)
      formulario.append('f_hasta', this.form.f_hasta)
      formulario.append('adjunto', document.getElementById('adjunto').files[0])
      formulario.append('descripcion', this.form.descripcion)

      return this.$axios
        .post('/programa/ciclos', formulario)
        .then(() => {
          this.$router.back()
        })
        .catch((err) => {
          return err
        })
    },
  },
}
</script>
