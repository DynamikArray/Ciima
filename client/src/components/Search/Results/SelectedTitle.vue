<template>
  <v-card v-if="title" class="w-100">
    <v-card-title class="px-3 pt-3 pb-0">
      <h3><span class="title mr-2">Title:</span>{{ title.title }}</h3>
    </v-card-title>
    <v-card-text class="pb-0 px-3">
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
      <RelatedInventory
        :items="inventory"
        :loading="inventory_loading"
      ></RelatedInventory>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { SEARCH_TITLES_INVENTORY } from "@/store/action-types";
import RelatedInventory from "./RelatedInventory/RelatedInventory";

export default {
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
      const searchString = this.title.title;
      this.$store.dispatch(`titleSearch/${SEARCH_TITLES_INVENTORY}`, {
        searchString
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
