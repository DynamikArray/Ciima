<template>
  <div class="w-100">
    <v-data-table
      class="w-100"
      :headers="headers"
      :items="items"
      :loading="loading"
      hide-default-footer
      :items-per-page="pageLimit"
    >
      <template v-slot:item.oldPrice="{ item }">
        <CimmaStaticPriceField :value="item.oldPrice" :itemId="item.id" />
      </template>
      <template v-slot:item.newPrice="{ item }">
        <CimmaStaticPriceField :value="item.newPrice" :itemId="item.id" />
      </template>
      <template v-slot:item.dateUpdated="{ item }">
        <CiimaDateTimeField :value="item.dateUpdated" :itemId="item.id" />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import headers from "./_logHeaders";
import CiimaDateTimeField from "@/components/Shared/Datatable/FieldTemplates/CiimaDateTimeField";
import CimmaStaticPriceField from "@/components/Shared/Datatable/FieldTemplates/CimmaStaticPriceField";

export default {
  props: {
    items: {
      type: [Array]
    },
    loading: {
      type: [Boolean]
    },
    pageLimit: {
      type: [Number, String]
    }
  },
  components: { CiimaDateTimeField, CimmaStaticPriceField },
  data() {
    return {
      headers: [...headers]
    };
  }
};
</script>

<style scoped></style>
