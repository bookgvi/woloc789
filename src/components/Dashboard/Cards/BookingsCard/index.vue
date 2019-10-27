<template lang="pug">
  standart-card
    name-slot(name="Бронирования")
    nav-bar.q-pb-md(
      @dateChange="selectedDate = $event"
      @studioChange="studio = $event"
    )
    q-card-section.q-pa-none
      q-markup-table(
        style="min-width: 400px"
        wrap-cells
        separator="none"
        dense
        flat
      )
        thead.text-left
          tr
            th(style="width: 70%")
              span.text-bold.text-black.text-body2 Клиент • Время
            th.text-right
              span.text-bold.text-black.text-body2 Оплата, р.
        tbody
          tr(
            v-for="(booking, index) in bookings"
            :key="index"
          )
            td {{ clientSlot(index) }}
            td.text-right
              span.text-grey.text-caption {{ prepaymentSlot(index) }}
              span &nbsp
              span.text-body1 {{ paymentSlot(index) }}
    q-card-section(
      v-if="isMiniTable"
      class="cursor-pointer"
      @click="isMiniTable = false"
    )
      span.row.text-body2.text-blue-5.q-pt-md(
        v-if="bookings.length > 3"
      )  Ещё {{ bookings.length - 3 }}
    q-card-section(
      v-else
      class="cursor-pointer"
      @click="isMiniTable = true"
    )
      span.row.text-body2.text-blue-5.q-pt-md  Свернуть
</template>

<script>

import NavBar from '../CommonModules/NavBar'
import NameSlot from '../CommonModules/NameSlot'
import StandartCard from '../CommonModules/StandartCard'

export default {
  name: 'BookingsCard',
  components: { StandartCard, NameSlot, NavBar },
  data () {
    return {
      selectedDate: this.$moment({ hour: 0 }).parseZone(),
      studio: (this.$app.studios.list.length > 0) ? this.$app.studios.list[0].id : 0,
      isMiniTable: true
    }
  },
  computed: {
    bookings () {
      const bookingsList = []
      this.$app.bookings.dashboardBookingsList.forEach(item => {
        if (!item.technical) {
          bookingsList.push(item)
        }
      })
      return (this.isMiniTable) ? bookingsList.slice(0, 3) : bookingsList
    }
  },
  methods: {
    async loadData () {
      const filter = {
        studio: this.studio,
      }
      await this.$app.bookings.getForDashBoard({
        ...filter,
        dateFrom: this.selectedDate.format('YYYY-MM-DD'),
        dateTo: this.selectedDate.format('YYYY-MM-DD')
      })
    },
    clientSlot (index) {
      const booking = this.bookings[index]
      return `${booking.customer.fullName} • ${booking.duration} ч.`
    },
    prepaymentSlot (index) {
      const booking = this.bookings[index]
      return (+Number(booking.amount).toFixed()).toLocaleString('ru-RU', { style: 'decimal', useGrouping: true })
    },
    paymentSlot (index) {
      const booking = this.bookings[index]
      return (+Number(booking.price).toFixed()).toLocaleString('ru-RU', { style: 'decimal', useGrouping: true })
    },
  },
  watch: {
    async selectedDate () {
      this.loadData()
    },
    studio: {
      async handler () {
        if (this.studio !== 0) {
          this.loadData()
        }
      },
      immediate: true
    },
  }
}
</script>

<style scoped>

</style>
