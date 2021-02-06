<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Creacion de Trabajo Practico</titulo>
    </template>
    <div v-if="listado_crear.length === 0" class="alert alert-warning" role="alert">
      No existen experiencias disponibles para crear un trabajo
    </div>
    <div class="card card-accent-primary">
      <div class="card-body">
        <div class="row">
          <div class="col-6">
            <b-form-group label="Seleccione una Experiencia:">
              <select v-model="cursos" class="form-control">
                <option v-for="cur in listado_crear" :key="cur.uuid" :value="cur.uuid">
                  {{ cur.nombre }} ({{ cur.fecha | Date }})
                </option>
              </select>
              <error input="cursos_uuid" />
            </b-form-group>
          </div>
          <div class="col-6">
            <b-form-group label="Fecha de Entrega:">
              <b-input-group>
                <b-form-input v-model="form.f_entrega" size="sm" type="date" placeholder="Ingrese una fecha" />
                <b-input-group-append>
                  <span class="input-group-text">
                    <i class="fas fa-calendar-alt" />
                  </span>
                </b-input-group-append>
              </b-input-group>
              <error input="f_entrega" />
            </b-form-group>
          </div>
        </div>
        <b-form-group label="Consigna del Trabajo Practico:">
          <error input="consigna" />
          <div style="height: 200px">
            <quill-editor v-model="form.consigna" style="height: 150px" />
          </div>
        </b-form-group>
        <button v-promise-btn class="btn btn-block btn-success" @click="crearTrabajo">Crear Trabajo</button>

        <hr />
        <h3>Listado de Participantes</h3>
        <b-table :items="grid.items" :fields="grid.fields" class="table-sm">
          <template #cell(check)="data">
            <b-form-checkbox v-model="form.participantes" :value="data.item.uuid" switch />
          </template>
          <template #cell(persona)="data">
            {{ data.item.persona.apellidoynombre }}
          </template>
          <template #cell(funciones)="data">
            <div-funciones :funciones="data.funciones.value" />
          </template>
        </b-table>
      </div>
    </div>
  </ContentWrapper>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  meta: {
    auth: {
      permiso: 'formacion.trabajos',
    },
  },
  components: { quillEditor },
  data() {
    return {
      form: {
        participantes: [],
      },
      cursos: {},
      listado_crear: {},
      grid: {
        fields: [
          {
            key: 'check',
            label: 'check',
          },
          {
            key: 'persona',
            label: 'Datos',
          },
          {
            key: 'funciones',
            label: 'Funciones',
          },
          {
            key: 'rama',
            label: 'rama',
          },
        ],
        items: [],
      },
    }
  },
  watch: {
    // whenever question changes, this function will run
    cursos() {
      this.form.participantes = [] // blanqueo por cada cambio de opcion en el combo
      this.$axios
        .get('/formacion/participantes', {
          params: {
            curso_uuid: this.cursos,
            estado: 'TP',
          },
        })
        .then((response) => {
          this.grid.items = response.data.data
          this.grid.items.forEach((element) => {
            this.form.participantes.push(element.uuid)
          })
          this.form.cursos_uuid = this.cursos
        })
    },
  },
  created() {
    this.getDatos()
  },

  methods: {
    getDatos() {
      this.$axios.get('/formacion/trabajos/crear/cursos').then((response) => {
        this.listado_crear = response.data
      })
    },
    crearTrabajo() {
      return this.$axios.post('/formacion/trabajos', this.form).then(() => {
        this.$router.push({
          path: '/formacion/trabajos/listado',
        })
      })
    },
  },
}
</script>
