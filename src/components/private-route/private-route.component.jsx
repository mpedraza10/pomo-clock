// React router imports
import { Navigate, Outlet } from "react-router-dom";

// Proptypes
import PropTypes from "prop-types";

const PrivateRoute = ({ condition, redirectTo }) => {
	return condition ? <Outlet /> : <Navigate to={redirectTo} />;
};

PrivateRoute.propTypes = {
	condition: PropTypes.bool.isRequired,
	redirectTo: PropTypes.string.isRequired,
};

export default PrivateRoute;
