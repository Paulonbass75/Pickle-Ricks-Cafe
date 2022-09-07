<template>
  <form @submit.prevent="handleSubmit">
    <input type="email" required placeholder="Email" v-model="email" autocomplete="true" />
    <input type="password" required placeholder="Password" v-model="password" autocomplete="true" />
    <div class="error">{{ error }}</div>
    <button>Log in</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useLogin from "../composables/useLogin";

export default {
  setup(props, context) {
    //refs used to store data in the component

    const email = ref("");
    const password = ref("");

    const { error, login } = useLogin();

    //methods used to update the data

    const handleSubmit = async () => {
      await login(email.value, password.value);
      if (!error.value) {
        context.emit("login");
      }
    };
    return {
      email,
      password,
      handleSubmit,
      error,
    };
  },
};
</script>

<style></style>
