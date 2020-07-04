<template>
  <b-row>
    <template v-if="funciones.length == 0">
      <b-col sm="12">Sin Funcion Definida</b-col>
    </template>
    <template v-else>
      <template v-for="(funcion, index) in funciones">
        <b-col :key="index" sm="12">
          <!-- Si son de Origen Manul le pongo la Letra M-->
          <span v-if="funcion.origen === 'M'" class="badge badge-warning" title="Funcion Cargada Manualmente">M</span>
          <template v-if="funcion.rel_organismo">
            {{ funcion.rel_organismo.codigo_full }}
            <div class="text-muted">{{ funcion.rel_funcion.nombre }}</div>
          </template>
          <template v-else>
            {{ funcion.organismo_full }}
            <div>
              <strong class="text-muted">Funcion: </strong>
              <span class="text-muted">{{ funcion.funcion }}</span>
            </div>
          </template>
        </b-col>
      </template>
    </template>
  </b-row>
</template>

<script>
export default {
  name: 'DivFunciones',
  props: {
    funciones: {
      type: [Array, Object],
      required: true,
    },
  },
}
</script>
