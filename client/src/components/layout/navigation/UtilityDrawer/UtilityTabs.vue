<template>
  <div class="utilityTabsWrapper fullHeight">
    <v-tabs
      v-model="tab"
      grow
      center-active
      color="primary"
      active-class="grey darken-3 white--text"
      background-color="grey darken-4"
    >
      <div class="inline grey darken-3 pa-2">
        <v-btn
          style="min-width:20px;"
          class="red darken-3 px-2"
          @click="closeUtilityDrawer()"
        >
          <v-icon color="grey lighten-3">fa fa-times-circle</v-icon>
        </v-btn>
      </div>

      <v-tab>
        <v-icon left>fa fa-tasks</v-icon>
        Selected
      </v-tab>
      <v-tab>
        <v-icon left>fa fa-dollar-sign</v-icon>
        Prices
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="w-100 tabsItemWrapper">
      <v-tab-item key="thing1" class="h-100">
        <vuescroll :ops="ops" class="mr-1">
          <CurrentDraftImages></CurrentDraftImages>
        </vuescroll>
      </v-tab-item>
      <v-tab-item key="thing2" class="h-100">
        <PricingContainer></PricingContainer>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  TOGGLE_UTILITY_DRAWER,
  UTILITY_DRAWER_TAB
} from "@/store/mutation-types";

import vuescroll from "vuescroll";
import { scrollbarSettings } from "@/util/scrollbarSettings";

import CurrentDraftImages from "@/components/Drafts/CurrentDraft/CurrentDraftImages";

import PricingContainer from "@/components/Pricing/PricingContainer";

export default {
  components: {
    vuescroll,
    CurrentDraftImages,
    PricingContainer
  },
  computed: {
    ...mapState({
      issues: state => state.currentDraft.issues
    }),
    tab: {
      get() {
        return this.$store.state.settings.utilityDrawerTab;
      },
      set(value) {
        this.$store.commit(`settings/${UTILITY_DRAWER_TAB}`, value);
      }
    }
  },
  data: () => ({
    ops: scrollbarSettings
  }),
  watch: {
    //to toggle back to this tab anytime an issue is added
    issues: {
      handler(newVal, oldVal) {
        if (newVal && newVal.length > 0) {
          this.$store.commit(`settings/${UTILITY_DRAWER_TAB}`, 0);
          this.$store.commit(`settings/${TOGGLE_UTILITY_DRAWER}`, true);
        }
      }
    }
  },
  methods: {
    closeUtilityDrawer() {
      this.$store.commit(`settings/${TOGGLE_UTILITY_DRAWER}`, false);
    }
  }
};
</script>

<style scoped>
.utilityTabsWrapper {
  overflow-y: hidden;
  height: 100%;
}
.tabsItemWrapper {
  height: 100%;
  max-height: calc(100% - 50px);
  overflow-y: hidden;
}
</style>
