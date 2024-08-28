/* eslint-disable react/prop-types */

// Styles
import "./controls.styles.scss";

const Controls = ({
	currentTimer,
	playAudio,
	handleReset,
	isActive,
	setIsActive,
}) => {
	return (
		<div className="controls-container">
			<button
				className={`btn start-pause-btn ${
					currentTimer === "work"
						? "red-bg"
						: currentTimer === "sbreak"
						? "light-blue-bg"
						: "dark-blue-bg"
				}`}
				onClick={() => {
					playAudio("click");
					setIsActive(!isActive);
				}}
			>
				{isActive ? "PAUSE" : "START"}
			</button>
			<button
				className={`btn reset-btn ${
					currentTimer === "work"
						? "red-bg"
						: currentTimer === "sbreak"
						? "light-blue-bg"
						: "dark-blue-bg"
				}`}
				onClick={() => {
					playAudio("click");
					handleReset();
				}}
			>
				RESET
			</button>
		</div>
	);
};

export default Controls;
