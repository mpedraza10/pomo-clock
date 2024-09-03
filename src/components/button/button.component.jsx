// Prop types import
import PropTypes from "prop-types";

// Styles
import "./button.styles.scss";

// Button options styles
const BUTTON_TYPE_CLASSES = {
	google: "google-sign-in",
	inverted: "inverted",
};

const Button = ({ children, buttonType, ...otherProps }) => {
	return (
		<button
			className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
			{...otherProps}
		>
			{children}
		</button>
	);
};

Button.propTypes = {
	children: PropTypes.node.isRequired,
	buttonType: PropTypes.string,
};

export default Button;
