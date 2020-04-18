<template>
  <div class="d-flex justify-center align-center">
    <div class="d-flex justify-center flex-column">
      <div class="d-flex justify-center align-center">
        <avatar
          v-if="item.ownerName"
          :username="item.ownerName"
          :size="size"
        ></avatar>
        <div class="text-center w-100" v-if="!item.ownerName">
          No User
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "vue-avatar";

export default {
  props: {
    size: {
      type: [String, Number],
      default: 40
    },
    item: [Object]
  },
  components: {
    avatar
  }
};
</script>

<style scoped></style>
