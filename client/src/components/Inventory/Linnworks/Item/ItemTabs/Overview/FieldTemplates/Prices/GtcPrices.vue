<template>
  <div class="w-100 d-flex align-center justify-space-around">
    <ItemTextFieldPrice
      class="mr-2 d-flex"
      :itemValue.sync="item.RetailPrice"
      :itemId="item.pkStockItemID"
      :locationId="item.LocationId"
      :unlocked="unlocked"
      fieldName="RetailPrice"
      fieldId="RetailPrice"
      fieldLabel="Retail Price"
      fieldHint="Retail Price"
      @hasChanges="hasChanges"
      :rules="rules.retailPrice"
    />

    <div class="d-flex">
      <div class="d-flex">
        <ItemTextFieldPrice
          v-if="declinePrice"
          class="ml-2 d-flex"
          :itemValue.sync="declinePrice"
          :itemId="item.pkStockItemID"
          :locationId="item.LocationId"
          :unlocked="unlocked"
          fieldName="DeclinePrice"
          fieldId="DeclinePrice"
          fieldLabel="Decline Price"
          fieldHint="Decline Price"
          @hasChanges="hasChanges"
          :rules="rules.declinePrice"
          :includeDeleteButton="true"
          :itemPriceId="declinePriceId"
        />
      </div>
    </div>

    <ItemTextFieldPriceAddNew
      v-if="!declinePrice"
      class="ml-2 d-flex"
      :itemValue.sync="newPrice"
      :itemId="item.pkStockItemID"
      :locationId="item.LocationId"
      :unlocked="unlocked"
      fieldName="DeclinePrice"
      fieldId="DeclinePrice"
      fieldLabel="Decline Price"
      fieldHint="Decline Price"
      @hasChanges="hasChanges"
      :rules="rules.declinePrice"
    />
  </div>
</template>

<script>
import ItemTextFieldPrice from "./ItemTextFieldPrice";
import ItemTextFieldPriceAddNew from "./ItemTextFieldPriceAddNew";
export default {
  props: {
    item: { type: [Boolean, Object] },
    unlocked: { type: [Boolean], default: false },
    rules: { type: [Boolean, Object, Array] }
  },
  components: {
    ItemTextFieldPrice,
    ItemTextFieldPriceAddNew
  },
  data: () => ({
    newPrice: false
  }),
  computed: {
    declinePriceId: {
      get: function() {
        if (this.item.prices && this.item.prices.length) {
          const declinePrice = this.item.prices.filter(price => price.Tag.toUpperCase() == "DECLINE");
          if (declinePrice && declinePrice.length > 0) {
            return declinePrice[0].pkRowId || false;
          }
        }
        return false;
      },
      set: function(value) {
        if (this.item.prices && this.item.prices.length) {
          this.item.prices = this.item.prices.reduce((acc, price) => {
            if (price.Tag.toUpperCase() == "DECLINE") price.pkRowId = value;
            acc.push(price);
            return acc;
          }, []);
        }
      }
    },
    declinePrice: {
      get: function() {
        if (this.item.prices && this.item.prices.length) {
          const declinePrice = this.item.prices.filter(price => price.Tag.toUpperCase() == "DECLINE");
          if (declinePrice && declinePrice.length > 0) {
            return declinePrice[0].Price || false;
          }
        }
        return false;
      },
      set: function(value) {
        if (this.item.prices && this.item.prices.length) {
          this.item.prices = this.item.prices.reduce((acc, price) => {
            if (price.Tag.toUpperCase() == "DECLINE") price.Price = value;
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
