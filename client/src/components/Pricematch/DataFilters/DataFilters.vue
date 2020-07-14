<template>
  <div
    class="d-flex align-center justify-start grey darken-4 textShadow"
    :class="asColumn ? 'flex-column' : ''"
  >
    <div class="mr-1 borderLeft px-2">
      <h4>FILTER:</h4>
    </div>
    <div class="d-flex align-center justify-start mx-5">
      <h5 class="mr-1">
        Variants:
      </h5>
      <v-switch
        color="info"
        dense
        hide-details
        :value="hideVariants"
        @change="filterVariants(!hideVariants)"
        class="mt-0 mb-1"
      ></v-switch>
      <h5 class="caption mr-1">
        {{ hideVariants ? `Hidden` : `Visible` }}
      </h5>
    </div>

    <div class="d-flex align-center justify-start mx-5">
      <h5 class="mr-1">
        ComicTypes:
      </h5>
      <v-switch
        color="info"
        dense
        hide-details
        :value="hideComicTypes"
        @change="filterComicTypes(!hideComicTypes)"
        class="mt-0 mb-1"
      ></v-switch>
      <h5 class="caption mr-1">
        {{ hideComicTypes ? `Hidden` : `Visible` }}
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    asColumn: {
      type: [Boolean],
      default: false
    },
    hideVariants: [Boolean],
    hideComicTypes: [Boolean]
  },
  methods: {
    filterVariants(val) {
      this.$emit("update:hideVariants", val);
    },
    filterComicTypes(val) {
      this.$emit("update:hideComicTypes", val);
    }
  }
};
</script>

<style scoped>
.borderRight {
  border-right: 2px solid #616161;
}
</style>
