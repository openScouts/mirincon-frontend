<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Autorizacion</titulo>
    </template>
    <b-row>
      <b-col cols="12">
        <div class="card card-accent-primary">
          <div class="card-header">Eventos Pendientes de Autorizacion</div>
          <div class="card-body">
            <template v-if="grid.items.length">
              <b-table :items="grid.items" :fields="grid.fields" class="table-sm">
                <template v-slot:cell(datos)="data">
                  <b-row>
                    <b-col sm="2">
                      <img :src="'/img/areas/' + data.item.area_codigo.toLowerCase() + '.svg'" width="50" height="50" />
                    </b-col>
                    <b-col sm="10">
                      <strong> {{ data.item.evento }}</strong>
                      <div class="text-muted">
                        <strong>Area: </strong>
                        {{ data.item.area }}
                      </div>
                      <div class="text-muted">
                        <strong>Organismo: </strong>
                        {{ data.item.organismo.full }}
                      </div>
                    </b-col>
                  </b-row>
                </template>
                <template v-slot:cell(informacion)="data">
                  <div>
                    <strong class="text-muted">Cierre Inscripciones: </strong>
                    {{ data.item.cierre_inscripcion | Date }}
                  </div>
                  <div>
                    <strong class="text-muted">Inicio del Evento: </strong>
                    {{ data.item.fecha_evento | DateTime }}
                  </div>
                  <div>
                    <strong class="text-muted">Responsable: </strong>
                    {{ data.item.responsable }}
                  </div>
                </template>
                <template v-slot:cell(opciones)="data">
                  <nuxt-link :to="'/eventos/administracion/detalle/' + data.item.uuid">Ver Detalle</nuxt-link>
                  <template v-if="user.is.zona">
                    |
                    <b-button variant="link" class="text-danger" @click="autorizar(data.item)">
                      Autorizar Evento
                    </b-button>
                  </template>
                </template>
              </b-table>
            </template>
            <template v-else>
              <vacio texto="No existen Eventos Pendientes de autorizacion"></vacio>
            </template>
          </div>
        </div>
      </b-col>
    </b-row>
  </ContentWrapper>
</template>

<style scoped>
/* Defino el Ancho de la primer columna*/
.VueTables >>> * tr th:nth-child(1) {
  width: 15%;
}

.VueTables >>> * tr th:nth-child(2) {
  width: 5%;
}

.VueTables >>> * tr th:nth-child(3) {
  width: 40%;
}

.VueTables >>> * tr th:nth-child(8) {
  width: 5%;
}
</style>

<script>
export default {
  meta: {
    auth: { permiso: 'eventos.autorizacion' },
  },
  data() {
    return {
      grid: {
        fields: [
          {
            key: 'datos',
            label: 'datos',
          },
          {
            key: 'informacion',
            label: 'informacion',
          },
          {
            key: 'costo',
            label: 'costo',
          },
          {
            key: 'opciones',
            label: 'Opciones',
          },
        ],
        items: [],
      },
    }
  },
  mounted() {
    this.getPendientes()
  },

  methods: {
    getPendientes() {
      this.$axios.get('/eventos/eventos?autorizados=N').then((response) => {
        this.grid.items = response.data.data
      })
    },
    autorizar(objeto) {
      this.$swal
        .fire({
          title: 'Autorizar Evento',
          text: `Usted va a autorizar el evento "${objeto.evento}" del Organismo ${objeto.organismo.organismo} \n esta accion no puede ser revertida`,
          type: 'warning',
          showCancelButton: true,
        })
        .then((result) => {
          // si el alerta devuelve OK, ejecuto el cambio de estado
          if (result.value) {
            // $("table").block();
            this.$axios.put('/eventos/eventos/autorizar', { uuid: objeto.uuid }).then(() => {
              this.getPendientes()
            })
          } else {
            // si cancela el alerta no hago nada
            this.$swal.fire('Se cancelo la autorizacion')
          }
        })
    },
  },
}
</script>
