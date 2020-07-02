<template>
  <div class="relatedInventoryWrapper">
    <div v-if="Array.isArray(items)" class="textShadow">
      <div
        class="text-left pa-1 pl-4 grey darken-2 white--text text--lighten-2"
      >
        <v-icon small class="mr-2">fa fa-boxes</v-icon>{{ titleMessage }}
      </div>

      <v-data-table
        dense
        id="relatedInventory"
        :loading="loading"
        :headers="headers"
        :items-per-page="5"
        :items="items"
        class="elevation-1"
        :footer-props="footerProps"
        sort-by="itemTitle"
        :sort-desc="false"
      >
        <template v-slot:item.imgThumb="{ item }">
          <ImagesHoverOver
            :imageFull="item.imageFull"
            :imageThumb="item.imageThumb"
            :minHeight="35"
            :maxHeight="30"
            :maxWidth="30"
          />
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

        <template v-slot:item.price="{ item }">
          <v-edit-dialog
            :return-value.sync="item.price"
            large
            persistent
            @save="saveChanges('Price', 'price', item)"
          >
            <div>{{ item.price }}</div>
            <template v-slot:input>
              <div class="mt-4 title">Update Price</div>
            </template>
            <template v-slot:input>
              <v-text-field
                v-model="item.price"
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

    <div v-else class="text-center pa-2">
      <h3>No Related Inventory Results</h3>
    </div>
  </div>
</template>

<script>
import ImagesHoverOver from "@/components/Images/ImageHoverOver";
import { headers } from "./tableHeaders.js";

import {
  UPDATE_INVENTORY_ITEM_LEVELS,
  UPDATE_ITEM_FIELDS
} from "@/store/action-types.js";
import { UPDATE_API_STATUS } from "@/store/mutation-types.js";

export default {
  components: {
    ImagesHoverOver
  },
  props: {
    items: [Boolean, Array],
    loading: [Boolean],
    searchString: [String]
  },
  data: () => ({
    headers,
    footerProps: {
      "items-per-page-options": [5, 10, 15, 30, 50, 100, 250, 500]
    }
  }),
  computed: {
    titleMessage() {
      const { items, searchString } = this;
      if (items.length) {
        return `${items.length} Similar titles containing: ${searchString}`;
      }
      return `Similar titles: ${searchString}`;
    }
  },
  methods: {
    getDescendantProp(obj, desc) {
      var arr = desc.split(".");
      while (arr.length && (obj = obj[arr.shift()]));
      return obj;
    },
    getFieldEnum(field) {
      switch (field) {
        case "BinRack":
          return 13;
          break;
        case "StockLevel":
          return 10;
          break;
        case "Price":
          return 3;
          break;
      }
    },
    saveChanges(fieldName, fieldValueProp, item) {
      switch (fieldName) {
        case "BinRack":
          this.saveLocationField(fieldName, fieldValueProp, item);
          break;
        case "StockLevel":
          this.saveLocationField(fieldName, fieldValueProp, item);
          break;
        default:
          this.saveItemField(fieldName, fieldValueProp, item);
      }
    },
    saveLocationField(fieldName, fieldValueProp, item) {
      const fieldValue = this.getDescendantProp(item, fieldValueProp);
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
    saveItemField(fieldName, fieldValueProp, item) {
      const fieldValue = this.getDescendantProp(item, fieldValueProp);
      const params = {
        inventoryItemId: item.stockItemId,
        fieldName: this.getFieldEnum(fieldName),
        fieldValue: fieldValue
      };

      this.$store
        .dispatch(`linnworks/${UPDATE_ITEM_FIELDS}`, params)
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
    fieldNotSaved({ name, value }) {
      //MAYBE REFRESH
      //reset our local values with original
      //this.fieldValue = this.originalValue;

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

<style>
#relatedInventory .v-data-footer__select .v-select {
  margin: 0px 0px 8px 12px !important;
}
</style>
