<template lang="pug">
  .bookings
    .menu
      filters-list(name="bookings")
        template(#prepend="props")
          studio-filter(v-bind="props")
          rooms-filter(v-bind="props")
          status-filter(v-bind="props")
          span
    .content
      bookings-table

</template>

<script>
import StudioFilter from 'components/Filters/StudioFilter'
import FiltersList from 'components/Filters/FiltersList'
import RoomsFilter from 'components/Filters/RoomsFilter'
import BookingsTable from './Table'
import StatusFilter from '../Filters/StatusFilter'

export default {
  name: 'Calendar',
  components: { StatusFilter, StudioFilter, RoomsFilter, FiltersList, BookingsTable }
}
</script>

<style scoped>
</style>
