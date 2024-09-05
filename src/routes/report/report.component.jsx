// React imports
import { useContext, useEffect, useState } from "react";

// Context
import { UserContext } from "../../contexts/user.context";

// Styles
import "./report.styles.scss";
import { Link } from "react-router-dom";
import Button from "../../components/button/button.component";
import { getDbUserData } from "../../utils/firebase/firebase.utils";

const Report = () => {
	// State
	const { currentUser } = useContext(UserContext);
	const [userData, setUserData] = useState({});

	useEffect(() => {
		const getUserData = async () => {
			if (currentUser) {
				console.log(currentUser);
				try {
					const dbUserData = await getDbUserData(currentUser);
					setUserData(dbUserData);
				} catch (error) {
					console.log("Error fetching user db data: ", error);
				}
			}
		};

		getUserData();
	}, [currentUser]);

	return (
		<main className="report-page-container">
			{currentUser ? (
				<div className="report-container">
					<h2>Report</h2>
					<p>Your worked minutes: {userData.workedMinutes} minutes</p>
				</div>
			) : (
				<div className="no-auth-container">
					<h2>
						Sign in to keep track of your working hours and generate reports
					</h2>
					<Link to="/auth">
						<Button buttonType="inverted">Sign in</Button>
					</Link>
				</div>
			)}
		</main>
	);
};

export default Report;
