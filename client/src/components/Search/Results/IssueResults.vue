<template>
  <div id="datatableWrapper">
    <IssuesModal></IssuesModal>

    <v-skeleton-loader
      v-if="loading"
      ref="skeleton"
      type="table"
      class="mx-auto"
      :loading="loading"
    >
    </v-skeleton-loader>
    <v-data-table
      v-else
      :headers="headers"
      :items="issues"
      :loading="loading"
      loading-text="Searching Database"
      :items-per-page="15"
      :footer-props="footerProps"
      @update:page="pageChange()"
    >
      <template v-slot:item.imageUrl="{ item }">
        <v-img
          :src="makeImageUrl(item)"
          width="70"
          height="105"
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
              <v-btn
                small
                color="green"
                class="mr-2 pa-0"
                @click="priceCheckIssue(item.title, item.fullIssue)"
                style="min-width: 34px"
              >
                <v-icon small>fa-dollar-sign</v-icon>
              </v-btn>

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
          <v-btn
            style="min-width:25px"
            color="success"
            class="mx-2 px-2"
            @click="addIssueToDraft(item)"
          >
            <v-icon>fa-plus-circle</v-icon>
          </v-btn>
        </div>
        <div v-else>
          <v-btn
            style="min-width:25px"
            color="red"
            class="mx-2 px-2"
            @click="removeIssueFromDraft(item)"
          >
            <v-icon>fa-times-circle</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  CURRENT_DRAFT_ISSUE_ADD,
  CURRENT_DRAFT_ISSUE_REMOVE,
  CURRENT_DRAFT_TITLE_ADD,
  SEARCH_ISSUES_SELECTED_ITEM,
  SEARCH_ISSUES_SHOW_SELECTED_ITEM,
  PRICE_SEARCH_STRING,
  TOGGLE_UTILITY_DRAWER,
  UTILITY_DRAWER_TAB
} from "@/store/mutation-types.js";

import settings from "@/util/settings.js";

import IssuesModal from "./IssuesModal";

export default {
  components: {
    IssuesModal
  },
  data() {
    return {
      isActive: false,
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
        {
          text: "Actions",
          value: "action",
          sortable: false,
          align: "center",
          width: "100"
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
    pageChange() {
      this.$vuetify.goTo("#datatableWrapper");
    },

    priceCheckIssue(title, issue) {
      const searchString = `${title} ${issue}`;
      this.$store.commit(`pricing/${PRICE_SEARCH_STRING}`, searchString);
      this.$store.commit(`settings/${TOGGLE_UTILITY_DRAWER}`, true);
      this.$store.commit(`settings/${UTILITY_DRAWER_TAB}`, 1);
    }

    //
    //
  }
};
</script>

<style scoped></style>
