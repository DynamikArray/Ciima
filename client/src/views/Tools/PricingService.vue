<template>
  <div class="w-100 pa-3" style="height:100%; min-height:100%">
    <div class="d-flex flex-row justify-space-between align-self-center">
      <div class="d-flex grow align-center">
        <h2>
          <v-icon class="mr-2">fas fa-funnel-dollar</v-icon>Pricing Service
          <span class="subtitle-2">View Per Comic Price of Items in Inventory</span>
        </h2>
      </div>
      <div class="d-flex flex-column align-self-center mr-4">
        <v-tabs v-model="tab" right center-active active-class="white--text" color="primary" id="pricingServiceTabs">
          <v-tab> <v-icon left>fas fa-portrait</v-icon>Per Comic Price</v-tab>
        </v-tabs>
      </div>
    </div>
    <v-divider class="my-1"></v-divider>
    <div class="mb-10">
      <PricingServiceContainer :tab="tab" />
    </div>
  </div>
</template>

<script>
import PricingServiceContainer from "@/components/PricingService/PricingServiceContainer";
export default {
  components: {
    PricingServiceContainer
  },
  data: () => ({
    tab: 0
  })
};
</script>

<style scoped></style>
