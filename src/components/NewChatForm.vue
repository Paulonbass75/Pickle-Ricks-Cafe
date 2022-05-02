<template>
  <div class="chat-form">
  <form
    @submit.prevent="submitText"
    @keypress.enter.prevent="submitText"
    action=""
  >
          <a @click="openGif" class="gif-button">GIFs</a>
    <div class="input-container">
    <textarea placeholder="Enter message" v-model="message"> </textarea>
    <button class="send" type="submit">Send</button>
    </div>
    <div v-if="error" class="error">{{ error }} Uhh...</div>
  </form>
  </div>
</template>

<script>
import { ref } from "vue";
import getUser from "../composables/getUser";
import useChats from "../composables/useChats";
import { timestamp } from "../firebase/config";

export default {
  setup() {
    const { user } = getUser();
    const { addDoc, error } = useChats("messages");

    const message = ref("");

    const submitText = async () => {
      const chat = {
        name: user.value.displayName,
        message: message.value,
        isImg: false,
        createdAt: timestamp(),
      };
      console.log(chat);
      await addDoc(chat);
        if(message === ''){
          return;
        }
      if (!error.value) {
        message.value = "";
      }
    };
    return {
      message,
      submitText,
      error,
    };
  },
  methods: {
    openGif(){
      let gifForm = document.querySelector(".gif-form")
      let chatForm = document.querySelector(".chat-form")

      gifForm.style.display = "block"
      chatForm.style.display = "none"
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  margin: 10px;
  padding: 10px;
}
  .input-container{
    width: 100%;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
textarea {
  background: #fafafa;
  max-height: 100%;
  height: 30px;
  min-height: 30px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  border-left: 1px solid #ccc;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
    border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  font-family: inherit;
}
.send {
  font-size: 1rem;
  right: 0;
  max-height: 30px;
  text-decoration: none;
  background: #69c8ecff;
  color: #fff;
  font-weight: bold;
  border-right: 1px solid #ccc;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-radius: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.gif-button {
  font-size: 1rem;
  right: 0;
  text-decoration: none;
  background: #69c8ecff;
  color: #fff;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  padding: 10px 20px;
}

@media(max-width: 450px){
  .chat-form{
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #3c3c3c;
    overflow-x: hidden;
    height: 100px;
  }
form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  margin: 10px;
  padding: 10px;
}
.gif-button {
  left: 0;
  padding: 5px 20px;
}
}

</style>
