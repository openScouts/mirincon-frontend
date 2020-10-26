<template>
  <b-img
    :key="uuid"
    class="foto"
    :src="foto"
    alt="Foto"
    :rounded="rounded"
    :thumbnail="borde"
    :width="size"
    :height="size"
  />
</template>

<script>
export default {
  props: {
    size: { type: Number, required: false, default: 50 },
    uuid: { type: String, required: false, default: '' },
    rounded: { type: String, required: false, default: 'circle' },
    borde: { type: Boolean, required: false, default: false },
  },
  computed: {
    foto() {
      return process.env.API_HOST + '/foto/' + this.uuid
    },
  },
}
</script>
