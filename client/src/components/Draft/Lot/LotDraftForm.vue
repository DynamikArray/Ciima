<template>
  <section id="lotDraftFrom" style="min-height:100%">
    <v-form
      ref="lotDraftForm"
      v-model="blnValidForm"
      lazy-validation
      class="pa-3"
    >
      <div class="d-flex justify-center align-center w-100">
        <div class="align-center justify-start">
          <h4 class="mr-2">Step 1:</h4>
        </div>
        <v-text-field
          autocomplete="off"
          autofocus
          ref="locationCode"
          dense
          v-model="locationCode"
          id="locationCode"
          @input="handleInputLocationCode"
          @focus="handleFocusLocationCode"
          name="locationCode"
          outlined
          label="Location"
          hint="Location code for the item"
          :rules="fieldRules.locationCode"
          counter
        ></v-text-field>
      </div>

      <v-divider class="my-2" />
      <div class="align-center justify-start">
        <h4 class="mr-2">Step 2:</h4>
      </div>
      <ImageCropper :imageToCrop="imageToCrop" />
      <LotDraftImages :imageToCrop="imageToCrop" class="my-1" />
      <v-divider class="my-1" />

      <!--MAIN Form Section -->
      <v-row>
        <v-col cols="12" class="text-left my-0 py-0">
          <h4 class="mr-2">Step 3:</h4>
        </v-col>
        <v-col cols="12" sm="3" md="3" class="text-center">
          <IssuesCount
            :value.sync="issuesCount"
            :rules="fieldRules.issuesCount"
            :updateData="updateValueFromChildComponents"
          />
        </v-col>
        <v-col cols="12" sm="5" md="6">
          <div class="d-flex justify-center align-center">
            <v-combobox
              autocomplete="off"
              ref="charactersList"
              id="characters"
              name="characters"
              label="Characters"
              hint="Select characters from list"
              v-model="characters"
              :items="charactersList"
              multiple
              outlined
              dense
              chips
              small-chips
              deletable-chips
              @change="handleCharactersChange"
              :rules="fieldRules.characters"
            ></v-combobox>
          </div>
        </v-col>
        <v-col cols="12" sm="4" md="3">
          <div class="d-flex justify-end align-center">
            <v-combobox
              autocomplete="off"
              ref="publishersList"
              id="publisher"
              name="publisher"
              label="Publisher"
              hint="Select Publisher from list "
              v-model="publisher"
              :items="publishersList"
              multiple
              outlined
              dense
              chips
              small-chips
              deletable-chips
              @change="handlePublisherChange"
              :rules="fieldRules.publisher"
            ></v-combobox>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <div class="d-flex justify-center align-center">
            <v-text-field
              autocomplete="off"
              dense
              v-model="price"
              id="price"
              @input="handleInputPrice"
              name="price"
              outlined
              label="Price"
              hint="Listing Price for the item"
              :rules="fieldRules.price"
            ></v-text-field>
          </div>
        </v-col>
        <v-col cols="12" sm="6" md="6">
          <div class="d-flex justify-center align-center">
            <v-btn color="grey darken-1" @click="toggleExtraFields">
              Extra Info<v-icon class="ml-2">{{
                blnShowExtra ? `fa-caret-up` : `fa-caret-down`
              }}</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" v-show="blnShowExtra">
          <div class="d-flex justify-center align-center">
            <v-textarea
              v-model="extraDescription"
              name="extraDescription"
              id="extraDescription"
              auto-grow
              outlined
              label="Extra Description Information"
              hint="Will be added underneath the title in the description of the ebay listing"
            >
            </v-textarea>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-2" />

      <!--Lot Draft Form Title -->
      <div class="align-center justify-start">
        <h4 class="mr-2 mb-1">
          Generated Ebay Title
          <span class="overline italic ml-1">
            (Character Publisher Issuecount Extra Comic Terms)</span
          >
        </h4>
      </div>
      <div class="d-flex justify-center align-center w-100">
        <InventoryTitle
          :value.sync="inventoryTitle"
          :titleCheckError="blnDuplicateTitleCheckError"
          :titleCheckErrorDetail="blnDuplicateTitleCheckListings"
          :rules="fieldRules.inventoryTitle"
          :updateData="updateValueFromChildComponents"
        />
      </div>
      <v-divider class="my-1" />

      <div class="d-flex justify-center align-center mt-5 mb-10">
        <v-btn color="red" @click.prevent="clearDraft" class="mx-10">
          <v-icon small class="mr-1">fa-trash</v-icon>Reset
        </v-btn>
        <v-btn color="success" @click.prevent="saveDraft" class="mx-3">
          <v-icon small class="mr-1">fa-upload</v-icon>Save
        </v-btn>
      </div>

      <v-dialog v-model="savingLotDraft" hide-overlay persistent width="300">
        <v-card color="primary" dark class="pt-2">
          <v-card-text>
            <h4 class="text-center mb-2">
              <v-icon class="mr-2">fas fa-cloud-upload-alt</v-icon
              >{{ savingLotDraftMessage || "Saving ..." }}
            </h4>
            <v-progress-linear
              indeterminate
              color="white"
              class="mt-1"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-form>
  </section>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { createHelpers } from "vuex-map-fields";

