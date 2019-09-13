<template>
  <div
    class="openDraftsWrapper d-flex flex-column align-stretch justify-center"
  >
    <v-card class="grey darken-4 ma-3 mp-3 elevation-10 mb-10">
      <v-card-text>
        <h4>Open Drafts:</h4>
        <v-divider></v-divider>

        <div class="d-flex flex-colunn">
          <div v-for="draft in drafts" class="d-flex flex-row">
            {{ draft.id }} - {{ draft.title }}
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { OPEN_DRAFTS_FETCH } from "@/store/action-types";

export default {
  created() {
    const opts = {};
    this.$store.dispatch(`openDrafts/${OPEN_DRAFTS_FETCH}`, opts);
  },
  computed: {
    ...mapState({
      drafts: state => state.openDrafts.items,
      loading: state => state.openDrafts.loading
    })
  }
};
</script>

<style scoped></style>
