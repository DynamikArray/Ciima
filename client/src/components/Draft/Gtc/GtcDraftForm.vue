<template>
  <v-container fluid style="min-height:100%; height: 100%">
    <v-row>
      <v-col>
        <div class="d-flex justify-start align-center">
          <div class="d-flex align-baseline">
            <h2 class="display-1 mr-1">
              Good To Close Auctions
            </h2>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <span class="heading">Category:</span>
        {{ ebaySiteCategory.name }} {{ ebaySiteCategory.id }}
        <eBayCategoryPicker @categorySelected="updateLocalParams" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import eBayCategoryPicker from "./formFields/eBayCategoryPicker";

export default {
  components: {
    eBayCategoryPicker
  },
  data: () => ({
    ebaySiteCategory: false
  }),
  methods: {
    updateLocalParams(params) {
      Object.keys(params).forEach(key => {
        this[key] = params[key];
      });
    }
  }
};
</script>

<style scoped></style>
