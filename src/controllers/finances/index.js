import api from '../../api'
import { sortBy } from 'lodash'

export default {
  name: 'finances',
  data () {
    return {
      loading: {
        list: false,
        one: false
      },
      list: [],
    }
  },
  created () {
  },
  computed: {
    all () {
      return sortBy(this.list, 'title')
    }
  },
  methods: {
    async getAll (page, filter) {
      this.loading.list = true
      const { data } = await api.finances.getAll(page, filter)
      if (data) {
        this.list = data.items
        this.loading.list = false
      }
      return data
    },
  },
  watch: {
    'loading.list' (v) {
      if (v) {
        this.$q.loading.show()
      } else {
        this.$q.loading.hide()
      }
    },
    'loading.one' (v) {
      if (v) {
        this.$q.loading.show()
      } else if (this.loading.list) {
        this.$q.loading.show()
      } else {
        this.$q.loading.hide()
      }
    }
  }
}
