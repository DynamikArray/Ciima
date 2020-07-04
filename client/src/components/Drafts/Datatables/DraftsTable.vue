<template>
  <div class="w-100" style="height:100%">
    <v-data-table
      v-if="drafts"
      :headers="headers"
      :items="drafts"
      item-name="id"
      :loading="loading"
      loading-text="Loading..."
      :items-per-page="limit"
      show-select
      @input="itemSelected"
      hide-default-footer
      :footer-props="footerProps"
      v-model="selectedItems"
    >
      <template v-slot:top="{ pagination, options, updateOptions }"> </template>

      <!--IMAGE COLUMN-->
      <template v-slot:item.main_image="{ item }">
        <MainImage :item="item"> </MainImage>
      </template>

      <!--DETAIL COLUMN-->

      <template v-slot:item.inventoryTitle="{ item }">
        <InventoryTitle :isMobile="isMobile" :item="item"></InventoryTitle>
      </template>

      <template v-slot:item.quantity="{ item }">
        <Quantity :item="item"></Quantity>
      </template>

      <template v-slot:item.grade="{ item }">
        <Grade :item="item"></Grade>
      </template>

      <template v-slot:item.price="{ item }">
        <Price :item="item"></Price>
      </template>

      <template v-slot:item.locationCode="{ item }">
        <LocationCode :item="item"></LocationCode>
      </template>

      <template v-slot:item.ownerId="{ item }">
        <OwnerId :item="item"></OwnerId>
      </template>

      <template v-slot:item.createdDate="{ item }">
        <CreatedDate :item="item"></CreatedDate>
      </template>

      <!--ACTION COLUMN-->
      <template v-slot:item.action="{ item }">
        <ActionButtons :getData="getData" :item="item"></ActionButtons>
      </template>
    </v-data-table>

    <!--Table Record Actions -->
    <div v-if="status.toUpperCase() === 'OPEN'" class="my-3">
      <div class="d-flex justify-start">
        <div class="d-flex align-center">
          <v-btn class="warning" @click="withSelected"
            ><v-icon class="mr-2">fa-cloud-upload-alt</v-icon>Submit
            Drafts</v-btn
          >
        </div>
      </div>
    </div>

    <v-dialog v-model="submittingDrafts" hide-overlay persistent width="300">
      <v-card color="primary" dark class="pt-2">
        <v-card-text>
          <h4 class="text-center mb-2">
            <v-icon class="mr-2">fas fa-cloud-upload-alt</v-icon>
            Submitting Drafts ...
          </h4>
          <v-progress-linear
            indeterminate
            color="white"
            class="mt-1"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import InventoryTitle from "./templates/InventoryTitle/InventoryTitle";
import MainImage from "./templates/MainImage";
import LocationCode from "./templates/LocationCode";
import Grade from "./templates/Grade";
import Quantity from "./templates/Quantity";
import Price from "./templates/Price";
import OwnerId from "./templates/OwnerId";
import CreatedDate from "./templates/CreatedDate";

import ActionButtons from "./templates/ActionButtons";

import { DELETE_DRAFT, OPEN_DRAFTS_SUBMIT_DRAFT } from "@/store/action-types";

export default {
  props: {
    limit: [Number],
    isMobile: [Boolean],
    headers: [Array],
    status: [String],
    loading: [Boolean],
    drafts: [Boolean, Array],
    getData: [Function]
  },
  components: {
    MainImage,
    InventoryTitle,
    LocationCode,
    Quantity,
    Grade,
    Price,
    OwnerId,
    CreatedDate,
    ActionButtons
  },
  data() {
    return {
      selectedItems: [],
      selected: false,
      footerProps: {
        "items-per-page-options": [15, 30, 50, 100, 250, 500]
      },
      submittingDrafts: false
    };
  },
  methods: {
    itemSelected(items) {
      this.selectedItems = items;
    },
    //
    makeStatusNotesKey() {
      return `${Date.now()}-${Math.random()}`;
    },
    //
    makeNoteText(note) {
      return note;
    },
    //
    async deleteItem(id) {
      //add confirm
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Delete this current draft?</h3>
        <p>This will remove the draft. You cannot undo this operation. Are you sure you want to delete it?</p>`,
        { title: "  Delete this draft?" }
      );
      if (confirm) this.deleteDraft(id);
    },
    //
    async deleteDraft(draftId) {
      await this.$store.dispatch(`deleteDraft/${DELETE_DRAFT}`, { draftId });
      this.getData({});
    },
    //
    //
    async withSelected() {
      if (!this.selectedItems.length > 0) {
        this.$toastr.w("Nothing to submit");
        return;
      }
      //confirm
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Submit the selected drafts?</h3>
        <p>You are about to submit all the selected drafts to Linnworks. Are you sure they are complete and you have selected the correct drafts to submit?</p>`,
        { title: "  Submit these drafts?" }
      );
      if (!confirm) return;

      this.submittingDrafts = true;
      this.selectedItems.forEach(item => {
        setTimeout(() => {
          this.submitDraft(item.id, false);
        }, 250);
      });
      this.submittingDrafts = false;

      this.$toastr.s("All items submitted!");
      this.selectedItems = [];
      setTimeout(() => {
        this.getData({});
      }, 500);
    },
    //
    //
    async confirmSubmit(draftId, toast = true) {
      //add confirm
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Submit the current draft?</h3>
        <p>This will submit draft to Linnworks. Are you sure it's complete?</p>`,
        { title: "  Submit this draft?" }
      );
      if (confirm) this.submitDraft(draftId, toast);
    },
    //
    //
    async submitDraft(draftId, toast = true) {
      //const loadDrafts = this.loadDrafts();
      let toastr = false;
      if (toast) toastr = this.$toastr || false;

      await this.$store.dispatch(`openDrafts/${OPEN_DRAFTS_SUBMIT_DRAFT}`, {
        draftId,
        toastr
      });
    }
  }
};
</script>

<style scoped></style>
