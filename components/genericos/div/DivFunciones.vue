<template>
  <b-row>
    <template v-if="funciones.length == 0">
      <b-col sm="12">Sin Funcion Definida</b-col>
    </template>
    <template v-else>
      <template v-for="(funcion, index) in funciones">
        <b-col :key="index" sm="12">
          <strong v-if="checkGrupo(funcion.organismo_full)" class="text-muted">{{ funcion.organismo_full }}</strong>
          <div>
            &nbsp; &nbsp; &#8226;
            <span
              v-if="funcion.origen !== 'M'"
              class="text-muted"
              title="Funcion Automatica importada de Cruz del Sur"
              >{{ funcion.funcion }}</span
            >
            <span v-if="funcion.origen === 'M'" class="text-warning" title="Funcion Cargada Manualmente">{{
              funcion.funcion
            }}</span>

            <!--

            <span v-if="funcion.origen !== 'M'" class="text-muted" title="Funcion Automatica importada de Cruz del Sur"
              >Funcion:</span
            >
            <span v-if="funcion.origen === 'M'" class="text-warning" title="Funcion Cargada Manualmente">Funcion:</span>
            <span class="text-muted font-italic">{{ funcion.funcion }}</span>
            -->
          </div>
        </b-col>
      </template>
    </template>
  </b-row>
</template>

<script>
export default {
  grupo: 'xxxx', // lo agrego aca porque no es una variable REACTIVA, si lo declaro en data, da error al reasiganr valores en un bucle
  name: 'DivFunciones',
  props: {
    funciones: {
      type: [Array, Object],
      required: true,
    },
  },
  methods: {
    checkGrupo(valor) {
      const grupo = this.$options.grupo
      this.$options.grupo = valor
      return grupo !== valor
    },
  },
}
</script>
