<template>
  <div
    class="d-flex align-center justify-center textShadow"
    :class="getClasses"
  >
    <div class="d-flex align-center justify-start mx-3">
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

    <div class="d-flex align-center justify-start mx-3">
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
    borderBottom: {
      type: [Boolean],
      default: true
    },
    hideVariants: [Boolean],
    hideComicTypes: [Boolean]
  },
  computed: {
    getClasses() {
      const classNames = [];
      if (this.asColumn) {
        classNames.push("flex-column");
      }
      if (this.borderBottom) {
        classNames.push("borderBottom");
      }
      return classNames.join("");
    }
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

<style scoped></style>
