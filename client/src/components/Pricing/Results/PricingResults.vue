<template>
  <V-scroll-y-transition group>
    <v-card
      v-for="(item, index) in items"
      class="ma-4 grey darken-2"
      :key="`${item.site}-${Date.now()}-${index}`"
    >
      <v-card-text class="pa-1">
        <v-list class="pa-0">
          <v-list-item class="px-0">
            <v-list-item-icon
              style="max-height: 80px; min-width:80px"
              class="ma-1 pa-0 mr-3"
            >
              <v-img
                border
                contain
                height="80"
                width="80"
                :src="item.thumbnail"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="blue darken-1"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-list-item-icon>
            <v-list-item-content class="py-1">
              <div class="caption">
                {{ endDateText }} {{ item.meta.listingDate.value | date }}
              </div>

              <h3 class="my-2">{{ item.title }}</h3>

              <div>
                <v-icon
                  left
                  x-small
                  v-if="item.meta.sellersInfo.topRated"
                  class="mx-1"
                  >fa fa-medal</v-icon
                >
                {{ item.meta.sellersInfo.name }}
              </div>
            </v-list-item-content>
            <v-list-item-action>
              <div
                class="d-flex flex-column endFlex justify-center align-end mr-2"
              >
                <div class="d-flex align-center">
                  <h3 class="headline">
                    {{ item.price | currency }}
                  </h3>
                </div>
                <div class="d-flex align-center">
                  <h4 class="subtitle-2">
                    ??
                    <span class="caption">Shipping</span>
                  </h4>
                </div>
              </div>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </V-scroll-y-transition>
</template>

<script>
export default {
  props: ["items", "loading", "endDateText", "listingsType"],
  methods: {}
};
</script>

<style scoped></style>
