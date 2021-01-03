<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      :loading="loading"
      loading-text="Loading..."
      :footer-props="footerProps"
      sort-by="endTime"
      :sort-desc="true"
      :hide-default-footer="true"
    >
      <template v-slot:top="{ pagination, options, updateOptions }">
        <TitleAndPager
          title="Orders History"
          :pagination="pagination"
          :options="options"
          :updateOptions="updateOptions"
          :footerProps="footerProps"
        />
      </template>

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
import TitleAndPager from "@/components/Shared/Datatable/SlotTemplates/TitleAndPager";

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
    LinnworksTime,
    TitleAndPager
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
