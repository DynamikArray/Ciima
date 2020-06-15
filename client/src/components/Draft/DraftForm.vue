<template>
  <div class="draftFormWrapper">
    <RequiredDataChecks></RequiredDataChecks>

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
        <v-col cols="4">
          <AutoFillButton></AutoFillButton>
        </v-col>
        <v-col cols="8">
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
                <v-btn
                  style="margin-top:-5px"
                  color="primary"
                  @click="toggleExtraDescriptionDetails"
                >
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
        <v-col cols="12">
          <v-autocomplete
            autocomplete="off"
            id="searchEbaySiteCategoryId"
            dense
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
    </v-form>

    <v-card-actions class="justify-center">
      <ActionButtons :validateForm="validateForm"></ActionButtons>
    </v-card-actions>
  </div>
</template>

<script>
import debounce from "lodash.debounce";
import { mapState } from "vuex";
import { createHelpers } from "vuex-map-fields";
const { mapFields } = createHelpers({
  getterType: "currentDraft/getField",
  mutationType: "currentDraft/updateField"
});
import { SEARCH_EBAY_CATEGORIES } from "@/store/action-types.js";
import { ebayStoreCategories } from "@/util/ebay/ebayStoreCategories.js";

import { fieldNames, fieldRules } from "./fieldNamesAndRules.js";

import RequiredDataChecks from "./RequiredDataChecks.vue";
import ActionButtons from "./fields/ActionButtons.vue";
import AutoFillButton from "./fields/AutoFillButton.vue";

export default {
  components: {
    RequiredDataChecks,
    ActionButtons,
    AutoFillButton
  },
  created() {
    switch (this.defaultProductType) {
      case "sets":
        this.locationCode = "EBAY-SETS-";
        break;
      case "singles":
        this.locationCode = "EBAY-SINGLES-";
        break;
      case "adult":
        this.locationCode = "EBAY-ADULT-";
        break;
      default:
        break;
    }
  },
  data: () => ({
    valid: true,
    selectedEbayCategory: null, //select
    searchEbayCategory: null,
    ebayStoreCategories,
    fieldRules,
    showExtra: false
  }),
  computed: {
    ...mapState({
      loading: state => state.ebaySearch.loading,
      eBayCategories: state => state.ebaySearch.items,
      defaultProductType: state => state.settings.defaultProductType
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
    }, 500),
    defaultProductType(val) {
      if (val === "sets") this.locationCode = "EBAY-SETS-";
      if (val === "singles") this.locationCode = "EBAY-SINGLES-";
      if (val === "adult") this.locationCode = "EBAY-ADULT-";
    }
  },
  methods: {
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
