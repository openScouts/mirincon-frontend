<template>
  <select
    v-model="rama"
    :class="'form-control form-control-sm ramas ' + clase"
    style="font-family: open-scouts, sans-serif"
    @input="
      (e) => {
        $emit('input', e.target.value)
      }
    "
  >
    <option value="0" selected="selected">Seleccione una Rama</option>
    <option value="T" class="asdasdasd">&#xea44; Castores</option>
    <option value="L" class="asdasdasd">&#xea41; Lobatos y Lobeznas</option>
    <option value="S" class="asdasdasd">&#xea43; Scouts</option>
    <option value="C" class="asdasdasd">&#xea40; Caminates</option>
    <option value="R" class="asdasdasd">&#xea42; Rovers</option>
    <option v-if="solo !== 'P'" value="G" class="asdasdasd">&#xea44; Gestión Intitucional</option>
  </select>
</template>

<script>
export default {
  props: {
    clase: {
      type: String,
      default: '',
      required: false,
    },
    solo: {
      type: String,
      default: '', // P Programa // G Gestion
      required: false,
    },
    value: {
      type: String,
      default: '0',
      required: true,
    },
  },
  data() {
    return {
      rama: 0,
    }
  },
  watch: {
    value(newValue) {
      if (newValue !== null) {
        this.rama = newValue
      }
    },
  },
  created() {
    this.rama = this.value
  },
}
</script>

<style scoped>
.asdasdasd {
  font-size: 1.2rem;
  font-family: 'open-scouts', sans-serif;
}
</style>
