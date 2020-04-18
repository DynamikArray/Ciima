<template>
  <div id="gradeWrapper" class="d-flex justify-start align-center w-100">
    <div
      v-if="label"
      class="d-flex justify-start align-center"
      style="min-width:75px"
    >
      <span class="overline mr-2">Grade:</span>
    </div>
    <div class="d-flex justify-center align-center w-100">
      <span class="subtitle-1">
        <em v-if="!item.grade">empty</em>
        <span v-else>{{ item.grade }} </span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: [Boolean],
    item: [Object]
  }
};
</script>

<style scoped>
#gradeWrapper {
  font-size: 90%;
}
#gradeWrapper .subtitle-1 {
  line-height: 1.4em;
}
</style>
