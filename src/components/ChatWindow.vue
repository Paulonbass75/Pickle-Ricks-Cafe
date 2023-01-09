<template>
  <div class="chat-window">
    <div v-if="error">{{ error }}</div>
    <div v-if="documents" class="messages" ref="messages">
      <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
        <!-- Format for plain text -->
        <div v-if="!doc.containsImg">
          <span class="created-at">{{ doc.createdAt }}</span>
          <span class="name">{{ doc.name }}</span>
          <br />
          <span class="message">
            {{ doc.message }}
          </span>
        </div>
        <!-- Format for gifs/images -->
        <div v-if="doc.containsImg">
          <span class="created-at">{{ doc.createdAt }}</span>
          <span class="name">{{ doc.name }}</span>
          <br />
          <div class="message">
            <img :src="doc.img" alt="" />
          </div>
          <br />
          <div class="message">
            {{ doc.message }}
          </div>
        </div>
        <!-- Format for Messages containing images -->
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from "../composables/getChats";
import { formatDistanceToNow } from "date-fns";
import { computed, onUpdated, ref } from "vue";

export default {
  setup() {
    const { error, documents } = getCollection("messages");

    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map((doc) => {
          let time = formatDistanceToNow(doc.createdAt.toDate());
          return {
            ...doc,
            createdAt: time,
          };
        });
      }
    });

    // auto-scroll to bottom of chat window
    // const messages = ref(null);
    // onUpdated(() => {
      // messages.value.scrollTop = messages.value.scrollHeight;
    // });

// chatGPT suggestion for auto scroll
    function scrollDown() {
  window.scrollBy(0, 50); // scroll down by 50 pixels
}

function startScrolling() {
  intervalId = setInterval(scrollDown, 100); // scroll every 100 milliseconds
}

function stopScrolling() {
  clearInterval(intervalId);
}

// add event listeners to the start and stop buttons
document.getElementById('start-button').addEventListener('click', startScrolling);
document.getElementById('stop-button').addEventListener('click', stopScrolling);


    return { error, documents, formattedDocuments, messages };
  },
};
</script>

<style scoped>
.chat-window {
  background: #fafafa;
  padding: 20px 20px;
}
.single {
  overflow-x: hidden;
  word-wrap: normal;
  margin: 0;
  padding: 10px 5px;
  border-top: 1px solid #999999;
}
.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
}
.name {
  font-weight: bold;
  margin-right: 6px;
}
.messages {
  max-height: 500px;

  overflow: auto;
}

.messages img {
  width: 300px;
}

.image-with-text {
  display: flex;
  flex-direction: column;
}

@media (max-width: 450px) {
  .chat-window {
    padding: 0;
  }
  .messages {
    max-height: calc(100vh - 400px);
    padding: 10px;
  }
}
</style>
