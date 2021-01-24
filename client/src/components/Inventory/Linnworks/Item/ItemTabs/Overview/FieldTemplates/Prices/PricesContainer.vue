<template>
  <v-row dense>
    <v-col>
      <LotPrices v-if="showLotPrices" :item="item" :unlocked="unlocked" />
      <SetPrices v-if="showSetPrices" :item="item" :unlocked="unlocked" />
      <SinglePrices v-if="showSinglesPrices" :item="item" :unlocked="unlocked" />
      <GtcPrices v-if="showGtcsPrices" :item="item" :unlocked="unlocked" />
    </v-col>
  </v-row>
</template>

<script>
import LotPrices from "./LotPrices";
import SetPrices from "./SetPrices";
import SinglePrices from "./SinglePrices";
import GtcPrices from "./GtcPrices";

export default {
  props: {
    item: { type: [Boolean, Object] },
    unlocked: { type: [Boolean], default: false }
  },
  components: {
    LotPrices,
    SetPrices,
    SinglePrices,
    GtcPrices
  },
  computed: {
    showLotPrices() {
      if (this.item && this.item.CategoryName && this.item.CategoryName.toUpperCase() == "EBAY-LOTS") return true;
      return false;
    },
    showSetPrices() {
      if (this.item && this.item.CategoryName && this.item.CategoryName.toUpperCase() == "EBAY-SETS") return true;
      return false;
    },
    showSinglesPrices() {
      if (this.item && this.item.CategoryName && this.item.CategoryName.toUpperCase() == "EBAY-SINGLES") return true;
      return false;
    },
    showGtcsPrices() {
      if (this.item && this.item.CategoryName && this.item.CategoryName.toUpperCase() == "EBAY-GTCS") return true;
      return false;
    }
  },
  methods: {
    hasChanges(bln) {
      this.$emit("hasChanges", bln);
    }
  }
};
</script>

<style scoped></style>
