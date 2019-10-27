// import api from './instance'
import discounts from 'src/mocks/discounts'

export default {
  getAll: async () => {
    try {
      const r = {
        data: discounts
      }
      return r
    } catch (e) {
      console.warn('catch :: discount :: getAll', e)
    }
  }
}
