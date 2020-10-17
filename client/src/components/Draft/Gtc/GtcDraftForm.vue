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
          <div class="d-flex justify-center align-center mt-5 mb-10">
            <v-btn color="red" @click.prevent="clearDraft" class="mx-10">
              <v-icon small class="mr-1">fa-trash</v-icon>Reset
            </v-btn>
            <v-btn color="success" @click.prevent="saveDraft" class="mx-3">
              <v-icon small class="mr-1">fa-upload</v-icon>Save
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import Heading from "./Heading";
import InventoryTitle from "./formFields/InventoryTitle";

import ImageCropper from "./Images/ImageCropper";
import GtcDraftImages from "./Images/GtcDraftImages";

import LocationCode from "./formFields/LocationCode";
import InventoryPrice from "./formFields/InventoryPrice";
import InventoryQuantity from "./formFields/InventoryQuantity";
import EbayCategoryPicker from "./formFields/EbayCategoryPicker";
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

export default {
  components: {
    Heading,
    ImageCropper,
    GtcDraftImages,
    LocationCode,
    InventoryTitle,
    InventoryPrice,
    InventoryQuantity,
    EbayCategoryPicker,
    EbayStoreCategory,
    MainCharacter,
    Publisher,
    ExtraDescription
  },
  data: () => ({
    blnValidForm: false,
    rules: fieldRules
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
      //check for images
      if (!this.images.length) {
        this.$toastr.e("You must include one or more images in your listing.");
        return false;
      }
      //checks form fields
      return this.$refs.GtcDraftForm.validate();
    },

    clearDraft() {
      console.log("CLEAR THE DRAFT DUMMY");
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
    }
  }
};
</script>

<style scoped></style>
