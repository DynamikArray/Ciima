<template>
  <section>
    <v-container fluid>
      <v-row dense class="grey darken-4">
        <v-col sm="4" class="">
          <div class="body-2 text-left ml-3">
            <span class="white--text">Category Name: </span>
            {{ item.CategoryName }}
          </div>
        </v-col>

        <v-col sm="4" class="">
          <div class="body-2 text-center mx-3">
            <span class="white--text">Item Number: </span>
            {{ item.ItemNumber }}
          </div>
        </v-col>
        <v-col sm="4" class="">
          <div class="body-2 text-right mr-3">
            <span class="white--text">Created: </span>
            {{ item.CreationDate | dateTime }}
          </div>
        </v-col>
      </v-row>

      <v-row dense>
        <v-col col="12">
          <v-divider class="my-0" />
        </v-col>
      </v-row>

      <v-row dense>
        <v-col sm="4" md="3" lg="2" class="grey darken-4 ">
          <ItemImage :imageUrl="item.Image" />
        </v-col>
        <v-col sm="8" md="9" lg="10" class="grey darken-4 px-4">
          <v-row dense>
            <v-col sm="12">
              <ItemTextField
                :itemValue.sync="item.ItemTitle"
                :itemId="item.pkStockItemID"
                :unlocked="unlocked"
                fieldName="ItemTitle"
                fieldId="itemTitle"
                fieldLabel="Inventory Title"
                fieldHint="Inventory Title"
                :rules="fieldRules.inventoryTitle"
              >
                <div class="d-flex align-center justify-start">
                  <h2 class="white--text textShadow  my-0">
                    {{ item.ItemTitle }}
                  </h2>
                </div>
              </ItemTextField>
            </v-col>

            <v-col col="12">
              <v-divider class="my-0" />
            </v-col>
          </v-row>

          <v-row dense class="mb-2">
            <v-col sm="12">
              <ItemTextField
                :itemValue.sync="item.BinRackNumber"
                :itemId="item.pkStockItemID"
                :locationId="item.LocationId"
                :unlocked="unlocked"
                fieldName="BinRackNumber"
                fieldId="BinRackNumber"
                fieldLabel="Location Code"
                fieldHint="Location Code"
                :rules="fieldRules.locationCode"
              />
            </v-col>
          </v-row>

          <!--Top Level Info -->
          <v-row no-gutters class="my-3">
            <v-col sm="12">
              <ItemTextField
                :itemValue.sync="item.Quantity"
                :itemId="item.pkStockItemID"
                :locationId="item.LocationId"
                :unlocked="unlocked"
                fieldName="Quantity"
                fieldId="Quantity"
                fieldLabel="Item Quantity"
                fieldHint="Item Quantity"
                :rules="fieldRules.quantity"
              />
            </v-col>
          </v-row>

          <v-row dense>
            <v-col sm="12">
              <ItemTextAreaExtendedProperty
                :itemValue.sync="item.ExtraDescription"
                :itemId="item.pkStockItemID"
                :unlocked="unlocked"
                fieldName="Extra Description"
                fieldId="Extra Description"
                fieldLabel="Extra Description"
                fieldHint="Extra Description"
              />
            </v-col>
          </v-row>

          <!--Prices Row -->
          <v-row no-gutters class="mt-3">
            <v-col cols="12">
              <div class="d-flex align-center justify-start">
                <h2 class="white--text my-0"><v-icon size="18" class="mr-1 mb-1">fas fa-dollar-sign</v-icon>Prices:</h2>
              </div>
            </v-col>

            <v-col sm="12">
              <v-divider class="mb-1" />
            </v-col>

            <v-col cols="3">
              <div class="text-left">Retail : {{ item.RetailPrice | currency }}</div>
            </v-col>
            <v-col cols="3">
              <div class="text-center">Listing : {{ item.ListingPrice | currency }}</div>
            </v-col>
            <v-col cols="3">
              <div class="text-center">Start : {{ startPrice | currency }}</div>
            </v-col>
            <v-col cols="3">
              <div class="text-right">Decline: {{ declinePrice | currency }}</div>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col col="12">
              <v-divider class="my-0" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12" class="grey darken-4 my-3 text-center">
          <EbayHistoryDT :items="item.ebayHistory" />
        </v-col>
      </v-row>

      <v-row no-gutters v-if="includeLog">
        <v-col cols="12" class="grey darken-4 my-3 text-center">
          <RepricingLogDT :items="item.repricingLog" />
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12" class="grey darken-4 my-3 text-center">
          <OrdersHistoryDT :items="item.ordersHistory" />
        </v-col>
      </v-row>

      <v-row no-gutters>
        <v-col cols="12" class="my-3 text-center">
          <v-divider class="my-2"></v-divider>
          <h5 class="caption">End Results</h5>
        </v-col>
      </v-row>

      <v-dialog v-model="loading" hide-overlay persistent width="300">
        <v-card color="primary" dark class="pt-2">
          <v-card-text>
            <h3 class="text-center mb-2">
              <v-icon class="mr-2">fas fa-list-alt</v-icon>
              Talking to linnworks...
            </h3>
            <v-progress-linear indeterminate color="white" class="mt-1"></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </section>
</template>

<script>
import EbayHistoryDT from "../Datatables/EbayHistory/EbayHistoryDT";
import RepricingLogDT from "../Datatables/RepricingLog/RepricingLogDT";
import OrdersHistoryDT from "../Datatables/OrdersHistory/OrdersHistoryDT";

import ItemImage from "./FieldTemplates/ItemImage";
import ItemTextField from "./FieldTemplates/ItemTextField";
import ItemTextArea from "./FieldTemplates/ItemTextArea";
import ItemTextAreaExtendedProperty from "./FieldTemplates/ItemTextAreaExtendedProperty";

import { fieldRules } from "@/components/Shared/Datatable/FieldRules/fieldRules";

export default {
  props: {
    item: {
      type: [Boolean, Object]
    },
    loading: {
      type: [Boolean]
    },
    unlocked: {
      type: [Boolean],
      default: false
    }
  },
  components: {
    EbayHistoryDT,
    RepricingLogDT,
    OrdersHistoryDT,
    ItemImage,
    ItemTextField,
    ItemTextArea,
    ItemTextAreaExtendedProperty
  },
  data: () => ({
    fieldRules
  }),
  computed: {
    includeLog() {
      const { CategoryName } = this.item;
      if (CategoryName && CategoryName.toUpperCase() == "EBAY-LOTS") return true;
      return false;
    },
    startPrice() {
      if (this.item.prices && this.item.prices.length) {
        const startPrice = this.item.prices.filter(price => price.Tag.toUpperCase() == "START");
        if (startPrice && startPrice.length > 0) {
          return startPrice[0].Price || false;
        }
      }
      return false;
    },
    declinePrice() {
      if (this.item.prices && this.item.prices.length) {
        const declinePrice = this.item.prices.filter(price => price.Tag.toUpperCase() == "DECLINE");
        if (declinePrice && declinePrice.length > 0) {
          return declinePrice[0].Price || false;
        }
      }
      return false;
    }
  }
};
</script>

<style scoped></style>
