import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCC7u1U01oznPnYYTZldKJir4Zso52Cnzo',
    authDomain: 'financemanager-3ebca.firebaseapp.com',
    projectId: 'financemanager-3ebca',
    storageBucket: 'financemanager-3ebca.firebasestorage.app',
    messagingSenderId: '819821748183',
    appId: '1:819821748183:web:a98bfee97d0fbf13a4f592',
    measurementId: 'G-5REP3JGHSM',
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, analytics, db };
