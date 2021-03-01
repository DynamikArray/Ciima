<template>
  <div class="draftFormWrapper">
    <div class="d-flex justify-center align-top mt-2">
      <div class="d-flex flex-column justify-center flex-shrink-1 mx-4">
        <h3 class="text-center">
          Main Image
        </h3>
        <v-img :src="main_image" width="300" class="ma-1" contain>
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="blue darken-1"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </div>

      <div class="d-flex flex-column justify-start mx-4">
        <h3 class="text-center">
          Other Images
        </h3>
        <div class="d-flex flex-wrap justify-start" v-if="other_images && other_images.length > 0">
          <div class="d-flex flex-shrink-1" v-for="image in other_images">
            <v-img :src="makeImageUrl(image)" width="90" height="120" class="ma-1" contain>
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="blue darken-1"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </div>
        </div>
        <div v-else>
          No Other Images
        </div>
      </div>
    </div>

    <v-form ref="draftForm" v-model="valid" lazy-validation class="pa-3">
      <!--TITLE ROW-->
      <h3>Inventory Specifics:</h3>
      <v-divider class="my-1"></v-divider>
      <v-row>
        <v-col cols="5">
          <v-text-field
            dense
            autofocus
            :value="locationCode"
            id="locationCode"
            @input="handleInputLocationCode"
            name="locationCode"
            outlined
            label="Location"
            hint="Location code for the item"
            :rules="fieldRules.locationCode"
            counter
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            :value="grade"
            @input="handleInputGrade"
            id="grade"
            name="grade"
            outlined
            label="Grade"
            hint="Grade of the product"
            :rules="fieldRules.grade"
          ></v-text-field
        ></v-col>

        <v-col cols="2">
          <v-text-field
            dense
            v-model="quantity"
            name="quantity"
            id="quantity"
            outlined
            label="Qty"
            hint="Quantity"
            :rules="fieldRules.quantity"
          ></v-text-field
        ></v-col>

        <v-col cols="2">
          <v-text-field
            dense
            v-model="price"
            name="price"
            id="price"
            outlined
            label="Price"
            hint="Price it will list for on eBay"
            :rules="fieldRules.price"
          ></v-text-field
        ></v-col>
      </v-row>
      <!--END ROW -->

      <v-row>
        <v-col cols="12">
          <div>
            <v-text-field
              dense
              outlined
              label="Inventory Title"
              hint="Title as it will appear on Ebay"
              clearable
              counter
              id="inventoryTitle"
              name="inventoryTitle"
              v-model="inventoryTitle"
              :rules="fieldRules.inventoryTitle"
            >
              <template v-slot:append-outer>
                <v-btn style="margin-top:-5px" color="primary" @click="toggleExtraDescriptionDetails">
                  <v-icon class="mr-1">{{ extraDescriptionIcon() }}</v-icon
                  >More
                </v-btn>
              </template>
            </v-text-field>
          </div>

          <div v-if="showExtra">
            <v-textarea
              v-model="extraDescription"
              auto-grow
              outlined
              label="Extra Description Information"
              hint="Will be added underneath the title in the description of the ebay listing"
            >
            </v-textarea>
          </div>
        </v-col>
      </v-row>

      <!--END ROW -->

      <h3>Comic Attributes:</h3>
      <v-divider class="my-1"></v-divider>
      <v-row>
        <v-col cols="4">
          <v-text-field
            dense
            v-model="mainCharacter"
            name="mainCharacter"
            outlined
            label="Character"
            hint="Main character featured throughout"
            :rules="fieldRules.mainCharacter"
            counter
          ></v-text-field>
        </v-col>

        <v-col cols="5">
          <v-text-field
            dense
            v-model="series"
            name="series"
            outlined
            label="Series"
            hint="Storyline/Series of this product"
            :rules="fieldRules.series"
            counter
          ></v-text-field>
        </v-col>

        <v-col cols="3">
          <v-text-field
            dense
            v-model="upc"
            name="upc"
            outlined
            label="UPC"
            hint="UPC/Barcode"
            :rules="fieldRules.upc"
          ></v-text-field>
        </v-col>
      </v-row>

      <!--NEXT ROW -->
      <v-row>
        <v-col cols="4">
          <v-text-field
            dense
            v-model="issueNumbers"
            name="issueNumbers"
            outlined
            label="Issue Numbers"
            hint="Issue Number(s) when applicable"
            :rules="fieldRules.issueNumbers"
            counter
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            v-model="publisher"
            name="publisher"
            outlined
            label="Publisher"
            hint="Main publisher of these issues"
            :rules="fieldRules.publisher"
            counter
          ></v-text-field>
        </v-col>
        <v-col cols="2">
          <v-text-field
            dense
            v-model="publishedYear"
            name="publishedYear"
            outlined
            label="Year"
            hint="The year published for these issues "
            :rules="fieldRules.publishedYear"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            dense
            v-model="publishedDate"
            name="publishedDate"
            outlined
            label="Date Published"
            hint="The Date published eg(Mar 86) "
            :rules="fieldRules.publishedDate"
          ></v-text-field>
        </v-col>
      </v-row>
      <!--END ROW -->

      <!--NEXT ROW -->
      <h3>Categories:</h3>
      <v-divider class="my-1"></v-divider>
      <v-row>
        <v-col cols="12" v-if="!showCategoryLookup">
          <div class="d-flex">
            <v-text-field
              disabled
              dense
              v-model="ebaySiteCategoryId"
              name="ebaySiteCategoryId"
              outlined
              label="Search ebay categories"
              :rules="fieldRules.ebaySiteCategoryId"
            >
            </v-text-field>
            <v-btn color="primary" class="mx-2" @click="showCategoryLookup = true">
              <v-icon class="mr-1">fa fa-search</v-icon>Change
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" v-if="showCategoryLookup">
          <v-autocomplete
            dense
            outlined
            :value="ebaySiteCategoryId"
            v-model="ebaySiteCategoryId"
            name="ebaySiteCategoryId"
            :loading="loading"
            :items="eBayCategories"
            item-text="ebayCategoryName"
            item-value="ebayCategoryId"
            :search-input.sync="searchEbayCategory"
            label="Search ebay categories"
            hide-no-data
            :rules="fieldRules.ebaySiteCategoryId"
          >
          </v-autocomplete>
        </v-col>
      </v-row>

      <!--NEXT ROW -->
      <v-row>
        <v-col cols="6">
          <v-select
            dense
            :value="ebayStoreCategoryIdOne"
            v-model="ebayStoreCategoryIdOne"
            placeholder="Store Category 1"
            name="ebayStoreCategoryIdOne"
            :items="ebayStoreCategories"
            label="Ebay Store Category 1"
            hint="Primary Ebay Store Category"
            :rules="fieldRules.ebayStoreCategoryIdOne"
          >
          </v-select>
        </v-col>
        <v-col cols="6">
          <v-select
            dense
            v-model="ebayStoreCategoryIdTwo"
            :value="ebayStoreCategoryIdTwo"
            placeholder="Store Category 2"
            name="ebayStoreCategoryIdTwo"
            :items="ebayStoreCategories"
            label="Ebay Store Category 2"
            hint="Secondary Ebay Store Category"
            :rules="fieldRules.ebayStoreCategoryIdTwo"
          >
          </v-select>
        </v-col>
      </v-row>
      <!--END ROW -->

      <v-card-actions class="justify-center">
        <EditFormActionButtons :validateForm="validateForm"></EditFormActionButtons>
      </v-card-actions>
    </v-form>
  </div>
