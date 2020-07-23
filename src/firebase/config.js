import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCklRJCGmD-EE4cxg0uLHWqMsqizmsAHyQ",
  authDomain: "tunbarber1firebase.firebaseapp.com",
  databaseURL: "https://tunbarber1firebase.firebaseio.com",
  projectId: "tunbarber1firebase",
  storageBucket: "tunbarber1firebase.appspot.com",
  messagingSenderId: "501455241844",
  appId: "1:501455241844:web:334c66e56d114aa1d68721",
  measurementId: "G-PQFPVGGN5Q"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
