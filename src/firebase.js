

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDgQDhdWSm8BP21GiuPwSVSelnxq0js3UY",
  authDomain: "netflix-clone-1f8aa.firebaseapp.com",
  projectId: "netflix-clone-1f8aa",
  storageBucket: "netflix-clone-1f8aa.firebasestorage.app",
  messagingSenderId: "349226244004",
  appId: "1:349226244004:web:2816fbc6b9eafb17aa5331",
  measurementId: "G-MDX8V8QR93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name: name,
      authProvider: "local",
      email: email
    });
  } catch (error) {

    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    toast.error(error.code.split('/')[1].split('-').join(' '));
  
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };