<template>
  <v-navigation-drawer
    v-model="drawerState"
    app
    clipped
    right
    width="50%"
    mobile-break-point="960"
  >
    <v-tabs v-model="active_tab" color="white" class="h-100">
      <v-tab key="current" class="text-white align-center justify-start">
        <v-icon name="list-alt" class="mr-1">fas fa-list-alt</v-icon>Draft
        Issues
      </v-tab>
      <v-tab key="open" class="align-center justify-start">
        <v-icon name="cliboard-list" class="mr-1 mb-1"
          >fas fa-clipboard-list</v-icon
        >Draft Details
      </v-tab>
      <v-tab-item key="current" class="h-100">
        <div class="ma-3">
          <CurrentDraft></CurrentDraft>
        </div>
      </v-tab-item>
      <v-tab-item key="open" class="h-100">
        <DraftForm></DraftForm>
      </v-tab-item>
    </v-tabs>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import CurrentDraft from "@/components/Drafts/CurrentDraft/CurrentDraft";
import DraftForm from "@/components/Drafts/CurrentDraft/DraftDetails/DraftForm";

export default {
  data() {
    return {
      active_tab: 0,
      drawerState: true
    };
  },
  components: {
    CurrentDraft,
    DraftForm
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
