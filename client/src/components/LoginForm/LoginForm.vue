<template>
  <v-card raised hover>
    <v-card-title class="mb-1"
      ><h4 class="mb-0">
        <v-icon class="mr-1 mb-1">fa-sign-in-alt</v-icon>Please login to
        continue
      </h4></v-card-title
    >
    <v-divider class="my-1"></v-divider>
    <v-card-text>
      <v-form @submit="signInUser">
        <v-text-field
          autocomplete="current-username"
          label="Username"
          name="username"
          v-model="username"
          outlined
          hint="Username"
          placeholder="Username"
          prepend-inner-icon="fa-user"
        >
        </v-text-field>
        <v-text-field
          autocomplete="current-password"
          type="password"
          label="Password"
          name="password"
          v-model="password"
          outlined
          hint="Password"
          prepend-inner-icon="fa-key"
          v-on:keyup.enter="handleEnterKeyPress"
        >
        </v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <div class="d-flex justify-space-between w-100">
        <div class="d-flex align-center">
          <v-btn color="red" @click="cancelSignIn"
            ><v-icon class="mr-1">fa-times-circle</v-icon>Cancel</v-btn
          >
        </div>
        <div class="d-flex align-center">
          <v-btn color="primary" type="submit" @click="signInUser"
            ><v-icon class="mr-1">fa-sign-in-alt</v-icon>Sign In</v-btn
          >
        </div>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    handleEnterKeyPress() {
      //if we validate the form then
      this.signInUser();
    },

    signInUser() {
      const { username, password } = this;
      this.$store
        .dispatch("user/login", { username, password })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    },

    cancelSignIn() {
      console.log("Cancel Sign In push user back to home");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped></style>
