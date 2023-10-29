import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth"
let config = {
	apiKey: "AIzaSyA6DpZUGFfzn1kDI6OpTrX-f5iJ698D4Gg",
	authDomain: "trademood-935a3.firebaseapp.com",
	databaseURL: "https://trademood-935a3-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "trademood-935a3",
	storageBucket: "trademood-935a3.appspot.com",
	messagingSenderId: "455803994045",
	appId: "1:455803994045:web:3046fe1e3fb1fb7b569cd4",
	measurementId: "G-T70TSD7BP2"
};
const app = initializeApp(config);
export const auth = getAuth(app)

export default app