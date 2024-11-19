import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyCC7u1U01oznPnYYTZldKJir4Zso52Cnzo',
    authDomain: 'financemanager-3ebca.firebaseapp.com',
    projectId: '819821748183',
    messagingSenderId: '819821748183',
    
};

// Инициализация Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Инициализация аутентификации
const auth = getAuth(app);

export { auth };
