<template lang="pug">
  standart-card
    name-slot(name="Календарь")
    nav-bar(
      :startDate="date"
      @dateChange="date = $event"
      @studioChange="studio = $event"
    )
    q-card-section(
      v-if="!isAllDay"
      class="cursor-pointer"
      @click="isAllDay = true"
    )
      span.row.text-body2.text-blue-5 {{ "Показать 00:00-08:00"}}
    q-card-section(
      v-else
      class="cursor-pointer"
      @click="isAllDay = false"
    )
      span.row.text-body2.text-blue-5 {{ "Скрыть 00:00-08:00"}}
    calendar.q-pl-none(
      :studio="studio"
      :startDate="date"
      :isAllDay="isAllDay"
      :bookings="$app.bookings.calendarList"
    )
</template>

<script>
import NavBar from '../CommonModules/NavBar'
import Calendar from './Modules/Calendar'
import NameSlot from '../CommonModules/NameSlot'
import StandartCard from '../CommonModules/StandartCard'

export default {
  name: 'CalendarCard',
  components: {
    StandartCard,
    NameSlot,
    Calendar,
    NavBar,
  },
  data () {
    return {
      date: this.$moment({ hour: 0 }).parseZone(),
      isAllDay: false,
      studio: (this.$app.studios.list.length > 0) ? this.$app.studios.list[0].id : 0
    }
  },
  computed: {
    dateFormatForLabel () {
      if (this.date === '') return '23 сентября, 2019'
      return `${this.$moment(this.date).format('D MMMM, YYYY')}`
    }
  }
}
</script>

<style scoped>

</style>
