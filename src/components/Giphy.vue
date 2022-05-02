<template>
  <div class="gif-form">
    <span class="x" @click="closeGif">
      <span>&times;</span>
    </span>
    <form @submit.prevent="">
      <input class="gif-search" type="text" placeholder="Search Tenor" @keypress="searchGif" />
    </form>
    <div class="gif-container">
      <div class="gif-wrapper">
        <a class="gif-card" v-for="gif in result" :key="gif" @click="submitGif">
          <img :src="gif.media[0].tinygif.url" alt="" />
        </a>
      </div>
    </div>
      <h3 class="gif-attribution">
        Powered by <a href="https://giphy.com/">Tenor</a>
      </h3>
  </div>
</template>

<script>
import axios from "axios";
import getUser from "../composables/getUser";
import useGif from "../composables/useChats";
import { timestamp } from "../firebase/config";

export default {
  methods: {
    async searchGif(e) {
      let query = e.target.value;
      let url = `https://g.tenor.com/v1/search?q= ${query}&key=SXYDVAHBNR9C&limit=50`;
      await axios.get(url).then((Response) => {
        this.result = Response.data.results;
      });
    },
    closeGif() {
      let gifForm = document.querySelector(".gif-form");
      let chatForm = document.querySelector(".chat-form");
      let searchBar = document.querySelector(".gif-search");
      gifForm.style.display = "none";
      chatForm.style.display = "block";
      searchBar.value = ""
    },
  },
  mounted() {
    let url = `https://g.tenor.com/v1/trending?key=SXYDVAHBNR9C&limit=50`;
    axios.get(url).then((Response) => {
      this.result = Response.data.results;
    });
  },
  data() {
    return {
      result: null,
    };
  },
  setup() {
    const { user } = getUser();
    const { addDoc, error } = useGif("messages");

    const submitGif = async (e) => {
      const chat = {
        name: user.value.displayName,
        gif: e.target.src,
        isImg: true,
        createdAt: timestamp(),
      };
      console.log(chat);
      await addDoc(chat);
      if (!error.value) {
        console.log(error);
      }
    };
    return {
      submitGif,
      error,
    };
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  margin: 10px;
}
input {
  background: #fafafa;
  max-height: 100%;
  width: 100%;
  max-width: 100%;
  /* margin: 6px; */
  padding: 10px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 10px;
  font-family: inherit;
  outline: 1px solid #ccc;
}

.gif-form {
  display: none;
  position: relative;
  max-width: 960px;
}
.gif-container {
  position: absolute;
  background-color: #FAFAFA;
  bottom: 130px;
  max-width: 960px;
  left: 0;
}

.gif-wrapper {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  overflow-y: scroll;
}

.gif-card {
  cursor: pointer;
  border-radius: 5px;
  margin: 5px;
}
.gif-card img {
  object-fit: contain;
  min-width: 100px;
  max-width: 200px;
  border-radius: 10px;
}

.x {
  cursor: pointer;
  font-size: 2rem;
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.x span {
  margin: 10px 10px 0 0;
}

.gif-attribution {
  text-align: center;
  width: 100%;
  margin: 0;
}

@media(max-width: 450px){
  .gif-form{
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #3c3c3c;
    overflow-x: hidden;
    overflow-y: hidden;
    height: 100px;
}

span.x{
  color: #ffffff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 20px;
  margin: 0;
}

.gif-container{
  position: fixed;
  bottom: 100px;
  background: #3c3c3c;
}
.gif-wrapper{
  height: 250px;
}

.gif-card img {
  max-width: 130px;
}
.gif-attribution, .gif-attribution a {
  color: white;
}

}
</style>