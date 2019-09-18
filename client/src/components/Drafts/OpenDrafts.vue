<template>
  <div
    class="openDraftsWrapper d-flex flex-column align-stretch justify-center"
  >
    <v-card class="grey darken-4 ma-3 mp-3 elevation-10 mb-10">
      <v-card-text>
        <div class="d-flex justify-space-between">
          <div class="d-flex align-top">
            <p class="headline">Open Drafts:</p>
          </div>
          <div class="d-flex align-top">
            <div class="mb-2">
              <v-btn @click="refreshDrafts" small color="grey darken-1">
                <v-icon small class="mr-1">fa-redo</v-icon></v-btn
              >
            </div>
          </div>
        </div>
        <v-divider></v-divider>

        <div
          v-for="draft in drafts"
          class="grey darken-3 d-flex flex-row justify-space-between w-100 my-1 pa-1"
        >
          <div class="d-flex align-center">
            <img :src="draft.main_image" width="40px" />
          </div>
          <div class="d-flex align-center grow mx-3">
            <div class="d-flex flex-column">
              <div class="d-flex align-center">
                <h4 class="subtitle">{{ draft.inventoryTitle }}</h4>
              </div>
              <div class="d-flex align-center">
                <h4 class="mr-2">Issues: {{ draft.issueNumbers }}</h4>
                <h4 class="mx-2">Grade: {{ draft.grade }}</h4>
              </div>
              <div class="d-flex align-center">
                Publisher etc
              </div>
            </div>
          </div>
          <div class="d-flex align-center ml-1 mr-2">
            <div class="d-flex flex-column align-end">
              <div class="d-flex align-center justify-end">
                <h4 class="mx-1">{{ draft.locationCode }}</h4>
              </div>
              <div class="d-flex justify-space-between">
                <div class="d-flex mx-1">
                  <h4 class="">Qty: {{ draft.quantity }}</h4>
                </div>
                <div class="d-flex mx-1">
                  <h4 class="">Price {{ draft.price }}</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex align-center mx-1">
            <div>
              <v-btn small color="primary" @click="submitDraft(draft.id)"
                ><v-icon small class="mr-1">fa-upload</v-icon></v-btn
              >
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  OPEN_DRAFTS_FETCH,
  OPEN_DRAFTS_SUBMIT_DRAFT
} from "@/store/action-types";

export default {
  created() {
    this.loadDrafts();
  },
  computed: {
    ...mapState({
      drafts: state => state.openDrafts.items,
      loading: state => state.openDrafts.loading
    })
  },
  methods: {
    refreshDrafts() {
      this.loadDrafts();
    },
    loadDrafts() {
      const opts = {};
      this.$store.dispatch(`openDrafts/${OPEN_DRAFTS_FETCH}`, opts);
    },
    submitDraft(draftId) {
      const toastr = this.$toastr || false;
      this.$store.dispatch(`openDrafts/${OPEN_DRAFTS_SUBMIT_DRAFT}`, {
        draftId,
        toastr
      });
    }
  }
};
</script>

<style scoped></style>
