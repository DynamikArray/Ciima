<template>
  <v-navigation-drawer
    v-model="drawer"
    app
    clipped
    right
    width="500px"
    mobile-break-point="960"
    class="draftsDrawer"
  >
    <vuescroll :ops="ops">
      <CurrentDraftImages></CurrentDraftImages>
    </vuescroll>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from "vuex";
import { TOGGLE_DRAFT_DRAWER } from "@/store/mutation-types";

import CurrentDraftImages from "@/components/Drafts/CurrentDraft/CurrentDraftImages";
//import DraftForm from "@/components/Drafts/CurrentDraft/DraftDetails/DraftForm";

import vuescroll from "vuescroll";

export default {
  data() {
    return {
      ops: {
        scrollPanel: { scrollingX: false, scrollingY: true },
        bar: { background: "#2196f3" }

        //rail: { size: "8px", border: "1px solid #eee", opacity: ".8" },
        // bar: {          keepShow: false,          size: "6px",          background: "#2196f3",          opacity: ".6"        }
      }
    };
  },
  components: {
    CurrentDraftImages,
    //  DraftForm,
    vuescroll
  },
  computed: {
    ...mapState({
      settings: state => state.settings,
      issues: state => state.currentDraft.issues
    }),
    drawer: {
      set(blnOpen) {
        this.$store.commit(`settings/${TOGGLE_DRAFT_DRAWER}`, blnOpen);
      },
      get() {
        return this.$store.state.settings.draftDrawer;
      }
    }
  },

  watch: {
    //to toggle back to this tab anytime an issue is added
    issues: {
      handler(newVal, oldVal) {
        if (newVal && newVal.length > 0) {
          this.$store.commit(`settings/${TOGGLE_DRAFT_DRAWER}`, true);
        }
      }
    }
  },
  methods: {
    switchToTab() {
      console.log("DEPRECATE THIS CALL-switchToTab");
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
