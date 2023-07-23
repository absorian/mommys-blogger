import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, type User } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { writable } from 'svelte/store';

// old config
const firebaseConfig = {
	apiKey: 'AIzaSyAnzIhe0BjQcOdcKP_h7LSYez8wPdp8UNw',
	authDomain: 'mommys-blogger.firebaseapp.com',
	projectId: 'mommys-blogger',
	storageBucket: 'mommys-blogger.appspot.com',
	messagingSenderId: '937787211366',
	appId: '1:937787211366:web:9553a116cb297c36c977a7',
	measurementId: 'G-HXTRXR3DMX'
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

export let user = writable<User | null>(null);
onAuthStateChanged(auth, (usr) => {
	user.set(usr);
});
