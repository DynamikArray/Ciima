<template>
  <div>
    <LoadingModal :loading="loading" />
    <h1 class="display-2 text-center">
      <v-icon x-large class="">fa-exclamation-circle</v-icon>
      Singles Reports are not yet completed!
    </h1>
  </div>
</template>

<script>
import LoadingModal from "@/components/Loading/LoadingModal";
export default {
  props: {
    loading: [Boolean],
    items: [Boolean, Array]
  },
  components: {
    LoadingModal
  }
};
</script>

<style scoped></style>
