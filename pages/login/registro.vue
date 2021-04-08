<template>
  <div>
    <h4 class="text-center">Formulario de Registro</h4>
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
      <template v-if="!show_formulario_full">
        <p v-if="formulario.organismo_id">
          <strong>Organismos:</strong>
          Nro. {{ formulario.organismo_id }} - {{ formulario.organismo }}
        </p>
      </template>
      <template v-else>
        <div class="form-group">
          <label>Datos el Organismo</label>
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <input v-model="formulario.zona" type="number" class="form-control input-sm" placeholder="Nro Zona" />
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <input
                  v-model="formulario.distrito"
                  type="number"
                  class="form-control input-sm"
                  placeholder="Nro Distrito"
                />
              </div>
            </div>
            <div class="col-sm-4">
              <div class="form-group">
                <input v-model="formulario.grupo" type="number" class="form-control input-sm" placeholder="Nro Grupo" />
              </div>
            </div>

            <error class="col-sm-12" input="zona" />
            <error class="col-sm-12" input="distrito" />
            <error class="col-sm-12" input="grupo" />
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">Nombre Grupo</label>
          <input v-model="formulario.organismo" type="text" class="form-control input-sm" />
          <error input="organismo" />
        </div>
        <div class="form-group">
          <label class="control-label">Funcion</label>
          <input v-model="formulario.funcion" type="text" class="form-control input-sm" />
          <error input="funcion" />
        </div>
        <hr />
      </template>
      <div class="form-group">
        <label class="control-label">Apellido</label>
        <input
          v-model="formulario.apellido"
          :disabled="!show_formulario_full"
          type="text"
          class="form-control input-sm"
        />
        <error input="apellido" />
      </div>
      <div class="form-group">
        <label class="control-label">Nombre</label>
        <input
          v-model="formulario.nombre"
          :disabled="!show_formulario_full"
          type="text"
          class="form-control input-sm"
        />
        <error input="nombre" />
      </div>

      <div class="form-group">
        <label>Fecha de nacimiento</label>
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <select v-model="formulario.anio" class="form-control">
                <option value disabled selected>Año</option>
                <template v-for="n in 2010">
                  <option v-if="n >= 1920" :key="n" :value="n">
                    {{ n }}
                  </option>
                </template>
              </select>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form-group">
              <select v-model="formulario.mes" class="form-control">
                <option value disabled selected>Mes</option>
                <template v-for="(mes, index) in meses">
                  <option :key="index" :value="index + 1">{{ mes }}</option>
                </template>
              </select>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="form-group">
              <select v-model="formulario.dia" class="form-control">
                <option value disabled selected>Dia</option>
                <template v-for="n in 31">
                  <option v-if="n >= 1" :key="n" :value="n">
                    {{ n }}
                  </option>
                </template>
              </select>
            </div>
          </div>
          <error class="col-sm-12" input="dia" />
          <error class="col-sm-12" input="mes" />
          <error class="col-sm-12" input="anio" />
        </div>
      </div>
      <hr />

      <div class="form-group">
        <label class="control-label">Email</label>
        <input v-model="formulario.email" type="email" class="form-control input-sm" />
        <error input="email" />
      </div>
      <div class="form-group">
        <label class="control-label">Celular</label>
        <input v-model="formulario.celular" type="number" class="form-control input-sm" />
        <error input="celular" />
      </div>
      <div class="form-group">
        <label class="control-label">Contraseña</label>
        <input v-model="formulario.password" class="form-control input-sm" type="password" />
        <error input="password" />
      </div>
      <div class="form-group">
        <label class="control-label">Repetir la Contraseña</label>
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
    <button v-if="paso === 1" class="btn btn-info text-white btn-block" @click="cancelar">
      Cancelar y volver al login
    </button>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: 'login',
  middleware: ['guest'],
  data() {
    return {
      formulario: {},
      show_formulario_full: false,
      documento: '',
      error: '',
      info: '',
      paso: 1,
      meses: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
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

          if (response.status === 202) {
            this.$router.push({ path: '/' })
          } else {
            if (response.data.estado === 'registro_full') {
              this.show_formulario_full = true
            } else {
              this.formulario = response.data
            }
            this.paso = 2
          }
        })
        .catch(() => {
          this.info = null
          this.error = 'Se genero un error inesperado en el servidor, contacte a soporte@mirincon.com.ar'
        })
    },
    cancelar() {
      this.$router.push({ path: '/' })
    },
    completarRegistro() {
      // @todo A FUTURO METERLE RECAPCHA
      this.formulario.documento = this.documento
      if (this.show_formulario_full) {
        this.formulario.nuevo = true
      }
      return this.$axios
        .post('/auth/registrarse', this.formulario)
        .then((response) => {
          this.$router.push({ path: '/' })
        })
        .catch(function () {
          console.log('--------ERROR------------')
        })
    },
  },
}
</script>
