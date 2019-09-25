<template>
  <section>
    <div class="d-flex justify-space-between">
      <div class="d-flex align-center">
        <h1 class="display-1 mb-0">
          <v-icon class="mr-2">{{ icon }}</v-icon
          >{{ title }}
        </h1>
      </div>
      <div class="d-flex align-center">
        <DraftStatusDropdown :onSelect="onSelect"></DraftStatusDropdown>
      </div>
    </div>
    <v-divider class="mb-2"></v-divider>
  </section>
</template>

<script>
import DraftStatusDropdown from "./DraftStatusDropdown.vue";
export default {
  props: {
    title: [String],
    icon: [String],
    onSelect: [Function]
  },
  components: {
    DraftStatusDropdown
  }
};
</script>

<style scoped></style>
