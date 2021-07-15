<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div class="body-1" :key="`transition_${item.pkStockItemID}`">
      <div v-if="item.LastPrice">
        <div class="">
          <div class="body-2 red--text " style="text-decoration:line-through">
            {{ priceBeforeMarkdown | currency }}
          </div>
          <div class="body-1">
            {{ item.LastPrice | currency }}
          </div>
        </div>
      </div>
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
/*
Step 1
  Let the original price be = x
  Discount rate = 10%
Step 2:
  Discount = 10% of x = 0.10 × x = 0.1x
  Sale price = Original price − Discount = x − 0.1x = 0.9x
*/
const REPRICE_PERCENTAGE = 0.9;
export default {
  props: {
    item: {
      type: [Object]
    }
  },
  computed: {
    priceBeforeMarkdown() {
      if (this.item.LastPrice) {
        const currentPrice = Number(this.item.LastPrice).toFixed(2);
        const discountedAmount = Number(currentPrice / REPRICE_PERCENTAGE).toFixed(2);

        return discountedAmount;
      }
      return false;
    }
  }
};
</script>

<style scoped></style>
