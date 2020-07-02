<template>
  <v-card v-if="title" class="w-100">
    <v-card-title class="px-3 pt-3 pb-0">
      <div class="d-flex flex-row justify-start">
        <div class="d-flex flex-column align-self-center mr-4">
          <v-btn
            small
            style="min-width:30px"
            class="mx-auto px-3"
            color="primary"
            :to="'/titles'"
          >
            <v-icon small>fa-arrow-alt-circle-left</v-icon>
          </v-btn>
        </div>

        <div class="d-flex">
          <h3><span class="title mr-2">Title:</span>{{ title.title }}</h3>
        </div>
      </div>
    </v-card-title>
    <v-card-text class="pb-0 px-3">
      <v-divider class="my-1"></v-divider>
      <div class="d-flex justify-space-between">
        <div class="d-flex">
          <h3 class="title">
            <span class="body-2 mr-2">Publisher:</span>{{ title.publisher }}
          </h3>
        </div>
        <div class="d-flex">
          <h3>
            <span class="title mr-2">Years Published:</span
            >{{ title.yearsPublished }}
          </h3>
        </div>
      </div>
    </v-card-text>
    <v-card-text class="grey darken-4 pa-0">
      <div v-if="inventory_loading" class="text-center w-100">
        <v-progress-circular
          class="ma-3"
          size="50"
          width="6"
          indeterminate
          color="blue darken-1"
        ></v-progress-circular>
      </div>
      <div v-else>
        <RelatedInventory
          :items="inventory"
          :loading="inventory_loading"
          :searchString="searchString"
          :filterString="filterString"
        ></RelatedInventory>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

import { SEARCH_TITLES_INVENTORY } from "@/store/action-types";
import { SEARCH_TITLES_INVENTORY_CLEAR } from "@/store/mutation-types";
import RelatedInventory from "./RelatedInventory/RelatedInventory";

export default {
  props: {
    filterString: [String]
  },
  data: () => ({
    searchString: ""
  }),
  components: {
    RelatedInventory
  },
  computed: {
    ...mapState({
      title: state => state.titleSearch.selected.item,
      loading: state => state.titleSearch.loading,
      inventory: state => state.titleSearch.inventory,
      inventory_loading: state => state.titleSearch.inventory_loading
    })
  },
  created() {
    if (this.title) {
      this.searchString = this.title.title;

      this.$store.commit(`titleSearch/${SEARCH_TITLES_INVENTORY_CLEAR}`);
      this.$store.dispatch(`titleSearch/${SEARCH_TITLES_INVENTORY}`, {
        searchString: this.searchString
      });
    }
  }
};
</script>

<style scoped>
.w-100 {
  width: 100%;
}
</style>
