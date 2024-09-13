// React imports
import { useState } from "react";

// Firebase utils
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

// Constant utils imports
import { showErrorAlert, showSuccessAlert } from "../../utils/constants";

// Components
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

// Styles
import "./sign-up-form.styles.scss";

// Initial form fields
const defaultFormFileds = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	// State
	const [formFields, setFormFields] = useState(defaultFormFileds);
	const { displayName, email, password, confirmPassword } = formFields;

	// Helper functions

	// Function to reset the form fields
	const resetFormFields = () => {
		setFormFields(defaultFormFileds);
	};

	// Function to handle input change depending on the name of
	// the input field
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	// Function to handle form submission
	const handleSubmit = async (event) => {
		event.preventDefault();

		// Check if data is correct
		if (password !== confirmPassword) {
			return showErrorAlert("Passwords do not match");
		}

		// If everything is correct we proceed to create the user
		try {
			// Create the user for authentication and get the user obj
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);

			// Now create the user in the db passing the display name missing
			await createUserDocumentFromAuth(user, { displayName });

			// Finally we reset the form fields and alert success if everything went as expected
			resetFormFields();
			showSuccessAlert("User created successfully!");
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				showErrorAlert("Cannot create user, email already in use");
			} else if (error.code === "auth/weak-password") {
				showErrorAlert(
					"Password is weak. Your password should at least be 6 characters."
				);
			} else {
				console.log("User creation encountered an error: ", error);
			}
		}
	};

	return (
		<div className="sign-up-container">
			<h2>Don&apos;t have an account?</h2>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Display Name"
					type="text"
					name="displayName"
					value={displayName}
					onChange={handleChange}
					required
				/>

				<FormInput
					label="Email"
					type="email"
					name="email"
					value={email}
					onChange={handleChange}
					required
				/>

				<FormInput
					label="Password"
					type="password"
					name="password"
					value={password}
					onChange={handleChange}
					required
				/>

				<FormInput
					label="Confirm Password"
					type="password"
					name="confirmPassword"
					value={confirmPassword}
					onChange={handleChange}
					required
				/>

				<Button type="submit" buttonType="inverted">
					Sign Up
				</Button>
			</form>
		</div>
	);
};

export default SignUpForm;
