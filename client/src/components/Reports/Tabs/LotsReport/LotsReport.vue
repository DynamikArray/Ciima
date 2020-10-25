<template>
  <div class="w-100" style="height:100%">
    <LoadingModal :loading="loading" />

    <v-data-table
      :headers="headers"
      :items="filterOutDuplicates"
      :options="options"
      :footer-props="footerProps"
    >
      <template v-slot:item.pricePerUnit="{ item }">
        <div class="subtitle-1">
          {{ item.pricePerUnit | currency }}
        </div>
      </template>
      <template v-slot:item.linnworksTitle="{ item }">
        <div class="title">
          {{ item.linnworksTitle }}
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import headers from "./headers.js";
import LoadingModal from "@/components/Loading/LoadingModal";
export default {
  props: {
    loading: [Boolean],
    items: [Boolean, Array]
  },
  components: {
    LoadingModal
  },
  data: () => ({
    headers,
    options: {
      sortBy: ["linnworksTitle"],
      itemsPerPage: 100
    },
    footerProps: {
      itemsPerPageOptions: [25, 50, 100, -1]
    }
  }),
  computed: {
    filterOutDuplicates() {
      const { items } = this;
      const keys = ["linnworksSKU"];
      return items.filter(
        (s => o => (k => !s.has(k) && s.add(k))(keys.map(k => o[k]).join("|")))(
          new Set()
        )
      );
    }
  }
};
</script>

<style scoped></style>
