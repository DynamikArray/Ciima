<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div class="d-flex flex-column align-center justify-space-around" :key="`transition_action_field_${item.pkStockItemID}`">
      <div class="d-flex flex-column align-center justify-start my-3">
        <div class="align-center">
          <v-btn
            small
            color="success"
            class="mb-1"
            style="min-width:20px; padding:10px"
            @click="selectItem(item.pkStockItemID)"
            ><v-icon small class="">fa-edit</v-icon></v-btn
          >
        </div>
        <div class="caption">
          (View/Edit)
        </div>
      </div>

      <div class="d-flex flex-column align-center justify-start my-3" v-if="item.CategoryName == 'EBAY-GTCS'">
        <div class="align-center">
          <v-btn
            small
            color="warning"
            class="mb-1"
            style="min-width:20px; padding:10px"
            @click="duplicateGTC(item.pkStockItemID)"
          >
            <v-icon small class="">fa-clone</v-icon>
          </v-btn>
        </div>
        <div class="caption">
          (Clone)
        </div>
      </div>
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
import { NEW_GTC_DRAFT_FROM_INVENTORY } from "@/store/action-types";

export default {
  props: {
    item: [Object, false]
  },
  methods: {
    selectItem(pkStockItemID) {
      this.$emit("itemSelected", pkStockItemID);
    },
    async duplicateGTC(item) {
      //add confirm
      const confirm = await this.$confirm(
        `<h3 class="text-center py-3">Duplicate this current GTC inventory item?</h3>
        <p>This will duplicate all possible values, and take you to the GTC Draft form</p>`,
        {
          title: "  Duplicate this Item?"
        }
      );
      if (confirm) this.duplicateGTCFromInventory(item);
    },
    async duplicateGTCFromInventory(pkStockItemID) {
      await this.$store.dispatch(`gtcs/draft/${NEW_GTC_DRAFT_FROM_INVENTORY}`, pkStockItemID);
    }
  }
};
</script>

<style scoped></style>
