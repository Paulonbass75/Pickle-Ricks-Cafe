// import { createApp } from "vue";
// import App from "./App.vue";
// import router from "./router";
// import store from "./store";

import "./assets/main.css";

// import { projectAuth } from "./firebase/config";

// let app;

// projectAuth.onAuthStateChanged(() => {
//   if (!app) {
//     app = createApp(App);
//     app.use(store);
//     app.use(router);
//     app.mount("#app");
//   }
// });
// app = createApp(App).use(store).use(router).mount("#app");

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// firebase imports
import { projectAuth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

let app;

projectAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(router).mount("#app");
  }
});
