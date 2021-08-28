<template>
  <v-form
    ref="searchPricePerComicForm"
    v-model="validForm"
    @submit.prevent="searchPricePerComic"
    class="w-100 searchPricePerComicForm"
  >
    <div class="d-flex flex-row flex-grow-1 align-start justify-start pa-1 mt-1">
      <div class="d-flex mx-5 ">
        <div class="d-flex flex-column justify-start">
          <div class="mb-1">
            <h5>Price Per Comic Filter:</h5>
          </div>
          <div>
            <v-text-field
              class="perComicPriceThreshold"
              dense
              outlined
              autocomplete="off"
              ref="perComicPriceThreshold"
              autofocus
              persistent-hint
              :rules="rules.thresholdPrice"
              v-model="thresholdPrice"
            />
          </div>
        </div>
      </div>

      <div class="d-flex mx-5">
        <div class="d-flex flex-column">
          <div>
            <h5>Filter Items:</h5>
          </div>
          <div>
            <v-switch
              color="primary"
              class="flaggedItemsOnly mt-0"
              dense
              ref="flaggedItemsOnly"
              hide-details
              persistent-hint
              :label="flaggedItemsOnly ? 'Below Per Comic Price Only' : 'Include All Ciima Lot Items'"
              v-model="flaggedItemsOnly"
            />
          </div>
        </div>
      </div>

      <div class="d-flex mx-5 align-center">
        <div class="mt-4">
          <v-btn type="submit" color="primary"><v-icon small class="mr-1">fa fa-filter</v-icon>Submit</v-btn>
        </div>
      </div>
    </div>
  </v-form>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { PRICING_SERVICE_SEARCH_ITEMS } from "@/store/action-types";

export default {
  name: "dtSearchForm",
  data: () => ({
    validForm: false,
    rules: {
      thresholdPrice: [
        v => !!v || "Price is a required field",
        v => !!Number(v) > 0 || "Price must be greater than zero or is not a number"
      ]
    }
  }),
  computed: {
    ...mapFields("pricingService", ["thresholdPrice", "flaggedItemsOnly"]),
    flaggedItemsLabel() {
      if (this.flaggedItemsOnly) {
        return "Only Flagged Items";
      } else {
        return "All Items";
      }
    }
  },
  methods: {
    searchPricePerComic() {
      if (!this.validateForm()) return false;
      this.$store.dispatch(`pricingService/${PRICING_SERVICE_SEARCH_ITEMS}`, {});
    },

    validateForm() {
      //checks form fields
      const valid = this.$refs.searchPricePerComicForm.validate();
      return valid;
    }
  }
};
</script>

<style>
.searchPricePerComicForm {
}

.searchPricePerComicForm .perComicPriceThreshold {
  width: 160px;
  text-align: center;
}

.searchPricePerComicForm .perComicPriceThreshold .v-text-field__slot input {
  text-align: center;
  font-size: 120%;
}
</style>
