<template>
  <div class="row">
    <div class="centrado col-12">
      <!--
      <i class="fas fa-umbrella-beach fa-2x"></i>-->
      <i class="fas os-canoa fa-3x" />
    </div>
    <div class="centrado col-12">
      <p>{{ texto }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    texto: {
      type: String,
      required: false,
      default: 'No se encontraron resultados para mostrar',
    },
  },
}
</script>

<style scoped>
.row {
  margin: 30px;
}
.centrado {
  width: 100%;
  color: #e0e0e0;
  /*IMPORTANTE*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: unset;
  font-size: 1.5em;
}
</style>
