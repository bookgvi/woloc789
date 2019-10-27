<template lang="pug">
  .promo.q-pa-md
    .row.q-pb-sm
      .col
        .text-h5 Скидка № {{ row.id }}
      .col-1
        q-icon.cursor-pointer(name="close" @click="hasModal" style="font-size: 1.5rem;")
    .row
      .col.q-pr-sm
        span Локация
      .col
        span Зал
    .row.q-pb-md
      .col.q-pr-sm
        q-select(v-model="singleStudio.name" :options="allStudiosName" outlined dense)
      .col
        q-select(v-model="rooms[0].name" :options="rooms.map(item => item.name)" outlined dense)
    .row
      .col.q-pr-sm
        span Процент скидки
      .col
        span Минимальное кол-во часов
    .row.q-pb-md
      .col.q-pr-sm
        q-input(v-model="row.percent" outlined dense)
          template(#append)
            span(style="font-size: 75%") %
      .col
        q-input(v-model="row.minHours" outlined dense)
    .row
      span День недели
    .row.q-pb-sm
      .col.q-pr-sm
        .row
          q-checkbox(label="Понедельник" v-model="week.mon")
        .row
          q-checkbox(label="Вторник" v-model="week.tue")
        .row
          q-checkbox(label="Среда" v-model="week.wed")
        .row
          q-checkbox(label="Четверг" v-model="week.thu")
      .col
        .row
          q-checkbox(label="Пятница" v-model="week.fri")
        .row
          q-checkbox(label="Суббота" v-model="week.sat")
        .row
          q-checkbox(label="Воскресенье" v-model="week.sun")
    .row
      .col.q-pr-sm
        span Период действия
      .col
        span Время действия
    .row.q-pb-md
      .col.q-pr-sm
        VueCtkDateTimePicker.q-pt-sm(
          v-model="dateRange"
          color="#81AEB6"
          formatted="D MMMM Y"
          range
          no-shortcuts
          no-label
          :label="showDateRange"
        )
      .col
        q-input.q-pt-sm.q-pb-md.cursor-pointer(:value="`${row.hourFrom}:00 — ${row.hourTo}:00`" @click="isTimeRange = !isTimeRange" outlined dense)
        .timeRange(v-if="isTimeRange" style="width: 100%;")
          q-range(
            v-model="rangeTime"
            :min="0"
            :max="23"
            :step="1"
            drag-range
            :left-label-value="rangeTime.min + ':00'"
            :right-label-value="rangeTime.max + ':00'"
            label-always
            markers
            snap
            color="#81AEB6"
          )
          .row
            .col.q-pr-sm
              q-btn.bg-primary.text-white(label="Сохранить" style="width: 100%" @click="timeRangeSave")
            .col
              q-btn(label="Сбросить" style="width: 100%" @click="timeRangeReset")
    .row.q-pb-md
      .col
        span Заполните только дату начала, если срок действия должен быть неограничен.
    .row.justify-center
      .col.q-mr-sm
        q-btn.q-py-md(label="Удалить" no-caps style="width: 100%")
      .col
        q-btn.q-py-md.bg-primary.text-white(label="Сохранить" no-caps style="width: 100%")
</template>

<script>
import { date } from 'quasar'
import { DateRange } from 'vue-date-range'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
export default {
  props: {
    getTitle: Function,
    row: {
      type: Object,
      default: () => ({}),
    },
    allStudiosName: Array,
    rooms: Array,
    singleStudio: Object
  },
  components: {
    DateRange,
    VueCtkDateTimePicker,
    date
  },
  data () {
    return {
      week: {
        mon: true,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false
      },
      dateRange: '',
      dateLabel: '',
      isTimeRange: false,
      rangeTime: {
        min: this.row.hourFrom,
        max: this.row.hourTo
      }
    }
  },
  computed: {
    showDateRange () {
      return `${date.formatDate(this.row.expiredAt, 'D MMM')} — ${date.formatDate(this.row.expiredAt, 'D MMM')}`
    }
  },
  methods: {
    hasModal () {
      this.$emit('hasModal')
    },
    timeRangeReset () {
      this.isTimeRange = false
      this.rangeTime.min = this.row.hourFrom
      this.rangeTime.max = this.row.hourTo
    },
    timeRangeSave () {
      this.isTimeRange = false
      this.row.hourFrom = this.rangeTime.min
      this.row.hourTo = this.rangeTime.max
    }
  }
}
</script>
