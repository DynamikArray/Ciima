<template>
  <div class="d-flex flex-row justify-start align-center">
    <div class="d-flex flex-column flex-wrap ">
      <div class="d-flex">
        <h3 class="title">{{ item.title }}</h3>
      </div>
      <div class="d-flex">
        <v-btn
          small
          color="green"
          class="mr-2 pa-0"
          @click="priceCheckIssue(item.title, item.fullIssue)"
          style="min-width: 34px"
        >
          <v-icon small>fa-dollar-sign</v-icon>
        </v-btn>

        <v-chip
          small
          label
          color="blue darken-1"
          text-color="white"
          class="mr-3"
        >
          <v-icon small class="mr-2">fa-calendar-alt</v-icon>
          <div>
            {{ item.coverDate | date }}
          </div>
        </v-chip>
        <v-chip
          small
          label
          color="grey darken-1"
          text-color="white"
          class="mr-3"
        >
          <v-icon small class="mr-2">fa-user-edit</v-icon>
          <div>
            {{ item.coverArtist }}
          </div>
        </v-chip>
      </div>
    </div>
    <div class="d-flex mr-10 ml-auto">
      <div
        class="d-flex flex-wrap justify-start align-center caption"
        style="line-height:1.3em;"
      >
        <div
          v-for="price in item.issuePrices"
          class="d-flex flex-column aling-center justify-center mx-2"
        >
          <div class="d-flex align-center justify-center body-1">
            {{ price.grade }}
          </div>
          <div class="d-flex align-center justify-center body-1">
            {{ price.price | currency }}
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex mr-2 ">
      <h3 class="display-2" style="font-size: 2.25em !important">
        {{ item.fullIssue }}
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: [Boolean, Object],
    priceCheckIssue: [Function]
  }
};
</script>

<style scoped></style>
