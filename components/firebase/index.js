import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyB9Opq_6owZSEwKLcxe1ZIID1xvtHjSG7w",
    authDomain: "todo-app-a27f9.firebaseapp.com",
    databaseURL: "https://todo-app-a27f9.firebaseio.com",
    projectId: "todo-app-a27f9",
    storageBucket: "todo-app-a27f9.appspot.com",
    messagingSenderId: "550471823920",
    appId: "1:550471823920:web:9d17dab4615b5212"
  };
 
  const app = firebase.apps.length
    ? firebase.app()
    : firebase.initializeApp(firebaseConfig)

  const firebaseAuth = firebase.auth();
  const firestore = firebase.firestore();


export {firebase, app, firestore, firebaseAuth}