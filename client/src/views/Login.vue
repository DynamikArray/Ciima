<template>
  <div
    class="d-flex flex-col justify-center align-center"
    style="min-height:100%"
  >
    <div class="d-flex">
      <LoginForm></LoginForm>
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
