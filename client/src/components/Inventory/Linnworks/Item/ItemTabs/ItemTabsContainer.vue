<template>
  <div class="w-100">
    <v-tabs
      v-model="tab"
      right
      center-active
      active-class="white--text"
      color="primary"
      id="inventoryItem-Tabs"
    >
      <v-tab> <v-icon left>fa fa-tasks</v-icon>General</v-tab>
      <v-tab> <v-icon left>fa fa-tasks</v-icon>Ebay</v-tab>
    </v-tabs>

    <div class="w-100 px-2">
      <v-tabs-items
        id="inventoryItem-TabsItems"
        :value="tab"
        class="w-100 d-flex flex-column align-self-stretch"
        style="background-color:transparent"
      >
        <v-tab-item key="generalTab" class="">
          <GeneralTab :item="item" />
        </v-tab-item>
        <v-tab-item key="ebayTab" class="">
          <EbayTab />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import GeneralTab from "./General/GeneralTab";
import EbayTab from "./Ebay/EbayTab";

export default {
  props: {
    item: {
      type: [Boolean, Object]
    }
  },
  components: {
    GeneralTab,
    EbayTab
  },
  data: () => ({
    tab: 0
  })
};
</script>

<style scoped></style>
