<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div class="body-2" :key="`transition_${item.pkStockItemID}`">
      <v-btn color="primary" @click="submitItem">
        <v-icon class="mx-1">fas fa-cloud-upload-alt</v-icon>Reprice
      </v-btn>
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
export default {
  props: {
    item: {
      type: [Object]
    }
  },
  methods: {
    submitItem() {
      const { pkStockItemID, ItemTitle } = this.item;
      this.$emit("submitItem", { pkStockItemID, ItemTitle });
    }
  }
};
</script>

<style scoped></style>
