import firebase from 'firebase';

class FireChat {
    constructor() {
      this.init();
      this.observeAuth();
    }

    init = () =>
    firebase.initializeApp({
        apiKey: "AIzaSyATq_Ss4HOKzx_H-ygvxWTuKoJ13jycyu0",
        authDomain: "studygroup-c72ca.firebaseapp.com",
        databaseURL: "https://studygroup-c72ca.firebaseio.com",
        projectId: "studygroup-c72ca",
        storageBucket: "studygroup-c72ca.appspot.com",
        messagingSenderId: "96963891787",
        appId: "1:96963891787:web:8c04d09446c7a1f17ab3ce",
        measurementId: "G-650WPE4FV2"
    });

    observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('messages');
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

FireChat.shared = new FireChat();
export default FireChat;
  
