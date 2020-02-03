<template>
  <div class="d-flex flex-column justify-space-between align-self-center">
    <div class="d-flex flex-row">
      <div
        class="d-flex align-self-top  justify-center mr-3"
        style="flex-basis:50%;flex-grow:0"
      >
        <BoxesTable
          :boxes="boxes"
          :loading="boxes_loading"
          :selectedBox.sync="selectedBox"
        ></BoxesTable>
      </div>
      <div
        class="d-flex align-self-top justify-center ml-3"
        style="flex-basis:50%;flex-grow:0"
      >
        <div class="d-flex flex-column w-100">
          <CardsTable
            :cards="cards"
            :loading="cards_loading"
            :selectedBox.sync="selectedBox"
            :selectedCard.sync="selectedCard"
          ></CardsTable>
          <LabelMaker
            :selectedBox="selectedBox"
            :boxCards="cards"
            class="mt-4"
          ></LabelMaker>
        </div>
      </div>
    </div>

    <v-divider class="my-5"></v-divider>

    <div class="d-flex flex-row">
      <div class="d-flex align-self-center grow justify-center">
        <ProductsTable
          :products="productsList"
          :loading="products_loading"
          :selectedBox="selectedBox"
          :selectedCard="selectedCard"
          :currentProductsOnly.sync="currentProductsOnly"
        ></ProductsTable>
      </div>
    </div>
  </div>
</template>

<script>
import BoxesTable from "./Boxes/BoxesTable";
import CardsTable from "./Cards/CardsTable";
import ProductsTable from "./Products/ProductsTable";
import LabelMaker from "./Labels/LabelMaker";

import { mapState, mapGetters } from "vuex";
import { SEARCH_BOXES, SEARCH_CARDS } from "@/store/action-types";

export default {
  data: () => ({
    selectedBox: false,
    selectedCard: false,
    currentProductsOnly: false,
    productsList: []
    //selectedCard: false
  }),
  components: {
    BoxesTable,
    CardsTable,
    ProductsTable,
    LabelMaker
  },
  computed: {
    ...mapState({
      boxes: state => state.locations.boxes,
      boxes_loading: state => state.locations.boxes_loading,
      cards: state => state.locations.cards,
      cards_loading: state => state.locations.cards_loading,
      products: state => state.locations.products,
      products_loading: state => state.locations.products_loading
    }),
    ...mapGetters({
      getCurrentProducts: "locations/getCurrentProducts"
    }),
    productsFiltered() {
      if (this.currentProductsOnly) return this.getCurrentProducts();
      this.productsList = this.products;
      return this.productsList;
    }
  },
  created() {
    this.$store.dispatch(`locations/${SEARCH_BOXES}`);
    this.$store.dispatch(`locations/${SEARCH_CARDS}`);
  },
  watch: {
    selectedBox: function(val) {
      this.selectedCard = false;
    },
    products: function(val) {
      //Hanlde showing correctlly filtered product lists when data is loaded from boxes/cards aciton button
      if (this.currentProductsOnly) {
        this.productsList = this.productsFiltered;
      } else {
        this.productsList = val;
      }
    },
    currentProductsOnly: function(val) {
      this.productsList = this.productsFiltered;
    }
  }
};
</script>

<style scoped></style>
