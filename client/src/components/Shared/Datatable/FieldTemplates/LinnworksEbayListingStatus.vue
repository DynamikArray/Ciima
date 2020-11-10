<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div class="caption" :key="`transition_${item.pkStockItemID}`">
      <v-chip class="ma-2 textShadow" :color="statusColor">
        <v-icon small v-if="isUpating" class="mr-2">fas fa-cog fa-spin</v-icon>
        <h3 class="">{{ item.eBayListingStatus }}</h3>
      </v-chip>
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
  computed: {
    isUpating() {
      if (this.item.eBayListingStatus == "UPDATING") return true;
      return false;
    },
    statusColor() {
      switch (this.item.eBayListingStatus) {
        case "OK":
          return "success";
          break;
        case "UPDATING":
          return "warning";
          break;
        default:
          return "default";
      }
    }
  }
};
</script>

<style scoped></style>
