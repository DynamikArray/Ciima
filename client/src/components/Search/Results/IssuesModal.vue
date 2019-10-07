<template>
  <v-dialog
    :value="showModal"
    max-width="580px"
    @keydown="handleKeyDown"
    @click:outside="handleClickOutside"
  >
    <v-card>
      <v-card-title class="text-center justify-space-between">
        <h4>{{ selectedIssue.title }}</h4>
        <h4>{{ selectedIssue.fullIssue }}</h4>
      </v-card-title>

      <v-card-text class="text-center pa-2">
        <div class="d-flex justify-center">
          <div class="d-flex align-center" style="min-width:60px;">
            <v-btn
              v-if="hasPrevIssue(selectedIssue.rowNumber)"
              color="primary"
              @click="gotoIssue(selectedIssue.rowNumber - 1)"
              v-shortkey="['arrowleft']"
              @shortkey="gotoIssue(selectedIssue.rowNumber - 1)"
              ><v-icon class="mr-1">fa-arrow-circle-left</v-icon></v-btn
            >
          </div>
          <div class="d-flex align-center mx-3">
            <v-img
              :src="makeImageUrl(selectedIssue.imageUrl)"
              max-width="400"
            />
          </div>
          <div class="d-flex align-center" style="min-width:60px;">
            <v-btn
              v-if="hasNextIssue(selectedIssue.rowNumber)"
              @click="gotoIssue(selectedIssue.rowNumber + 1)"
              v-shortkey="['arrowright']"
              @shortkey="gotoIssue(selectedIssue.rowNumber + 1)"
              color="primary"
              ><v-icon class="ml-1">fa-arrow-circle-right</v-icon></v-btn
            >
          </div>
        </div>
      </v-card-text>

      <v-divider class="my-3"></v-divider>
      <v-card-actions class="text-center justify-space-between">
        <v-btn color="warning" @click="hideImageModal"
          ><v-icon small class="mr-1">fa-window-close</v-icon>Close</v-btn
        >

        <v-btn
          color="success"
          @click="addIssueToDraft"
          v-shortkey="['enter']"
          @shortkey="addIssueToDraft"
          ><v-icon small class="mr-1">fa-plus</v-icon>Add</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import settings from "@/util/settings.js";

import { mapState } from "vuex";

import {
  SEARCH_ISSUES_SELECTED_ITEM,
  SEARCH_ISSUES_SHOW_SELECTED_ITEM,
  CURRENT_DRAFT_ISSUE_ADD,
  CURRENT_DRAFT_TITLE_ADD
} from "@/store/mutation-types.js";

export default {
  data() {
    return {
      selectedIssue: false
    };
  },
  computed: {
    ...mapState({
      issues: state => state.issueSearch.items,
      showModal: state => state.issueSearch.blnShowSelectedItem,
      selectedItem: state => state.issueSearch.selectedItem,
      selectedTitle: state => state.titleSearch.selected
    })
  },
  watch: {
    selectedItem(rowNumber) {
      const item = this.issues.filter(issue => {
        if (issue.rowNumber === rowNumber) return true;
      });
      if (item.length === 1) this.selectedIssue = item[0];
      if (item.length === 0) this.seletedItem = false;
    }
  },
  methods: {
    handleKeyDown(e) {
      if (e.key === "Escape") {
        this.hideImageModal();
      }
    },
    handleClickOutside() {
      this.hideImageModal();
    },
    hasPrevIssue(rowNumber) {
      if (rowNumber > 1) return true;
      return false;
    },
    hasNextIssue(rowNumber) {
      if (rowNumber < this.issues.length) return true;
      return false;
    },
    gotoIssue(rowNumber) {
      this.$store.commit(
        `issueSearch/${SEARCH_ISSUES_SELECTED_ITEM}`,
        rowNumber
      );
    },
    makeImageUrl(imageUrl) {
      return `${settings.MEDIA_URL}${imageUrl}`;
    },
    hideImageModal() {
      this.$store.commit(
        `issueSearch/${SEARCH_ISSUES_SHOW_SELECTED_ITEM}`,
        false
      );

      this.$store.commit(`issueSearch/${SEARCH_ISSUES_SELECTED_ITEM}`, false);
    },
    addIssueToDraft() {
      const item = this.selectedIssue;
      //add this issues title
      this.$store.commit(
        `currentDraft/${CURRENT_DRAFT_TITLE_ADD}`,
        this.selectedTitle.item
      );

      //add current issue
      this.$store.commit(`currentDraft/${CURRENT_DRAFT_ISSUE_ADD}`, item);
    }
  }
};
</script>

<style scoped></style>
