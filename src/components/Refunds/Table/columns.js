import { date } from 'quasar'

export default [
  {
    name: 'id',
    label: 'Бронь',
    width: 70,
    classes: 'text-primary',
    align: 'right',
  },
  {
    name: 'customer',
    label: 'Клиент',
    field: ({ booking: { customer = {} } }) => `${customer.firstName} ${customer.lastName}`,
    width: 150,
  },
  {
    name: 'room',
    label: 'Зал',
    field: ({ booking: { room = {} } }) => room,
    width: 120
  },
  {
    name: 'reservedFrom',
    label: 'Дата',
    field: ({ booking = {} }) => `${booking.reservedFrom}`,
    format: value => date.formatDate(value, 'D MMM'),
    width: 60
  },
  {
    name: 'reservedTime',
    label: 'Время',
    field: ({ booking = {} }) => `${booking.reservedFrom}`,
    format: (value, { booking }) => [booking.reservedFrom, booking.reservedTo].map(
      part => date.formatDate(part, 'H:mm')
    ).join(' — '),
    width: 120,
  },
  {
    name: 'returnedAt',
    label: 'Просрочено',
    classes: 'text-red',
    format: value => date.formatDate(value, 'D MMM'),
    width: 120
  },
  {
    name: 'amount',
    label: 'Сумма, Р.',
    width: 120
  },
  {
    name: 'status',
    label: 'Статус возврата',
    width: 250
  },
  {
    name: 'refundsControls',
    width: 40
  }
]
