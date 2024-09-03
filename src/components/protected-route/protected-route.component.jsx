// React router dom imports
import { Navigate } from "react-router-dom";

// Prop types import
import PropTypes from "prop-types";

const ProtectedRoute = ({ component: Component, condition, redirectTo }) => {
	return condition ? <Component /> : <Navigate to={redirectTo} />;
};

ProtectedRoute.propTypes = {
	component: PropTypes.elementType.isRequired, // A React component that will be rendered
	condition: PropTypes.bool.isRequired, // A boolean value to control access
	redirectTo: PropTypes.string.isRequired, // The path to redirect to if condition is false
};

export default ProtectedRoute;
