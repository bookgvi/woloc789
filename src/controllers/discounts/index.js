import crudMixin from '../crudMixin'

export default {
  created () {
    this.getAll()
  },
  name: 'discounts',
  mixins: [crudMixin]
}
