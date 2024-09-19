// React imports
import { useState } from "react";

// Firebase auth and db utils imports
import {
	signInWithGooglePopup,
	signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

// Constant utils imports
import { showSuccessAlert, showErrorAlert } from "../../utils/constants";

// Components
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

// Styles
import "./sign-in-form.styles.scss";

// Initial form fields
const defaultFormFileds = {
	email: "",
	password: "",
};

const SignInForm = () => {
	// State
	const [formFields, setFormFields] = useState(defaultFormFileds);
	const { email, password } = formFields;

	// Helper functions

	// Function to reset the form fields
	const resetFormFields = () => {
		setFormFields(defaultFormFileds);
	};

	// Function to handle google sign in
	const signInWithGoogle = async () => {
		await signInWithGooglePopup();

		// Finally we reset the form fields and alert success if everything went as expected
		resetFormFields();
		showSuccessAlert("Welcome back!");
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

		try {
			// Try to sign in the user
			await signInAuthUserWithEmailAndPassword(email, password);

			// Finally we reset the form fields and alert success if everything went as expected
			resetFormFields();
			showSuccessAlert("Welcome back!");
		} catch (error) {
			if (error.code === "auth/invalid-credential") {
				showErrorAlert(
					"No user is associated with this email, try to sign up first."
				);
			} else if (error.code === "auth/wrong-password") {
				showErrorAlert("Incorrect password, try again.");
			} else {
				console.log(error);
				showErrorAlert(
					"Something went wrong on our side. Please try again later."
				);
			}
		}
	};

	return (
		<div className="sign-in-container">
			<h2>I already have an account</h2>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
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

				<div className="buttons-container">
					<Button type="submit" buttonType="inverted">
						Sign In
					</Button>
					<Button type="button" buttonType="google" onClick={signInWithGoogle}>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
