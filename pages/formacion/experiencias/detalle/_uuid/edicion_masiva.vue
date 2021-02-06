<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>
        Edicion Masiva
        <br />
        <small v-if="curso.organismo"> {{ curso.nombre }} - Fecha {{ curso.fecha | Date }} </small>
        <br />
        <small v-if="curso.organismo">
          Responsable: {{ curso.responsable }} - Organismo: {{ curso.organismo.full }}
        </small>
      </titulo>
    </template>

    <b-row>
      <b-col col sm="12" md="12" lg="2" class="p-0">
        <div class="card card-accent-primary">
          <div class="card-header">Edicion Masiva</div>
          <div class="card-body">
            <div class="form-group">
              <label class="control-label">Libro Masivo</label>
              <input v-model="libro" class="form-control form-control-sm" placeholder="Nro Libro" type="number" />
            </div>
            <div class="form-group">
              <label class="control-label">Folio Masivo</label>
              <input v-model="folio" class="form-control form-control-sm" placeholder="Nro Folio" type="number" />
            </div>
            <div class="form-group">
              <label class="control-label">Estado Masivo</label>
              <select v-model="estado_id" class="form-control form-control-sm">
                <option value selected>Seleccione</option>
                <option value="1">En Curso</option>
                <option value="2">Acreditado</option>
                <option value="5">Recursar</option>
                <option value="6">Ausente</option>
              </select>
            </div>
            <hr />
            <button v-promise-btn class="btn-block btn btn-success btn-sm" @click="enviarDatos">Guardar</button>
            <input class="btn-block btn btn-primary btn-sm" value="ReCargar Datos" @click="getData()" />
            <nuxt-link
              :to="'/formacion/experiencias/detalle/' + this.$route.params.uuid"
              class="btn-block btn btn-danger btn-sm"
            >
              Cancelar
            </nuxt-link>
          </div>
        </div>
      </b-col>
      <b-col col sm="12" md="12" lg="10" class="pr-1">
        <div class="card card-accent-primary">
          <table style="width: 100%" class="table table-striped table-sm">
            <tr>
              <th>Nombre</th>
              <th>Libro</th>
              <th>Folio</th>
              <th>Rama</th>
            </tr>
            <template v-for="datos in data">
              <tr :key="datos.id" :class="color(datos.estado_id)">
                <td style="vertical-align: middle">
                  <div-persona :persona="datos.persona" />
                </td>
                <!--
                <td style="vertical-align: middle;">
                  <div-funciones :funciones="datos.persona.funciones" />
                </td>
                -->
                <td style="vertical-align: middle">
                  <input v-model="datos.libro" class="form-control form-control-sm" required="required" type="number" />
                </td>
                <td style="vertical-align: middle">
                  <input v-model="datos.folio" class="form-control form-control-sm" required="required" type="number" />
                </td>
                <td v-if="curso.solicita_rama" style="vertical-align: middle">
                  <select-ramas v-model="datos.rama" :value="datos.rama" clase="form-control-sm" />
                </td>
                <td style="vertical-align: middle">
                  <select v-if="datos.estado_id != 3" v-model="datos.estado_id" class="form-control form-control-sm">
                    <option value="1">En Curso</option>
                    <option value="2">Acreditado</option>
                    <option value="5">Recursar</option>
                    <option value="6">Ausente</option>
                  </select>
                  <template v-else>
                    <strong title="El estado del cursante se debe modificar desde el modulo de gestion de trabajos">
                      Pendiente TP
                    </strong>
                  </template>
                </td>
              </tr>
            </template>
          </table>
        </div>
      </b-col>
    </b-row>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'formacion.experiencias.abm' },
  },
  data() {
    return {
      libro: '',
      folio: '',
      estado_id: '',
      data: [],
      curso: {},
    }
  },
  watch: {
    libro(val) {
      this.$_.map(this.data, (obj) => (obj.libro = val))
    },
    folio(val) {
      this.$_.map(this.data, (obj) => (obj.folio = val))
    },
    estado_id(val) {
      this.$_.map(this.data, (obj) => {
        if (obj.estado_id !== 3) {
          return (obj.estado_id = val)
        }
        return false // obj.estado_id;
      })
    },
  },
  created() {
    this.getData()
    this.getCurso()
  },

  methods: {
    color(id) {
      if (id === 1) {
        return 'table-primary'
      } else if (id === 2) {
        return 'table-success'
      } else if (id === 5) {
        return 'table-danger'
      } else if (id === 6) {
        return 'table-danger'
      }
    },
    enviarDatos() {
      // $(".card-body").block();
      // achico el set de datos a enviar
      const datos = []
      this.data.forEach((element) => {
        datos.push({
          uuid: element.uuid,
          estado: element.estado_id,
          rama: element.rama,
          libro: element.libro,
          folio: element.folio,
        })
      })

      return this.$axios
        .put('/formacion/participantes/masivo', {
          curso_uuid: this.$route.params.uuid,
          data: datos,
        })
        .then(() => {
          this.$router.push({
            path: '/formacion/experiencias/detalle/' + this.$route.params.uuid,
          })
        })
    },
    getCurso() {
      this.$axios.get(`/formacion/cursos/${this.$route.params.uuid}`).then((response) => {
        this.curso = response.data.data
      })
    },
    getData() {
      this.$axios
        .get('/formacion/participantes', {
          params: {
            limit: 99999,
            curso_uuid: this.$route.params.uuid,
            estado: 0,
          },
        })
        .then((response) => {
          this.data = response.data.data
        })
    },
  },
}
</script>

<style scoped>
table >>> tr th:nth-child(1) {
  width: 30%;
}

table >>> tr th:nth-child(2) {
  width: 10%;
}

table >>> tr th:nth-child(3) {
  width: 10%;
}

table >>> tr th:nth-child(4) {
  width: 20%;
}
table >>> tr th:nth-child(5) {
  width: 20%;
}
</style>
