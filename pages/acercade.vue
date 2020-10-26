<template>
  <ContentWrapper>
    <template slot="titulo">
      <titulo>Mi Rincon Scout</titulo>
    </template>
    <div class="row">
      <div class="col-md-6">
        <h4>Miembros Involucrados en el proyecto</h4>
        <ul class="timeline">
          <li>
            <a href="#">2014 - 2019</a>
            <p>Andres Lacquaniti</p>
          </li>
          <li>
            <a href="#">2012 - 2015</a>
            <p><br />Andres Lacquaniti <br />Gustavo Garone</p>
          </li>
        </ul>
      </div>
    </div>
  </ContentWrapper>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  head() {
    return {
      titleTemplate: 'Acerca de....',
    }
  },
})
</script>
