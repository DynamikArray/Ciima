<template>
  <v-container fluid>
    <v-row dense>
      <v-col sm="4" md="3" lg="2" class="grey darken-4 ">
        <div class="pa-2 mx-3">
          <v-img
            :key="item.pkStockItemID"
            :src="item.Image"
            contain
            :maxHeight="300"
          />
        </div>
      </v-col>
      <v-col sm="8" md="9" lg="10" class="grey darken-3 px-4">
        <v-row dense>
          <v-col sm="12">
            <h2 class="white--text my-0">
              <v-icon size="18" class="mr-1 mb-1">fas fa-newspaper</v-icon
              >Details: {{ item.pkStockItemID }}
            </h2>
          </v-col>

          <v-col col="12">
            <v-divider class="my-0" />
          </v-col>
        </v-row>

        <v-row dense class="mb-2">
          <v-col sm="12">
            <h3 class="">Title: {{ item.ItemTitle }}</h3>
          </v-col>
        </v-row>

        <v-row dense class="mb-2">
          <v-col sm="8">
            <h3 class="text-left">Location: {{ item.BinRackNumber }}</h3>
          </v-col>
          <v-col sm="4">
            <div class="body-2 text-right">
              Item Number: {{ item.ItemNumber }}
            </div>
          </v-col>
        </v-row>

        <!--Top Level Info -->
        <v-row no-gutters class="my-3">
          <v-col sm="6">
            <h3 class="text-left">Quantity: {{ item.Quantity }}</h3>
          </v-col>

          <v-col sm="6">
            <div class="body-2 text-right">
              Category Name: {{ item.CategoryName }}
            </div>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col sm="8">
            <h3 class="text-left">
              Extra Description:
              <span class="body-2">
                {{ item.ExtraDescription }}
              </span>
            </h3>
          </v-col>
          <v-col sm="4">
            <div class="body-2 text-right">
              Created: {{ item.CreationDate | dateTime }}
            </div>
          </v-col>
        </v-row>

        <!--Prices Row -->
        <v-row no-gutters class="mt-3">
          <v-col cols="12">
            <div class="d-flex align-center justify-start">
              <h2 class="white--text my-0">
                <v-icon size="18" class="mr-1 mb-1">fas fa-dollar-sign</v-icon
                >Prices:
              </h2>
            </div>
          </v-col>

          <v-col sm="12">
            <v-divider class="mb-1" />
          </v-col>

          <v-col cols="3">
            <div class="text-left">
              Retail : {{ item.RetailPrice | currency }}
            </div>
          </v-col>
          <v-col cols="3">
            <div class="text-center">
              Listing : {{ item.ListingPrice | currency }}
            </div>
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

    <v-row no-gutters>
      <v-col cols="12" class="grey darken-4 my-3 text-center">
        <RepricingLogDT :items="item.repricingLog" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EbayHistoryDT from "../Datatables/EbayHistory/EbayHistoryDT";
import RepricingLogDT from "../Datatables/RepricingLog/RepricingLogDT";

export default {
  props: {
    item: {
      type: [Boolean, Object]
    }
  },
  components: {
    EbayHistoryDT,
    RepricingLogDT
  },
  computed: {
    startPrice() {
      if (this.item.prices && this.item.prices.length) {
        const startPrice = this.item.prices.filter(
          price => price.Tag.toUpperCase() == "START"
        );
        if (startPrice && startPrice.length > 0) {
          return startPrice[0].Price || false;
        }
      }
      return false;
    },
    declinePrice() {
      if (this.item.prices && this.item.prices.length) {
        const declinePrice = this.item.prices.filter(
          price => price.Tag.toUpperCase() == "DECLINE"
        );
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
