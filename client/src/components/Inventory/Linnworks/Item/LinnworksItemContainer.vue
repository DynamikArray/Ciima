<template>
  <v-dialog :value="visible" fullscreen hide-overlay persistent scrollable transition="dialog-bottom-transition">
    <v-card elevation="2" class="secondary darken-1">
      <v-card-title class="pa-0" :class="unlocked ? 'warning' : 'primary'">
        <div class="d-flex align-center justify-space-between w-100">
          <div class="d-flex align-center justify-start pa-3">
            <h3 class="mr-2 textShadow">
              <v-btn small fab @click="unlocked = true" :color="!unlocked ? 'warning' : 'primary'" ripple>
                <v-icon v-text="recordUnlocked" class="mb-1 textShadow"></v-icon>
              </v-btn>
              View/Edit Inventory Item {{ unlocked ? "(Edit Mode)" : "" }}
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
          :unlocked="unlocked"
          @hasChanges="hasChanges"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_SELECTED_LINNWORKS_ITEM, UPDATE_TEMPLATE_INSTANT_SELECTED_LINNWORKS_ITEM } from "@/store/action-types";

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
        this.$store.dispatch(`linnworks/inventory/selectedItem/${GET_SELECTED_LINNWORKS_ITEM}`, {
          pkStockItemID: newVal
        });
      }
    }
  },
  data: () => ({
    unlocked: false,
    blnHasChanges: false
  }),
  computed: {
    ...mapGetters({
      selectedItem: "linnworks/inventory/selectedItem/getItem",
      selectedItemLoading: "linnworks/inventory/selectedItem/getLoading"
    }),
    recordUnlocked() {
      if (this.unlocked) return "fa fa-unlock";
      return "fa fa-lock";
    }
  },
  methods: {
    closeModal() {
      if (this.blnHasChanges) this.updateListingTemplates();
      if (this.unlocked == true) this.$emit("refresh");

      this.unlocked = false;
      this.blnHasChanges = false;
      this.$emit("closed");
    },
    hasChanges(bln) {
      this.blnHasChanges = bln;
    },
    async updateListingTemplates() {
      const { result, error } = await this.$store.dispatch(
        `linnworks/inventory/selectedItem/${UPDATE_TEMPLATE_INSTANT_SELECTED_LINNWORKS_ITEM}`,
        {
          pkStockItemId: this.selectedId
        }
      );

      this.$toastr.defaultTimeout = 1500;
      if (result && !error) {
        this.$toastr.s(`Channel Listings Being Updated`, result.toUpperCase());
      } else if (error && !result) {
        this.$toastr.e(`Unable to update channel listings`, error);
      }
    }
  }
};
</script>

<style scoped></style>
