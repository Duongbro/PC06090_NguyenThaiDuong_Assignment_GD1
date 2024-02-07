// Import the functions you need from the SDKs you need
const { initializeApp } = require ('firebase/app');

const {
    getDatabase,
    ref,
    set,
    get,
    child,
    onValue,
} = require('firebase/database');

const {
    getStorage,
    ref: storageRef,
    getDownloadURL,
    listAll,
    uploadBytes,
} = require('firebase/storage');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADqdCWh3I4OsewMFtEvDhTJcaNvhF2Gcc",
  authDomain: "kuronami-manga.firebaseapp.com",
  databaseURL: "https://kuronami-manga-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kuronami-manga",
  storageBucket: "kuronami-manga.appspot.com",
  messagingSenderId: "127429190472",
  appId: "1:127429190472:web:8ba9aa3d2fa4aefc90097d",
  measurementId: "G-BSPXY1G9SH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

module.exports = {
    db,
    ref,
    set,
    get,
    child,
    onValue,
    getStorage,
    storageRef,
    getDownloadURL,
    listAll,
    uploadBytes
};