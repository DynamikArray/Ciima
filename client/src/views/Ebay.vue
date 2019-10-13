<template>
  <v-container>
    <v-scroll-y-reverse-transition>
      <div class="pageTitleWrapper" v-if="!ebayResults">
        <h1 class="display-3 text-left">Search Ebay</h1>
        <v-divider class="my-3"></v-divider>
      </div>
    </v-scroll-y-reverse-transition>

    <SearchEbay></SearchEbay>

    <v-divider class="my-3"></v-divider>

    <EbayResults></EbayResults>
  </v-container>
</template>

<script>
import EbayResults from "@/components/Ebay/EbayResults";
import SearchEbay from "@/components/Ebay/SearchEbay";

export default {
  data: () => ({
    ebayResults: false
  }),
  components: {
    SearchEbay,
    EbayResults
  }
};
</script>

<style scoped></style>
