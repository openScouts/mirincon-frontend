<template>
  <span class="text-white" :class="'badge badge-' + valor.color">
    <i :class="valor.icono" />
    {{ valor.estado }}
  </span>
</template>

<script>
export default {
  name: 'DivTrabajoParticipanteEstado',
  props: {
    estado: {
      type: [String, Number],
      default: null,
      required: true,
    },
  },
  data() {
    return {
      valor: {},
    }
  },
  watch: {
    estado() {
      this.setEstado(this.estado)
    },
  },
  mounted() {
    this.setEstado(this.estado)
  },
  methods: {
    setEstado(estado) {
      let out = {}
      switch (estado) {
        case 1:
        case 'Pendiente':
          out = {
            estado: 'Pendientes de Entrega',
            color: 'warning',
            icono: 'fas fa-cogs',
          }
          break
        case 2:
        case 'Entregado':
          out = {
            estado: 'En Correccion por el Formador',
            color: 'info',
            icono: 'fas fa-thumbs-up',
          }
          break
        case 3:
        case 'Corregir':
          out = {
            estado: 'En Correccion por el Cursante',
            color: 'warning',
            icono: 'fas fa-clock',
          }
          break
        case 4:
        case 'Aprobado':
          out = {
            estado: 'Aprobado',
            color: 'success',
            icono: 'fas fa-thumbs-up',
          }
          break
        case 5:
        case 'Desaprobado':
          out = {
            estado: 'Desaprobado',
            color: 'danger',
            icono: 'fas fa-thumbs-down',
          }
          break
      }

      this.valor = out
    },
  },
}
</script>
