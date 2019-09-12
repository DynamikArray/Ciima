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
          <CurrentDraftImages></CurrentDraftImages>
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
import CurrentDraftImages from "@/components/Drafts/CurrentDraft/CurrentDraftImages";
import DraftForm from "@/components/Drafts/CurrentDraft/DraftDetails/DraftForm";

export default {
  props: {
    drawer: true
  },
  data() {
    return {
      active_tab: 0,
      drawerState: true
    };
  },
  components: {
    CurrentDraftImages,
    DraftForm
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

<style></style>
