// import { ref } from "vue";

// // firebase imports
// import { auth } from "../firebase/config";
// import { signInWithEmailAndPassword } from "firebase/auth";

// const error = ref(null);
// const isPending = ref(false);

// const login = async (email, password) => {
//   error.value = null;
//   isPending.value = true;

//   try {
//     const res = await signInWithEmailAndPassword(auth, email, password);
//     if (!res) {
//       throw new Error("Invalid Credentials");
//     }

//     error.value = null;
//     isPending.value = false;

//   } catch (err) {
//     console.log(err.value);
//     error.value = err.message;
//     isPending.value = false;
//   }
// };

// const uselogin = () => {
//   return { error, login, isPending };
// };

// export default uselogin;

import { ref } from "vue";

// firebase imports
import { projectAuth } from "../firebase/config";
// import { signInWithEmailAndPassword } from "firebase/auth";

const error = ref(null);
const isPending = ref(false);

const login = async (email, password) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password);
    // if (!res) {
    //   throw new Error("Could not login");
    // }

    error.value = null;
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    error.value = "Invalid Credentials";
  }
};

const uselogin = () => {
  return { error, login };
};

export default uselogin;
