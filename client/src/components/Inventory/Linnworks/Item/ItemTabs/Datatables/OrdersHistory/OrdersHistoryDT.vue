<template>
  <div>
    <h3 class="title white--text">
      Orders History
    </h3>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      :loading="loading"
      loading-text="Loading..."
      :footer-props="footerProps"
      sort-by="endTime"
      :sort-desc="true"
    >
      <template v-slot:item.dProcessedOn="{ item }">
        <LinnworksTime
          :value="item.dProcessedOn"
          :keyString="item.pkListId"
          fontClass="caption"
        />
      </template>
      <template v-slot:item.dReceievedDate="{ item }">
        <LinnworksTime
          :value="item.dReceievedDate"
          :keyString="item.pkListId"
          fontClass="caption"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import headers from "./headers";

import LinnworksTime from "@/components/Shared/Datatable/FieldTemplates/DisplayOnly/LinnworksTime";

export default {
  props: {
    items: {
      type: [Array]
    },
    loading: {
      type: [Boolean]
    }
  },
  components: {
    LinnworksTime
  },
  data: () => ({
    headers,
    footerProps: {
      "items-per-page-options": [5, 10]
    }
  })
};
</script>

<style scoped></style>
