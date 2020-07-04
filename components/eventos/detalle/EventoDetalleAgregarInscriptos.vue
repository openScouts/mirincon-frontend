<template>
  <div>
    <b-modal
      id="modal-agregar"
      ref="myModalRef"
      hide-footer
      centered
      size="lg"
      title="Agregar nuevos inscriptos al evento"
    >
      <!-- ARMARLO COMO  WIZARD-->
      <div v-if="$_.size(persona.items)">
        <alerta tipo="alerta">Las Personas inscritas por este medio, NO recibieron ningun tipo de notificación</alerta>

        <b-button :block="true" class="m-2" @click="sendInscriptos">Cargar Inscriptos</b-button>
        <b-button
          :block="true"
          class="m-2"
          @click="
            persona.items = null
            documentos = null
          "
          >Nueva Busqueda</b-button
        >

        <b-table :items="persona.items" :fields="persona.fields" striped small hover />
      </div>
      <div v-else>
        <b-form-textarea v-model="documentos" :rows="10" :max-rows="15" placeholder="Ingrese un listado de Documento" />
        <b-button class="m-2" @click="sendDocumentos">Siguiente</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    evento: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      documentos: '',
      persona: {
        items: null,
        fields: [
          {
            key: 'documento',
            sortable: true,
          },
          {
            key: 'apellidoynombre',
            sortable: false,
          },
          {
            key: 'tipo',
            label: 'categoria',
            sortable: true,
          },
          {
            key: 'afiliacion',
            sortable: false,
          },
          {
            key: 'rama',
            sortable: false,
          },
        ],
      },
    }
  },

  methods: {
    showModal() {
      this.$refs.myModalRef.show()
    },
    hideModal() {
      this.$refs.myModalRef.hide()
    },
    sendInscriptos() {
      this.$axios.post('/eventos/inscriptos/masivo', {
        persona: JSON.stringify(this.persona.items),
        uuid: this.evento.uuid, // UUID del evento
      })
      this.hideModal()
    },
    sendDocumentos() {
      this.$axios
        .post('/persona/personas/busqueda/masiva', {
          documentos: this.documentos,
        })
        .then((response) => {
          this.persona.items = response.data.data
        })
    },
  },
}
</script>
