<template>
  <div class="w-100">
    <ItemTextFieldPriceByTag
      :itemValue.sync="startPrice"
      :itemId="item.pkStockItemID"
      :locationId="item.LocationId"
      :unlocked="unlocked"
      fieldName="StartPrice"
      fieldId="StartPrice"
      fieldLabel="Start Price"
      fieldHint="Start Price"
      @hasChanges="hasChanges"
    />
  </div>
</template>

<script>
import ItemTextFieldPriceByTag from "./ItemTextFieldPriceByTag";
export default {
  props: {
    item: { type: [Boolean, Object] },
    unlocked: { type: [Boolean], default: false }
  },
  components: {
    ItemTextFieldPriceByTag
  },
  computed: {
    startPrice() {
      if (this.item.prices && this.item.prices.length) {
        const startPrice = this.item.prices.filter(price => price.Tag.toUpperCase() == "START");
        if (startPrice && startPrice.length > 0) {
          return startPrice[0].Price || false;
        }
      }
      return false;
    }
  },
  methods: {
    hasChanges(bln) {
      this.$emite("hasChanges", bln);
    }
  }
};
</script>

<style scoped></style>
