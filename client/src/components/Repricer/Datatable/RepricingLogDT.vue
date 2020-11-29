<template>
  <div class="w-100">
    <v-data-table
      class="w-100"
      :headers="headers"
      :items="items"
      :loading="loading"
    >
      <template v-slot:item.dateUpdated="{ item }">
        <CiimaDateTimeField :value="item.dateUpdated" :itemId="item.id" />
      </template>
    </v-data-table>
  </div>
</template>

<script>
import headers from "./_logHeaders";
import CiimaDateTimeField from "@/components/Shared/Datatable/FieldTemplates/CiimaDateTimeField";

export default {
  props: {
    items: {
      type: [Array]
    },
    loading: {
      type: [Boolean]
    },
    pager: {
      type: [Object]
    }
  },
  components: { CiimaDateTimeField },
  data() {
    return {
      headers: [...headers]
    };
  },
  methods: {}
};
</script>

<style scoped></style>
