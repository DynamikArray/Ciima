<template>
  <v-card class="secondary darken-2">
    <div class="d-flex flex-row w-100 borderTop">
      <div
        class="d-flex flex-column justify-end align-center borderRight"
        style="width:50%"
      >
        <v-card-title class="pa-1 my-1 text-center px-3">{{
          selectedRecord.ourTitle
        }}</v-card-title>
        <v-card-text>
          <div class="d-flex align-center justify-center">
            <div class="d-flex align-center justify-center">
              <OurIssueImage :item="makeOurIssue" :onClick="() => ({})" />
            </div>
          </div>
          <div class="d-flex align-center justify-center">
            <h4>Our Issue</h4>
          </div>
        </v-card-text>
      </div>
      <div
        class="d-flex flex-column justify-start align-center borderLeft"
        style="width:50%"
      >
        <v-card-title class="pa-1 my-1 text-center px-3">{{
          selectedRecord.theirTitle
        }}</v-card-title>
        <v-card-text>
          <div class="d-flex align-center justify-center">
            <div class="d-flex align-center justify-center">
              <TheirIssueImage :item="makeTheirIssue" :onClick="() => ({})" />
            </div>
          </div>
          <div class="d-flex align-center justify-center">
            <h4>Their Issue</h4>
          </div>
        </v-card-text>
      </div>
    </div>
    <v-card-title class="borderTop">
      <div class="d-flex align-center justify-start w-100">
        <div class="d-flex flex-column align-center justify-center">
          <v-btn color="red" @click="confirmDelete"
            ><v-icon class="mr-1">fa fa-times-circle</v-icon>Remove Match</v-btn
          >
          <h6 class="caption mt-1">Click here to delete this Issue Match</h6>
        </div>
        <div class="d-flex align-center justify-center mx-auto">
          <Prices
            v-if="selectedRecord.ourPricesFromThem"
            :prices="selectedRecord.ourPricesFromThem"
          />
        </div>
        <div class="d-flex align-center justify-center flex-column">
          <h6>Created: {{ selectedRecord.dateCreated | date }}</h6>
          <h6>Updated: {{ selectedRecord.dateUpdated | date }}</h6>
        </div>
      </div>
    </v-card-title>
    <v-card-title class="borderTop">
      <div class="d-flex align-end justify-end w-100 mb-1">
        <v-btn color="green" @click="closeModal"
          ><v-icon class="mr-1">fa fa-check</v-icon>Close</v-btn
        >
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
import { DELETE_ISSUE_MATCH } from "@/store/action-types";

import OurIssueImage from "../OurIssue/IssueImage";
import TheirIssueImage from "../TheirIssue/IssueImage";
import Prices from "../Templates/Prices";

export default {
  props: {
    selectedRecord: [Boolean, Object],
    dialog: [Boolean]
  },
  components: {
    OurIssueImage,
    TheirIssueImage,
    Prices
  },
  computed: {
    makeOurIssue() {
      return { imageUrl: this.selectedRecord.ourImageUrl };
    },
    makeTheirIssue() {
      return {
        images: {
          thumbnail: this.selectedRecord.theirImageThumbnail,
          fullsize: this.selectedRecord.theirImageFullsize
        }
      };
    }
  },
  methods: {
    closeModal() {
      this.$emit("update:dialog", false);
    },
    async confirmDelete() {
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Delete Current Record?</h3>
        <p>This will delete the Issue Match and Prices on file.</p>`,
        {
          title: " Are you sure?"
        }
      );
      if (confirm) this.deletePriceMatch();
    },
    deletePriceMatch() {
      this.closeModal();
      const id = this.selectedRecord.ourIssueId;
      this.$store
        .dispatch(`pricematch/${DELETE_ISSUE_MATCH}`, id, {
          root: true
        })
        .then(res => {
          if (res.result) {
            if (res.result.affectedRows == 1) {
              this.$toastr.s("Record Deleted");
            } else if (res.result.affectedRows == 0) {
              this.$toastr.e("No rows were deleted, no match found.");
            } else {
              this.$toastr.e(
                `An unknown result occured: ${JSON.stringify(res.result)}`
              );
            }
          }
        });
    }
  }
};
</script>

<style scoped></style>
