// React imports
import { useContext } from "react";

// Context
import { UserContext } from "../../contexts/user.context";

// Styles
import "./nav.styles.scss";

const Nav = () => {
	// State
	const { currentTimer, setCurrentTimer } = useContext(UserContext);

	// Helper functions
	const handleTimerSelection = (e) => setCurrentTimer(e.target.value);

	return (
		<nav className="timer-menu-container">
			<ul className="menu-options">
				<li className="timer-opt">
					<button
						className={`btn ${currentTimer === "work" ? "work-selected" : ""}`}
						onClick={handleTimerSelection}
						value="work"
					>
						Work Time
					</button>
				</li>
				<li className="timer-opt">
					<button
						className={`btn ${
							currentTimer === "sbreak" ? "sbreak-selected" : ""
						}`}
						onClick={handleTimerSelection}
						value="sbreak"
					>
						Short Break
					</button>
				</li>
				<li className="timer-opt">
					<button
						className={`btn ${
							currentTimer === "lbreak" ? "lbreak-selected" : ""
						}`}
						onClick={handleTimerSelection}
						value="lbreak"
					>
						Long Break
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
