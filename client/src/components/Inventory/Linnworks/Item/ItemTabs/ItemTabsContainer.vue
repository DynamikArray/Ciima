<template>
  <div class="w-100">
    <v-tabs v-model="tab" right center-active active-class="white--text" color="primary" id="inventoryItem-Tabs">
      <v-tab> <v-icon left>fa fa-tasks</v-icon>General</v-tab>
      <!--<v-tab> <v-icon left>fa fa-tasks</v-icon>Ebay</v-tab>-->
    </v-tabs>

    <div class="w-100 px-2">
      <v-tabs-items
        id="inventoryItem-TabsItems"
        :value="tab"
        class="w-100 d-flex flex-column align-self-stretch"
        style="background-color:transparent"
      >
        <v-tab-item key="generalTab" class="">
          <OverviewTab :item="item" :loading="loading" :unlocked="unlocked" @hasChanges="hasChanges" />
        </v-tab-item>
        <!--
        <v-tab-item key="ebayTab" class="">
          <EbayTab />
        </v-tab-item>
        -->
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import OverviewTab from "./Overview/OverviewTab";
import EbayTab from "./Ebay/EbayTab";

export default {
  props: {
    item: {
      type: [Boolean, Object]
    },
    loading: {
      type: [Boolean]
    },
    unlocked: {
      type: [Boolean],
      default: false
    }
  },
  components: {
    OverviewTab,
    EbayTab
  },
  data: () => ({
    tab: 0
  }),
  methods: {
    hasChanges(bln) {
      this.$emit("hasChanges", bln);
    }
  }
};
</script>

<style scoped></style>
