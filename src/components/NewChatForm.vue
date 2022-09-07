<template>
  <div class="chat-form">
    <div class="image-preview">
      <ul class="img-list">
        <div class="image-container">
          <button class="delete" @click="deleteImg">
            <i class="bi bi-trash-fill"></i>
          </button>
          <img class="preview-img" src="" alt="Formatted Image" />
        </div>
      </ul>
    </div>
    <form
      @submit.prevent="submitText"
      @keypress.enter.prevent="submitText"
      action=""
    >
      <div class="form-container">
        <label class="gif-button btn" style="font-size: 1.75rem"
          ><i class="bi bi-camera-fill"></i>
          <input
            @change="fileUpload"
            style="display: none"
            type="file"
            name="photos"
            accept="image/*"
            data-file-load
          />
        </label>
        <a @click="openGif" class="gif-button btn"
          ><img class="pm" src="@/assets/GIF.svg" alt=""
        /></a>
        <div class="input-container">
          <span class="placeholder" data-placeholder></span>
          <div class="text-area" contenteditable="true">
            <span class="typing">&#xfeff;</span>
          </div>
          <!-- <textarea> </textarea> -->
          <div class="btns-container">
            <button class="send btn" type="submit">
              <img class="pm" src="@/assets/send.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
      <div v-if="error" class="error">{{ error }} Uhh...</div>
    </form>
  </div>
</template>

<script>
import { onUpdated, ref } from "vue";
import getUser from "../composables/getUser";
import useChats from "../composables/useChats";
import { timestamp } from "../firebase/config";

export default {
  data() {
    return {
      images: this.imgArray,
    };
  },
  setup() {
    const { user } = getUser();
    const { addDoc, error } = useChats("messages");

    const message = ref("");
    const submitText = async () => {
      let chat;
      //Checks whether or not the preview image contains a source
      //has to be written this way or else src is never empty
      if (document.querySelector(".preview-img").src.startsWith("data:image")) {
        chat = {
          name: user.value.displayName,
          message: document.querySelector(".text-area").textContent,
          img: document.querySelector(".preview-img").src,
          containsImg: true,
          createdAt: timestamp(),
        };
      } else {
        chat = {
          name: user.value.displayName,
          message: document.querySelector(".text-area").textContent,
          img: null,
          containsImg: false,
          createdAt: timestamp(),
        };
      }
      await addDoc(chat);
      if (message === "") {
        return;
      }
      if (!error.value) {
        document.querySelector(".text-area").textContent = "";
        document.querySelector(".preview-img").src = null;
        document.querySelector("[data-file-load]").value = "";
        document.querySelector(".image-preview").classList.remove("show");
        document.querySelector("[data-placeholder]").style.display = "block";
      }
    };
    return {
      message,
      submitText,
      error,
    };
  },
  mounted() {
    //Makes placeholder text disappear
    let placeholder = document.querySelector("[data-placeholder]");
    placeholder.innerText = "Enter Message Here...";
    let textArea = document.querySelector(".text-area");
    textArea.addEventListener("keyup", () => {
      if (textArea.textContent == "") placeholder.style.display = "block";
      else placeholder.style.display = "none";
    });

    //paste event that runs function grabbing DataUrl string for pasted image and rendering preview
    let imagePreview = document.querySelector(".image-preview");
    window.addEventListener("paste", (e) => {
      e.preventDefault();
      var text = e.clipboardData.getData("text/plain");
      document.execCommand("insertText", false, text);
      if (e.clipboardData.files[0].type.startsWith("image/")) {
        imagePreview.classList.add("show");
        this.previewImage(e.clipboardData.files[0]);
      }
    });

  },
  methods: {
    //opens gif window
    openGif() {
      let gifForm = document.querySelector(".gif-form");
      document.querySelector(".gif-search").value = "";
      gifForm.classList.toggle("show");
    },

    //file conversion and preview
    previewImage(file) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener("load", () => {
        // console.log(fileReader.result);
        document.querySelector(".preview-img").src = fileReader.result;
      });
    },

    //removes image source and hides preview window
    deleteImg() {
      document.querySelector(".image-preview").classList.remove("show");
      document.querySelector(".preview-img").src = null;
      document.querySelector("[data-file-load]").value = "";
    },

    //file uploader function that runs same as paste function
    fileUpload(e){
    let imagePreview = document.querySelector(".image-preview");
        // console.log(e)
        imagePreview.classList.add("show");
        this.previewImage(e.target.files[0])
      }
  },
};
</script>

<style scoped>
.chat-form {
  position: relative;
}

.image-preview {
  display: none;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  position: absolute;
  width: 100%;
  background-color: #3c3c3c;
  bottom: 100%;
}
.image-preview.show {
  display: flex;
}
.img-list {
  list-style: none;
  padding: 0;
  margin: 1rem;
}
.image-container {
  padding: 10px 10px 20px;
  background: #1c1c1c;
  position: relative;
  max-width: 150px;
}

.preview-img{
  width: 100%;
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: relative;
  margin: 0 10px 10px;
  padding: 10px;
}

.form-container {
  background: #fafafa;
  display: flex;
  align-items: center;
  padding: 5px 0;
  min-height: 40px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  font-family: inherit;
  position: relative;
}

.btn {
  margin: 0 5px;
}

.input-container {
  width: 100%;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
  align-items: center;
  flex-direction: row;
}

.btns-container {
  height: 38px;
  padding: 0 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #fafafa;
  flex-direction: row;
  position: relative;
  z-index: 3;
}

.delete {
  position: absolute;
  top: -5%;
  right: -5%;
  background: #8f8f8f;
  height: 30px;
  font-size: 1.1rem;
  width: 30px;
  border-radius: 100%;
  color: rgb(170, 0, 0);
  display: flex;
  justify-content: center;
  padding: 0;
  align-items: center;
}

.text-area {
  background: transparent;
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 20px;
  font-family: sans-serif;
  width: 100%;
  word-break: break-word;
  max-width: 100%;
  box-sizing: border-box;
  z-index: 2;
  border: none;
  border-radius: 10px;
  font-family: inherit;
}

.text-area:focus {
  outline: none;
}

.placeholder {
  color: #d2d2d2;
  z-index: 1;
  pointer-events: none;
  position: absolute;
  left: 20px;
}
.typing {
  color: #000000;
  pointer-events: all;
  height: 100%;
}
.send {
  font-size: 1.75rem;
  right: 0;
  text-decoration: none;
  background: transparent;
  color: #fff;
  font-weight: bold;
  /* border-right: 1px solid #ccc;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc; */
  padding: 0;
  border-radius: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.gif-button {
  font-size: 1.25rem;
  right: 0;
  text-decoration: none;
  background: transparent;
  color: #69c8ecff;
  display: flex;
  align-items: center;
  padding: 0;
  cursor: pointer;
}

@media (max-width: 450px) {
  .chat-form {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #3c3c3c;
    overflow-x: hidden;
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
    padding: 0;
  }

  .preview-img{
    max-width: 300px;
  }

  .image-preview{
    position: static;
  }
}
</style>
