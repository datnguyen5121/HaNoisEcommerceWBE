import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA4zmdDR9jMpJNX-gMUho3Bi8wqYeX4o_0",
  authDomain: "nikeproject-e1fb6.firebaseapp.com",
  projectId: "nikeproject-e1fb6",
  storageBucket: "nikeproject-e1fb6.appspot.com",
  messagingSenderId: "323010526712",
  appId: "1:323010526712:web:90855a8b40e96a067c6a0d",
  measurementId: "G-M7H7PT3R2X",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
