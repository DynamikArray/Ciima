<template>
  <div class="ApsectItemsWrapper">
    <v-divider class="my-1"></v-divider>
    <div v-if="loading" class="d-flex flex-grow align-center justify-center">
      <div class="mr-2 flex-grow align-center justify-center">
        <h4 class="text-center">Loading Field List From Ebay</h4>
        <div class="progressWrapper">
          <v-progress-linear indeterminate color="blue darken-1" height="14" class="my-2" rounded />
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="fields.length > 0" class="">
        <div class="heading my-3">{{ componentTitle }}</div>
        <div class="d-flex flex-wrap justify-start align-center">
          <div v-for="field in fields" :key="field.localizedAspectName" class="d-flex align-start justify-baseline">
            <AspectItem :item="field" @aspectItemSelected="aspectItemSelected" />
          </div>
        </div>
      </div>
      <div v-else class="d-flex flex-wrap justify-start align-center">
        <div class="heading mb-1">{{ componentTitle }} <span class="componentTitle"> - None Required</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { CURRENT_GTC_DRAFT_CATEGORY_FIELDS_SET_FORM_VALUE } from "@/store/mutation-types";
import AspectItem from "./AspectItem";

export default {
  name: "AspectItems",
  components: {
    AspectItem
  },
  props: {
    fields: {
      type: [Array]
    },
    loading: {
      type: [Boolean],
      default: false
    }
  },
  data: () => ({
    componentTitle: "Other Required Fields For Selected Category"
  }),
  methods: {
    aspectItemSelected(aspectField) {
      this.$store.commit(`gtcs/draft/${CURRENT_GTC_DRAFT_CATEGORY_FIELDS_SET_FORM_VALUE}`, aspectField);
    }
  }
};
</script>

<style>
.ApsectItemsWrapper .v-input.v-select {
  min-width: 27vw;
  max-width: 48vw;
}

.ApsectItemsWrapper .v-input.v-select .v-select__selections {
  min-height: 60px;
}

.ApsectItemsWrapper .progressWrapper {
  width: 75rem;
}

.ApsectItemsWrapper .componentTitle {
  font-size: 145%;
  font-weight: bold;
}
</style>
