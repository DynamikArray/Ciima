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
                <v-icon small class="">fa-redo</v-icon></v-btn
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
          <div
            class="d-flex justify-center align-center mx-1"
            :style="{ minWidth: '100px' }"
          >
            <div v-if="draft.status === 'Open'">
              <v-chip label color="primary" @click="submitDraft(draft.id)">
                <v-icon small>fa-upload</v-icon>
              </v-chip>
            </div>
            <div v-if="draft.status === 'Pending'">
              <v-chip label color="warning">
                <v-icon small class="">fa-cog fa-spin</v-icon>
              </v-chip>
            </div>
            <div v-if="draft.status === 'Submitted'">
              <v-chip label color="success">
                <v-icon small>fa-check-circle</v-icon>
              </v-chip>
            </div>
            <div v-if="draft.status === 'Error'">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-chip label color="red" v-on="on">
                    <v-icon small>fa-exclamation-circle</v-icon>
                  </v-chip>
                </template>
                <div v-if="draft.statusNotes">
                  <h3>Notes:</h3>
                  <div v-for="note in jsonStatusNotes(draft.statusNotes)">
                    <h4>{{ note }}</h4>
                  </div>
                </div>
              </v-tooltip>
            </div>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import draftStatusCodes from "@/util/draftStatusCode.js";

import { mapState } from "vuex";
import {
  OPEN_DRAFTS_FETCH,
  OPEN_DRAFTS_SUBMIT_DRAFT
} from "@/store/action-types";

export default {
  data: () => ({
    draftStatusCodes: { ...draftStatusCodes }
  }),
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
    jsonStatusNotes(statusNotes) {
      return JSON.parse(statusNotes);
    },
    refreshDrafts() {
      this.loadDrafts();
    },
    loadDrafts() {
      this.$store.dispatch(`openDrafts/${OPEN_DRAFTS_FETCH}`, {});
    },
    async submitDraft(draftId) {
      const toastr = this.$toastr || false;
      await this.$store.dispatch(`openDrafts/${OPEN_DRAFTS_SUBMIT_DRAFT}`, {
        draftId,
        toastr
      });

      this.loadDrafts();
    }
  }
};
</script>

<style scoped></style>
