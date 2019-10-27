<template lang="pug">
  .dicounts
    .menu.menu--menu2
      filters-list(name="settings")
        template(#prepend="props")
          studio-filter(v-bind="props")
    .content--content2
      .row
        discountsTable(:singleStudio="singleStudio" :allStudiosName="allStudiosName" :rooms="rooms")
</template>

<script>
import StudioFilter from '../../Filters/StudioFilter'
import FiltersList from '../../Filters/FiltersList'
import studios from '../../../api/studios'
import discountsTable from './Table'
export default {
  name: 'dicounts',
  components: {
    StudioFilter,
    FiltersList,
    discountsTable
  },
  data () {
    return {
      id: this.$app.filters.getValues('settings').studio,
      allStudiosName: [],
      rooms: [],
      singleStudio: {}
    }
  },
  methods: {
    async singleStudioM () {
      let { studio } = this.$app.filters.getValues('settings')
      const { items } = await studios.getAll().then(resp => resp.data)
      if (!studio) {
        studio = items[0].id
      }
      this.currentStudio = 'settings'
      const [{ rooms }] = items.filter(item => item.id === studio)
      this.rooms = rooms
      this.singleStudio = await studios.getOne(studio).then(resp => resp.data)
      this.allStudiosName = items.map(item => item.name)
      this.services = this.singleStudio.services
      this.vendors = this.singleStudio.vendors
    }
  },
  async mounted () {
    this.singleStudioM()
  }
}
</script>
