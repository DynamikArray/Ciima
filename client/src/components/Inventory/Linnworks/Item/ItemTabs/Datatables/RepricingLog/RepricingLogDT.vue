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

      <template v-slot:item.oldPrice="{ item }">
        <CimmaStaticPriceField :value="item.oldPrice" :itemId="item.id" />
      </template>
      <template v-slot:item.newPrice="{ item }">
        <CimmaStaticPriceField :value="item.newPrice" :itemId="item.id" />
      </template>

      <template v-slot:item.dateUpdated="{ item }">
        <CiimaDateTimeField
          :value="item.dateUpdated"
          :keyString="`ciima_dte_update_${item.pkStockItemID}`"
          fontClass="caption"
        />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import headers from "./headers";
import CimmaStaticPriceField from "@/components/Shared/Datatable/FieldTemplates/CimmaStaticPriceField";
import CiimaDateTimeField from "@/components/Shared/Datatable/FieldTemplates/CiimaDateTimeField";
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
    TitleAndPager,
    CiimaDateTimeField,
    CimmaStaticPriceField
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
