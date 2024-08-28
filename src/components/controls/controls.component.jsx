/* eslint-disable react/prop-types */

// Styles
import "./controls.styles.scss";

const Controls = ({
	currentTimer,
	playAudio,
	handleReset,
	isRunning,
	setIsRunning,
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
					setIsRunning(!isRunning);
				}}
			>
				{isRunning ? "PAUSE" : "START"}
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
