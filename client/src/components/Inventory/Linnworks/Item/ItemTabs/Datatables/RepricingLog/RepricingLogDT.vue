<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="5"
      :loading="loading"
      loading-text="Loading..."
      :footer-props="footerProps"
      :hide-default-footer="true"
    >
      <template v-slot:top="{ pagination, options, updateOptions }">
        <TitleAndPager
          title="Repricing Log History"
          :pagination="pagination"
          :options="options"
          :updateOptions="updateOptions"
          :footerProps="footerProps"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import headers from "./headers";
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
