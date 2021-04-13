<template>
  <div>
    <div class="sidenav">
      <vue-particles color="#dedede"></vue-particles>
    </div>
    <div class="main">
      <div class="col-md-12 col-sm-12">
        <a href="https://openscouts.com.ar">
          <img id="logo-openscouts" src="../static/img/openscouts.png" class="img-fluid p-4" />
        </a>
        <div class="login-form">
          <nuxt />
        </div>
      </div>
      <div class="text-center">
        <br />
        <a href="https://play.google.com/store/apps/details?id=ar.com.openscouts.mirincon.twa">
          <img src="../static/img/google-play.png" style="height: 50px" />
          <br />
        </a>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

export default {
  auth: 'guest',
  mounted() {
    this.classBody()
  },
  methods: {
    classBody() {
      const body = document.body
      body.removeAttribute('class')
      body.classList.add('fondo_imagen')
      body.classList.add('fondo_color')
      body.classList.add('flex-row')
      body.classList.add('align-items-center')
    },
  },
}
</script>

<style scoped>
.main-head {
  height: 150px;
  background: #f1f1f1;
}

.sidenav {
  height: 100%;
  background-color: #1e88e5;
  background-image: url('/img/login.svg') !important;
  overflow-x: hidden;
  padding-top: 20px;
}

.main {
  padding: 0 10px;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
}

@media screen and (max-width: 450px) {
  #logo-openscouts {
    display: none;
  }
  .login-form {
    margin-top: 10%;
  }
  .register-form {
    margin-top: 10%;
  }
}

@media screen and (min-width: 768px) {
  .main {
    margin-left: 70%;
  }
  .sidenav {
    width: 70%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
  }

  .login-form {
    margin-top: 20%;
  }

  .register-form {
    margin-top: 20%;
  }
}
</style>
