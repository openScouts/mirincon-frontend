<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>
        <span class="fas os-accion-formador" />
        Listado de Formadores
        <template slot="acciones">
          <b-button v-b-modal.modal variant="success">Nuevo Formador</b-button>
        </template>
      </titulo>
    </template>
    <div class="card">
      <v-server-table ref="tabla" :columns="grid.columns" :options="grid.options" url="/formacion/formadores">
        <template slot="datos" slot-scope="props">
          <div-persona :persona="props.row.rel_persona" />
        </template>
        <template slot="tipo" slot-scope="props">
          <div v-if="props.row.tipo == 'F'">Formador</div>
          <div v-else-if="props.row.tipo == 'C'">Colaborador</div>
        </template>
        <template slot="firma_count" slot-scope="props">
          <div v-if="props.row.firma_count == '1'">Si</div>
          <div v-else>No</div>
        </template>
        <template slot="opciones" slot-scope="props">
          <btn-persona-ver :uuid="props.row.rel_persona.uuid" />
          <button
            v-promise-btn
            :title="'Dar de Baja a ' + props.row.rel_persona.apellidoynombre"
            class="btn btn-danger btn-sm"
            @click="darDeBaja(props.row.uuid)"
          >
            <i class="fas fa-user-minus"></i>
          </button>
        </template>
      </v-server-table>
    </div>

    <b-modal id="modal" ref="myModalRef" title="Alta de Formador" centered hide-footer @close="cancelar()">
      <div class="row">
        <div class="col-12 p-2">
          <input-persona v-model="form.persona_uuid"></input-persona>
        </div>
        <div class="col-12 p-2">
          <b-form-select v-model="form.tipo">
            <option :value="null">Seleccione una Opcion</option>
            <option value="F">Formador</option>
            <option value="C">Colaborador</option>
          </b-form-select>
        </div>
      </div>
      <button v-promise-btn class="btn-block btn btn-success" @click="saveData()">Guardar</button>
    </b-modal>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'formacion.formadores' },
  },
  data() {
    return {
      form: {},
      grid: {
        columns: ['datos', 'tipo', 'firma_count', 'responsable_count', 'colaboro_count', 'opciones'],
        options: {
          headings: {
            firma_count: 'Firma',
            responsable_count: 'Director Exp.',
            colaboro_count: 'Colaboro Exp.',
          },
        },
      },
    }
  },
  mounted() {},
  methods: {
    cancelar() {
      this.form = {}
    },
    saveData() {
      return this.$axios.post('/formacion/formadores', this.form).then(() => {
        this.form = {} // borro x las dudas .. solo de molesto
        this.$refs.myModalRef.hide()
      })
    },
    darDeBaja(UUID) {
      this.$swal
        .fire({
          title: 'Generacion de baja',
          text: 'Esta seguro de generar la baja ?',
          type: 'warning',
          showCancelButton: true,
        })
        .then((result) => {
          if (result.value) {
            return this.$axios.post('/formacion/formadores/' + UUID + '/borrar').then(() => {
              this.$refs.tabla.refresh()
            })
          } else {
            this.$swal.fire('Cancelo la baja')
          }
        })
    },
  },
}
</script>

<style scoped>
.VueTables >>> * tr th:nth-child(1) {
  width: 30%;
}
</style>
