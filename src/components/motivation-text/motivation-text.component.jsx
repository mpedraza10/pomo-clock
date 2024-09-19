/* eslint-disable react/prop-types */

// React imports
import { useContext } from "react";

// Context
import { UserContext } from "../../contexts/user.context";

// Styles
import "./motivation-text.styles.scss";

const MotivationText = ({ workCount }) => {
	// State
	const { currentTimer } = useContext(UserContext);

	return (
		<div className="motivation-text-container">
			{currentTimer === "work" && (
				<span className="work-count">#{workCount}</span>
			)}
			<h1 className="current-timer-title">
				{currentTimer === "work"
					? "Focus Mode: Engage!"
					: currentTimer === "sbreak"
					? "Quick Recharge: Snack Attack!"
					: "Victory Lap: Chill Time!"}
			</h1>
			<span className="phrase">
				{currentTimer === "work"
					? "Time to hustle! Your to-do list isn't going to check itself off!"
					: currentTimer === "sbreak"
					? "Quick stretch! It's time to pretend you're doing yoga."
					: "Long break! Now's your chance to contemplate life… or just snack endlessly."}
			</span>
		</div>
	);
};

export default MotivationText;
