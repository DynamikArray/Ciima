<template>
  <div>
    <v-dialog v-model="imagePopup" max-width="420px">
      <v-card>
        <v-card-title class="text-center justify-space-between">
          <h5>{{ selected.title }}</h5>
          <h5>{{ selected.fullIssue }}</h5>
        </v-card-title>
        <v-card-text class="text-center pa-2">
          <v-img :src="imageSrc" max-width="400" />
        </v-card-text>
        <v-divider class="my-3"></v-divider>
        <v-card-actions class="text-center justify-space-between">
          <v-btn color="success" @click="addIssueToDraft(selected)"
            ><v-icon small class="mr-1">fa-plus</v-icon>Add</v-btn
          >
          <v-btn color="warning" @click="hideImageModal()">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <DraftsDatatableHeader
      :onSelect="loadDrafts"
      title="Drafts"
      icon="fa-list-alt"
    ></DraftsDatatableHeader>

    <v-data-table
      v-if="drafts"
      :headers="headers"
      :items="drafts"
      item-name="id"
      :loading="loading"
      loading-text="Loading..."
      :items-per-page="10"
      show-select
      @input="itemSelected"
      :footer-props="footerProps"
    >
      <!--IMAGE COLUMN-->
      <template v-slot:item.main_image="{ item }">
        <div v-if="item.main_image !== 'false'">
          <v-img
            :src="item.main_image"
            width="50"
            class="ma-1"
            @click="showImageModal(item.main_image)"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="blue darken-1"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </div>
        <div v-else>
          <v-icon>fa-exclamation-triangle</v-icon>
        </div>
      </template>

      <!--DETAIL COLUMN-->

      <template v-slot:item.inventoryTitle="{ item }">
        <div class="d-flex align-center">
          <div class="d-flex align-center grow mx-3 long-and-truncated">
            <div class="d-flex flex-column">
              <div class="d-flex align-center">
                {{ item.inventoryTitle }}
              </div>
              <div class="d-flex align-center">
                <h5 class="mr-2">Issues: {{ item.issueNumbers }}</h5>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:item.createdDate="{ item }">
        <div class="d-flex align-center">
          <span class="caption">{{ item.createdDate | dateTime }}</span>
        </div>
      </template>

      <!--ACTION COLUMN-->
      <template v-slot:item.action="{ item }">
        <div class="d-flex justify-center align-center mx-1">
          <div v-if="item.status === 'Open'">
            <v-chip label color="primary" @click="submitDraft(item.id)">
              <v-icon small>fa-upload</v-icon>
            </v-chip>
          </div>
          <div v-if="item.status === 'Pending'">
            <v-chip label color="warning">
              <v-icon small class="">fa-cog fa-spin</v-icon>
            </v-chip>
          </div>
          <div v-if="item.status === 'Submitted'">
            <v-chip label color="success">
              <v-icon small>fa-check-circle</v-icon>
            </v-chip>
          </div>
          <div v-if="item.status === 'Error'">
            <v-tooltip left :max-width="420" color="red">
              <template v-slot:activator="{ on }">
                <v-chip label color="red" v-on="on">
                  <v-icon small>fa-exclamation-circle</v-icon>
                </v-chip>
              </template>
              <div v-if="item.statusNotes">
                <h3>Notes:</h3>
                <h4
                  :key="makeStatusNotesKey()"
                  v-html="makeNoteText(item.statusNotes)"
                ></h4>
              </div>
            </v-tooltip>
          </div>
        </div>
      </template>
    </v-data-table>

    <!--Table Record Actions -->
    <div v-if="status === 'Open'" class="my-3">
      <div class="d-flex justify-start">
        <div class="d-flex align-center">
          <v-btn class="warning" @click="withSelected"
            ><v-icon class="mr-2">fa-cloud-upload-alt</v-icon>Submit
            Drafts</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { headers } from "./config.js";
import { mapState } from "vuex";
import settings from "@/util/settings.js";
import DraftsDatatableHeader from "./DraftsDatatableHeader.vue";

import {
  OPEN_DRAFTS_FETCH,
  OPEN_DRAFTS_SUBMIT_DRAFT
} from "@/store/action-types";

export default {
  components: {
    DraftsDatatableHeader
  },
  data() {
    return {
      status: "Open",
      selectedItems: [],
      selected: false,
      imageSrc: false,
      imagePopup: false,
      headers,
      footerProps: {
        "items-per-page-options": [10, 20, 50, 100]
      }
    };
  },
  created() {
    const { status } = this;
    this.loadDrafts({ status });
  },
  computed: {
    ...mapState({
      loading: state => state.openDrafts.loading,
      drafts: state => state.openDrafts.items
    })
  },
  methods: {
    loadDrafts(params = {}) {
      this.$store.dispatch(`openDrafts/${OPEN_DRAFTS_FETCH}`, params);
    },
    showImageModal(imgSrc) {
      this.selected = imgSrc;
      this.imageSrc = imgSrc;
      this.imagePopup = true;
    },
    hideImageModal() {
      this.imagePopup = false;
    },
    makeStatusNotesKey() {
      return `${Date.now()}-${Math.random()}`;
    },
    makeNoteText(note) {
      return note;
    },
    async submitDraft(draftId, toast = true) {
      const loadDrafts = this.loadDrafts();
      let toastr = false;
      if (toast) toastr = this.$toastr || false;

      await this.$store.dispatch(`openDrafts/${OPEN_DRAFTS_SUBMIT_DRAFT}`, {
        draftId,
        toastr
      });
      //hack to let the message queue pick up mark a process status
      setTimeout(() => {
        this.loadDrafts();
      }, 500);

      //hack to let the message queue pick up mark a process status
      setTimeout(() => {
        this.loadDrafts();
      }, 5000);
    },
    withSelected() {
      this.selectedItems.forEach(item => {
        this.submitDraft(item.id, false);
      });
      this.$toastr.s("All items submitted!");
    },
    itemSelected(items) {
      this.selectedItems = items;
    }
  }
};
</script>

<style scoped>
.long-and-truncated {
  flex: 1;
  &,
  & > * {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
