<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo><i class="os-area-ams" />Mi Estado de Formación</titulo>
    </template>
    <b-card id="detalleIM" no-body class="card-accent-primary">
      <!-- v-show="gridIm.items.length"  -->
      <div slot="header"><span class="fas cis-im" /> Datos de Insignia de Madera</div>
      <insignia-madera :uuid="personaUUID" />
    </b-card>
    <b-card id="detalleHabilitacion" no-body class="card-accent-primary">
      <!-- v-show="gridHabilitacion.items.length"  -->
      <div slot="header"><span class="fas cis-im" /> Mis Habilitaciones</div>
      <habilitaciones :uuid="personaUUID" />
    </b-card>
    <b-card id="detalleFormacion" no-body class="card-accent-primary">
      <!-- v-show="gridFormacion.items.length"-->
      <div slot="header"><span class="cis-area-ams" /> Mis Experiencias Realizadas</div>
      <experiencias :uuid="personaUUID" />
    </b-card>
  </ContentWrapper>
</template>

<script>
import Experiencias from '@/components/formacion/persona/experiencias'
import Habilitaciones from '@/components/formacion/persona/habilitaciones'
import InsigniaMadera from '@/components/formacion/persona/insigniaMadera'

export default {
  components: { InsigniaMadera, Experiencias, Habilitaciones },
  props: {
    // Esto lo uso porque el componente lo llamo desde otros componentes
    uuid: { type: String, default: 'uuid' },
  },
  computed: {
    personaUUID() {
      if (this.uuid === 'uuid') {
        return this.$auth.user.persona.uuid
      }
      return this.uuid
    },
  },
  head() {
    return {
      titleTemplate: 'Mi Formacion - %s ',
    }
  },
}
</script>
