<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Cargar Formacion al Adulto</titulo>
    </template>
    <div class="card card-accent-primary">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label">Persona</label>
              <input-persona v-model="form.persona_uuid" :value="form.persona_uuid" />
              <error input="persona_uuid"></error>
            </div>
            <div class="form-group">
              <label>Tipo de Registro</label>
              <select v-model="form.tipo_registro" class="form-control input-sm" required>
                <option value="otra_organismo">Experiencia Realizado en Otra organismo</option>
                <option value="antiguo">Experiencia Antigua, no cargada</option>
                <option value="fuera">Curso/Taller Realizado Fuera del Movimiento</option>
                <option value="homologacion">Homologacion de experiencia</option>
              </select>
              <error input="tipo_registro"></error>
            </div>
            <div v-if="form.tipo_registro === 'otra_organismo'" class="form-group">
              <label class="control-label">Organismo donde realizo la experiencia</label>
              <select-organismos v-model="form.organismos_id" filtrado="distrito" />
              <error input="organismos_id"></error>
            </div>
            <div v-if="form.tipo_registro !== 'fuera'" class="form-group">
              <label>Experiencia de Formación</label>
              <select v-model="form.ams_experiencias_id" class="form-control input-sm" required>
                <option v-for="(tipo, index) in experiencias" :key="index" :value="tipo.id">
                  ( Esquema {{ tipo.esquema }} ) - {{ tipo.nombre }}
                </option>
              </select>
              <error input="ams_experiencias_id"></error>
            </div>
            <div v-if="form.tipo_registro === 'fuera' || form.ams_experiencias_id === 2" class="form-group">
              <label>Nombre Curso/Taller:</label>
              <input
                v-model="form.experiencia_nombre"
                class="form-control input-sm"
                type="text"
                required
                placeholder="Ingrese el nombre del Evento"
              />
              <error input="experiencia_nombre"></error>
            </div>
            <div v-if="form.tipo_registro !== 'fuera' && form.ams_experiencias_id !== 2" class="form-group">
              <label class="control-label">Rama</label>
              <select-ramas v-model="form.rama" />
              <error input="rama"></error>
            </div>
            <div class="form-group">
              <label class="control-label">Fecha</label>
              <input
                v-model="form.fecha"
                class="form-control input-sm"
                required="required"
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                placeholder="Ingrese una fecha"
                type="date"
              />
              <error input="fecha"></error>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="control-label">Responsable donde realizo la experiencia</label>
              <error input="responsable"></error>
              <input
                v-model="form.responsable"
                class="form-control input-sm"
                required="required"
                type="text"
                placeholder="Responsable de la Experiencia"
              />
            </div>
            <div v-if="form.tipo_registro !== 'fuera'" class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label">Libro donde se registro</label>
                  <input v-model="form.libro" class="form-control input-sm" required="required" type="text" />
                  <error input="libro"></error>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label class="control-label">Folio donde se registro</label>
                  <input v-model="form.folio" class="form-control input-sm" required="required" type="text" />
                  <error input="folio"></error>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="control-label">Observaciones</label>
              <textarea v-model="form.observaciones" class="form-control" cols="50" rows="10" />
              <error input="observaciones"></error>
            </div>
            <button v-promise-btn class="btn btn-success btn-block" @click="crearExperienciaManual()">
              Cargar Solicitud
            </button>
          </div>
        </div>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
export default {
  meta: {
    auth: { permiso: 'formacion.carga_manual.abm' },
  },
  data() {
    return {
      experiencias: [],
      form: {},
    }
  },
  created() {
    this.getExperiencias()
  },
  methods: {
    getExperiencias() {
      this.$axios.get('/formacion/experiencias').then((response) => {
        this.experiencias = response.data
      })
    },
    crearExperienciaManual() {
      this.$axios.post('/formacion/carga_manual', this.form).then(() => {
        this.$router.push({ path: '/formacion/carga_manual' })
      })
    },
  },
}
</script>
