<template>
  <div
    class="d-flex flex-column justify-start align-start flex-grow info darken-1 px-2 py-1 textShadow"
  >
    <div class="d-flex align-center justify-start">
      <h5 class="text-center">Our Selected Title:</h5>
    </div>

    <div class="w-100">
      <v-slide-y-reverse-transition mode="out-in">
        <div
          v-if="selectedTitle"
          :key="selectedTitle.title"
          class="d-flex flex-row grey darken-4 rounded px-3 py-1 d-flex align-center "
        >
          <h3 class="d-flex flex-grow-1 textShadow">
            {{ selectedTitle ? selectedTitle.title : "Please choose a title" }}
          </h3>
          <v-btn small icon class="ml-3" @click="clearSelectedTitle()">
            <v-icon>fa fa-times-circle</v-icon>
          </v-btn>
        </div>

        <div key="noSelectedTitle" v-else>
          <h3 class="d-flex flex-grow-1 px-4 py-1 rounded textShadow">
            No Title Selected
          </h3>
        </div>
      </v-slide-y-reverse-transition>
    </div>

    <v-slide-y-reverse-transition mode="out-in">
      <div
        class="d-flex align-center justify-space-between w-100"
        :key="selectedTitle.titleId"
      >
        <h5 class="text-center mr-2">
          {{
            selectedTitle.issueCount ? `${selectedTitle.issueCount} Issues` : ``
          }}
        </h5>
        <h5 class="text-center mr-2">{{ selectedTitle.publisher }}</h5>
        <h5 class="text-center mr-2">
          {{
            selectedTitle.yearsPublished
              ? `(${selectedTitle.yearsPublished})`
              : ``
          }}
        </h5>
      </div>
    </v-slide-y-reverse-transition>
  </div>
</template>

<script>
import { CLEAR_OUR_SELECTED_TITLE } from "@/store/action-types";

export default {
  props: {
    selectedTitle: [Boolean, Object]
  },
  methods: {
    clearSelectedTitle() {
      this.$store.dispatch(`pricematch/${CLEAR_OUR_SELECTED_TITLE}`, {});
    }
  }
};
</script>

<style scoped></style>
