<template lang="pug">
  .table.wrapper.wrapper--header
    DataTable(
      title="Скидки"
      :getDialogTitle="({ id }) => `Скидка № ${id}`"
      :loadData="$app.discounts.getAll"
      :columns="columns"
      :details="details"
      @toggleDialogRow="toggleDialogRow"
      :isRowDisabled="({ expiredAt }) => !expiredAt"
    )
      template(#table-controls-append)
        q-btn.q-ml-md.text-white.bg-primary(label="Добавить скидку" no-caps)
    q-dialog(v-model="isModal")
      q-card(style="min-width: 680px;")
        edit-discount(
          :row="row"
          :singleStudio="singleStudio"
          :rooms="rooms"
          :allStudiosName="allStudiosName"
          @hasModal="hasModal"
        )
</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'
import editDiscount from '../editDiscount/editDiscount'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

export default {
  props: {
    singleStudio: Object,
    rooms: Array,
    allStudiosName: Array
  },
  name: 'promoTable',
  components: { DataTable, editDiscount, VueCtkDateTimePicker },
  data: () => ({
    columns,
    details,
    dataset: {},
    isModal: false,
    row: {}
  }),
  methods: {
    toggleDialogRow (row) {
      this.row = row
      this.isModal = true
    },
    hasModal () {
      this.isModal = false
    }
  }
}
</script>

<style scoped>
  .q-card {
    overflow: visible;
  }
</style>
