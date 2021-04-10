<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Creacion de Eventos</titulo>
    </template>
    <btn-app to="/eventos/creacion/formulario/?area=ams" icon="fa os-area-ams">Ams</btn-app>
    <template v-if="user.is.zona">
      <btn-app to="/eventos/creacion/formulario/?area=juventud" icon="fa os-area-juventud">Juventud</btn-app>
      <btn-app to="/eventos/creacion/formulario/?area=programa" icon="fa os-area-programa">Programa</btn-app>
    </template>
    <!--
      <btn-app to="/eventos/creacion/formulario/comunicaciones" icon="fa cis-area-comunicaciones">Comunicacion</btn-app>
      <btn-app to="/eventos/creacion/formulario/finanzas" icon="fa cis-area-ayf">Adm&Fin</btn-app>
      <btn-app to="/eventos/creacion/formulario/emergencias" icon="fa cis-area-eys">Eys</btn-app>
      <btn-app to="/eventos/creacion/formulario/copasca" icon="fa cis-area-eys">Copasca</btn-app>
    </template>
    -->
  </ContentWrapper>
</template>
<script>
export default {
  meta: {
    auth: { permiso: 'eventos.abm' },
  },
}
</script>
