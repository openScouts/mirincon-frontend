<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>
        Asigancion masiva de Responsables

        <template slot="acciones">
          <nuxt-link :to="`/formacion/trabajos/${$route.params.uuid}`" class="btn btn-success btn-sm">
            Volver Atras
          </nuxt-link>
        </template>
      </titulo>
    </template>

    <div class="card card-accent-primary">
      <div class="card-body">
        <v-server-table
          ref="tabla"
          :columns="columns"
          :options="options"
          :url="'/formacion/trabajos/' + uuid + '/participantes'"
        >
          <template slot="persona.apellidoynombre" slot-scope="props">
            <div-persona :persona="props.row.persona" />
          </template>
          <!--
          <template slot="rel_persona.rel_funciones" slot-scope="props">
            <div-funciones :funciones="props.row.rel_persona.rel_funciones" />
          </template>
-->
          <template v-if="props.row.estado !== 'Aprobado'" slot="asignado" slot-scope="props">
            <select
              v-model="props.row.asignado_by"
              class="form-control form-select-sm"
              @change="
                setResponsable({
                  participante_uuid: props.row.uuid, // UUID del participante
                  asignado_by: props.row.asignado_by, // ID del responsable
                })
              "
            >
              <template v-for="valor in formadores">
                <option :key="valor.id" :value="valor.id">{{ valor.apellidoynombre }}</option>
              </template>
            </select>
          </template>
        </v-server-table>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {},
  data() {
    return {
      select: [],
      formadores: {},
      columns: ['persona.apellidoynombre', 'asignado', 'estado', 'opciones'],
      options: {
        pagination: { dropdown: false },
        perPage: 9999,
        filterable: false,
        params: {
          trabajo_uuid: this.$route.params.uuid,
        },
        headings: {
          'persona.apellidoynombre': 'Nombre',
          asignado: 'Formador',
          estado: 'Estado',
        },
      },
      total: 0,
    }
  },
  computed: {
    uuid() {
      return this.$route.params.uuid
    },
  },
  created() {
    this.getFormadores()
  },
  methods: {
    getFormadores() {
      this.$axios.get('/varios/formacion/formadores').then((response) => {
        this.formadores = response.data
      })
    },
    setResponsable(data) {
      this.$axios.put('/formacion/trabajos/' + this.uuid + '/participantes/responsable/asignar', data)
    },
  },
}
</script>
