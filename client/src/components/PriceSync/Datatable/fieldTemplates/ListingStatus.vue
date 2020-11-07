<template>
  <div :class="statusColor">
    <div class="body-1 pa-2 textShadow">
      <b>{{ status }}</b>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: [String],
      default: ""
    }
  },
  computed: {
    statusColor() {
      switch (this.status) {
        case "OK":
          return "success";
          break;
        case "UPDATING":
          return "warning";
          break;
        default:
          return "danger";
          break;
      }
    }
  }
};
</script>

<style scoped></style>
