// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	createUserWithEmailAndPassword,
	getAuth,
	sendPasswordResetEmail,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { use } from "react";
import { toast } from "react-toastify";
const firebaseConfig = {
	apiKey: "AIzaSyAYTPo4mAn0cghPdq5-A_QR6SbkK98RxGk",
	authDomain: "chat-app-gps.firebaseapp.com",
	projectId: "chat-app-gps",
	storageBucket: "chat-app-gps.firebasestorage.app",
	messagingSenderId: "806478171983",
	appId: "1:806478171983:web:e93cbf9cfdd50a38143f3a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password);
		const user = res.user;
		await setDoc(doc(db, "users", user.uid), {
			id: user.uid,
			username: username.toLowerCase(),
			email,
			name: "",
			avatar: "",
			bio: "Hey, There i am using chat app",
			lastSeen: Date.now(),
		});
		await setDoc(doc(db, "chats", user.uid), {
			chatsData: [],
		});
	} catch (error) {
		console.error(error);
		toast.error(error.code.split("/")[1].split("-").join(" "));
	}
};

const login = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		console.error(error);
		toast.error(error.code.split("/")[1].split("-").join(" "));
	}
};

const logout = async () => {
	try {
		await signOut(auth);
	} catch (error) {
		console.error(error);
		toast.error(error.code.split("/")[1].split("-").join(" "));
	}
};

const resetPass = async(email) => {
	if(!email){
		toast.error("Enter your email")
		return null
	}

	try {
		const userRef = collection(db,'users');
		const q = query(userRef,where("email","==",email));
		const querySnap = await getDocs(q);
		if(!querySnap.empty){
			await sendPasswordResetEmail(auth,email);
			toast.success("Reset Email sent");
		}
		else{
			toast.error("Email does not exists")
		}
	} catch (error) {
		console.error(error);
		toast.error(error.message)
		
	}
}

export { signup, login, logout, auth, db, resetPass };
