<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Calendario</titulo>
    </template>
    <div class="row"></div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'membresia.calendario' },
  },
  data() {
    return {}
  },

  methods: {},
}
</script>
