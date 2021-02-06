<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Mi Datos Personales</titulo>
    </template>
    <b-row>
      <b-col sm="12" lg="3">
        <div class="text-center">
          <img id="urlFoto" :src="urlFoto" class="img-fluid img-thumbnail" alt="Foto" />
          <hr />
          <b-form-file
            id="foto"
            ref="fileinput"
            v-model="foto"
            accept=".jpg, .png, .gif"
            placeholder="Cambiar foto"
            browse-text="Buscar"
          />
          <error input="foto" />
        </div>
      </b-col>
      <b-col sm="12" lg="9">
        <div class="card card-accent-primary">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <div class="float-right">
                  <b-button v-b-toggle.collapse2 variant="primary">Cambiar Contraseña</b-button>
                </div>
              </div>
            </div>
            <b-collapse id="collapse2">
              <div class="row">
                <div class="col-12">
                  <h4>Ingrese una nueva contraseña</h4>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label class="control-label">Contraseña</label>
                    <input v-model="password.password" class="form-control input-sm" type="password" required />
                    <error input="password" />
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <label class="control-label">Repetir Contraseña</label>
                    <input
                      v-model="password.password_confirmation"
                      class="form-control input-sm"
                      type="password"
                      required
                    />
                    <error input="password_confirmation" />
                  </div>
                </div>
                <div class="col-12">
                  <button v-promise-btn class="btn-block btn btn-success" @click="submitCambiarClave">
                    Cambiar Contraseña
                  </button>
                </div>
              </div>
              <hr />
            </b-collapse>

            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label">Email</label>
                  <input v-model="form.email" class="form-control input-sm" type="text" required />
                  <error input="email" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label">Profesion</label>
                  <input v-model="form.profesion" class="form-control input-sm" type="text" required />
                  <error input="profesion" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label">Telefono</label>
                  <input v-model="form.telefono" class="form-control input-sm" type="text" required />
                  <error input="telefono" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label">Celular</label>
                  <input v-model="form.celular" class="form-control input-sm" type="text" required />
                  <error input="celular" />
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label class="control-label">Tiene Alimentacion Especial?</label>
                  <select v-model="form.alimentacion_especial" class="form-control" required>
                    <option value>Defina tipo de alimentacion</option>
                    <option value="N">No tengo dieta especial</option>
                    <option value="S" selected="selected">Tengo dieta especial</option>
                  </select>
                  <error input="alimentacion_especial" />
                </div>
                <div class="alert alert-danger" role="alert">
                  Es importante que defina si tiene algun tipo de dieta especial, para ser tenido en cuenta en las
                  eventos o experiencias que incluyan el almuerzo
                </div>
                <div v-if="form.alimentacion_especial === 'S'" class="form-group">
                  <label class="control-label">Que tipo de dieta tiene</label>
                  <textarea
                    v-model="form.alimentacion_especial_detalle"
                    rows="3"
                    class="form-control input-sm"
                    type="text"
                    required
                  />
                  <error input="alimentacion_especial_detalle" />
                </div>
              </div>
              <div class="col-md-12">
                <button v-promise-btn class="btn-block btn btn-success" @click="submitGuardar">
                  Actualizar Datos Personales
                </button>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </ContentWrapper>
</template>

<script>
export default {
  data() {
    return {
      form: {}, // aca van los datos del formulario completado
      foto: null,
      password: {},
    }
  },
  head() {
    return {
      titleTemplate: 'Mis Datos - %s ',
    }
  },
  computed: {
    urlFoto() {
      return process.env.API_HOST + '/foto/' + this.$auth.user.persona.uuid
    },
  },
  watch: {
    foto() {
      this.subirFoto()
    },
  },
  mounted() {
    this.getDatos()
  },
  methods: {
    getDatos() {
      this.$axios.get('/persona/datos/').then((response) => {
        this.form = response.data
      })
    },
    subirFoto() {
      console.log(document.getElementById('foto').files[0])
      const data = new FormData()
      data.append('foto', document.getElementById('foto').files[0])
      console.log(data)
      this.$axios.post('/persona/datos/foto', data)
    },
    submitCambiarClave() {
      return this.$axios.put('/persona/datos/password', this.password).then(() => (this.password = {}))
    },
    submitGuardar() {
      return this.$axios.put('/persona/datos', this.form)
    },
  },
}
</script>
