<template>
  <div class="c-body">
    <div v-if="$nuxt.isOffline" class="alert alert-danger" role="alert">
      Usted no tiene coneccion a internet, la aplicacion no funcionara correctamente
    </div>
    <main class="c-main" style="padding-top: 0">
      <CContainer fluid>
        <slot name="titulo" />
        <slot />
      </CContainer>
    </main>
  </div>
</template>

<script>
export default {
  name: 'ContentWrapper',
}
</script>
