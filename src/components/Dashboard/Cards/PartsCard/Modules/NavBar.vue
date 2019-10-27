<template lang="pug">
  q-card-section.row.col-12
    q-btn.q-mr-md.col-2(
      label="Локация"
      size="sm"
      no-caps
      outline
      color="secondary"
    )
    q-btn.q-mr-xs.col-2(
      label="Неделя"
      no-caps
      size="sm"
      outline
      @click="setPeriod"
      color="secondary"
    )
    q-btn.q-mr-xs.col-2(
      outline
      label="Месяц"
      size="sm"
      no-caps
      @click="setPeriod"
      color="secondary"
    )
    q-btn.q-mr-xs.col-2(
      outline
      label="Квартал"
      size="sm"
      no-caps
      @click="setPeriod"
      color="secondary"
    )
    q-space
    q-btn-group(outline).col-2.justify-center
      q-btn.q-px-sm.q-mx-none(
        @click="periodPrev"
        outline
        size="sm"
        icon="chevron_left"
        color="secondary"
      )
      q-separator(vertical, inset)
      q-btn.q-px-sm.q-mx-none(
        @click="periodNext"
        outline
        size="sm"
        icon="chevron_right"
        color="secondary"
      ) {{ periodComp }}
    span {{ dateComp }}
</template>

<script>

export default {
  name: 'NavBar',
  created () {
    this.date = this.$moment({ hour: 0 }).parseZone()
  },
  data () {
    return {
      period: this.startPeriod || '',
      from: '',
      to: ''
    }
  },
  computed: {
    date: {
      get () {
        return {
          from: this.from,
          to: this.to,
        }
      },
      set (from) {
        const to = this.$moment(from).add(this.periodObject)
        this.from = from
        this.to = to
      }
    },
    periodComp () {
      return this.periodChange()
    },
    dateComp () {
      return this.dateChange()
    },
    periodObject () {
      let obj = {}
      switch (this.period) {
        case 'week':
          obj = { days: 7 }
          break
        case 'month':
          obj = { month: 1 }
          break
        case 'quarter':
          obj = { month: 4 }
          break
      }
      return obj
    }
  },
  methods: {
    periodPrev () {
      this.date = this.$moment(this.date.from).subtract(this.periodObject)
    },
    periodNext () {
      this.date = this.$moment(this.date.from).add(this.periodObject)
    },
    addToDate (buttonName) {
      if (buttonName === 'chevron_left') {
        return {}
      }
    },
    setPeriod (e) {
      switch (e.srcElement.innerText) {
        case 'Неделя':
          this.period = 'week'
          break
        case 'Месяц':
          this.period = 'month'
          break
        case 'Квартал':
          this.period = 'quarter'
          break
      }
      this.date = this.$moment(this.date.from).startOf(this.period)
    },
    periodChange () {
      this.$emit('periodChange', this.period)
    },
    dateChange () {
      this.$emit('dateChange', this.date)
    }
  },
  props: ['startPeriod'],
  watch: {
    startPeriod (v) {
      this.period = v
    },
  }
}
</script>

<style scoped>

</style>
