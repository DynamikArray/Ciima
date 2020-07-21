<template>
  <div class="d-flex justify-start align-center w-100 mb-5">
    <div class="w-100" :class="titleResults.length > 0 ? 'mr-3' : 'mr-0'">
      <v-data-table
        class="w-100"
        :headers="headers"
        :items="titleResults || []"
        :loading="loading"
        loading-text="Searching Database"
        :items-per-page="250"
        :footer-props="footerProps"
      >
        <template v-slot:item.matched="{ item }">
          <v-icon v-if="item.matched" color="success"
            >far fa-check-circle</v-icon
          >
        </template>

        <template v-slot:item.action="{ item }">
          <v-btn
            class="selectTitleButton px-0"
            @click="selectTitle(item)"
            style="min-width:40px"
            ><v-icon small color="white">fa-plus-circle</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { SET_OUR_SELECTED_TITLE } from "@/store/action-types";

import { tableHeaders } from "./Settings/tableHeaders";

export default {
  props: {
    matchType: [String]
  },
  components: {},
  data: () => ({
    headers: tableHeaders,
    footerProps: {
      "items-per-page-options": [15, 30, 50, 100, 250]
    }
  }),
  computed: {
    ...mapState({
      titleResults: state => state.pricematch.ourTitleSearchResults,
      loading: state => state.pricematch.ourLoading
    })
  },
  methods: {
    selectTitle(item) {
      this.$store.dispatch(`pricematch/${SET_OUR_SELECTED_TITLE}`, item, {
        gloabl: true
      });
    }
  }
};
</script>

<style scoped></style>
