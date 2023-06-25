import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4zmdDR9jMpJNX-gMUho3Bi8wqYeX4o_0",
  authDomain: "nikeproject-e1fb6.firebaseapp.com",
  projectId: "nikeproject-e1fb6",
  storageBucket: "nikeproject-e1fb6.appspot.com",
  messagingSenderId: "323010526712",
  appId: "1:323010526712:web:c4f776b2b5a922a97c6a0d",
  measurementId: "G-71K7Z5QLGX",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
