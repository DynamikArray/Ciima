<template>
  <v-card class="grey darken-4 pa-2">
    <v-card-title class="pa-2 pb-0">
      <div
        class="d-flex flex-wrap-reverse justify-sm-center justify-md-end align-baseline w-100"
      >
        <h5 class="my-0 mx-1">Total Prices</h5>
        <h3 class="order-sm-first order-md-last my-0 ml-md-auto mx-1">
          {{ Number(totalPrices) | currency }}
        </h3>
      </div>
    </v-card-title>
    <v-divider class="my-1"></v-divider>
    <v-card-text class="pa-0 pb-1 pt-1">
      <ul id="userList" class="px-3">
        <li
          v-for="(user, index) in formattedUserData"
          class="d-flex w-100 justify-space-between align-center grey px-1"
          :class="index % 2 ? 'darken-4' : 'darken-3'"
        >
          <div class="">
            {{ user.name }}
          </div>
          <div class="">
            {{ Number(user.total) | currency }}
          </div>
        </li>
      </ul>
    </v-card-text>
    <v-divider class="my-1"></v-divider>
    <v-card-actions class="d-flex justify-end pa-0 mx-1">
      <h6 class="my-0 caption mt-1">{{ userName }} : Last {{ days }} Days</h6>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    days: [Number],
    userName: [String],
    analyticsData: [Boolean, Array],
    loading: [Boolean]
  },
  computed: {
    totalPrices() {
      return this.analyticsData.reduce((t, i) => {
        t = t + Object.values(i).shift().total;
        return t;
      }, 0);
    },
    formattedUserData() {
      return this.analyticsData
        .map(user => {
          let u = Object.keys(user).shift();
          return { name: u, total: user[u].total };
        })
        .sort((a, b) => b.total - a.total);
    }
  }
};
</script>

<style scoped>
#userList {
  padding: 0px;
}
#userList li {
  list-style-type: none;
}
</style>
