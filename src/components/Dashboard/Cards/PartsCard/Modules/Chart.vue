<template lang="pug">
  q-card-section(style="height: 400px;")
    chart(
      :options="chartOptions"
      style="width: 100%; height: 100%"
    )

</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts'

export default {
  name: 'Chart',
  components: {
    'chart': ECharts
  },
  data () {
    return {
    }
  },
  computed: {
    chartData () {
      if (!this.options) return [{ value: 100, itemStyle: { color: 'black' } }]
      return this.options.map((item) => {
        const piece = {
          value: item.total,
          itemStyle: { color: item.color }
        }
        return piece
      }).sort(function (a, b) {
        return a.value - b.value
      })
    },
    chartOptions () {
      const chartOptions = {
        series: [{
          type: 'pie',
          center: ['50%', '50%'],
          data: [
            { value: 100, itemStyle: { color: 'black' } },
          ].sort(function (a, b) {
            return a.value - b.value
          }),
          label: {
            normal: {
              textStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            }
          },
          labelLine: {
            normal: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            }
          },
          itemStyle: {
            normal: {
              color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
        }]
      }
      if (this.chartData) {
        chartOptions.series[0].data = this.chartData
      }
      return chartOptions
    }
  },
  props: {
    options: Array,
  }
}
</script>

<style scoped>

</style>
