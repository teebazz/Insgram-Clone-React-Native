// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaPdyT8saMnJKvNnmEbAn2pMzVP2h_RDk",
  authDomain: "rn-instagram-clone-3bda1.firebaseapp.com",
  projectId: "rn-instagram-clone-3bda1",
  storageBucket: "rn-instagram-clone-3bda1.appspot.com",
  messagingSenderId: "432687244522",
  appId: "1:432687244522:web:d41c92dfc92593ac23a393"
};

// Initialize Firebase  

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// export default firebase ;

const firebase = initializeApp(firebaseConfig)
const auth = getAuth(firebase)
const db = getFirestore(firebase)

export {firebase,auth,db}