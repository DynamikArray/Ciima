<template>
  <v-form
    ref="GtcDraftForm"
    v-model="blnValidForm"
    lazy-validation
    class="pa-3"
  >
    <v-container fluid style="min-height:100%; height: 100%" class="pa-0">
      <v-row>
        <v-col class="py-0">
          <Heading />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="py-0">
          <InventoryTitle
            @update="updateLocalParams"
            :value="inventoryTitle"
            :rules="rules.inventoryTitle"
          />
        </v-col>
      </v-row>

      <v-divider class="mb-3"></v-divider>
      <ImageCropper :imageToCrop="imageToCrop" />
      <GtcDraftImages :imageToCrop="imageToCrop" class="my-1" />
      <v-divider class="my-3"></v-divider>

      <v-row>
        <v-col class="py-0">
          <LocationCode
            @update="updateLocalParams"
            :value="locationCode"
            :rules="rules.locationCode"
            :blur="checkLocationCode"
            :errorMessages="locationCodeErrorMessages"
          />
        </v-col>
        <v-col class="py-0">
          <InventoryPrice
            @update="updateLocalParams"
            :value="price"
            :rules="rules.price"
          />
        </v-col>
        <v-col class="py-0">
          <DeclinePrice
            @update="updateLocalParams"
            :value="declinePrice"
            :rules="rules.declinePrice"
          />
        </v-col>
        <v-col class="py-0">
          <InventoryQuantity
            @update="updateLocalParams"
            :value="quantity"
            :rules="rules.quantity"
          />
        </v-col>
      </v-row>

      <v-divider class="mb-3"></v-divider>

      <v-row>
        <v-col class="py-0">
          <EbayCategoryPicker
            @categorySelected="updateLocalParams"
            :value="ebaySiteCategoryId"
            :rules="rules.ebaySiteCategoryId"
          />
        </v-col>
      </v-row>

      <v-divider class="mt-5 mb-1"></v-divider>

      <v-row>
        <v-col>
          <EbayStoreCategory
            label="Ebay Store 1st Category:"
            name="ebayStoreCategoryIdOne"
            @update="updateLocalParams"
            :value="ebayStoreCategoryIdOne"
            :rules="rules.ebayStoreCategoryIdOne"
          />
        </v-col>
        <v-col>
          <EbayStoreCategory
            label="Ebay Store 2nd Category:"
            name="ebayStoreCategoryIdTwo"
            @update="updateLocalParams"
            :value="ebayStoreCategoryIdTwo"
            :rules="rules.ebayStoreCategoryIdTwo"
          />
        </v-col>
      </v-row>

      <v-divider class="mt-5 mb-1"></v-divider>

      <v-row>
        <v-col>
          <MainCharacter
            @update="updateLocalParams"
            :value="mainCharacter"
            :rules="rules.mainCharacter"
          />
        </v-col>
        <v-col>
          <Publisher
            @update="updateLocalParams"
            :value="publisher"
            :rules="rules.publisher"
          />
        </v-col>
      </v-row>

      <v-divider class="mt-5 mb-1"></v-divider>

      <v-row>
        <v-col>
          <ExtraDescription
            @update="updateLocalParams"
            :value="extraDescription"
          />
        </v-col>
      </v-row>

      <v-divider class="mt-5 mb-1"></v-divider>

      <v-row>
        <v-col>
          <div class="d-flex align-center justify-center">
            <div class="d-flex flex-column align-center justify-start">
              <div class="d-flex align-center justify-space-between my-3">
                <v-btn color="red" @click.prevent="clearDraft" class="mx-10">
                  <v-icon small class="mr-1">fa-trash</v-icon>Reset
                </v-btn>

                <v-btn color="success" @click.prevent="saveDraft" class="mx-3">
                  <v-icon small class="mr-1">fa-upload</v-icon>Save
                </v-btn>
              </div>

              <div class="d-flex align-center justify-start mb-5">
                <v-alert type="error" dense v-show="!blnValidForm">
                  There are errors with your form, please fix before saving.
                </v-alert>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="savingGtcDraft" hide-overlay persistent width="300">
      <v-card color="primary" dark class="pt-2">
        <v-card-text>
          <h4 class="text-center mb-2">
            <v-icon class="mr-2">fas fa-cloud-upload-alt</v-icon
            >{{ savingGtcDraftMessage || "Saving ..." }}
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
</template>

<script>
import axios from "axios";

import Heading from "./Heading";
import InventoryTitle from "./formFields/InventoryTitle";

import ImageCropper from "./Images/ImageCropper";
import GtcDraftImages from "./Images/GtcDraftImages";

import LocationCode from "./formFields/LocationCode";
import InventoryPrice from "./formFields/InventoryPrice";
import DeclinePrice from "./formFields/DeclinePrice";
import InventoryQuantity from "./formFields/InventoryQuantity";
import EbayCategoryPicker from "./formFields/EbayCategoryDropdown";
import EbayStoreCategory from "./formFields/EbayStoreCategory";
import MainCharacter from "./formFields/MainCharacter";
import Publisher from "./formFields/Publisher";
import ExtraDescription from "./formFields/ExtraDescription";

import { fieldNames, fieldRules } from "./formUtil/fieldNamesAndRules";

