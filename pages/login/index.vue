<template>
  <div>
    <b-input-group v-if="paso === 1" class="input-group mb-4">
      <b-input-group-prepend is-text>
        <span class="input-group-addon">
          <i class="fa fa-user" />
        </span>
      </b-input-group-prepend>
      <b-form-input
        v-model="form.documento"
        pattern="[0-9]*"
        placeholder="Ingrese su DNI"
        name="documento"
        type="number"
        @keyup.enter="validaDni()"
      />
    </b-input-group>
    <error input="documento" />
    <template v-if="paso === 2">
      <b-input-group class="input-group mb-4">
        <b-input-group-prepend is-text>
          <span class="input-group-addon">
            <i class="fa fa-lock" />
          </span>
        </b-input-group-prepend>
        <b-form-input
          v-model="form.password"
          type="password"
          required="required"
          placeholder="Ingrese su contraseña"
          @keyup.enter="login()"
        />
      </b-input-group>
      <b-input-group v-if="items.length !== 0" class="input-group mb-4">
        <b-input-group-prepend is-text>
          <span class="input-group-addon">
            <i class="fa fa-lock" />
          </span>
        </b-input-group-prepend>
        <b-form-select v-model="form.organismo" :options="items" />
      </b-input-group>
    </template>
    <button v-if="paso === 1" v-promise-btn class="btn btn-success btn-block" @click="validaDni">
      Validar Documento
    </button>
    <button v-if="paso === 2" v-promise-btn class="btn btn-success btn-block" @click="login">
      Ingresar
    </button>
    <button v-if="paso === 2" v-promise-btn class="btn btn-warning btn-block text-white" @click="recuperClave">
      Recuperar Clave
    </button>
    <hr />
    <div class="mt-2">
      <h2 class="text-center">Soy Nuevo</h2>
      <p>
        Los nuevos educadores deben registrarse por primera vez.
        <br />solo se permitirá el registro de los adultos afiliados dentro de scout de argentina
      </p>
      <nuxt-link class="btn text-white btn-block btn-info" to="/login/registro">¡Regístrate ahora!</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {
      items: {},
      form: {},
      error: '',
      paso: 1,
    }
  },
  mounted() {
    this.$auth.logout()
  },
  methods: {
    validaDni() {
      this.paso = 1
      return this.$axios
        .post('/auth/get_organismos', this.form)
        .then((response) => {
          console.log(response.status)
          if (response.status === 200) {
            this.items = JSON.parse(JSON.stringify(response.data))
            this.form.organismo = Object.keys(this.items)[0]
            this.paso = 2
            return Promise.resolve(true)
          } else if (response.status === 202) {
            return Promise.reject(response.data)
          }
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    recuperClave() {
      if (confirm('Esta Seguro que quiere cambiar la Clave ?')) {
        return this.$axios.post('/auth/recuper_clave', this.form)
      } else {
        return false
      }
    },
    async login() {
      this.error = ''
      await this.$auth.loginWith('local', { data: this.form }).catch(() => {
        this.$noti('Error al Hacer Login', 'danger')
        this.error = { mensaje: 'Error al Hacer Login' }
      })
      //  this.$router.replace('/main/')
    },
  },
}
</script>
