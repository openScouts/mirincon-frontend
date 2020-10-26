<template>
  <CHeader fixed light>
    <CToggler v-c-emit-root-event:toggle-sidebar-mobile in-header class="ml-3 d-lg-none" />
    <CToggler v-c-emit-root-event:toggle-sidebar in-header class="ml-3 d-md-down-none" />
    <CHeaderBrand class="mx-auto d-lg-none" src="/img/logo.svg" width="190" height="46" alt="CoreUI Logo" />
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/main"> Dashboard </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/main/perfil" exact> Mi Perfil </CHeaderNavLink>
      </CHeaderNavItem>
    </CHeaderNav>
    <CHeaderNav class="mr-2">
      <CHeaderNavItem class="mx-1">
        <CHeaderNavLink title="Salir" to="/login/logout"> <i class="fas fa-sign-out-alt"></i> </CHeaderNavLink>
      </CHeaderNavItem>
    </CHeaderNav>
  </CHeader>
</template>

<script>
export default {
  name: 'TheHeader',
  components: {},
}
</script>