import { mapState } from "vuex";
import { createHelpers } from "vuex-map-fields";
const { mapFields } = createHelpers({
  getterType: "gtcs/draft/getField",
  mutationType: "gtcs/draft/updateField"
});

import { CURRENT_GTC_DRAFT_SAVE } from "@/store/action-types";
import {
  CURRENT_GTC_DRAFT_SAVING,
  UPDATE_API_STATUS,
  RESET_GTC_DRAFT
} from "@/store/mutation-types";

export default {
  components: {
    Heading,
    ImageCropper,
    GtcDraftImages,
    LocationCode,
    InventoryTitle,
    InventoryPrice,
    DeclinePrice,
    InventoryQuantity,
    EbayCategoryPicker,
    EbayStoreCategory,
    MainCharacter,
    Publisher,
    ExtraDescription
  },
  data: () => ({
    blnValidForm: false,
    rules: fieldRules,
    locationCodeErrorMessages: []
  }),
  computed: {
    ...mapState({
      defaultProductType: state => state.settings.defaultProductType
    }),
    ...mapFields([
      ...fieldNames,
      "imageToCrop",
      "savingGtcDraft",
      "savingGtcDraftMessage"
    ])
  },
  methods: {
    updateLocalParams(params) {
      Object.keys(params).forEach(key => {
        this[key] = params[key];
      });
    },

    validateForm() {
      if (this.locationCodeErrorMessages.length) {
        this.$toastr.e(
          "Its look like there is already an item in that location!"
        );
        return false;
      }
      //check for images
      if (!this.images.length) {
        this.$toastr.e("You must include one or more images in your listing.");
        return false;
      }
      //checks form fields
      const valid = this.$refs.GtcDraftForm.validate();
      return valid;
    },

    clearDraft() {
      this.locationCodeErrorMessages = [];
      this.blnValidForm = false;
      this.$store.commit(`gtcs/draft/${RESET_GTC_DRAFT}`);
      document.getElementById("GTC-inventoryTitle").focus();
    },

    async saveDraft() {
      document.body.style.cursor = "progress";
      try {
        if (this.validateForm()) {
          const uploadCheck = await this.handleImageUploading();
          if (uploadCheck) {
            const saved = await this.handleSavingFormData();
            if (saved) return true;
          }
        }
        return false;
      } catch (e) {
        this.$toastr.e(`Error Uploading File : ${e.message}`);
        return false;
      } finally {
        document.body.style.cursor = "default";
      }
    },

    async checkLocationCode(e) {
      const locationCode = e.target.value;

      const res = await this.$store
        .dispatch(`api/requestHandler`, {
          method: "post",
          url: "inventory/utility/checkLocationCode",
          params: { locationCode }
        })
        .catch(err => {
          this.$toastr.e("Couldnt verify location");
        });

      if (res.result && !res.error) {
        if (res.result.length) {
          this.locationCodeErrorMessages = ["Items exist in location already"];
        } else {
          this.locationCodeErrorMessages = [];
        }
      }

      if (res.error && !res.result) {
        this.$toastr.e(res.error);
      }
    },

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
            this.images[i].src = this.optimizedImageUrl(resp.data.secure_url);
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

    optimizedImageUrl(imageUrl) {
      const basePath = "https://res.cloudinary.com/ciima/image/upload";

      if (imageUrl.startsWith(basePath)) {
        const productPath = "lotPhotos";
        const fileNameArray = imageUrl.split(`/${productPath}/`);
        const fileName = fileNameArray[1];
        const src = `${basePath}/f_auto,fl_lossy,q_auto/${productPath}/${fileName}`;
        return src;
      }

      return imageUrl;
    },

    handleSavingFormData() {
      //error handle this better
      if (!this.verifyImagesSaved()) return false;
      const draft = this.getAllFormFields();

      this.updateLoadingStatus(true, "Saving draft with uploaded images.");

      this.$store
        .dispatch(`gtcs/draft/${CURRENT_GTC_DRAFT_SAVE}`, draft)
        .then(result => {
          if (result.error) this.$toastr.e(`Error: ${result.error}`);

          if (!result.error) {
            this.$store.commit(
              `api/${UPDATE_API_STATUS}`,
              `Saved | ${this.locationCode} | ${this.inventoryTitle}`
            );

            this.$toastr.s(`Draft Saved! ${JSON.stringify(result)}`);
            //clear draft and start next one
            this.clearDraft();
          }
        })
        .catch(e => {
          this.$toastr.e(`Error: ${e.message}`);
        });
    },

    verifyImagesSaved() {
      const saved = this.images.filter(image => {
        if (image.hasOwnProperty("saved")) return true;
        return false;
      });
      //do we have same number of saved as images?
      if (saved.length == this.images.length) return true;
      return false;
    },

    getAllFormFields() {
      const draft = {};
      fieldNames.forEach(field => {
        draft[field] = this[field];
      });
      return draft;
    },

    updateLoadingStatus(loading, loadingMessage) {
      this.$store.commit(`gtcs/draft/${CURRENT_GTC_DRAFT_SAVING}`, {
        loading,
        loadingMessage
      });
    }
  }
};
</script>

<style scoped></style>
