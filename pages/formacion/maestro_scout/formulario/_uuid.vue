<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>
        Solicitud de Insignia de Madera
        <template v-if="form.apellidoynombre !== undefined" slot="subtitulo">
          Editando a {{ form.apellidoynombre }}
        </template>
      </titulo>
    </template>
    <div class="row">
      <div class="col-md-12">
        <div class="row">
          <div class="col-md-6">
            <div id="formulario" class="card card-accent-primary">
              <div v-if="form.apellidoynombre !== undefined" class="card-header">Editando Insignia de Madera</div>
              <div v-if="form.apellidoynombre === undefined" class="card-header">Cargar Nueva Insignia de Madera</div>
              <div class="card-body p-2">
                <div class="form-group">
                  <label class="control-label">Documento</label>
                  <input-persona v-model="form.persona_uuid" :value="form.persona_uuid" />
                  <error input="documento"></error>
                </div>
                <div class="form-group">
                  <label class="control-label">Rama</label>
                  <select-ramas v-model="form.rama" :value="form.rama" />
                  <error input="rama"></error>
                </div>
                <template v-if="this.$route.params.uuid !== undefined">
                  <b-form-group label="Numero de Registro de SAA">
                    <b-form-input
                      v-model="form.nro_registro"
                      type="text"
                      size="sm"
                      placeholder="Numero de Registro de SAAC"
                    />
                    <error input="nro_registro"></error>
                  </b-form-group>
                  <b-form-group label="Fecha Otorgada">
                    <b-input-group>
                      <b-form-input v-model="form.f_otorgada" size="sm" type="date" placeholder="Ingrese una fecha" />
                      <b-input-group-append>
                        <span class="input-group-text">
                          <i class="fas fa-calendar-alt" />
                        </span>
                      </b-input-group-append>
                    </b-input-group>
                    <error input="f_otorgada"></error>
                  </b-form-group>
                </template>
              </div>
              <template v-if="this.$route.params.uuid === undefined">
                <button v-promise-btn class="btn btn-success m-2" @click="solicitarIM()">Solicitar IM</button>
              </template>
              <template v-else>
                <button v-promise-btn class="btn btn-success m-2" @click="actualizarIM()">Actualizar IM</button>
              </template>
            </div>
          </div>
          <div class="col-md-6">
            <b-card v-if="form.persona_uuid" no-body class="card-accent-primary">
              <div slot="header"><span class="fas cis-im" /> Listado completo de todas las IMs</div>
              <insignia-madera :uuid="form.persona_uuid" />
            </b-card>
          </div>
        </div>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
import InsigniaMadera from '~/components/formacion/persona/insigniaMadera.vue'
export default {
  components: { InsigniaMadera },
  meta: {
    auth: { permiso: 'formacion.maestro_scout.abm' },
  },
  data() {
    return {
      form: { persona: {} },
    }
  },
  mounted() {
    this.getDatos()
  },
  methods: {
    solicitarIM() {
      return this.$axios.post('/formacion/im', this.form).then(() => {
        this.$router.push({ path: '/formacion/maestro_scout' })
      })
    },
    actualizarIM() {
      return this.$axios.put('/formacion/im', this.form).then(() => {
        this.$router.push({ path: '/formacion/maestro_scout' })
      })
    },
    getDatos() {
      if (this.$route.params.uuid !== undefined) {
        this.$axios.get('/formacion/im/' + this.$route.params.uuid + '/editar').then((response) => {
          this.form = response.data.data
          this.form.f_otorgada = this.$moment(this.form.f_otorgada).format('YYYY-MM-DD')
        })
      }
    },
  },
}
</script>
