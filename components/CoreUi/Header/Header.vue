<template>
  <header class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon" />
    </button>
    <nuxt-link class="navbar-brand" to="/"></nuxt-link>

    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon" />
    </button>
    <b-navbar-nav class="d-md-down-none">
      <h2 v-if="AMBIENTE" class="text-danger">{{ AMBIENTE_NOMBRE }}</h2>
      <b-nav-item class="px-3" to="/main/">Inicio</b-nav-item>
      <b-nav-item class="px-3" to="/main/perfil">Mi Perfil</b-nav-item>
    </b-navbar-nav>
    <b-navbar-nav class="ml-auto">
      <HeaderDropdown />
    </b-navbar-nav>
  </header>
</template>

<script>
import HeaderDropdown from './HeaderDropdown.vue'
export default {
  name: 'CHeader',
  components: {
    HeaderDropdown,
  },
  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      AMBIENTE: process.env.NODE_ENV !== 'production',
      AMBIENTE_NOMBRE: process.env.NODE_ENV,
    }
  },
  mounted() {
    this.isFixed(this.fixed)
  },
  methods: {
    isFixed(fixed) {
      fixed ? document.body.classList.add('header-fixed') : document.body.classList.remove('header-fixed')
      return fixed
    },
    sidebarToggle(e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize(e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle(e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle(e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    },
  },
}
</script>
