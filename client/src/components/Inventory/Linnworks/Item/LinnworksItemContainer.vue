<template>
  <v-dialog
    :value="visible"
    fullscreen
    hide-overlay
    scrollable
    transition="dialog-bottom-transition"
  >
    <v-card elevation="2" class="secondary darken-1">
      <v-card-title class="pa-0" :class="locked ? 'primary' : 'warning'">
        <div class="d-flex align-center justify-space-between w-100">
          <div class="d-flex align-center justify-start pa-3">
            <h3 class="mr-2 textShadow">
              <v-btn
                small
                fab
                @click="locked = !locked"
                :color="locked ? 'warning' : 'success'"
                ripple
              >
                <v-icon v-text="recordLocked" class="mb-1 textShadow"></v-icon>
              </v-btn>
              View/Edit Inventory Item {{ locked ? "" : "(Edit Mode)" }}
            </h3>
          </div>
          <div class="d-flex align-center justify-end">
            <v-btn color="error" @click="closeModal()" ripple class="mr-3">
              <v-icon class="mr-2">fa fa-times-circle</v-icon>Close
            </v-btn>
          </div>
        </div>
      </v-card-title>
      <v-card-text class="ma-0 pa-0">
        <ItemTabsContainer
          :item="selectedItem"
          :loading="selectedItemLoading"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_SELECTED_LINNWORKS_ITEM } from "@/store/action-types";

import ItemTabsContainer from "./ItemTabs/ItemTabsContainer";

export default {
  props: {
    visible: {
      type: [Boolean]
    },
    selectedId: {
      type: [Boolean, String]
    }
  },
  components: { ItemTabsContainer },
  watch: {
    selectedId(newVal) {
      if (newVal) {
        this.$store.dispatch(
          `linnworks/inventory/selectedItem/${GET_SELECTED_LINNWORKS_ITEM}`,
          { pkStockItemID: newVal }
        );
      }
    }
  },
  data: () => ({
    locked: true
  }),
  computed: {
    ...mapGetters({
      selectedItem: "linnworks/inventory/selectedItem/getItem",
      selectedItemLoading: "linnworks/inventory/selectedItem/getLoading"
    }),
    recordLocked() {
      if (this.locked) return "fa fa-lock";
      return "fa fa-unlock";
    }
  },
  methods: {
    closeModal() {
      this.$emit("closed");
    }
  }
};
</script>

<style scoped></style>
