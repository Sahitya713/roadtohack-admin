import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBtMZsHmfoHaqEY3zDEm1h9hJcBASF_59M",
  authDomain: "roadtohack-admin.firebaseapp.com",
  projectId: "roadtohack-admin",
  storageBucket: "roadtohack-admin.appspot.com",
  messagingSenderId: "602869669378",
  appId: "1:602869669378:web:1d5dbd2be7cbcc6fe8d11b",
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};
export default firebase;
