<template>
  <v-navigation-drawer
    v-model="drawerState"
    app
    clipped
    right
    width="50%"
    mobile-break-point="960"
  >
    <div>
      <v-tabs v-model="active_tab" color="white" grow>
        <v-tab key="current" class="text-white align-center justify-start">
          <v-icon name="list-alt" class="mr-1">fas fa-list-alt</v-icon>Draft
          Issues
        </v-tab>
        <v-tab key="open" class="align-center justify-start">
          <v-icon name="cliboard-list" class="mr-1 mb-1"
            >fas fa-clipboard-list</v-icon
          >Draft Details
        </v-tab>
        <v-tab-item key="current">
          <div class="ma-3">
            <v-card elevation="10" outlined class="grey darken-4">
              <CurrentDraft></CurrentDraft>
            </v-card>

            <CurrentDraftTip :btnAction="switchToTab"></CurrentDraftTip>
          </div>
        </v-tab-item>
        <v-tab-item key="open">
          <v-card class="ma-3">
            <v-card-text>
              OPEN TP ITEMS
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import CurrentDraft from "@/components/Drafts/CurrentDraft";
import OpenDrafts from "@/components/Drafts/OpenDrafts";
import CurrentDraftTip from "./draftDrawer/CurrentDraftTip";

export default {
  data() {
    return {
      active_tab: 0,
      drawerState: true
    };
  },
  components: {
    CurrentDraft,
    OpenDrafts,
    CurrentDraftTip
  },
  props: {
    drawer: true
  },
  watch: {
    drawer: function(val) {
      this.drawerState = val;
    }
  },
  methods: {
    switchToTab(tabIndex) {
      this.active_tab = tabIndex;
    }
  }
};
</script>

<style></style>
