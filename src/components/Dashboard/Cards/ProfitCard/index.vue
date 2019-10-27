<template lang="pug">
  standart-card
    name-slot(name="Доход")
    q-card-section
      span.row.text-body2 {{ dateFormatForLabel }}
    chart(
      :options ="checkedOptions"
    )
    nav-bar(
      :startPeriod="period"
      @periodChange="period = $event"
      @dateChange="date = $event"
      )
    options(
      @checkedChange="checked = $event"
      :options ="options"
    )
</template>

<script>
import NavBar from './Modules/NavBar'
import Chart from './Modules/Chart'
import Options from './Modules/Options'
import NameSlot from '../CommonModules/NameSlot'
import StandartCard from '../CommonModules/StandartCard'

export default {
  name: 'ProfitCard',
  components: {
    StandartCard,
    NameSlot,
    Chart,
    NavBar,
    Options
  },
  created () {
    this.date.from = this.$moment({ hour: 0 }).parseZone()
    this.date.to = this.$moment({ hour: 0 }).parseZone()
  },
  data () {
    return {
      period: 'week',
      date: {
        from: '',
        to: ''
      },
      checked: []
    }
  },
  computed: {
    periodFactor () {
      if (this.period === 'week') return 1000
      if (this.period === 'month') return 4000
      if (this.period === 'year') return 52000
      return 100
    },
    dateArray () {
      let arr = []
      switch (this.period) {
        case 'week':
          for (let i = 0; i < 7; i++) {
            const date = this.$moment(this.date.from).add({ days: i })
            const formatDate = this.$moment(date).format('D')
            arr.push(formatDate)
          }
          break
        case 'month':
          for (let i = 0; i < 4; i++) {
            const date = this.$moment(this.date.from).add({ weeks: i })
            const formatDate = this.$moment(date).format('D')
            arr.push(formatDate)
          }
          break
        case 'year':
          for (let i = 0; i < 12; i++) {
            const date = this.$moment(this.date.from).add({ months: i })
            const formatDate = this.$moment(date).format('MMM')
            arr.push(formatDate)
          }
          break
      }
      return arr
    },
    options () {
      let arr = []
      if (!this.$app.studios.list) return []
      this.$app.studios.list.forEach((item, index) => {
        const total = {
          label: `${item.name} - Предоплата`,
          value: index * 2,
          color: '#' + ((1 << 24) * Math.random() | 0).toString(16),
        }
        const prepayment = {
          label: `${item.name} - Бронирования`,
          value: index * 2 + 1,
          color: '#' + ((1 << 24) * Math.random() | 0).toString(16),
        }
        arr.push(total)
        arr.push(prepayment)
      })
      return arr
    },
    checkedOptions () {
      let opts = []
      this.checked.forEach(item => {
        opts.push(Object.assign({}, this.options[item], { data: this.setPoints() }))
      })
      return opts
    },
    dateFormatForLabel () {
      if (this.date.from === '') return '23-29 сентября, 2019'
      return `${this.$moment(this.date.from).format('D MMMM, YYYY')} — ${this.$moment(this.date.to).format('D MMMM, YYYY')}`
    }
  },
  methods: {
    setPoints () {
      const points = this.dateArray.map((item, index) => {
        const point = []
        point.push(item)
        point.push(this.periodFactor * 10 + Math.floor(this.periodFactor + Math.random() * this.periodFactor * 4))
        return point
      })
      return points
    }
  }
}
</script>

<style scoped>

</style>