const { mapFields } = createHelpers({
  getterType: "lots/draft/getField",
  mutationType: "lots/draft/updateField"
});

import {
  CURRENT_LOT_DRAFT_SAVE,
  LOTS_DRAFT_TITLE_CHECK
} from "@/store/action-types";
import {
  RESET_LOT_DRAFT,
  CURRENT_LOT_DRAFT_SAVING,
  UPDATE_API_STATUS
} from "@/store/mutation-types";

import charactersList from "./formUtil/listCharacters.js";
import publishersList from "./formUtil/listPublishers.js";

import {
  fieldNames,
  fieldRules,
  formatTitleFromDraft
} from "./formUtil/formHelpers.js";

import InventoryTitle from "./formFields/InventoryTitle";
import IssuesCount from "./formFields/IssuesCount";

import ImageCropper from "./Images/ImageCropper";
import LotDraftImages from "./Images/LotDraftImages";

const LOCATION_CODE = "EBAY-LOTS-";

export default {
  components: {
    InventoryTitle,
    IssuesCount,
    ImageCropper,
    LotDraftImages
  },
  data: () => ({
    blnDuplicateTitleCheckError: false,
    blnDuplicateTitleCheckListings: false,
    blnValidForm: false,
    //blnReadOnly: true,
    blnShowExtra: false,
    //title: "25 Comic Book Lot Comics Collection Set Run Box",
    fieldRules,
    charactersList,
    publishersList
  }),
  computed: {
    ...mapState({
      defaultProductType: state => state.settings.defaultProductType
    }),
    ...mapFields([
      ...fieldNames,
      "imageToCrop",
      "savingLotDraft",
      "savingLotDraftMessage"
    ])
  },
  created() {
    switch (this.defaultProductType) {
      case "lots":
        this.locationCode = LOCATION_CODE;
        break;
    }
  },
  //
  //
  watch: {
    defaultProductType(val) {
      if (val === "lots") this.locationCode = LOCATION_CODE;
    },
    issuesCount(val) {
      //check if variants, update price
      if (val <= 14) this.price = 19.99;
      if (val > 14 && val < 20) this.price = 24.99;
      if (val >= 20 && val < 30) this.price = 29.99;
      if (val >= 30 && val < 40) this.price = 39.99;
      if (val >= 40 && val < 50) this.price = 49.99;
      if (val >= 50 && val < 60) this.price = 59.99;
      if (val >= 60) this.price = val * 1.25;
      this.updateTitleWithFormValues();
    }
  },
  //
  //
  methods: {
    //
    //
    updateValueFromChildComponents(fieldName, val) {
      this[fieldName] = val;
      //as long as its not an update from the inventory title
      if (fieldName !== "inventoryTitle") this.updateTitleWithFormValues();
    },
    //
    //
    handleInputLocationCode(val) {
      this.locationCode = val
        .trim()
        .toUpperCase()
        .replace(" ", "-");
    },
    handleFocusLocationCode() {
      const e = document.getElementById("locationCode");
      e.setSelectionRange(99, 99);
    },

    handleCharactersChange(val) {
      this.$refs.charactersList.lazySearch = false;
      this.updateTitleWithFormValues();
    },
    handlePublisherChange(val) {
      this.$refs.publishersList.lazySearch = false;
      this.updateTitleWithFormValues();
    },
    handleInputPrice(val) {
      this.updateTitleWithFormValues();
    },
    saveCroppedImage(image) {
      this.images.push(image);
    },
    toggleExtraFields() {
      this.blnShowExtra = !this.blnShowExtra;
    },
    updateTitleWithFormValues() {
      const titleString = formatTitleFromDraft(this.getAllFormFields());

      this.inventoryTitle = titleString;
    },
    clearDraft() {
      this.blnDuplicateTitleCheckError = false;
      this.blnValidForm = false;

      this.blnShowExtra = false;
      this.$store.commit(`lots/draft/${RESET_LOT_DRAFT}`);
    },
    //
    //
    //
    validateForm() {
      //check for images
      if (this.images.length == 0) {
        this.$toastr.e("You must include one or more images in your listing.");
        return false;
      }
      //checks form fields
      return this.$refs.lotDraftForm.validate();
    },
    //
    //
    async checkEbayTitle() {
      this.blnDuplicateTitleCheckError = false;

      const title = this.inventoryTitle;
      const { result } = await this.$store.dispatch(
        `lots/draft/${LOTS_DRAFT_TITLE_CHECK}`,
        { title }
      );

      //success - no duplicates
      if (result.passed && !result.failed) return true;
      //found a duplicate
      if (!result.passed && result.failed) {
        this.blnValidForm = false;
        this.blnDuplicateTitleCheckError = true;
        this.blnDuplicateTitleCheckListings = result.items;
        this.$toastr.e(
          "This appears to be a Duplicate Title, please change your title and try saving again."
        );
        return false;
      }
      return false;
    },

    //
    //
    async saveDraft() {
      document.body.style.cursor = "progress";
      try {
        if (this.validateForm()) {
          //Make sure not a duplicate draft
          //Check the Ebay AND DRAFT Title???
          const titleCheck = await this.checkEbayTitle();
          if (titleCheck) {
            const uploadCheck = await this.handleImageUploading();
            if (uploadCheck) {
              const saved = await this.handleSavingFormData();
              if (saved) return true;
            }
          }
          return false;
        }
      } catch (e) {
        return false;
        this.$toastr.e(`Error Uploading File : ${e.message}`);
      } finally {
        document.body.style.cursor = "default";
      }
    },
    //
    //
    //
    async handleImageUploading() {
      this.updateLoadingStatus(
        true,
        "Preparing images for upload to remote server."
      );

      var unsignedUploadPreset = "ciima_lot_photos";
      var cloudName = "ciima"; //FPVLink rebrand
      var url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload/`;
      const imagesLength = this.images.length;

      for (var i = 0; i < imagesLength; i++) {
        let fd = new FormData();
        let img = this.images[i].src;
        fd.append("file", img);
        fd.append("upload_preset", unsignedUploadPreset);
        fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
        fd.append("folder", "lotPhotos");

        try {
          this.updateLoadingStatus(
            true,
            `Uploading image ${i + 1} of ${imagesLength} to remote server`
          );

          const resp = await axios({
            method: "post",
            url,
            data: fd
          });

          if (resp.data && resp.data.secure_url) {
            this.images[i].src = resp.data.secure_url;
            this.images[i].saved = true;
            this.updateLoadingStatus(
              true,
              ` SAVED image ${i} of ${imagesLength}!`
            );
          }
        } catch (e) {
          console.log(e.message);
          this.$toastr.e(`Error Uploading File : ${e.message}`);
          return false;
        }
      }
      this.updateLoadingStatus(false, false);

      return true;
    },
    //
    //
    //
    verifyImagesSaved() {
      const saved = this.images.filter(image => {
        if (image.hasOwnProperty("saved")) return true;
        return false;
      });
      //do we have same number of saved as images?
      if (saved.length == this.images.length) return true;
      return false;
    },
    //
    //
    //
    handleSavingFormData() {
      //error handle this better
      if (!this.verifyImagesSaved()) return false;
      const draft = this.getAllFormFields();

      this.updateLoadingStatus(true, "Saving draft with uploaded images.");

      this.$store
        .dispatch(`lots/draft/${CURRENT_LOT_DRAFT_SAVE}`, draft)
        .then(result => {
          this.$store.commit(
            `api/${UPDATE_API_STATUS}`,
            `Saved | ${this.locationCode} | ${this.inventoryTitle}`
          );

          this.$toastr.s(`Draft Saved! ${JSON.stringify(result)}`);
          //clear draft and start next one
          this.clearDraft();
        })
        .catch(e => {
          console.log(e);
          this.$toastr.e(`Error: ${e.message}`);
        });
    },
    //
    getAllFormFields() {
      const draft = {};
      fieldNames.forEach(field => {
        draft[field] = this[field];
      });
      return draft;
    },
    //
    updateLoadingStatus(loading, loadingMessage) {
      this.$store.commit(`lots/draft/${CURRENT_LOT_DRAFT_SAVING}`, {
        loading,
        loadingMessage
      });
    }
  }
};
</script>

<style>
#lotDraftFrom label {
  font-size: 85%;
}
#lotDraftFrom .v-text-field__details {
  min-height: 0px;
  padding: 0px;
  margin: 0px;
}
#lotDraftFrom .v-messages {
  min-height: 0px;
}
</style>
