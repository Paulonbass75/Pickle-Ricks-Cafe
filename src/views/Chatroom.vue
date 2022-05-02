<template>
  <div>
      <div class="header">
      <img src="../assets/Logo.svg" alt="" class="header-logo">
  </div>
  <div class="container">
    <Navbar />
    <ChatWindow />
    <NewChatForm />
    <Giphy />
  </div>
  </div>
</template>

<script>
import NewChatForm from "../components/NewChatForm.vue";
import ChatWindow from "../components/ChatWindow.vue";
import { watch } from "vue";
import Navbar from "../components/Navbar.vue";
import getUser from "../composables/getUser";
import Giphy from "../components/Giphy.vue";
import { useRouter } from "vue-router";

export default {
  components: { Navbar, NewChatForm, ChatWindow, Giphy },
  setup() {
    const { user } = getUser();
    const router = useRouter();

    watch(user, () => {
      if (!user.value) {
        router.push({ name: "Welcome" });
      }
    });
  },
};
</script>

<style scoped>
@font-face {
  font-family: Schwifty;
  src: url("../assets/get_schwifty__a_rick_and_morty_font_by_jonizaak-dajw4u8.ttf")
    format("truetype");
  font-weight: bold;
}


.header {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.header-logo{
  width: 40%;
  max-width: 400px;
  min-width: 200px;
}
.p {
  font-size: 125px;
  font-family: Schwifty;
  font-weight: bold;
  color: #97ce4c;
}

@media(max-width: 450px){
  .header{
    background: #000000;
    height: 70px;
  }
}
</style>
