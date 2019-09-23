<template>
  <v-navigation-drawer
    v-model="drawerState"
    app
    clipped
    right
    width="50%"
    mobile-break-point="960"
    class="draftsDrawer"
  >
    <v-tabs v-model="active_tab" color="white" class="h-100">
      <v-tab key="draftIssues" class="text-white align-center justify-start">
        <v-icon name="list-alt" class="mr-1">fas fa-list-alt</v-icon>Draft
        Issues
      </v-tab>

      <v-tab key="draftDetails" class="align-center justify-start">
        <v-icon name="cliboard-list" class="mr-1 mb-1"
          >fas fa-clipboard-list</v-icon
        >Draft Details
      </v-tab>

      <v-tab key="openDrafts" class="align-center justify-start">
        <v-icon name="open-drafts" class="mr-1 mb-1">fas fa-list-alt</v-icon
        >Open Drafts
      </v-tab>

      <v-tab-item key="draftIssues" class="h-100 ">
        <CurrentDraftImages></CurrentDraftImages>
      </v-tab-item>

      <v-tab-item key="draftDetails" class="h-100">
        <DraftForm :switchToTab="switchToTab" class="mb-10"></DraftForm>
      </v-tab-item>

      <v-tab-item key="openDrafts" class="h-100">
        <OpenDrafts class="mb-10"></OpenDrafts>
      </v-tab-item>
    </v-tabs>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import CurrentDraftImages from "@/components/Drafts/CurrentDraft/CurrentDraftImages";
import DraftForm from "@/components/Drafts/CurrentDraft/DraftDetails/DraftForm";
import OpenDrafts from "@/components/Drafts/OpenDrafts.vue";

import vuescroll from "vuescroll";

export default {
  props: {
    drawer: true
  },
  data() {
    return {
      active_tab: 0,
      drawerState: true,
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {},
        bar: {}
      }
    };
  },
  components: {
    CurrentDraftImages,
    DraftForm,
    vuescroll,
    OpenDrafts
  },
  computed: {
    ...mapState({
      issues: state => state.currentDraft.issues
    })
  },

  watch: {
    drawer: function(val) {
      this.drawerState = val;
    },
    //to toggle back to this tab anytime an issue is added
    issues: {
      handler(newVal, oldVal) {
        if (newVal && newVal.length > 0) {
          //// TODO: this is
          this.active_tab = 0;
        }
      }
    }
  },
  methods: {
    switchToTab(tabIndex) {
      this.active_tab = tabIndex;
    }
  }
};
</script>

<style>
/*
.draftsDrawer .v-window.v-item-group {
  height: calc(100% - 10px);
}
.draftsDrawer .v-navigation-drawer__content {
  overflow-y: hidden;
}
*/
</style>
