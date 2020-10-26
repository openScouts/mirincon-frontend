<template>
  <div class="row ml-4 mr-4 animated bounce alert alert-icon alert-icon-border" :class="clase" role="alert">
    <div class="icon col-1">
      <span :class="icono" class="fa-2x" />
    </div>
    <div class="message col-11">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tipo: {
      type: String,
      required: false,
      default: '',
    },
  },
  data() {
    return {
      icono: '',
      clase: '',
    }
  },
  created() {
    this.procesar()
  },
  methods: {
    procesar() {
      switch (this.tipo) {
        case 'info':
          this.icono = 'fas fa-info-circle'
          this.clase = 'alert-info'
          break
        case 'error':
          this.icono = 'fas fa-times-circle'
          this.clase = 'alert-danger'
          break
        case 'correcto':
          this.icono = 'fas fa-check-circle'
          this.clase = 'alert-success'
          break
        case 'alerta':
          this.icono = 'fas fa-exclamation-circle'
          this.clase = 'alert-warning'
          break
        default:
          this.icono = 'fas fa-bell'
          this.clase = 'alert-dark'
          break
      }
    },
  },
}
</script>
