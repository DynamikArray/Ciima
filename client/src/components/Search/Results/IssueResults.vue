<template>
  <div>
    <IssuesModal></IssuesModal>

    <v-data-table
      v-if="issues"
      :headers="headers"
      :items="issues"
      :loading="loading"
      loading-text="Searching Database"
      :items-per-page="15"
      :custom-filter="customFilter"
      :footer-props="footerProps"
    >
      <template v-slot:item.imageUrl="{ item }">
        <v-img
          :src="makeImageUrl(item)"
          width="70"
          class="ma-1"
          @click="showImageModal(item.rowNumber)"
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
      </template>

      <template v-slot:item.title="{ item }">
        <div class="d-flex flex-row justify-start align-center">
          <div class="d-flex flex-column grow flex-wrap ">
            <div class="d-flex">
              <h3 class="title">{{ item.title }}</h3>
            </div>
            <div class="d-flex">
              <v-chip
                small
                label
                color="blue darken-1"
                text-color="white"
                class="mr-3"
              >
                <v-icon small class="mr-2">fa-calendar-alt</v-icon>
                <div>
                  {{ item.coverDate | date }}
                </div>
              </v-chip>
              <v-chip
                small
                label
                color="grey darken-1"
                text-color="white"
                class="mr-3"
              >
                <v-icon small class="mr-2">fa-user-edit</v-icon>
                <div>
                  {{ item.coverArtist }}
                </div>
              </v-chip>
            </div>
          </div>
          <div class="d-flex mr-2">
            <h3 class="display-2" style="font-size: 2.25em !important">
              {{ item.fullIssue }}
            </h3>
          </div>
        </div>
      </template>

      <template v-slot:item.action="{ item }">
        <div v-if="!inCurrentDraft(item)">
          <v-btn color="success" class="mx-2" @click="addIssueToDraft(item)">
            <v-icon>fa-plus-circle</v-icon>
          </v-btn>
        </div>
        <div v-else>
          <v-btn color="red" class="mx-2" @click="removeIssueFromDraft(item)">
            <v-icon>fa-times-circle</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <div v-else>
      <h3 class="text-center">No Issues</h3>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  CURRENT_DRAFT_ISSUE_ADD,
  CURRENT_DRAFT_ISSUE_REMOVE,
  CURRENT_DRAFT_TITLE_ADD,
  SEARCH_ISSUES_SELECTED_ITEM,
  SEARCH_ISSUES_SHOW_SELECTED_ITEM
} from "@/store/mutation-types.js";

import settings from "@/util/settings.js";

import IssuesModal from "./IssuesModal";

export default {
  components: {
    IssuesModal
  },
  data() {
    return {
      search: "",
      footerProps: {
        "items-per-page-options": [15, 30, 50, 100]
      },
      headers: [
        {
          text: "Cover",
          value: "imageUrl",
          sortable: false,
          align: "center",
          width: "120"
        },
        {
          text: "Title",
          value: "title",
          sortable: true,
          align: "left"
        },
        /*
        {
          text: "Variant",
          value: "variation",
          sortable: true,
          align: "center",
          filter: value => {
            return true;
          }
        },
        {
          text: "Printing",
          value: "printing",
          sortable: true,
          align: "center"
        },
        {
          text: "FullIssue",
          value: "fullIssue",
          sortable: true,
          align: "center"
        },
        */
        {
          text: "Actions",
          value: "action",
          sortable: false,
          align: "center"
        }
      ]
    };
  },
  created() {},
  computed: {
    ...mapState({
      issues: state => state.issueSearch.items,
      loading: state => state.issueSearch.loading,
      draftIssues: state => state.currentDraft.issues,
      selectedTitle: state => state.titleSearch.selected
    })
  },
  methods: {
    makeImageUrl(item) {
      return `${settings.MEDIA_URL}${item.imageUrl}`;
    },
    showImageModal(rowNumber) {
      this.$store.commit(
        `issueSearch/${SEARCH_ISSUES_SELECTED_ITEM}`,
        rowNumber
      );
      this.$store.commit(
        `issueSearch/${SEARCH_ISSUES_SHOW_SELECTED_ITEM}`,
        true
      );
    },
    inCurrentDraft(item) {
      const drafts = this.draftIssues;
      if (drafts.length > 0) {
        const doesExist = drafts.some(el => {
          return el.id === item.id;
        });
        return doesExist;
      }
      return false;
    },
    //
    addIssueToDraft(item) {
      this.$store.commit(
        `currentDraft/${CURRENT_DRAFT_TITLE_ADD}`,
        this.selectedTitle.item
      );
      this.$store.commit(`currentDraft/${CURRENT_DRAFT_ISSUE_ADD}`, item);
      //this.hideImageModal();
      //show the draftImages tab
    },
    //
    removeIssueFromDraft(item) {
      this.$store.commit(`currentDraft/${CURRENT_DRAFT_ISSUE_REMOVE}`, item);
    },
    //
    //
    customFilter() {}
    //
    //
  }
};
</script>

<style scoped></style>
