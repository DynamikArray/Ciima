<template>
  <div class="">
    <v-data-table
      class="w-100 grey darken-4"
      :headers="headers"
      :items="items"
      :loading="loading"
      sort-by="createdDate"
      sort-desc
      ref="dataTable"
      @update:page="$vuetify.goTo($refs.dataTable)"
    >
      <template v-slot:item.draftType="{ item }">
        {{ item.draftType | upperCase }}
      </template>

      <template v-slot:item.price="{ item }">
        {{ item.price | currency }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { headers } from "./_headers.js";

export default {
  name: "GridDraftsSummary",
  props: {
    items: {
      type: [Array],
      default: []
    },
    loading: {
      type: [Boolean],
      default: false
    }
  },
  data: () => ({
    headers: headers
  })
};
</script>

<style scoped></style>
