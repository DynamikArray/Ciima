<template>
  <div class="d-flex align-baseline grey darken-4">
    <div class="d-flex flex-grow-1 w-100">
      <div class="mx-3">
        <p class="mt-2 IssueTopLabel">Scan UPC:</p>
      </div>
      <div class="mx-1">
        <v-text-field
          ref="searchUpc"
          autofocus
          autocomplete="off"
          class="pt-0"
          v-model="upcString"
          @input="searchUpc"
          prepend-icon="fa fa-barcode"
          label=""
          single-line
          hide-details
          :rules="[]"
        ></v-text-field>
      </div>
    </div>

    <div class="d-flex" style="minWidth: 150px">
      <p class="mt-2 IssueTopLabel" style="minWidth:80px">Filter Issue #</p>
      <div class="d-flex flex-shrink-1 mx-1 ">
        <v-text-field
          autocomplete="off"
          class="pt-0"
          :value="filterString"
          @input="updateFilter"
          prepend-icon="fa fa-filter"
          label=""
          single-line
          hide-details
        ></v-text-field>
      </div>
    </div>

    <div class="d-flex justify-center">
      <v-data-footer
        :pagination="pagination"
        :options="options"
        @update:options="updateOptions"
        :items-per-page-options="footerProps['items-per-page-options']"
        items-per-page-text="$vuetify.dataTable.itemsPerPageText"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { SEARCH_UPC } from "@/store/action-types.js";
import debounce from "lodash.debounce";

export default {
  props: {
    filterString: [String],
    pagination: [Boolean, Object],
    options: [Boolean, Object],
    footerProps: [Boolean, Object],
    updateFilter: [Function],
    updateOptions: [Function]
  },
  data() {
    return {
      upcString: ""
    };
  },
  methods: {
    searchUpc: debounce(function(val) {
      if (!val.length == 0) {
        if (!Number.isNaN(Number(val))) {
          if (val.length == 17) {
            this.fetchTitlesByUpc(val);
          } else {
            this.$toastr.e(
              `<b>Invalid UPC detected:</b><br /><b>${val}</b><br/>
                  Not enough characters, try rescanning.`
            );
          }
        }
      }
    }, 500),
    //
    //
    fetchTitlesByUpc(search) {
      this.$store
        .dispatch(`titleSearch/${SEARCH_UPC}`, {
          query: search,
          upc: 1
        })
        .then(res => {
          this.upcString = "";
        });
    }
  }
};
</script>

<style>
.IssueTopLabel {
  font-size: 12px;
}
</style>
