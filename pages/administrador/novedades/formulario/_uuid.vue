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
              <label class="control-label">Titulo</label>
              <input v-model="form.titulo" class="form-control input-sm" type="text" required placeholder="Titulo" />
              <error input="titulo" />
            </div>
            <div class="form-group">
              <label class="control-label">Link</label>
              <input
                v-model="form.link"
                class="form-control input-sm"
                type="text"
                required
                placeholder="Ingrese Link"
              />
              <error input="link" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label">Fecha Inicio</label>
              <b-form-input v-model="form.f_inicio" type="date" placeholder="Fecha Inicio" />
              <error input="f_inicio" />
            </div>
            <div class="form-group">
              <label class="control-label">Fecha Fin</label>
              <b-form-input v-model="form.f_fin" type="date" placeholder="Fecha Fin" />
              <error input="f_fin" />
            </div>
          </div>
          <div class="form-group col-md-12">
            <label class="control-label">Detalle</label>
            <textarea
              v-model="form.detalle"
              rows="3"
              class="form-control input-sm"
              type="text"
              required
              placeholder="Ingrese Detalle "
            />
            <error input="detalle" />
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
    auth: { permiso: 'administrador.novedades' },
  },
  data() {
    return {
      form: {}, // aca van los datos del formulario completado
    }
  },
  created() {
    if (this.$route.params.uuid) {
      this.getDatos()
    }
  },
  methods: {
    getDatos() {
      this.$axios.get('/administrador/novedades/' + this.$route.params.uuid).then((response) => {
        this.form = response.data
      })
    },
    submitCrear() {
      return this.$axios
        .post('/administrador/novedades', this.form)
        .then(() => {
          this.$router.back()
        })
        .catch((err) => {
          return err
        })
    },
    submitUpdate() {
      return this.$axios
        .put('/administrador/novedades', this.form)
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
