<template>
  <div class="w-100">
    <v-data-table
      class="w-100"
      :headers="headers"
      :items="items"
      :loading="loading"
      hide-default-footer
    >
    </v-data-table>
  </div>
</template>

<script>
import headers from "./headers";

export default {
  props: {
    items: {
      type: [Array]
    },
    loading: {
      type: [Boolean]
    }
  },
  components: {},
  data() {
    return {
      headers
    };
  }
};
</script>

<style scoped></style>
