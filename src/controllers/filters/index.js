import studios from '../../api/studios'

const defaultValues = {
  bookings: {
    studio: undefined,
    rooms: undefined,
    statuses: undefined
  },
  settings: {
    studio: undefined
  },
  calendar: {
    studio: 37,
    rooms: [143, 144, 206, 207, 208],
    events: ['photo', 'video', 'event'],
    price: { min: 0, max: 10000 }
  }
}

export default {
  name: 'filters',
  data () {
    return {
      values: defaultValues
    }
  },
  created () {
    this.readFromSession()
  },
  methods: {
    readFromSession () {
      const { filters } = sessionStorage

      if (filters) this.values = JSON.parse(filters)
    },
    saveToSession () {
      sessionStorage.filters = JSON.stringify(this.values)
    },
    getValues (page) {
      return this.values[page] || {}
    },
    setValue (page, name, value) {
      const { values } = this

      this.values = {
        ...values,
        [page]: {
          ...(values[page] || []),
          [name]: value
        }
      }
      this.saveToSession()
    },
    async reset (page) {
      const { values } = this
      const { items } = await studios.getAll().then(resp => resp.data)
      let [{ rooms }] = items.filter(item => item.id === items[0].id)
      rooms = rooms.map(item => item.id)
      this.values = {
        ...values,
        [page]: { studio: items[0].id, rooms: rooms, statuses: [0, 1, 2, 3, 4] }
      }
      this.saveToSession()
    }
  }
}
