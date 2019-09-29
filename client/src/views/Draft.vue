<template>
  <v-container>
    <h1 class="display-1">Draft Details</h1>

    <v-divider></v-divider>

    <DraftForm></DraftForm>
  </v-container>
</template>

<script>
import DraftForm from "@/components/Draft/DraftForm";

export default {
  components: {
    DraftForm
  }
};
</script>

<style scoped></style>
