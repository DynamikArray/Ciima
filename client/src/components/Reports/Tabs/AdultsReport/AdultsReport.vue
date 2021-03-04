<template>
  <div class="w-100" style="height:100%">
    <LoadingModal :loading="loading" />

    <v-data-table
      :headers="headers"
      :items="items"
      :options="options"
      :footer-props="footerProps"
      :items-per-page="50"
      group-by="mainCharacters"
      ref="dataTable"
      @update:page="$vuetify.goTo($refs.dataTable)"
    >
      <template v-slot:top="{ pagination, options, updateOptions }">
        <v-data-footer
          :pagination="pagination"
          :options="options"
          @update:options="updateOptions"
          :items-per-page-options="footerProps.itemsPerPageOptions"
          items-per-page-text="$vuetify.dataTable.itemsPerPageText"
        />
        <v-divider class="my-1"></v-divider>
      </template>
      <template v-slot:group.header="{ item, group, groupBy }">
        <td colspan="3" class="secondary lighten-1">
          <div class="subtitle-1 w-100 d-flex align-center justify-start">
            <h3 class="mx-3">{{ group || "No character provided" }}</h3>
          </div>
        </td>
      </template>
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
      sortBy: ["linnworksTitle"]
    },
    footerProps: {
      itemsPerPageOptions: [25, 50, 100, -1]
    }
  })
};
</script>

<style scoped></style>
