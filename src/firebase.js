import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDrZfnB1L6dwYpA9sJdy_B3nktAbzvEDBw",
  authDomain: "wms-auth-678de.firebaseapp.com",
  projectId: "wms-auth-678de",
  storageBucket: "wms-auth-678de.firebasestorage.app",
  messagingSenderId: "156725578730",
  appId: "1:156725578730:web:e74a87ccff3f06f1f5c093"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

export { firebaseAuth }
