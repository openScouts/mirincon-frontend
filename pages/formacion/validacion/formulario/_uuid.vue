<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Formulario de Validaciones</titulo>
    </template>
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6">
            <div class="card card-accent-primary">
              <div class="card-header">Cargar Nueva Validacion</div>
              <div class="card-body">
                <div class="form-group">
                  <label class="control-label">Documento</label>
                  <input-persona v-model="form.persona_uuid" :value="form.persona_uuid" />
                  <error input="persona_uuid" />
                </div>
                <div class="form-group">
                  <label class="control-label">Validacion</label>
                  <select v-model="form.ams_validacion_tipo_id" class="form-control">
                    <template v-for="(validacion, index) in validaciones">
                      <option :key="index" :value="validacion.id">
                        {{ validacion.nombre }}
                      </option>
                    </template>
                  </select>
                  <error input="ams_validacion_tipo_id" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card card-accent-primary">
              <div class="card-header">Organismo que emitio la validacion (GRUPO)</div>
              <div class="card-body">
                <div class="form-group">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label">Fecha</label>
                        <input
                          v-model="form.fecha"
                          class="form-control input-sm"
                          pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                          placeholder="Fecha del Acta"
                          type="date"
                        />
                        <error input="fecha" />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <label class="control-label">Libro</label>
                        <input v-model="form.grupo_libro" class="form-control input-sm" type="text" />
                        <error input="grupo_libro" />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="form-group">
                        <label class="control-label">Folio</label>
                        <input v-model="form.grupo_folio" class="form-control input-sm" type="text" />
                        <error input="grupo_folio" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6">
            <nuxt-link to="/formacion/validacion" class="btn btn-block btn btn-danger"> Cancelar </nuxt-link>
            <template v-if="isEdicion">
              <button v-promise-btn class="btn-block btn btn-success" @click="actualizarHabilitacion()">
                Actualizar Solicitud
              </button>
            </template>
            <template v-else>
              <button v-promise-btn class="btn-block btn btn-success" @click="solicitarHabilitacion()">
                Cargar informacion
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'formacion.validacion.abm' },
  },
  data() {
    return {
      validaciones: {},
      // validacionesPersona: [], // aca cargo las validacion si el documento tuviera alguna
      form: {}, // aca van los datos del formulario completado
    }
  },
  computed: {
    isEdicion() {
      if (this.$route.params.uuid === undefined) {
        return false
      }
      return true
    },
  },
  created() {
    this.getValidaciones()
    this.getDatos()
  },
  methods: {
    getValidaciones() {
      this.$axios.get('varios/formacion/validaciones').then((response) => {
        this.validaciones = response.data
      })
    },
    actualizarHabilitacion() {
      return this.$axios.put('/formacion/validacion/', this.form).then(() => {
        this.$router.push({ path: '/formacion/validacion' })
      })
    },

    solicitarHabilitacion() {
      return this.$axios
        .post('/formacion/validacion', this.form)
        .then(() => {
          this.$router.push({ path: '/formacion/validacion' })
        })
        .catch((err) => {
          return err
        })
    },
    getDatos() {
      if (this.isEdicion) {
        this.$axios.get('/formacion/validacion/' + this.$route.params.uuid + '/editar').then((response) => {
          this.form = response.data.data
        })
      }
    },
  },
}
</script>
