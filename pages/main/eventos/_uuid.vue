<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>
        Panel de Inscripciones
        <template slot="subtitulo">Evento: {{ evento.evento }} | Fecha {{ evento.evento_inicio | Date }}</template>
      </titulo>
    </template>
    <alerta v-if="evento.ams_experiencias_id === 56" tipo="info">
      El evento es "Capacitación para adquirir los Derechos Asociativos" por esta razón solo aparecerán los mayores de
      16 años al dia del encuentro
    </alerta>

    <div class="card card-accent-primary">
      <div v-if="dataset === null || evento === null">
        <h5>Buscando Datos .......</h5>
      </div>
      <div v-else>
        <template v-if="dataset_bk.length === 0">
          <vacio texto="No se encontraron personas para la nomina"></vacio>
        </template>
        <template v-else>
          <div class="p-2">
            <button type="button" class="btn btn-primary" @click="filtrado('todos')">Ver Todos</button>
            <button type="button" class="btn btn-success" @click="filtrado('si')">Ver Anotador</button>
            <button type="button" class="btn btn-danger" @click="filtrado('no')">Ver No Anotado</button>
          </div>
          <b-table :items="dataset" :fields="columns" striped hover small responsive class="no-more-tables">
            <template #cell(persona)="data">
              <div-persona :persona="data.item.persona" />
            </template>
            <template #cell(funcion)="data">
              <div-funciones :key="data.item.persona.uuid" :funciones="data.item.persona.funciones" />
            </template>

            <template #cell(estado)="data">
              <template v-if="data.item.inscripto_uuid">
                <div class="text-success"><i class="fas fa-thumbs-up" /> Si Participa</div>
              </template>
              <template v-else>
                <div class="text-danger"><i class="fas fa-thumbs-down" /> NO participa</div>
              </template>
            </template>

            <template #cell(opciones)="data">
              <div
                v-if="$moment(evento.cierre_inscripcion).format('YYYY-MM-DD') >= $moment().format('YYYY-MM-DD')"
                class="text-center"
              >
                <template v-if="data.item.inscripto_uuid">
                  <button
                    v-promise-btn
                    class="btn btn-danger btn-sm"
                    @click="darDeBajaInscripto(data.item.inscripto_uuid)"
                  >
                    Dar de Baja
                  </button>
                </template>
                <template v-else>
                  <button v-promise-btn class="btn btn-success btn-sm" @click="darDeAltaInscripto(data.item.persona)">
                    Dar de Alta
                  </button>
                </template>
              </div>
              <template v-else>
                <div class="text-center small">
                  Inscripcion Cerrada el
                  <br />
                  {{ evento.cierre_inscripcion | Date }}
                </div>
              </template>
            </template>
          </b-table>
        </template>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
import Vacio from '~/components/genericos/Vacio.vue'
export default {
  components: { Vacio },
  data() {
    return {
      columns: [
        { label: 'Datos', key: 'persona' },
        { label: 'Función', key: 'funcion' },
        {
          label: 'Estado',
          key: 'estado',
          /*
          formatter: (item) => {
            if (item.inscripto_uuid) {
              return 'Si Participa'
            } else {
              return 'No participa'
            }
          }, */
        },
        { label: 'Opciones', key: 'opciones' },
      ],
      dataset: [],
      dataset_bk: [],
      filtro: 'todos',
      evento: [],
    }
  },
  head() {
    return {
      titleTemplate: 'Gestion de Eventos - %s ',
    }
  },
  created() {
    this.getPersona()
    this.getEventos()
  },
  methods: {
    filtrado(parametro) {
      this.filtro = parametro
      this.dataset = this.dataset_bk.filter((value) => {
        if (parametro === 'si') {
          if (value.inscripto_uuid) {
            return true
          }
        } else if (parametro === 'no') {
          if (!value.inscripto_uuid) {
            return true
          }
        } else {
          return true
        }

        return false
      })
    },

    darDeAltaInscripto(persona) {
      this.info = true
      return this.$axios
        .post('/eventos/inscriptos', {
          persona_uuid: persona.uuid,
          evento_uuid: this.evento.uuid,
        })
        .then(() => {
          this.getPersona()
        })
    },
    darDeBajaInscripto(inscriptoUuid) {
      return this.$axios
        .delete('/eventos/inscriptos', {
          params: { inscripto_uuid: inscriptoUuid },
        })
        .then(() => {
          this.getPersona()
        })
    },

    getPersona() {
      this.$axios.get('/eventos/eventos/disponibles/' + this.$route.params.uuid).then((response) => {
        this.dataset_bk = response.data.data
        this.filtrado(this.filtro)
      })
    },
    getEventos() {
      this.$axios.get('/eventos/eventos/' + this.$route.params.uuid).then((response) => {
        this.evento = response.data.data
      })
    },
  },
}
</script>

<style scoped>
* tr th:nth-child(0) {
  width: 30% !important;
}
* tr th:nth-child(2) {
  width: 30% !important;
}
* tr th:nth-child(3) {
  width: 30% !important;
}
* tr th:nth-child(4) {
  width: 10% !important;
}
</style>
