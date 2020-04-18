<template>
  <v-combobox
    ref="draftsColumnsDropdown"
    id="draftsColumnsDropdown"
    name="draftsColumnsDropdown"
    label="Add/Remove Columns"
    hint="Enable/Disable Columns"
    v-model="selectedColumns"
    :items="draftsColumnsList"
    multiple
    outlined
    dense
    chips
    small-chips
    deletable-chips
    @change="handleColumnsChange"
  ></v-combobox>
</template>

<script>
import { headers } from "@/components/Drafts/Datatables/settings/config.js";

export default {
  props: {
    defaultHeaders: [Array]
  },
  data: () => ({
    draftsColumnsList: [],
    selectedColumns: [Array]
  }),
  created() {
    this.draftsColumnsList = headers.map(col => {
      return { text: col.text, value: col.value };
    });

    this.selectedColumns = this.defaultHeaders;
  },
  methods: {
    handleColumnsChange() {
      console.log("Handle Column Change");
    }
  }
};
</script>

<style scoped></style>
