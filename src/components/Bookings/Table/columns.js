import { date } from 'quasar'
import { EVENT_TYPES } from 'src/common/constants'

export default [
  {
    name: 'id',
    label: 'id',
    width: 70,
    active: true,
  },
  {
    name: 'customer',
    label: 'Клиент',
    field: ({ customer = {} }) => {
      if (!customer) {
        return
      }
      return `${customer.firstName} ${customer.lastName}`
    },
    active: true,
  },
  {
    name: 'room',
    label: 'Зал',
    field: 'room',
    active: true,
    width: 120
  },
  {
    name: 'eventType',
    label: 'Цель',
    field: 'eventType',
    format: (value) => value && EVENT_TYPES[value],
    active: true,
    width: 50,
  },
  {
    name: 'amount',
    label: 'Оплата, р.',
    field: ({ amount, price }) => `${amount} / ${price}`,
    active: true,
    width: 100
  },
  {
    name: 'bookingStatus',
    field: 'status',
    active: true,
    width: 10,
  },
  {
    name: 'guestsCount',
    label: 'Гости',
    active: true,
    width: 60
  },
  {
    name: 'extras',
    label: 'Допы',
    format: value => value.items.length || '—',
    active: true,
    width: 60
  },
  {
    name: 'date',
    label: 'Дата',
    field: 'reservedFrom',
    format: value => date.formatDate(value, 'D MMM YYYY'),
    active: true,
    width: 60
  },
  {
    name: 'time',
    label: 'Время',
    format: (value, { reservedFrom, reservedTo }) => [reservedFrom, reservedTo].map(
      part => date.formatDate(part, 'H:mm')
    ).join(' — '),
    active: true,
    width: 120
  },
  {
    name: 'promo',
    active: true,
    label: 'Промо',
  },
  {
    name: 'comment',
    active: true,
    label: 'Коммент',
  },
  {
    name: 'controls',
    width: 40
  }
]
