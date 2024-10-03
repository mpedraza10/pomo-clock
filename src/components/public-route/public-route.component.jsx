// React router imports
import { Navigate, Outlet } from "react-router-dom";

// Prop types
import PropTypes from "prop-types";

// Component to handle unauthenticated-only routes
const PublicRoute = ({ condition, redirectTo }) => {
	return condition ? <Navigate to={redirectTo} /> : <Outlet />;
};

PublicRoute.propTypes = {
	condition: PropTypes.bool.isRequired, // Check for authentication status
	redirectTo: PropTypes.string.isRequired, // Redirect path if authenticated
};

export default PublicRoute;
