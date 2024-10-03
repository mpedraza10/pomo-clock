// React imports
import { Fragment, useContext } from "react";

// React router dom imports
import { Routes, Route } from "react-router-dom";

// React toastify imports
import { ToastContainer } from "react-toastify";

// Context
import { UserContext } from "./contexts/user.context";

// Routes (Components)
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
import Report from "./routes/report/report.component";
import PublicRoute from "./components/public-route/public-route.component";

const App = () => {
	const { currentUser } = useContext(UserContext);
	return (
		<Fragment>
			<Routes>
				<Route path="/" element={<Navigation />}>
					{/* Unrestricted Routes */}
					<Route index element={<Home />} />
					<Route path="report" element={<Report />} />

					{/* Public Routes (only available if NOT authenticated) */}
					<Route
						element={<PublicRoute condition={!!currentUser} redirectTo="/" />}
					>
						<Route path="auth" element={<Authentication />} />
					</Route>
				</Route>
			</Routes>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</Fragment>
	);
};

export default App;
