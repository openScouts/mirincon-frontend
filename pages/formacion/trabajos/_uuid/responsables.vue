<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Asigancion masiva de Responsables</titulo>
    </template>
    <div class="card card-accent-primary">
      <div class="card-body">
        <v-server-table ref="tabla" :columns="columns" :options="options" url="/formacion/trabajos/participantes">
          <template slot="rel_persona.apellidoynombre" slot-scope="props">
            <div-persona :persona="props.row.rel_persona" />
          </template>
          <template slot="rel_persona.rel_funciones" slot-scope="props">
            <div-funciones :funciones="props.row.rel_persona.rel_funciones" />
          </template>

          <template slot="responsable" slot-scope="props">
            <select
              v-model="props.row.asignado_by"
              class="form-control"
              @change="
                setResponsable({
                  participante_uuid: props.row.uuid, // UUID del participante
                  asignado_by: props.row.asignado_by, // ID del responsable
                })
              "
            >
              <template v-for="valor in formadores">
                <option :key="valor.uuid" :value="valor.persona_id">{{ valor.nombre }}</option>
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
  meta: {
    auth: { rol: 'Formador' },
  },
  data() {
    return {
      select: [],
      formadores: {},
      columns: ['rel_persona.apellidoynombre', 'responsable', 'rel_estado.nombre', 'opciones'],
      options: {
        pagination: { dropdown: false },
        perPage: 9999,
        filterable: false,
        params: {
          trabajo_uuid: this.$route.params.uuid,
        },
        headings: {
          'rel_persona.apellidoynombre': 'Nombre',
          'rel_asiganado.apellidoynombre': 'Formador',
          'rel_estado.nombre': 'Estado',
        },
      },
      total: 0,
    }
  },
  created() {
    this.getFormadores()
  },
  methods: {
    getFormadores() {
      this.$axios.get('/formacion/formadores/listado').then((response) => {
        this.formadores = response.data.data
      })
    },
    setResponsable(data) {
      this.$axios.post('/formacion/trabajos/participantes/asigno_responsable', data)
    },
  },
}
</script>
