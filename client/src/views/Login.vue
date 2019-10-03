<template>
  <div
    class="d-flex flex-col justify-center align-center"
    style="min-height:100%"
  >
    <div class="d-flex" style="min-width:500px">
      <div class="about text-center w-100">
        <h1 class="display-4">CiiMA</h1>
        <h4 class="">Comic Issues Inventory & Media Application</h4>
        <v-divider class="my-4"></v-divider>
        <LoginForm></LoginForm>
        <v-divider class="my-4"></v-divider>
        <h4>Brian Ridsdale © 2019</h4>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm/LoginForm";

export default {
  components: {
    LoginForm
  }
};
</script>

<style scoped></style>
