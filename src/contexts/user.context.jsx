// React imports
import { createContext, useState, useEffect } from "react";

// Prop types import
import PropTypes from "prop-types";

// Firebase utils imports
import {
	onAuthStateChangedListener,
	createUserDocumentFromAuth,
} from "../utils/firebase/firebase.utils";

// The actual value we want to access
export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

// Provider (actual component that wraps components that can access this context)
export const UserProvider = ({ children }) => {
	// State
	const [currentUser, setCurrentUser] = useState(null);
	const value = { currentUser, setCurrentUser };

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

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
