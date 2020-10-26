<template>
  <div v-if="chartOptions.labels.length != 0" class="chart-wrapper">
    <apexchart type="pie" :options="chartOptions" :series="series" />
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import Vue from 'vue'

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      series: [],
      chartOptions: {
        labels: [],
        colors: [],
        height: 'auto',
        responsive: [
          {
            // breakpoint: 480,
            options: {
              chart: {
                // width: 400
              },
              legend: {
                position: 'top',
              },
            },
          },
        ],
      },
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$axios.get(this.url).then((response) => {
        // this.series = [];
        // this.chartOptions.labels = [];
        response.data.forEach((element) => {
          this.series.push(element.total)
          this.chartOptions.labels.push(element.nombre + ' ( ' + element.total + ' )')
          // si existe un campo color lo cargo al array !!
          if (element.color) {
            // https://apexcharts.com/docs/colors/
            this.chartOptions.colors.push(element.color)
          }
        })
      })
    },
  },
}
</script>
