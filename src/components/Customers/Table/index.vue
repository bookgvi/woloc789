<template lang="pug">
  .customer
    DataTable(
      title="Клиенты"
      :getDialogTitle="() => 'Личные данные'"
      :loadData="$app.customers.getAll"
      :filter="$app.filters.getValues('customers')"
      :columns="columns"
      :details="details"
      @toggleDialogRow="toggleDialogRow"
    )
      template(#table-controls)
        q-btn.q-ml-md(color="primary" label="Добавить пользователя")

      template(#row-dialog="props")
        CustomersDialog(v-bind="props")

      template(#row-controls="props")
        q-btn(flat round icon="edit" @click="props.toggleDialogRow(props.row.id)" title="Редактировать")
        q-btn(flat round icon="phone" title="Позвонить")
        q-btn(flat round icon="email" title="Отправить E-mail")
        q-btn(flat round icon="comment" title="Открыть чат")
    q-dialog(v-model="isModal")
      q-card(style="min-width: 680px;")
        CustomersDialog(:row="customerData")
</template>

<script>
import columns from './columns'
import details from './details'
import DataTable from 'components/DataTable'
import CustomersDialog from './CustomersDialog'

export default {
  name: 'CustomersTable',
  components: { DataTable, CustomersDialog },
  data: () => ({
    columns,
    details,
    customerData: {},
    isModal: false
  }),
  methods: {
    toggleDialogRow (row) {
      this.customerData = row
      this.$nextTick(_ => {
        this.isModal = true
      })
    }
  }
}
</script>

<style scoped>
</style>
