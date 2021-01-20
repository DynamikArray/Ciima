<template>
  <v-slide-x-reverse-transition mode="out-in">
    <div
      class="d-flex align-center justify-space-between"
      :key="`${fieldName}_${unlocked}_${itemId}`"
    >
      <slot v-if="!unlocked">
        <div class="d-flex align-baseline justify-start">
          <h4 class="my-0 mr-2">
            {{ fieldLabel }}
          </h4>
          <h3 class="white--text textShadow my-0">
            {{ itemValue }}
          </h3>
        </div>
      </slot>

      <slot name="editField" v-if="unlocked">
        <div
          class="d-flex align-center justify-end w-100"
          id="editFieldWrapper"
        >
          <h4 class="my-0 mr-2">
            {{ fieldLabel }}
          </h4>
          <v-textarea
            dense
            hide-details
            :value="itemValue"
            :id="fieldId"
            :name="fieldName"
            :label="fieldLabel"
            :hint="fieldHint"
            filled
            :full-width="true"
            disabled
            background-color="grey darken-3"
          >
            <template v-slot:append-outer>
              <v-btn color="primary">edit N/A</v-btn>
            </template>
          </v-textarea>
        </div>
      </slot>
    </div>
  </v-slide-x-reverse-transition>
</template>

<script>
export default {
  props: {
    unlocked: { type: [Boolean], default: false },
    itemValue: { type: [String] },
    itemId: { type: [String] },
    fieldName: { type: [String] },
    fieldId: { type: [String] },
    fieldLabel: { type: [String] },
    fieldHint: { type: [String] }
  }
};
</script>

<style>
#editFieldWrapper .v-input__append-outer {
  margin: 2px 0px 0px 10px !important;
}
</style>
