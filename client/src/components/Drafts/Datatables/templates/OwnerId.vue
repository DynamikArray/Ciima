<template>
  <div class="d-flex justify-center align-center">
    <div class="d-flex justify-center flex-column">
      <div class="d-flex justify-center align-center">
        <v-tooltip top color="white">
          <template v-slot:activator="{ on }">
            <div v-on="on">
              <avatar
                v-if="item"
                :username="item.ownerName"
                :size="35"
              ></avatar>
            </div>
          </template>
          <span class="black--text">{{ item.ownerName }}</span>
        </v-tooltip>
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
