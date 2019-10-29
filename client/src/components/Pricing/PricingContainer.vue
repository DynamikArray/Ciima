<template>
  <div class="h-100">
    <PricingSearchBox class="ma-4"></PricingSearchBox>
    <PricingTabs></PricingTabs>
  </div>
</template>

<script>
import PricingSearchBox from "./PricingSearchBox";
import PricingTabs from "./Tabs/PricingTabs";
export default {
  components: {
    PricingSearchBox,
    PricingTabs
  }
};
</script>

<style scoped></style>
