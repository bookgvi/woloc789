import crudMixin from '../crudMixin'

export default {
  name: 'studios',
  mixins: [crudMixin],
  computed: {
    forOptions () {
      return this.list.map(item => {
        return {
          label: item.name,
          value: item.id
        }
      })
    }
  },
  methods: {
    getFiltered (filter) {
      if (filter) {
        return this.list.find(({ id }) => id === filter.studio)
      } else return {}
    },
  },
  created () {
    this.getAll()
  },
}
