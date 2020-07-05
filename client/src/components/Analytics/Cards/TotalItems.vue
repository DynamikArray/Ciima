<template>
  <v-card>
    <v-card-title class="pa-2 pb-0">
      <div
        class="d-flex flex-wrap justify-sm-center justify-md-end align-baseline w-100"
      >
        <h4 class="my-0 mx-1">Total Items</h4>
        <h6 class="my-0 caption mx-1">{{ userName }} : Last {{ days }} Days</h6>
        <h2 class="order-sm-first order-md-last my-0 ml-md-auto mr-2">
          {{ totalItems }}
        </h2>
      </div>
    </v-card-title>
    <v-divider class="my-1"></v-divider>
    <v-card-text class="pa-0 pb-1">
      <ul id="userList" class="px-3">
        <li
          v-for="(user, index) in formattedUserData"
          class="d-flex w-100 justify-space-between align-center grey px-1"
          :class="index % 2 ? 'darken-3' : 'darken-2'"
        >
          <div class="">
            {{ user.name }}
          </div>
          <div class="">
            {{ user.total }}
          </div>
        </li>
      </ul>
    </v-card-text>
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
    totalItems() {
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
