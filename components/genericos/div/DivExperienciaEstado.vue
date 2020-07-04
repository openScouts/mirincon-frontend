<template>
  <div>
    <slot />
    <span :class="valor.color">
      <i :class="valor.icono" />
      {{ valor.estado }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'DivExperienciaEstado',
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
        case 'En Curso':
          out = {
            estado: 'En Curso',
            color: 'text-primary',
            icono: 'fas fa-cogs',
          }
          break
        case 2:
        case 'Acreditado':
          out = {
            estado: 'Acreditado',
            color: 'text-success',
            icono: 'fas fa-thumbs-up',
          }
          break
        case 3:
        case 'Pendiente TP':
          out = {
            estado: 'Pendiente TP',
            color: 'text-warning',
            icono: 'fas fa-clock',
          }
          break
        case 4:
        case 'Homologa':
          out = {
            estado: 'Homologa',
            color: 'text-success',
            icono: 'fas fa-thumbs-up',
          }
          break
        case 5:
        case 'Recursar':
          out = {
            estado: 'Recursar',
            color: 'text-danger',
            icono: 'fas fa-thumbs-down',
          }
          break
        case 6:
        case 'Ausente':
          out = {
            estado: 'Ausente',
            color: 'text-danger',
            icono: 'fas fa-thumbs-down',
          }
          break
      }

      this.valor = out
    },
  },
}
</script>
