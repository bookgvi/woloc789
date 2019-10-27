<template lang="pug">
  standart-card
    .q-pa-none
      name-slot(name="Финансы")
    q-card-section.q-pa-none.q-pb-md
      q-markup-table(
        style="min-width: 400px"
        wrap-cells
        separator="none"
        dense
        flat
      )
        thead.text-left
          th(style="width: 70%")
          th
        tbody
          tr
            td
              span.text-grey На счету:
            td.text-right
              span.text-bold.text-h6 {{ accountSlot }}
    q-card-section.q-pa-none.q-pb-md
      q-markup-table(
        style="min-width: 400px"
        wrap-cells
        separator="none"
        dense
        flat
      )
        thead.text-left
          tr
            th(style="width: 70%")
              span.text-bold.text-black.text-body2 Операция
            th.text-right
              span.text-bold.text-black.text-body2 Сумма, р.
        tbody
          tr
            td Предоплата
            td.text-right
              span.text-positive {{ prepaymentSlot }}
          tr
            td Возврат
            td.text-right
              span.text-negative {{ refundSlot }}
          tr
            td Штраф
            td.text-right
              span.text-negative {{ fineSlot }}

</template>

<script>

import NameSlot from '../CommonModules/NameSlot'
import StandartCard from '../CommonModules/StandartCard'
export default {
  name: 'FinancesCard',
  components: { StandartCard, NameSlot },
  data () {
    return {
    }
  },
  computed: {
    accountSlot () {
      return (18600).toLocaleString('ru-RU', { style: 'decimal', useGrouping: true })
    },
    waitingSlot () {
      return '+ ' + (2500).toLocaleString('ru-RU', { style: 'decimal', useGrouping: true })
    },
    prepaymentSlot () {
      return (4200).toLocaleString('ru-RU', { style: 'decimal', useGrouping: true })
    },
    refundSlot () {
      return (6300).toLocaleString('ru-RU', { style: 'decimal', useGrouping: true })
    },
    fineSlot () {
      return (500).toLocaleString('ru-RU', { style: 'decimal', useGrouping: true })
    }
  }
}
</script>

<style scoped>

</style>
