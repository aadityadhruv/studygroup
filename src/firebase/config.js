import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyATq_Ss4HOKzx_H-ygvxWTuKoJ13jycyu0",
    authDomain: "studygroup-c72ca.firebaseapp.com",
    databaseURL: "https://studygroup-c72ca.firebaseio.com",
    projectId: "studygroup-c72ca",
    storageBucket: "studygroup-c72ca.appspot.com",
    messagingSenderId: "96963891787",
    appId: "1:96963891787:web:8c04d09446c7a1f17ab3ce",
    measurementId: "G-650WPE4FV2"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };