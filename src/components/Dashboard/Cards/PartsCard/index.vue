<template lang="pug">
  standart-card
    name-slot(name="Доля в бронированиях")
    q-card-section
      span.row.text-body2 {{ dateFormatForLabel }}
    chart(
      :options ="options"
    )
    nav-bar(
      :startPeriod="period"
      @periodChange="period = $event"
      @dateChange="date = $event"
    )
    options(
      :options ="options"
    )
</template>

<script>
import NavBar from './Modules/NavBar'
import Chart from './Modules/Chart'
import Options from './Modules/Options'
import NameSlot from '../CommonModules/NameSlot'
import StandartCard from '../CommonModules/StandartCard'

const rawData = {
  week: [
    {
      room: 'Зал 11',
      total: 4600
    },
    {
      room: 'Зал 12',
      total: 3600
    },
    {
      room: 'Зал 13',
      total: 2700
    },
    {
      room: 'Зал 14',
      total: 5800
    }
  ],
  month: [
    {
      room: 'Зал 11',
      total: 46000
    },
    {
      room: 'Зал 12',
      total: 57000
    },
    {
      room: 'Зал 13',
      total: 69000
    },
    {
      room: 'Зал 14',
      total: 36000
    }
  ],
  quarter: [
    {
      room: 'Зал 11',
      total: 148000
    },
    {
      room: 'Зал 12',
      total: 127000
    },
    {
      room: 'Зал 13',
      total: 157000
    },
    {
      room: 'Зал 14',
      total: 181000
    }
  ]
}

export default {
  name: 'PartsCard',
  data () {
    return {
      period: 'month',
      date: {
        from: '',
        to: ''
      }
    }
  },
  components: {
    StandartCard,
    NameSlot,
    Chart,
    NavBar,
    Options
  },
  computed: {
    options () {
      let sum = 0
      rawData[this.period].forEach((item) => {
        sum += item.total
      })
      return rawData[this.period].map((item, index) => {
        const point = {
          name: item.room,
          total: item.total,
          percents: (item.total / sum * 100).toFixed(2),
          color: '#' + ((1 << 24) * Math.random() | 0).toString(16)
        }
        return point
      })
    },
    dateFormatForLabel () {
      if (this.date.from === '') return '23-29 сентября, 2019'
      return `${this.$moment(this.date.from).format('D MMMM, YYYY')} — ${this.$moment(this.date.to).format('D MMMM, YYYY')}`
    }
  },
}
</script>

<style scoped>

</style>
