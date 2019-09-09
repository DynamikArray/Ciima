<template>
  <div class="w-100">
    <div v-if="titles.length" class="w-100">
      <div class="d-flex justify-space-between">
        <div class="d-flex flex grow align-center ml-2">
          <h2>
            {{ titles.length }}<span class="subtitle-1 mx-1">Titles</span>
          </h2>
        </div>
        <div class="d-flex align-center mr-4">
          <h5>Publisher</h5>
        </div>
      </div>

      <v-divider class="my-1"></v-divider>

      <v-scroll-y-transition group>
        <div
          v-for="title in titles"
          :key="title.titleId"
          class="d-flex flex-row w-100 px-3 justify-space-between"
        >
          <div class="d-flex grow">
            <h4>{{ title.title }}</h4>
          </div>
          <div class="d-flex">
            <h4>{{ title.publisher }}</h4>
          </div>
        </div>
      </v-scroll-y-transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {} from "@/store/mutation-types.js";

export default {
  computed: {
    ...mapState({
      titles: state => state.currentDraft.titles
    })
  }
};
</script>

<style scoped></style>
