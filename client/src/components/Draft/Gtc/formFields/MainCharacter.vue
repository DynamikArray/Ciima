<template>
  <div>
    <div class="heading mb-1">Main Character:</div>
    <v-text-field
      autocomplete="off"
      dense
      :value="value"
      name="mainCharacter"
      outlined
      label="Character"
      hint="Main character required in many categories"
      counter
      @input="handleMainCharacterInput"
      :rules="rules"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    value: { String },
    rules: {
      type: [Array],
      default: () => []
    }
  },
  data: () => ({}),
  methods: {
    handleMainCharacterInput(mainCharacter) {
      this.$emit("update", { mainCharacter });
    }
  }
};
</script>
<style scoped></style>
