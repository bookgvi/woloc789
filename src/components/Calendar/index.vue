<template lang="pug">
  .q-pa-none(
    v-if="rerender"
  )
    .menu
      filters-list(name="calendar" )
        template(#prepend="props")
          studio-filter(v-bind="props")
          rooms-filter(v-bind="props")
          events-filter(v-bind="props")
          price-filter(v-bind="props")
    .content
      CalendarSheet(
        :filter="filter"
        :bookings="$app.bookings.calendarList"
        @isAllDayChange="isAllDay = $event"
      )
</template>

<script>
import CalendarSheet from './Sheet'
import FiltersList from '../Filters/FiltersList'
import StudioFilter from '../Filters/StudioFilter'
import RoomsFilter from '../Filters/RoomsFilter'
import EventsFilter from '../Filters/EventsFilter'
import PriceFilter from '../Filters/PriceFilter'

export default {
  name: 'Calendar',
  data () {
    return {
      rerender: true,
      isAllDay: true
    }
  },
  computed: {
    filter () {
      return this.filterInit()
    }
  },
  methods: {
    filterInit () {
      if (!this.$app.studios.list || this.$app.studios.list.length === 0) {
        return this.$app.filters.getValues('calendar')
      }
      const studio = this.$app.studios.list[0].id
      const rooms = this.$app.rooms.getAvailable({ studio: studio }).map(item => {
        return item.id
      })
      this.$app.filters.setValue('calendar', 'studio', studio)
      this.$app.filters.setValue('calendar', 'rooms', rooms)
      return {
        studio: studio,
        rooms: rooms,
        events: ['photo', 'video', 'event'],
        price: { min: 0, max: 10000 }
      }
    }
  },
  components: { EventsFilter, FiltersList, RoomsFilter, StudioFilter, PriceFilter, CalendarSheet }
}
</script>

<style scoped>
</style>
