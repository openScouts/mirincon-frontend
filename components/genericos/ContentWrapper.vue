<template>
  <div class="c-body">
    <div v-if="$nuxt.isOffline" class="alert alert-danger" role="alert">
      Usted no tiene coneccion a internet, la aplicacion no funcionara correctamente
    </div>

    <main class="c-main" style="padding-top: 0px;">
      <slot name="titulo" />

      <CContainer fluid style="padding-top: 10px;">
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
