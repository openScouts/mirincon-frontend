<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Gestión de Trabajos Practicos</titulo>
    </template>
    <template v-if="$auth.user.is.formador">
      <btn-app to="/main/trabajos/mistrabajos" tipo="info" icon="fa os-accion-evento">
        Mi Trabajos
      </btn-app>
      <btn-app to="/main/trabajos/mis_trabajos_asignado" tipo="warning" icon="fa os-area-ams">
        Trabajos Asignados
      </btn-app>
      <btn-app to="/main/trabajos/mis_trabajos_responsable" tipo="secondary" icon="fa os-accion-trabajo">
        Trabajos Responsable
      </btn-app>
      <hr />
    </template>
    <b-row>
      <b-col col lg="12">
        <nuxt-child />
      </b-col>
    </b-row>
  </ContentWrapper>
</template>
<script>
export default {
  mounted() {
    this.$router.replace('/main/trabajos/mistrabajos')
  },
  head() {
    return {
      titleTemplate: 'Gestion de Trabajos - %s ',
    }
  },
}
</script>
