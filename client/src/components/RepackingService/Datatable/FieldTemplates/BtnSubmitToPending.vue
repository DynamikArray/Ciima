<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div class="repackingServiceActionButtons" :key="`transition_actionButtons_${keyString}`" :class="fontClass">
      <div>
        <v-btn :disabled="disabled" @click="confirmZeroOutAction" color="green darken-1" class="textShadow">Submit</v-btn>
      </div>
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
export default {
  name: "BtnSubmitToPending",
  props: {
    keyString: {
      type: [String]
    },
    item: {
      type: [Object]
    },
    fontClass: {
      type: [String],
      default: ""
    },
    disabled: {
      type: [Boolean],
      deafult: true
    }
  },
  methods: {
    async confirmZeroOutAction() {
      //add confirm
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Zero Out this in inventory?</h3>
        <p>This will change the quantity to zero, and linnworks to pull down any listings.</p>`,
        {
          title: "  Zero Out in Inventory"
        }
      );
      if (confirm) this.zeroOutInInventory();
    },
    zeroOutInInventory() {
      this.$emit("submitItem", { pkStockItemID: this.item.pkStockItemID, sku: this.item.ItemNumber });
    }
  }
};
</script>

<style scoped></style>
