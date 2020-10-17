<template>
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
        <v-btn>SAVE ME</v-btn>
      </v-col>
    </v-row>
  </v-container>
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
    Publisher
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
    }
  }
};
</script>

<style scoped></style>
