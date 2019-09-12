<template>
  <v-card class="grey darken-4 ma-3 mp-3 elevation-10 mb-10">
    <v-card-text>
      <v-form class="pa-3">
        <!--TITLE ROW-->
        <h3>Inventory Specifics:</h3>
        <v-divider class="my-1"></v-divider>
        <v-row>
          <v-col cols="12">
            <v-text-field
              outlined
              label="Inventory Title"
              hint="Title as it will appear on Ebay"
              clearable
              counter
            ></v-text-field>
          </v-col>
        </v-row>
        <!--END ROW -->

        <v-row>
          <v-col cols="5">
            <v-text-field
              outlined
              label="Location"
              hint="Location code for the item"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              outlined
              label="Grade"
              hint="Grade of the product"
            ></v-text-field
          ></v-col>

          <v-col cols="2">
            <v-text-field outlined label="Qty" hint="Quanity"></v-text-field
          ></v-col>

          <v-col cols="2">
            <v-text-field
              outlined
              label="Price"
              hint="Price it will list for on eBay"
            ></v-text-field
          ></v-col>
        </v-row>
        <!--END ROW -->

        <!--NEXT ROW -->
        <h3>Categories:</h3>
        <v-divider class="my-1"></v-divider>
        <v-row>
          <v-col cols="12">
            <v-autocomplete
              outlined
              v-model="selectedEbayCategory"
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
            <v-text-field
              outlined
              label="Ebay Store Category 1"
              hint="Your Ebay store category for this product"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              outlined
              label="Ebay Store Category 2"
              hint="Secondary Ebay store category for this product"
            ></v-text-field>
          </v-col>
        </v-row>
        <!--END ROW -->

        <h3>Comic Attributes:</h3>
        <v-divider class="my-1"></v-divider>
        <v-row>
          <v-col cols="6">
            <v-text-field
              outlined
              label="Series"
              hint="Storyline/Series of this product"
            ></v-text-field>
          </v-col>

          <v-col cols="6">
            <v-text-field
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
              outlined
              label="Issue Numbers"
              hint="Issue Number(s) when applicable"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              outlined
              label="Publisher"
              hint="Main publisher of these issues"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              outlined
              label="Year"
              hint="The year published for these issues "
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              outlined
              label="Date Published"
              hint="The Date published eg(Mar 86) "
            ></v-text-field>
          </v-col>
        </v-row>
        <!--END ROW -->
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { SEARCH_EBAY_CATEGORIES } from "@/store/action-types.js";
import debounce from "lodash.debounce";

export default {
  data: () => ({
    selectedEbayCategory: null, //select
    searchEbayCategory: null //search
    //eBayCategories - items  - on computed state
    //laoding - loading - on computed state
    /*
    rules: {
      title: [v => v.length <= 25 || "Max 25 characters"]
    }
    */
  }),
  computed: {
    ...mapState({
      loading: state => state.ebaySearch.loading,
      eBayCategories: state => state.ebaySearch.items
    })
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
  props: {},
  components: {}
};
</script>

<style scoped></style>
