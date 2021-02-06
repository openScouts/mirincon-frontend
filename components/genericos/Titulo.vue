<template>
  <!-- Elimine clase titulo-->
  <div class="my-2 clearfix">
    <div class="float-right pl-1"></div>
    <h2 class="float-left">
      <slot />
      <small>
        <br />
        <slot name="subtitulo" />
      </small>
    </h2>
    <div class="float-right">
      <slot name="acciones" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.titulo {
  background-color: white;
  padding: 10px;
  margin-bottom: 10px;
  -webkit-box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.14);
  -moz-box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.14);
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.14);
}
h2 {
  font-size: 1.5rem;
  line-height: 1.1;
  color: #929292;
}
</style>
