<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Distribucion de Membresia</titulo>
    </template>
    <alerta tipo="info">
      Los datos reflejados en este mapa, son aproximados, ya que al realizar la busqueda de todos los domicilios,
      algunos tiene inconcistencias o fueron mal cargado, y se pueden mostrar mal en el mapa
    </alerta>
    <div class="embed-responsive">
      <div style="height: 500px; width: 100%">
        <l-map
          v-if="showMap"
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          style="height: 80%"
          @update:center="centerUpdate"
          @update:zoom="zoomUpdate"
        >
          <l-tile-layer :url="url" :attribution="attribution" />
          <l-marker
            v-for="coordenada in coordenadas"
            :key="coordenada.nombre"
            :lat-lng="latLng(coordenada.latitud, coordenada.longitud)"
          >
            <l-popup>
              {{ coordenada.persona.apellidoynombre }} <br />
              {{ coordenada.domicilio }}
              <div-funciones :funciones="coordenada.persona.funciones"></div-funciones>
            </l-popup>
          </l-marker>
        </l-map>
      </div>
    </div>
  </ContentWrapper>
</template>

<script>
/// https://vue2-leaflet.netlify.app/examples/simple.html
import { latLng } from 'leaflet'
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'

export default {
  name: 'Example',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      coordenadas: {},
      zoom: 13,
      center: latLng(-34.6146189, -58.5564277),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(47.41322, -1.219482),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    latLng(la, lo) {
      return latLng(la, lo)
    },
    zoomUpdate(zoom) {
      this.currentZoom = zoom
    },
    centerUpdate(center) {
      this.currentCenter = center
    },
    getData() {
      this.$axios.get('/persona/reportes/ubicaciones').then((response) => {
        this.coordenadas = response.data.data
      })
    },
  },
}
</script>
