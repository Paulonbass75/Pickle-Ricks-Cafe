<template>
  <nav v-if="user">
    <div>
      <p>Welcome {{ user.displayName }}</p>
      <p class="email">currently logged in as {{ user.displayName }}</p>
    </div>
    <button @click="handleClick">Logout</button>
  </nav>
</template>

<script>
import useLogout from "../composables/useLogout";
import getUser from "../composables/getUser";

export default {
  setup() {
    const { logout, error } = useLogout();
    const { user } = getUser();

    const handleClick = async () => {
      await logout();
      if (!error.value) {
        console.log("logged out");
      }
    };
    return {
      handleClick,
      error,
      user,
    };
  },
};
</script>

<style>
nav {
  padding: 40px;
  /* border-bottom: 1px solid #eee; */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav p {
  margin: 4px auto;
  font-size: 18px;
  color: #ffffff;
}
nav p.email {
  font-size: 18px;
  color: #999;
}
@media(max-width: 450px){
  nav{
    padding: 20px;
    border-bottom: 1px solid rgb(220, 220, 220);
  }

  nav p {
  color: #000;
}
}
</style>
