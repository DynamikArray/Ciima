<template>
  <div class="mt-1">
    <v-data-table
      :items="items"
      :headers="headers"
      :loading="loading"
      :items-per-page="itemsPerPage"
      hide-default-footer
    >
      <template v-slot:item.created_date="{ item }">
        {{ item.created_date | dateTime }}
      </template>

      <template v-slot:item.user_id="{ item }">
        <UserId :item="item" />
      </template>

      <template v-slot:item.meta="{ item }">
        {{ JSON.stringify(item.meta) }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import UserId from "./templates/UserId";

export default {
  props: {
    items: [Boolean, Array],
    loading: [Boolean],
    headers: [Array],
    itemsPerPage: [Number]
  },
  components: {
    UserId
  }
};
</script>

<style scoped></style>
