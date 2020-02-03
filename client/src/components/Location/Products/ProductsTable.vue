<template>
  <div class="w-100">
    <v-data-table
      id="boxesTable"
      :loading="loading"
      :headers="headers"
      :items-per-page="20"
      :footer-props="footerProps"
      :items="products"
      class="elevation-1 px-2"
      group-by="card"
    >
      <template v-slot:top>
        <div class="d-flex justify-space-between ">
          <div class="d-flex justify-align-center align-center ml-3">
            <h2 class="text-left pt-2 w-100">
              <i class="fa fa-sitemap mr-2"></i>Products for
              {{ selectedBoxAndCard }}
            </h2>
          </div>

          <div class="d-flex justify-align-center align-center ">
            <h2 class="my-0">
              {{ currentProductsOnly ? "Listed Report" : "History Report" }}
            </h2>
          </div>

          <div class="d-flex justify-align-center align-center mr-3">
            <v-btn
              :disabled="currentProductsOnly ? true : false"
              class="mx-2"
              color="primary"
              small
              @click="setCurrentProductsOnly"
              ><v-icon small class="mr-1">fa-shopping-cart</v-icon>Listed
            </v-btn>

            <v-btn
              class="mx-2"
              color="primary"
              :disabled="currentProductsOnly ? false : true"
              small
              @click="setFullHistory"
              ><v-icon small class="mr-1">fa-history</v-icon>History
            </v-btn>

            <v-btn
              class="mx-2"
              color="primary"
              small
              @click="printCurrentProducts"
              ><v-icon small class="mr-1">fa-print</v-icon>Print
            </v-btn>
          </div>
        </div>
        <v-divider class="mb-3"></v-divider>
      </template>

      <template v-slot:group.header="{ items }">
        <td colspan="100%" style="height:36px;" class="grey darken-4">
          <div class="d-flex justify-start mx-4">
            <div class="d-flex align-center">
              <h3>Card: {{ items[0].card }}</h3>
            </div>
          </div>
        </td>
      </template>

      <template v-slot:group.summary="{ items }">
        <td colspan="100%" style="height:36px;" class="grey darken-3">
          <div class="d-flex justify-end mx-4">
            <div class="d-flex align-center">
              <h4>Total: {{ items.length }}</h4>
            </div>
          </div>
        </td>
      </template>

      <template v-slot:item.imageFull="{ item }">
        <ImagesHoverOver
          :imageFull="item.imageFull"
          :imageThumb="item.imageFull"
        />
      </template>

      <template v-slot:item.itemTitle="{ item }">
        <div class="mx-3">{{ item.itemTitle }}</div>
      </template>

      <template v-slot:item.startDateTime="{ item }">
        <span style="font-size: 85%">{{ item.startDateTime | dateTime }}</span>
      </template>

      <template v-slot:item.endDateTime="{ item }">
        <span style="font-size: 85%">{{ item.endDateTime | dateTime }}</span>
      </template>

      <template v-slot:item.hasEnded="{ item }">
        <div v-if="item.hasEnded == true">
          <v-icon small>fa-check</v-icon>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import {
  SEARCH_BOXES_PRODUCTS,
  SEARCH_CARDS_PRODUCTS
} from "@/store/action-types.js";
import { headers } from "./tableConfig.js";
import ImagesHoverOver from "@/components/Images/ImageHoverOver";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import reportDefinitionBuilder from "./pdfs/reportDefinitionBuilder.js";

export default {
  props: {
    selectedBox: {
      type: [Boolean, Object]
    },
    selectedCard: {
      type: [Boolean, Object]
    },
    products: {
      type: [Array]
    },
    currentProductsOnly: {
      type: [Boolean]
    },
    loading: {
      type: [Boolean]
    }
  },
  components: {
    ImagesHoverOver
  },
  data: () => ({
    headers,
    footerProps: {
      "items-per-page-options": [15, 30, 50, 100]
    },
    currentCard: false
  }),
  watch: {
    selectedBox: function(val) {
      this.currentCard = {};
      this.$store.dispatch(`locations/${SEARCH_BOXES_PRODUCTS}`, val);
    },
    selectedCard: function(val) {
      this.currentCard = val;
      if (val) this.$store.dispatch(`locations/${SEARCH_CARDS_PRODUCTS}`, val);
    }
  },
  computed: {
    selectedBoxAndCard() {
      const box = this.selectedBox.box || "";
      const card = this.selectedCard.card || "";

      if (card) return `${box}-${card}`;
      return `${box}`;
    }
  },
  methods: {
    setCurrentProductsOnly() {
      this.$emit("update:currentProductsOnly", true);
    },
    setFullHistory() {
      this.$emit("update:currentProductsOnly", false);
    },
    async printCurrentProducts() {
      const { products, selectedBox } = this;
      const reportDate = this.$options.filters.dateTime(Date.now());

      const options = {
        title: `Box Type: ${selectedBox.box_type} | Box: ${selectedBox.box}`,
        subtitle: `Report Date: ${reportDate}`
      };

      const docDef = await reportDefinitionBuilder.create(products, options);

      pdfMake.createPdf(docDef).open();
    }
  }
};
</script>

<style scoped></style>
