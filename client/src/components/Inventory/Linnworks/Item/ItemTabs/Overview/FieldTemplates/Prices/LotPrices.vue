<template>
  <div>
    <ItemTextFieldPrice
      class="mr-2 d-flex"
      :itemValue.sync="startPrice"
      :itemId="item.pkStockItemID"
      :locationId="item.Location"
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
import ItemTextFieldPrice from "./ItemTextFieldPrice";

export default {
  props: {
    item: { type: [Boolean, Object] },
    unlocked: { type: [Boolean], default: false }
  },
  components: {
    ItemTextFieldPrice
  },
  data: () => ({}),
  computed: {
    startPrice: {
      get: function() {
        if (this.item.prices && this.item.prices.length) {
          const startPrice = this.item.prices.filter(price => price.Tag.toUpperCase() == "START");
          if (startPrice && startPrice.length > 0) {
            return startPrice[0].Price || false;
          }
        }
        return false;
      },
      set: function(value) {
        if (this.item.prices && this.item.prices.length) {
          this.item.prices = this.item.prices.reduce((acc, price) => {
            if (price.Tag.toUpperCase() == "START") price.Price = value;
            acc.push(price);
            return acc;
          }, []);
        }
      }
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
