<template>
  <select
    v-model="rama"
    :class="'form-control ramas ' + clase"
    style="font-family: caseroft-iconos-scout, sans-serif"
    @input="
      (e) => {
        $emit('input', e.target.value)
      }
    "
  >
    <option value="0" selected="selected">Seleccione una Rama</option>
    <option value="T" class="asdasdasd">&#xea30; Castores</option>
    <option value="L" class="asdasdasd">&#xea41; Lobatos y Lobeznas</option>
    <option value="S" class="asdasdasd">&#xea43; Scouts</option>
    <option value="C" class="asdasdasd">&#xea40; Caminates</option>
    <option value="R" class="asdasdasd">&#xea42; Rovers</option>
    <option v-if="solo !== 'P'" value="G" class="asdasdasd">&#xea2f; Gestión Intitucional</option>
  </select>
</template>
<style scoped>
.asdasdasd {
  font-size: 1.2rem;
}
</style>
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
