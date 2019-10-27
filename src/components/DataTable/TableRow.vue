<template lang="pug">
  q-tr(:class="{ disabled }")
    q-td(
      :key="name"
      v-for="{ name, value, active } of cols"
      v-bind="getColProps(name)"
      @click.native="active && rowDialog(row)"
    )
      template(v-if="name === 'room'")
        q-chip(
          dense
          :style="getRoomStyle(value)"
          :title="value.name"
        ) {{value.name}}
      template(v-else-if="name === 'eventType'")
        q-icon(:name='value.icon')
      template(v-else-if="name === 'isPaid'")
        q-icon(size="sm" name="check" color="green" v-if="value === paidStatus")
      template(v-else-if="['comment', 'promo'].includes(name)")
        transition(
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        )
          span(v-if="!controlsAreVisible(row)" :title="value") {{value}}
      template(v-else-if="name === 'rating'")
        i(v-for="(item, i) in 5" class="fa-star" :class="i < value ? 'fas' : 'far' ")
      template(v-else-if="name === 'controls'")
        .buttons.absolute
          transition(
            enter-active-class="animated fadeInRight"
            leave-active-class="animated fadeOutRight"
          )
            .inline-block(v-if="controlsAreVisible(row)")
              slot(:row="row")
          q-btn(
            flat
            round
            icon="more_vert"
            @click="$emit('toggleControls', row.id)"
            :color="controlsAreVisible(row) ? 'primary' : undefined"
            :disable="disabled"
          )
      template(v-else-if="name === 'refundsControls'")
        slot(v-if="row.status")
      template(v-else-if="name === 'status'")
        .inline-block(v-if="!value" title="13 ок. 20:47") Ожидает зачисление
      template(v-else-if="name === 'link'")
        slot
      template(v-else-if="name === 'purpose'")
        q-chip(style="height: 80%;")
          div.q-my-sm(style="width: 100%;  white-space: normal;") {{ value }}
      template(v-else-if="name === 'purposeComment'")
        div.q-py-sm(style="width: 100%; white-space: normal;") {{ value }}
      template(v-else-if="name === 'extrasControls'")
        slot
      template(v-else-if="name === 'expiredAt'")
        span(v-if="value") {{ value }}
        span(v-else) нет
      template(v-else-if="name === 'chat'")
        div.q-py-sm(style="width: 90%; white-space: normal;") {{ value }}

      template(v-else) {{ value }}
</template>

<script>
import { BOOKING_STATUSES } from 'src/common/constants'
import roomsColors from 'src/common/rooms/colors'

const usedColors = {}

export default {
  name: 'TableRow',
  inheritAttrs: false,
  props: {
    row: Object,
    cols: Array,
    colsMap: Object,
    controlsRowId: Number,
    toggleControls: Function,
    dialogRowId: Number,
    disabled: Boolean,
  },
  data: () => ({
    paidStatus: BOOKING_STATUSES.PAID,
  }),
  methods: {
    controlsAreVisible (row) {
      return this.controlsRowId === row.id
    },
    getColProps (name) {
      const { active, classes, __tdClass, style } = this.colsMap[name]
      const classNames = [`${name}-col`]
      if (active) classNames.push('active')
      if (classes) classNames.push(classes)
      if (__tdClass) classNames.push(__tdClass)

      return {
        class: classNames,
        style
      }
    },
    // TODO: get color from API
    getRoomStyle ({ id }) {
      if (!(id in usedColors)) {
        const i = Object.keys(usedColors).length
        usedColors[id] = roomsColors[i < roomsColors.length ? i : 0]
      }

      return {
        width: '90%',
        height: '80%',
        whiteSpace: 'normal',
        backgroundColor: usedColors[id].color
      }
    },
    rowDialog (row) {
      this.$emit('toggleDialogRow', row)
    }
  }
}
</script>

<style lang="stylus">
  tr.disabled
    opacity: .2
  .q-table tbody tr
    .active
      cursor: pointer
    .room-col .q-chip
      width 100px
      border-radius 3px
      .q-chip__content
        opacity .4
        width 100%
        overflow hidden
        text-overflow ellipsis
    .eventType-col
      font-size 1.6em
    .comment-col
      max-width 100px
      overflow hidden
      text-overflow ellipsis
    .rating-col
      color $primary
      letter-spacing 5px
    .controls-col
      position relative
      .buttons
        padding-top 4px
        height 100%
        top 0
        right 0
        font-size 1.8em
</style>
