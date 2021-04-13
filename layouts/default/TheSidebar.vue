<template>
  <CSidebar fixed :minimize="minimize" :show.sync="show">
    <CSidebarBrand to="/">
      <img src="../../static/img/logo_blanco.svg" class="c-sidebar-brand-full" width="118," height="46," alt="Logo" />
      <img src="../../static/img/logo_blanco.svg" height="46," alt="Logo" class="c-sidebar-brand-minimized" />
    </CSidebarBrand>

    <div>
      <div class="sidebar-header text-center p-2">
        <nuxt-link to="/main/perfil">
          <img
            :src="url + '/foto/' + user.persona.uuid"
            alt="Avatar"
            width="60"
            height="60"
            class="img-thumbnail rounded-circle"
          />
        </nuxt-link>
        <p>
          <br />
          <span>{{ user.persona.apellidoynombre }}</span>
          <br />
          <small class="font-italic"> Organismo Login : {{ user.login.organismo_id }}</small>
          <br />
          <template v-for="funcion in user.login.funciones">
            <small :key="funcion" class="font-italic">{{ funcion }}<br /></small>
          </template>
        </p>
      </div>
    </div>

    <CSidebarNav>
      <CSidebarNavItem to="/main" font-icon="fas fa-tachometer-alt" name="Dashboard" />
      <template v-for="menu in menus.items">
        <!--
          :show="estado"
          @update:show="openClosed"-->
        <CSidebarNavDropdown
          v-if="menu.acl === undefined || $can(menu.acl)"
          :key="menu.name"
          :route="menu.url"
          :font-icon="menu.icon"
          :name="menu.name"
        >
          <template v-for="item in menu.children">
            <CSidebarNavItem
              v-if="item.acl === undefined || $can(item.acl)"
              :key="item.name"
              :to="item.url"
              :font-icon="item.icon"
              :name="item.name"
            />
          </template>
        </CSidebarNavDropdown>
      </template>
    </CSidebarNav>

    <!--
    <CRenderFunction flat :content-to-render="nav" />
    <CSidebarMinimizer class="d-md-down-none" @click="minimize = !minimize" />
    -->
  </CSidebar>
</template>

<script>
import menus from '../menu'
import nav from './_nav'
export default {
  name: 'TheSidebar',
  data() {
    return {
      minimize: false,
      nav,
      menus,
      show: 'responsive',
      //  estado: null
    }
  },
  computed: {
    url() {
      return process.env.API_HOST
    },
  },
  mounted() {
    this.$root.$on('toggle-sidebar', () => {
      const sidebarOpened = this.show === true || this.show === 'responsive'
      this.show = sidebarOpened ? false : 'responsive'
    })
    this.$root.$on('toggle-sidebar-mobile', () => {
      const sidebarClosed = this.show === 'responsive' || this.show === false
      this.show = sidebarClosed ? true : 'responsive'
    })
  },
  methods: {
    openClosed() {
      /*
    this.estado = false
      const elements = document.getElementsByClassName('c-sidebar-nav-dropdown')
      // element // .classList.remove('c-show')
      elements.forEach((element) => {
        element.classList.remove('c-show')
      }) */
      //
    },
  },
}
</script>
