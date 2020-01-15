import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBa7WmfOuhke_B_xF4kJc9bGNTbs0zk4bQ',
  authDomain: 'leeroy-edcb2.firebaseapp.com',
  databaseURL: 'https://leeroy-edcb2.firebaseio.com',
  projectId: 'leeroy-edcb2',
  storageBucket: 'leeroy-edcb2.appspot.com',
  messagingSenderId: '647987514394',
  appId: '1:647987514394:web:51d67e9f8010efdee5d5a3'
}

export const db = firebase.initializeApp(firebaseConfig).firestore()
