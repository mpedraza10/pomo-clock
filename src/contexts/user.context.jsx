// React imports
import { createContext, useState, useEffect } from "react";

// Prop types import
import PropTypes from "prop-types";

// Firebase utils imports
import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
	getDbUserData,
} from "../utils/firebase/firebase.utils";

// The actual value we want to access
export const UserContext = createContext({
	currentUser: null,
	currentUserData: null,
	currentTimer: "work",
	setCurrentUser: () => null,
	setCurrentUserData: () => null,
	setCurrentTimer: () => null,
});

// Provider (actual component that wraps components that can access this context)
export const UserProvider = ({ children }) => {
	// State
	const [currentUser, setCurrentUser] = useState(null);
	const [currentUserData, setCurrentUserData] = useState(null);
	const [currentTimer, setCurrentTimer] = useState("work");
	const value = { currentUser, currentUserData, currentTimer, setCurrentTimer };

	// Effects

	// Effect that initialize on the first mount and is listening for any changes
	// regarding user authentication
	useEffect(() => {
		const unsuscribe = onAuthStateChangedListener((user) => {
			// If we got a user we call the method to create the user in out db
			if (user) {
				createUserDocumentFromAuth(user);
			}
			setCurrentUser(user);
		});

		// Cleanup
		return unsuscribe;
	}, []);

	useEffect(() => {
		const fetchUserData = async () => {
			if (currentUser) {
				try {
					const dbUserData = await getDbUserData(currentUser);
					setCurrentUserData(dbUserData);
				} catch (error) {
					console.log("Error fetching user db data: ", error);
				}
			} else {
				setCurrentUserData(null);
			}
		};

		fetchUserData();
	}, [currentUser]);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
