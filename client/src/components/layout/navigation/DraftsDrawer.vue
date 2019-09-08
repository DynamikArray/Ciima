<template>
  <v-navigation-drawer
    v-model="drawerState"
    app
    clipped
    right
    width="40%"
    mobile-break-point="960"
  >
    <div>
      <v-tabs fixed-tabs>
        <v-tab key="current">
          <v-icon small name="cog" class="mr-1 mb-1">fas fa-list-alt</v-icon
          >Current Draft:
        </v-tab>
        <v-tab key="open">
          <v-icon small name="cog" class="mr-1 mb-1"
            >fas fa-clipboard-list</v-icon
          >Open Drafts:
        </v-tab>
        <v-tab-item key="current">
          <CurrentDraft></CurrentDraft>
        </v-tab-item>
        <v-tab-item key="open">
          <v-card>
            <v-card-text>
              OPEN ITEMS
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

export default {
  data() {
    return {
      drawerState: true
    };
  },
  components: {
    CurrentDraft,
    OpenDrafts
  },
  props: {
    drawer: true
  },

  watch: {
    drawer: function(val) {
      this.drawerState = val;
    }
  }
};
</script>

<style></style>
