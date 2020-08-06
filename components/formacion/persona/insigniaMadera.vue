<template>
  <div>
    <template v-if="gridIm.items.length">
      <b-table striped hover small responsive stacked="md" :items="gridIm.items" :fields="gridIm.fields">
        <template v-slot:cell(otorgada)="data">{{ data.value | Date }}</template>

        <template v-slot:cell(rama)="data">
          <div-rama :rama="data.value" />
        </template>
        <template v-slot:cell(opciones)="data">
          <template v-if="$can('formacion.maestro_scout.abm')">
            <nuxt-link
              :to="'/formacion/maestro_scout/formulario/' + data.item.uuid"
              class="float-left"
              title="Editar IM"
            >
              <i class="far fa-edit"></i>
              Editar
            </nuxt-link>
            &nbsp;&nbsp;
          </template>
          <!--
          <p v-if="$moment(data.item.vencimiento, 'YYYY-MM-DD').isBefore()" class="text-danger">
            <i class="far fa-frown" />
            Vencida
          </p>
          <p v-else class="text-success">
            <i class="far fa-hand-peace" />
            Vigente
          </p>  -->
        </template>
        <!-- <template v-slot:cell(vencimiento)="data">{{ data.value | Date }}</template> -->
      </b-table>
    </template>
    <template v-else>
      <vacio texto="No existen Insignia de Madera cargadas en Mi Rincón."></vacio>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    // Esto lo uso porque el componente lo llamo desde otros componentes
    uuid: { type: String, default: 'uuid' },
  },
  data() {
    return {
      gridIm: {
        fields: [
          { key: 'otorgada', label: 'Otorgada' },
          { key: 'nro_registro', label: 'Registro N°' },
          { key: 'rama', label: 'Rama' },
          'linea',
          'opciones',
        ],
        items: [],
      },
    }
  },
  computed: {
    personaUUID() {
      if (this.uuid === 'uuid') {
        // return this.user.persona.uuid;
      }
      return this.uuid
    },
  },
  mounted() {
    this.getIm()
  },
  methods: {
    getIm() {
      this.$axios.get('/formacion/im/' + this.personaUUID).then((response) => {
        this.gridIm.items = response.data.data
      })
    },
  },
}
</script>
