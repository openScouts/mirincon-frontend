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
              <input
                v-model="form.nombre"
                class="form-control input-sm"
                type="text"
                required
                placeholder="Nombre del Lugar"
              />
              <error input="nombre" />
            </div>
            <div class="form-group">
              <label class="control-label">Direccion</label>
              <input
                v-model="form.direccion"
                class="form-control input-sm"
                type="text"
                required
                placeholder="Direccion"
              />
              <error input="direccion" />
            </div>
            <div class="form-group">
              <label class="control-label">Provincia</label>
              <input
                v-model="form.provincia"
                class="form-control input-sm"
                type="text"
                required
                placeholder="Localidad"
              />
              <error input="provincia" />
            </div>
            <div class="form-group">
              <label class="control-label">Partido</label>
              <input
                v-model="form.partido"
                class="form-control input-sm"
                type="text"
                required
                placeholder="Localidad"
              />
              <error input="partido" />
            </div>
            <div class="form-group">
              <label class="control-label">Localidad</label>
              <input
                v-model="form.localidad"
                class="form-control input-sm"
                type="text"
                required
                placeholder="Localidad"
              />
              <error input="localidad" />
            </div>
            <div class="form-group">
              <label class="control-label">Telefono</label>
              <input
                v-model="form.telefono"
                class="form-control input-sm"
                type="text"
                required
                placeholder="Ingrese el nombre del Evento"
              />
              <error input="telefono" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label">Link Google Maps</label>
              <input
                v-model="form.maps"
                class="form-control input-sm"
                type="text"
                required
                placeholder="Ingrese el nombre del Evento"
              />
              <error input="maps" />
            </div>
            <div class="form-group">
              <label class="control-label">Comentario</label>
              <textarea
                v-model="form.comentario"
                rows="15"
                class="form-control input-sm"
                type="text"
                required
                placeholder="Ingrese comentarios de interes, Por Ej. de como llegar al lugar"
              />
              <error input="comentario" />
            </div>
          </div>
          <template v-if="$route.params.uuid">
            <button v-promise-btn class="btn-block btn btn-success" @click="submitUpdate">Actualizar Lugar</button>
          </template>
          <template v-else>
            <button v-promise-btn class="btn-block btn btn-success" @click="submitCrear">Crear Lugar</button>
          </template>
        </div>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'gestion.insumos.abm' },
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
      this.$axios.get('/eventos/lugar/' + this.$route.params.uuid).then((response) => {
        this.form = response.data
      })
    },
    submitCrear() {
      return this.$axios
        .post('/eventos/lugar', this.form)
        .then(() => {
          this.$router.back()
        })
        .catch((err) => {
          return err
        })
    },
    submitUpdate() {
      return this.$axios
        .put('/eventos/lugar', this.form)
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
