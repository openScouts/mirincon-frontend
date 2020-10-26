<template>
  <div>
    <h4 class="text-center">Registrarse</h4>
    <b-alert v-if="error" show variant="danger">
      {{ error }}
    </b-alert>
    <b-alert v-if="info" show variant="info">
      {{ info }}
    </b-alert>
    <b-input-group v-if="paso === 1" class="input-group mb-4">
      <b-input-group-prepend is-text>
        <span class="input-group-addon">
          <i class="fa fa-user" />
        </span>
      </b-input-group-prepend>
      <b-form-input v-model="documento" name="documento" type="number" placeholder="Ingrese su Documento" />
    </b-input-group>
    <div v-if="paso === 2" title="Ingreso de Datos">
      <h5 class="text-center">Bienvenid@ {{ formulario.nombre }}</h5>
      <p v-if="formulario.organismo_id">
        <strong>Organismos:</strong>
        Nro. {{ formulario.organismo_id }} - {{ formulario.organismo }}
      </p>

      <div class="form-group">
        <label>Ingrese su Fecha de Nacimiento</label>
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <select v-model="formulario.anio" class="form-control" required="required">
                <option value selected="selected">Seleccione un Año</option>
                <template v-for="n in 2005">
                  <option v-if="n >= 1920" :key="n" :value="n">
                    {{ n }}
                  </option>
                </template>
              </select>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form-group">
              <select v-model="formulario.mes" class="form-control" required="required">
                <option value selected="selected">Seleccione un Mes</option>
                <option value="1">Enero</option>
                <option value="2">Febrero</option>
                <option value="3">Marzo</option>
                <option value="4">Abril</option>
                <option value="5">Mayo</option>
                <option value="6">Junio</option>
                <option value="7">Julio</option>
                <option value="8">Agosto</option>
                <option value="9">Septiembre</option>
                <option value="10">Octubre</option>
                <option value="11">Noviembre</option>
                <option value="12">Diciembre</option>
              </select>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form-group">
              <select v-model="formulario.dia" class="form-control" required="required">
                <option value selected="selected">Seleccione un Dia</option>
                <template v-for="n in 31">
                  <option v-if="n >= 1" :key="n" :value="n">
                    {{ n }}
                  </option>
                </template>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="control-label">Ingrese su Email</label>
        <input v-model="formulario.email" type="email" class="form-control input-sm" required="required" />
      </div>
      <error input="email" />
      <div class="form-group">
        <label class="control-label">Ingrese su Celular</label>
        <input v-model="formulario.celular" type="number" class="form-control input-sm" required="required" />
      </div>
      <error input="celular" />
      <div class="form-group">
        <label class="control-label">Ingrese una clave</label>
        <input v-model="formulario.password" class="form-control input-sm" required="required" type="password" />
      </div>
      <error input="password" />
      <div class="form-group">
        <label class="control-label">Repetir la clave</label>
        <input
          v-model="formulario.password_confirmation"
          class="form-control input-sm"
          required="required"
          type="password"
        />
        <error input="password_confirmation" />
      </div>
    </div>
    <button v-if="paso === 1" v-promise-btn class="btn btn-success btn-block" @click="validaDocumento">
      Validar Documento
    </button>
    <button v-if="paso === 2" v-promise-btn class="btn btn-success btn-block" @click="completarRegistro">
      Completar Registro
    </button>
    <hr v-if="paso === 1" />
    <button v-if="paso === 1" class="btn btn-warning text-white btn-block" @click="cancelar">
      Cancelar y volver al login
    </button>
  </div>
</template>

<script>
export default {
  auth: false,
  middleware: ['guest'],
  layout: 'login',
  data() {
    return {
      formulario: {},
      documento: '',
      error: '',
      info: '',
      paso: 1,
    }
  },
  mounted() {
    this.$options.$errors = {}
  },
  methods: {
    validaDocumento() {
      this.error = null
      this.info = 'Procesando Datos, aguarde un momento por favor'
      if (this.documento.length === 0) {
        this.info = null
        this.error = 'Debe ingresar un documento para continuar'
        return false
      }
      return this.$axios
        .post('/auth/valida_documento', { documento: this.documento })
        .then((response) => {
          this.info = null
          if (response.data.estado !== 'ERROR') {
            this.formulario = response.data
            this.paso = 2
          }
        })
        .catch(() => {
          this.info = null
          this.error = 'Se genero un error inesperado en el servidor, contacte a webmaster@mirincon.com.ar'
        })
    },
    cancelar() {
      this.$router.push({ path: '/' })
    },
    completarRegistro() {
      // @todo A FUTURO METERLE RECAPCHA
      this.formulario.documento = this.documento
      return this.$axios.post('/auth/registrarse', this.formulario).then(() => {
        this.$router.replace('/')
      })
    },
  },
}
</script>
