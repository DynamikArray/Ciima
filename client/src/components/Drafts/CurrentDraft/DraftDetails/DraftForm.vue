<template>
  <div class="draftFormWrapper">
    <v-card class="grey darken-4 ma-3 mp-3 elevation-10 mb-10">
      <v-card-text>
        <v-form class="pa-3">
          <!--TITLE ROW-->
          <h3>Inventory Specifics:</h3>
          <v-divider class="my-1"></v-divider>

          <v-row>
            <v-col cols="5">
              <v-text-field
                v-model="locationCode"
                id="locationCode"
                name="locationCode"
                outlined
                label="Location"
                hint="Location code for the item"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="grade"
                id="grade"
                name="grade"
                outlined
                label="Grade"
                hint="Grade of the product"
              ></v-text-field
            ></v-col>

            <v-col cols="2">
              <v-text-field
                v-model="quantity"
                name="quantity"
                id="quantity"
                outlined
                label="Qty"
                hint="Quantity"
              ></v-text-field
            ></v-col>

            <v-col cols="2">
              <v-text-field
                v-model="price"
                name="price"
                id="price"
                outlined
                label="Price"
                hint="Price it will list for on eBay"
              ></v-text-field
            ></v-col>
          </v-row>
          <!--END ROW -->

          <v-row>
            <v-col cols="12">
              <AutoFillButton :switchToTab="switchToTab"></AutoFillButton>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                outlined
                label="Inventory Title"
                hint="Title as it will appear on Ebay"
                clearable
                counter
                id="inventoryTitle"
                name="inventoryTitle"
                v-model="inventoryTitle"
              ></v-text-field>
            </v-col>
          </v-row>
          <!--END ROW -->

          <h3>Comic Attributes:</h3>
          <v-divider class="my-1"></v-divider>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="series"
                name="series"
                outlined
                label="Series"
                hint="Storyline/Series of this product"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="mainCharacter"
                name="mainCharacter"
                outlined
                label="Character"
                hint="Main character featured throughout"
              ></v-text-field>
            </v-col>
          </v-row>

          <!--NEXT ROW -->
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model="issueNumbers"
                name="issueNumbers"
                outlined
                label="Issue Numbers"
                hint="Issue Number(s) when applicable"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="publisher"
                name="publisher"
                outlined
                label="Publisher"
                hint="Main publisher of these issues"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                v-model="publishedYear"
                name="publishedYear"
                outlined
                label="Year"
                hint="The year published for these issues "
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="publishedDate"
                name="publishedDate"
                outlined
                label="Date Published"
                hint="The Date published eg(Mar 86) "
              ></v-text-field>
            </v-col>
          </v-row>
          <!--END ROW -->

          <!--NEXT ROW -->
          <h3>Categories:</h3>
          <v-divider class="my-1"></v-divider>
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                outlined
                v-model="ebaySiteCategoryId"
                name="ebaySiteCategoryId"
                :loading="loading"
                :items="eBayCategories"
                item-text="ebayCategoryName"
                item-value="ebayCategoryId"
                :search-input.sync="searchEbayCategory"
                label="Search ebay categories"
                hide-no-data
              >
              </v-autocomplete>
            </v-col>
          </v-row>

          <!--NEXT ROW -->
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="ebayStoreCategoryIdOne"
                placeholder="Store Category 1"
                name="ebayStoreCategoryIdOne"
                :items="ebayStoreCategories"
                label="Ebay Store Category 1"
                hint="Primary Ebay Store Category"
              >
              </v-select>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="ebayStoreCategoryIdTwo"
                placeholder="Store Category 2"
                name="ebayStoreCategoryIdTwo"
                :items="ebayStoreCategories"
                label="Ebay Store Category 2"
                hint="Secondary Ebay Store Category"
              >
              </v-select>
            </v-col>
          </v-row>
          <!--END ROW -->
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center">
        <ActionButtons :switchToTab="switchToTab"></ActionButtons>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { SEARCH_EBAY_CATEGORIES } from "@/store/action-types.js";
import debounce from "lodash.debounce";
import ActionButtons from "./fields/ActionButtons.vue";
import AutoFillButton from "./fields/AutoFillButton.vue";

import { ebayStoreCategories } from "@/util/ebay/ebayStoreCategories.js";

import { createHelpers } from "vuex-map-fields";

const { mapFields } = createHelpers({
  getterType: "currentDraft/getField",
  mutationType: "currentDraft/updateField"
});

export default {
  created() {
    //location
    this.locationCode = "EBAY-SETS-";
  },
  props: {
    switchToTab: [Function]
  },
  components: {
    ActionButtons,
    AutoFillButton
  },
  data: () => ({
    selectedEbayCategory: null, //select
    searchEbayCategory: null, //search
    ebayStoreCategories
  }),
  computed: {
    ...mapState({
      loading: state => state.ebaySearch.loading,
      eBayCategories: state => state.ebaySearch.items
      //  draft: state => state.currentDraft
    }),
    ...mapFields([
      "inventoryTitle",
      "locationCode",
      "grade",
      "quantity",
      "price",
      "ebaySiteCategoryId",
      "ebayStoreCategoryIdOne",
      "ebayStoreCategoryIdTwo",
      "series",
      "mainCharacter",
      "issueNumbers",
      "publisher",
      "publishedYear",
      "publishedDate",
      "main_image"
    ])
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
    /*
    handleEbayStoreCategoryChange: val => {
      this.ebaySiteCategoryId = val;
    }
    */
  }
};
</script>

<style scoped></style>
