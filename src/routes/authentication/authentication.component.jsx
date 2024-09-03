// Components
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

// Styles
import "./authentication.styles.scss";

const Authentication = () => {
	return (
		<main className="auth-page-container">
			<div className="authentication-container">
				<SignInForm />
				<SignUpForm />
			</div>
		</main>
	);
};

export default Authentication;
