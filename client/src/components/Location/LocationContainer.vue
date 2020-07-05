<template>
  <section>
    <div class="d-flex flex-column justify-space-between align-self-center">
      <!--
      <div class="d-flex flex-row justify-space-around w-100 mb-1">
        <div class="d-flex justify-start align-baseline">
          <h3 class="mr-1">Selected Box:</h3>
          <h1>{{ selectedBox.box }}</h1>
        </div>
        <div class="d-flex justify-start align-baseline">
          <h3 class="mr-1">Selected Card:</h3>
          <h1>
            {{
              selectedCard.card ? `${selectedBox.box}-${selectedCard.card}` : ""
            }}
          </h1>
        </div>
      </div>
    -->

      <div class="d-flex flex-row">
        <div
          class="d-flex align-self-top  justify-center"
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
    </div>

    <v-divider class="my-5"></v-divider>

    <ProductsTable
      :products="productsList"
      :loading="products_loading"
      :selectedBox="selectedBox"
      :selectedCard="selectedCard"
      :currentProductsOnly.sync="currentProductsOnly"
    ></ProductsTable>
  </section>
</template>

<script>
import BoxesTable from "./Boxes/BoxesTable";
import CardsTable from "./Cards/CardsTable";
import ProductsTable from "./Products/ProductsTable";
import LabelMaker from "./Labels/LabelMaker";

import { mapState, mapGetters } from "vuex";
import {
  SEARCH_BOXES,
  SEARCH_CARDS,
  SET_SELECTED_BOX,
  SET_SELECTED_CARD
} from "@/store/action-types";

import {
  SELECTED_BOX_RESULT,
  SELECTED_CARD_RESULT
} from "@/store/mutation-types";

export default {
  data: () => ({
    currentProductsOnly: false,
    productsList: []
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
    selectedBox: {
      set(box) {
        this.$store.commit(`locations/${SELECTED_BOX_RESULT}`, box);
      },
      get() {
        return this.$store.state.locations.selectedBox;
      }
    },
    selectedCard: {
      set(card) {
        this.$store.commit(`locations/${SELECTED_CARD_RESULT}`, card);
      },
      get() {
        return this.$store.state.locations.selectedCard;
      }
    },
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