</template>

<script>
import debounce from "lodash.debounce";
import { mapState } from "vuex";
import { createHelpers } from "vuex-map-fields";
const { mapFields } = createHelpers({
  getterType: "editDraft/getField",
  mutationType: "editDraft/updateField"
});
import { EDIT_DRAFT_FETCH, SEARCH_EBAY_CATEGORIES } from "@/store/action-types.js";

import { ebayStoreCategories } from "@/util/ebay/ebayStoreCategories.js";
import { fieldNames, fieldRules } from "./fieldNamesAndRules.js";
import RequiredDataChecks from "./RequiredDataChecks.vue";
import EditFormActionButtons from "./fields/EditFormActionButtons.vue";
import AutoFillButton from "./fields/AutoFillButton.vue";

import settings from "@/util/settings.js";

export default {
  props: {
    id: {
      type: [Number, Boolean, String]
    }
  },
  components: {
    RequiredDataChecks,
    EditFormActionButtons,
    AutoFillButton
  },
  beforeMount() {
    const { id } = this;
    this.$store.dispatch(`editDraft/${EDIT_DRAFT_FETCH}`, { id });
  },

  data: () => ({
    valid: true,
    selectedEbayCategory: null, //select
    searchEbayCategory: null,
    ebayStoreCategories,
    fieldRules,
    showExtra: false,
    showCategoryLookup: false
  }),
  computed: {
    ...mapState({
      loading: state => state.ebaySearch.loading,
      eBayCategories: state => state.ebaySearch.items,
      other_images: state => state.editDraft.other_images
    }),
    ...mapFields(fieldNames)
  },
  watch: {
    searchEbayCategory: debounce(function(value) {
      if (value && value.length) {
        this.$store.dispatch(`ebaySearch/${SEARCH_EBAY_CATEGORIES}`, {
          q: value
        });
      }
    }, 500)
  },
  methods: {
    makeImageUrl(item) {
      return item.imageUrl;
    },
    validateForm() {
      const valid = this.$refs.draftForm.validate();
      return valid;
    },
    handleInputLocationCode(val) {
      this.locationCode = val.toUpperCase();
    },
    handleInputGrade(val) {
      this.grade = val.toUpperCase();
    },
    toggleExtraDescriptionDetails() {
      this.showExtra = !this.showExtra;
    },
    extraDescriptionIcon() {
      if (this.showExtra) return "fa-arrow-alt-circle-up";
      return "fa-arrow-alt-circle-down";
    }
  }
};
</script>

<style scoped>
.col {
  padding: 3px 12px;
}
</style>
