<template>
  <div class="d-flex justify-start align-center w-100 mb-5">
    <div class="w-100" :class="titleResults.length > 0 ? 'mr-3' : 'mr-0'">
      <v-data-table
        class="w-100 textShadow"
        :headers="headers"
        :items="titleResults || []"
        :loading="loading"
        :items-per-page="250"
        :footer-props="footerProps"
        loading-text="Searching Database"
      >
        <template v-slot:item="{ item }">
          <tr :class="{ topTitle: item.topTitle }">
            <td>
              <v-btn
                class="px-0"
                style="min-width:40px"
                @click="selectTitle(item)"
                ><v-icon small class="mr-0">fa fa-plus-circle</v-icon></v-btn
              >
            </td>
            <td class="text-left" width="">
              {{ item.stock }}
            </td>
            <td class="text-left" width="">
              {{ item.title }}
            </td>
            <td class="text-right" style="width: 120px">
              {{ item.issue }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { SET_THEIR_SELECTED_TITLE } from "@/store/action-types";

import { tableHeaders } from "./Settings/tableHeaders";

export default {
  props: {},
  components: {},
  data: () => ({
    headers: tableHeaders,
    footerProps: {
      "items-per-page-options": [15, 30, 50, 100, 250]
    }
  }),
  computed: {
    ...mapState({
      titleResults: state => state.pricematch.theirTitleSearchResults,
      loading: state => state.pricematch.theirLoading
    })
  },
  methods: {
    selectTitle(item) {
      this.$store.dispatch(`pricematch/${SET_THEIR_SELECTED_TITLE}`, item, {
        gloabl: true
      });
    }
  }
};
</script>

<style scoped>
tr.topTitle {
  background-color: rgba(225, 134, 36, 0.68) !important;
}
.selectTitleButton {
  min-width: 46px !important;
  padding: 0px !important;
}
</style>
