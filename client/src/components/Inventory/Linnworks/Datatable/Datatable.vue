<template>
  <div class="w-100 h-100">
    <v-data-table
      class="w-100"
      :headers="headers"
      :items="items"
      :loading="loading"
      @update:options="handleOptionsUpdated"
    >
      <template v-slot:item.CategoryName="{ item }">
        <LinnworksCategoryName
          :keyString="item.pkStockItemID"
          :value="item.CategoryName"
          fontClass="caption"
        />
      </template>
      <template v-slot:item.Image="{ item }">
        <LinnworksImage :imageUrl="item.Image" />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import headers from "./headers";
import LinnworksCategoryName from "@/components/Shared/Datatable/FieldTemplates/V2/LinnworksCategoryName";
import LinnworksImage from "@/components/Shared/Datatable/FieldTemplates/LinnworksImage";

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
    LinnworksCategoryName,
    LinnworksImage
  },
  data() {
    return {
      headers
    };
  },
  methods: {
    handleOptionsUpdated(val) {
      console.log("handleOptionsUpdated - got this new val", val);
    }
  }
};
</script>

<style scoped></style>
