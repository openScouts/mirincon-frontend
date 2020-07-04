<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Formulario de habilitacion</titulo>
    </template>
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6">
            <div class="card card-accent-primary">
              <div class="card-header">
                Cargar Nueva Habilitacion
              </div>
              <div class="card-body">
                <div class="form-group">
                  <label class="control-label">Documento</label>
                  <input-persona v-model="form.persona_uuid" :value="form.persona_uuid" />
                  <error input="persona_uuid" />
                </div>
                <div class="form-group">
                  <label class="control-label">Habilitacion</label>
                  <select v-model="form.ams_instancias_id" class="form-control">
                    <option v-for="(ins, index) in instancias" :key="index" :value="ins.id">
                      {{ ins.nombre }}
                      <template v-if="ins.linea === 'PJ'">
                        ( Programa de Jovenes )
                      </template>
                      <template v-else-if="ins.linea === 'DI'">
                        ( Direccion Institucional )
                      </template>
                    </option>
                  </select>
                  <error input="ams_instancias_id" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <nuxt-link to="/formacion/habilitaciones" class="btn btn-block btn btn-danger">
              Cancelar
            </nuxt-link>
            <template v-if="isEdicion">
              <button v-promise-btn class="btn-block btn btn-success" @click="actualizarHabilitacion()">
                Actualizar Solicitud
              </button>
            </template>
            <template v-else>
              <button v-promise-btn class="btn-block btn btn-success" @click="solicitarHabilitacion()">
                Cargar Solicitud
              </button>
            </template>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6">
            <div class="card card-accent-primary">
              <div class="card-header">
                Organismo que emitio la habilitación (GRUPO)
              </div>
              <div class="card-body">
                <div class="form-group">
                  <!--
                  <template v-if="!user.is.grupo">
                    <label class="control-label">Organismo que emitio la habilitacion</label>
                    <select-organismos v-model="form.grupo_id" filtrado="distrito" />
                    <error input="grupo_id" />
                  </template>
                -->
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
          <div v-if="!user.is.grupo" class="col-md-6">
            <div class="card card-accent-primary">
              <div class="card-header">
                Organismo que confirmo habilitación (DISTRITO)
              </div>
              <!-- /.box-header -->
              <div class="card-body">
                <div class="form-group">
                  <!--
                  <template v-if="user.is.zona">
                    <label class="control-label">Organismo que confirmo la habilitacion</label>
                    <select-organismos v-model="form.distrito_id" filtrado="distrito" />
                    <error input="distrito_id" />
                  </template>
                  -->
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label">Libro</label>
                        <input v-model="form.distrito_libro" class="form-control input-sm" type="text" />
                        <error input="distrito_libro" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label class="control-label">Folio</label>
                        <input v-model="form.distrito_folio" class="form-control input-sm" type="text" />
                        <error input="distrito_folio" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
    auth: { permiso: 'formacion.habilitaciones.abm' },
  },
  data() {
    return {
      instancias: {},
      habilitaciones: [], // aca cargo las habilitaciones si el documento tuviera alguna
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
    this.getInstancias()
    this.getDatos()
  },
  methods: {
    getInstancias() {
      this.$axios.get('/varios/formacion/instancias').then((response) => {
        this.instancias = response.data
      })
    },

    actualizarHabilitacion() {
      return this.$axios.put('/formacion/habilitaciones/', this.form).then(() => {
        this.$router.push({ path: '/formacion/habilitaciones' })
      })
    },

    solicitarHabilitacion() {
      return this.$axios
        .post('/formacion/habilitaciones', this.form)
        .then(() => {
          this.$router.push({ path: '/formacion/habilitaciones' })
        })
        .catch((err) => {
          return err
        })
    },
    getDatos() {
      if (this.isEdicion) {
        this.$axios.get('/formacion/habilitaciones/' + this.$route.params.uuid + '/editar').then((response) => {
          this.form = response.data.data
        })
      }
    },
  },
}
</script>
