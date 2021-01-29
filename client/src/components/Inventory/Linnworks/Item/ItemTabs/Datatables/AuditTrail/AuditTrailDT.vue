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
          title="Audit Trail Log"
          :pagination="pagination"
          :options="options"
          :updateOptions="updateOptions"
          :footerProps="footerProps"
        />
      </template>

      <template v-slot:item.resourceMeta="{ item }">
        {{ item.resourceMeta }}
      </template>

      <template v-slot:item.created_date="{ item }">
        <CiimaDateTimeField
          :value="item.created_date"
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
