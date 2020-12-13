<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-card elevation="2" class="secondary darken-1">
      <v-card-title class="primary pa-0">
        <div class="d-flex align-start justify-space-between w-100">
          <div class="d-flex align-center justify-start pa-3">
            <h3 class="mr-2 textShadow">
              <v-btn small fab @click="" color="warning" ripple>
                <v-icon v-text="recordLocked" class="mb-1 textShadow"></v-icon>
              </v-btn>
              View/Edit Inventory Item
            </h3>
          </div>
          <div class="d-flex align-start justify-end">
            <v-btn icon @click="dialog = false" ripple class="mr-1 mt-1">
              <v-icon>fa fa-times</v-icon>
            </v-btn>
          </div>
        </div>
      </v-card-title>

      <ItemTabsContainer />
    </v-card>
  </v-dialog>
</template>

<script>
import ItemTabsContainer from "./ItemTabs/ItemTabsContainer";

export default {
  props: {
    selectedId: {
      type: [Boolean, String]
    }
  },
  components: { ItemTabsContainer },
  watch: {
    selectedId(newVal) {
      this.dialog = true;
    }
  },
  data: () => ({
    dialog: false,
    locked: true
  }),
  computed: {
    recordLocked() {
      if (this.locked) return "fa fa-lock";
      return "fa fa-unlock";
    }
  }
};
</script>

<style scoped></style>
