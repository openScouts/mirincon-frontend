<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo><i class="os-area-ams" />Mi Estado de Formación</titulo>
    </template>
    <b-card no-body class="card-accent-primary">
      <!-- v-show="gridIm.items.length"  -->
      <div slot="header"><span class="fas cis-im" /> Datos de Insignia de Madera</div>
      <insignia-madera :uuid="personaUUID" />
    </b-card>
    <b-card v-show="verHabilitaciones" id="detalleHabilitacion" no-body class="card-accent-primary">
      <!-- v-show="gridHabilitacion.items.length"  -->
      <div slot="header"><span class="fas cis-im" /> Mis Habilitaciones</div>
      <habilitaciones :uuid="personaUUID" />
    </b-card>

    <b-card no-body class="card-accent-primary">
      <!-- v-show="gridFormacion.items.length"-->
      <div slot="header"><span class="cis-area-ams" /> Experiencias Específicas para la Función</div>
      <experiencias tipo="FA" :uuid="personaUUID" />
    </b-card>

    <b-card no-body class="card-accent-primary">
      <!-- v-show="gridFormacion.items.length"-->
      <div slot="header"><span class="cis-area-ams" /> Mis Experiencias Realizadas</div>
      <experiencias :uuid="personaUUID" />
    </b-card>
  </ContentWrapper>
</template>

<script>
import Experiencias from '@/components/formacion/persona/experiencias.vue'
import Habilitaciones from '@/components/formacion/persona/habilitaciones.vue'
import InsigniaMadera from '@/components/formacion/persona/insigniaMadera.vue'

export default {
  components: { InsigniaMadera, Experiencias, Habilitaciones },
  props: {
    // Esto lo uso porque el componente lo llamo desde otros componentes
    uuid: { type: String, default: 'uuid' },
  },
  data() {
    return {
      verHabilitaciones: false, // este propiedad se modifica internamente desde el componente Habilitaciones
    }
  },
  head() {
    return {
      titleTemplate: 'Mi Formacion - %s ',
    }
  },
  computed: {
    personaUUID() {
      if (this.uuid === 'uuid') {
        return this.$auth.user.persona.uuid
      }
      return this.uuid
    },
  },
}
</script>
