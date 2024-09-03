// Firebase imports
import { initializeApp } from "firebase/app";

// Firebase auth imports
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";

// Firebase firestore (db) imports
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Firebase config
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initilize the auth provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	promt: "select_account",
});

// Initilize the auth instance with the provider
export const auth = getAuth();
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);

// Instanciate firestore db
export const db = getFirestore();

// ---------------------------------------- Auth Methods ----------------------------------------

// Method to create the user into our db after authentication
export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
	// If we don't get userAuth then don't run the func
	if (!userAuth) return;

	// First we need to check if there is an existing document
	// meaining that, in this case, if we already have the user
	const userDocRef = doc(db, "users", userAuth.uid);

	// Get the snapshot (or data) to see if we actually have data
	// in the given doc reference
	const userSnapshot = await getDoc(userDocRef);
	if (!userSnapshot.exists()) {
		// If the user is not in the db then we are adding it
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName: displayName,
				email: email,
				createdAt,
				...additionalInfo,
			});
		} catch (error) {
			console.log("Error creating the user", error.message);
		}
	}

	// If the user exists or after we create the user we return
	// the user ref
	return userDocRef;
};

// Method to sign up user with email and password provider from firebase
export const createAuthUserWithEmailAndPassword = async (email, password) => {
	// If we don't get email and password then don't run the func
	if (!email || !password) return;

	// Create an authenticated user using firebase method
	return await createUserWithEmailAndPassword(auth, email, password);
};

// Method to sign in user with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	// If we don't get email and password then don't run the func
	if (!email || !password) return;

	// Check if we can sign in and get a user
	return await signInWithEmailAndPassword(auth, email, password);
};

// Method to sign out user
export const signOutUser = async () => await signOut(auth);

// Method that is a listener that is using the observer from firebase to keep track
// whether a user signs in or out all the time
export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);

// ---------------------------------------- CRUD Methods ----------------------------------------
