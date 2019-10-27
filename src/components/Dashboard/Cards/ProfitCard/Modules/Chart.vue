<template lang="pug">
  q-card-section(style="height: 320px;")
    chart(
      :options="chartOptions"
      style="width: 100%; height: 100%;"
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
      if (!this.options) return [100]
      return this.options
    },
    chartOptions () {
      const chartOptions = {
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          axisLine: {
          },
          axisLabel: {
            fontSize: 9,
            margin: 5
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [
          {
            type: 'slider',
            start: 0,
            end: 100
          }
        ],
        series: [{
          data: [100],
          type: 'line',
          showAllSymbol: true
        }]
      }
      if (this.chartData) {
        this.chartData.forEach((item, index) => {
          chartOptions.series[index] = Object.assign({
            type: 'line',
            color: item.color
          })
          chartOptions.series[index].data = item.data
        })
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
