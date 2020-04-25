import './css/Body.css'
import {addRegFrom} from './functions'

var firebaseConfig = {
  apiKey: "AIzaSyBzWAUlImZ3wV4dpxcWhJ-6BSZ-2QMUW-s",
  authDomain: "jslab4form.firebaseapp.com",
  databaseURL: "https://jslab4form.firebaseio.com",
  projectId: "jslab4form",
  storageBucket: "jslab4form.appspot.com",
  messagingSenderId: "682404176098",
  appId: "1:682404176098:web:c92a3f66d36453176ffebb"
};

firebase.initializeApp(firebaseConfig);

addRegFrom(true);
