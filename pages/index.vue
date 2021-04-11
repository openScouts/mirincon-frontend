<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  mounted() {
    // si le falta el celular, lo reenvio para que complete los datos
    if (!this.user.login.datos_completos) {
      this.$router.replace('/main/perfil')
    } else {
      this.$router.replace('/main')
    }
  },
})
</script>
