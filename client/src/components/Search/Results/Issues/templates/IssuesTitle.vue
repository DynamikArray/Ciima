<template>
  <div class="d-flex flew-row justify-start align-center">
    <div class="d-flex flex-row flex-wrap justify-start align-center w-100">
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
      <div class="d-flex flex-column mr-10 ml-auto" style="border-radius: 6px;">
        <div
          v-if="item.issuePrices"
          class="d-flex flex-column grey darken-4 pa-2"
        >
          <div
            class="d-flex flex-wrap justify-start align-center caption"
            style="line-height:1.3em;"
          >
            <div
              v-for="price in item.issuePrices"
              class="d-flex flex-column aling-center justify-center px-3 my-1"
            >
              <div class="d-flex align-center justify-center body-2">
                {{ price.grade }}
              </div>
              <div class="d-flex align-center justify-center body-2">
                {{ price.price | currency }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex ml-auto ">
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
