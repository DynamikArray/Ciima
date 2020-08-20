<template>
  <div>
    <div v-if="showSearchForm">
      <v-card class="elevation-1">
        <v-card-text class="">
          <div class="d-flex justify-space-between">
            <SearchForm
              :searchString.sync="searchString"
              class="d-flex grow align-center"
            />
          </div>
        </v-card-text>
      </v-card>

      <v-divider class="my-3"></v-divider>
    </div>

    <v-data-table
      :loading="loading"
      :headers="headers"
      :items-per-page="15"
      :items="filteredItems"
      class="elevation-1"
    >
      <template v-slot:top="{ pagination, options, updateOptions }">
        <div class="d-flex justify-start align-center">
          <h4 class="pt-2 ml-4 textShadow IssueTopLabel" style="minWidth:80px">
            Filter Issue #
          </h4>
          <div class="d-flex flex-shrink mx-1 ">
            <v-text-field
              autocomplete="off"
              style="minWidth: 160px; maxWidth: 160px"
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
      </template>

      <template v-slot:item.imgThumb="{ item }">
        <ImagesHoverOver
          :key="item.imageFull"
          :imageFull="item.imageFull"
          :imageThumb="item.imageThumb"
        />
      </template>

      <template v-slot:item.location.formattedName="{ item }">
        {{ item.location.formattedName }}
      </template>

      <template v-slot:item.location.name="{ item }">
        <v-edit-dialog
          :return-value.sync="item.location.name"
          large
          persistent
          @save="saveChanges('BinRack', 'location.name', item)"
        >
          <div>{{ item.location.name }}</div>
          <template v-slot:input>
            <div class="mt-4 title">Update Bin Rack</div>
          </template>
          <template v-slot:input>
            <v-text-field
              v-model="item.location.name"
              @input="
                v => {
                  item.location.name = v.toUpperCase();
                }
              "
              label="Edit"
              single-line
              counter
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:item.location.qty="{ item }">
        <v-edit-dialog
          :return-value.sync="item.location.qty"
          large
          persistent
          @save="saveChanges('StockLevel', 'location.qty', item)"
        >
          <div>{{ item.location.qty }}</div>
          <template v-slot:input>
            <div class="mt-4 title">Update Qty</div>
          </template>
          <template v-slot:input>
            <v-text-field
              v-model="item.location.qty"
              label="Edit"
              single-line
              counter
              autofocus
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:item.action="{ item }">
        <button>Action</button>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { headers } from "./tableConfig.js";
import SearchForm from "@/components/Inventory/Search/SearchForm";
import ImagesHoverOver from "@/components/Images/ImageHoverOver";
//import EditFieldDialog from "./EditFieldDialog";

import debounce from "lodash.debounce";
import {
  SEARCH_INVENTORY,
  UPDATE_INVENTORY_ITEM_LEVELS
} from "@/store/action-types.js";
import { UPDATE_API_STATUS } from "@/store/mutation-types.js";

export default {
  props: {
    showSearchForm: {
      type: [Boolean],
      default: true
    }
  },
  components: {
    SearchForm,
    ImagesHoverOver
    //EditFieldDialog
  },
  data() {
    return {
      headers,
      returnValue: false,
      searchString: "",
      filterString: ""
    };
  },
  computed: {
    ...mapState({
      loading: state => state.linnworks.loading,
      inventory: state => state.linnworks.items
    }),
    filteredItems() {
      return this.inventory.filter(row => {
        if (row.extendedProperties.issueNumbers)
          return row.extendedProperties.issueNumbers.includes(
            this.filterString
          );
      });
    }
  },
  methods: {
    updateFilter(val) {
      this.filterString = val;
    },
    getFieldEnum(field) {
      switch (field) {
        case "BinRack":
          return 13;
          break;
        case "StockLevel":
          return 10;
      }
    },
    saveChanges(fieldName, fieldValueProp, item) {
      function getDescendantProp(obj, desc) {
        var arr = desc.split(".");
        while (arr.length && (obj = obj[arr.shift()]));
        return obj;
      }

      const fieldValue = getDescendantProp(item, fieldValueProp);

      const params = {
        inventoryItemId: item.stockItemId,
        fieldName: this.getFieldEnum(fieldName),
        fieldValue: fieldValue,
        locationId: item.location.id,
        changeSource: fieldValue
      };

      this.$store
        .dispatch(`linnworks/${UPDATE_INVENTORY_ITEM_LEVELS}`, params)
        .then(resp => {
          const { result } = resp;
          if (result) this.fieldSaved({ name: fieldName, value: fieldValue });
          if (!result)
            this.fieldNotSaved({
              name: fieldName,
              value: fieldValue
            });
        })
        .catch(err => {
          this.fieldNotSaved({ name: fieldName, value: fieldValue });
        });
    },
    fieldSaved({ name, value }) {
      //update our status bar
      this.$store.commit(
        `api/${UPDATE_API_STATUS}`,
        `Saved ${name} value of ${value}`,
        { root: true }
      );
      //handle snackbar
      this.$toastr.s(`Saved ${name} value of <br/><b>${value}</b>!`);
    },
    async fieldNotSaved({ name, value }) {
      const searchString = this.searchString;

      const { error, result } = await this.$store.dispatch(
        `linnworks/${SEARCH_INVENTORY}`,
        { searchString }
      );

      //update our status bar
      this.$store.commit(
        `api/${UPDATE_API_STATUS}`,
        `Error trying to save ${name} with value of ${value}`,
        { root: true }
      );
      this.$toastr.e(
        `Error trying to save ${name} value of <br/><b>${value}</b>!`
      );
    }
  }
};
</script>

<style scoped></style>
