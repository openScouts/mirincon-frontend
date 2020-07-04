<template>
  <b-button
    :key="uuid"
    title="Ver datos de la persona"
    size="sm"
    variant="info"
    :to="'/gestion/personas/detalle/' + uuid"
  >
    <i class="fa-lg os-accion-scout-perfil text-white" title="Detalle de Persona" />
  </b-button>
</template>

<script>
export default {
  props: {
    uuid: {
      type: String,
      required: true,
    },
  },
}
</script>
