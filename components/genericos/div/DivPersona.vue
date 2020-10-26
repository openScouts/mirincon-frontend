<template>
  <div>
    <div class="float-left">
      <foto :uuid="persona.uuid" />
    </div>
    <div class="float-left pl-2">
      <strong class="text-muted">{{ persona.apellidoynombre }}</strong>
      <div>
        <strong class="text-muted">Documento: </strong>
        {{ persona.documento }}
      </div>
      <b-badge v-if="persona.afiliacion === false" variant="danger"> No Afiliado </b-badge>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DivPersona',
  props: {
    persona: {
      type: Object,
      required: true,
    },
  },
}
</script>
