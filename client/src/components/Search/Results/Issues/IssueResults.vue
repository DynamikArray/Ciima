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
      :items="filteredItems"
      :loading="loading"
      loading-text="Searching Database"
      :items-per-page="15"
      :footer-props="footerProps"
    >
      <template v-slot:top="{ pagination, options, updateOptions }">
        <IssuesTop
          :pagination="pagination"
          :options="options"
          :updateOptions="updateOptions"
          :footerProps="footerProps"
          :updateFilter="updateFilter"
        />
      </template>
      <v-divider class="my-1"></v-divider>

      <template v-slot:item.imageUrl="{ item }">
        <IssuesImageUrl :item="item" :showImageModal="showImageModal" />
      </template>

      <template v-slot:item.title="{ item }">
        <IssuesTitle :item="item" :priceCheckIssue="priceCheckIssue" />
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

import { PRICE_SEARCH } from "@/store/action-types.js";

import settings from "@/util/settings.js";
import IssuesModal from "./IssuesModal";
import IssuesTop from "./templates/IssuesTop";
import IssuesTitle from "./templates/IssuesTitle";
import IssuesImageUrl from "./templates/IssuesImageUrl";

import { titleCleaner } from "@/util/pricing/titleCleaner";

export default {
  props: {
    filterString: [String]
  },
  components: {
    IssuesModal,
    IssuesTop,
    IssuesTitle,
    IssuesImageUrl
  },
  data() {
    return {
      isActive: false,
      footerProps: {
        "items-per-page-options": [15, 30, 50, 100, 250, 500]
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
      selectedTitle: state => state.titleSearch.selected,
      defaultProductType: state => state.settings.defaultProductType
    }),
    filteredItems() {
      return this.issues.filter(row =>
        row.fullIssue.includes(this.filterString)
      );
    }
  },
  methods: {
    updateFilter(val) {
      this.$emit("update:filterString", val);
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

    priceCheckIssue(title, issue) {
      const cleanedTitle = titleCleaner(title);
      const searchString = `${cleanedTitle} ${issue}`;

      this.$store.commit(`pricing/${PRICE_SEARCH_STRING}`, searchString);
      this.$store.commit(`settings/${TOGGLE_UTILITY_DRAWER}`, true);
      this.$store.commit(`settings/${UTILITY_DRAWER_TAB}`, 1);

      //always try to search ebay
      /*
      THIS CALL WE MAKE WAS DEPRECATED WE NEED TO SCRAPE NOW
      this.$store.dispatch(`pricing/${PRICE_SEARCH}`, {
        searchString,
        searchType: "ebayEnded"
      });
      */

      //always try to search ebay
      this.$store.dispatch(`pricing/${PRICE_SEARCH}`, {
        searchString,
        searchType: "ebayActive"
      });

      if (this.defaultProductType === "singles") {
        this.$store.dispatch(`pricing/${PRICE_SEARCH}`, {
          searchString,
          searchType: "myComicShop"
        });
      }
    }
  } //end mehtods
};
</script>

<style scoped></style>
