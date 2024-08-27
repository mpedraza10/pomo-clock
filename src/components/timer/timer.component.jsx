/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

// React imports
import { useEffect, useState } from "react";

const Timer = ({ currentTimer, minutes }) => {
	const [timeLeft, setTimeLeft] = useState(minutes);
	const [isActive, setIsActive] = useState(false);

	// Helper functions

	// Function to format how the time is displayed in the app
	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes < 10 ? "0" : ""}${minutes}:${
			remainingSeconds < 10 ? "0" : ""
		}${remainingSeconds}`;
	};

	// Function that resets the timer to default setting
	const handleReset = () => {
		setIsActive(false);
		setTimeLeft(minutes); // Reset to initial time
	};

	// Effects

	// Effect to reset the timer when minutes prop changes
	useEffect(() => {
		setTimeLeft(minutes);
		setIsActive(false);
	}, [minutes]);

	// Effect to handle timer
	useEffect(() => {
		let interval = null;

		if (isActive && timeLeft > 0) {
			interval = setInterval(() => {
				setTimeLeft((prevTime) => prevTime - 1);
			}, 1000);
		} else if (timeLeft === 0 && isActive) {
			handleReset();
		} else {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [isActive, timeLeft]);

	return (
		<div>
			<h1>{currentTimer}</h1>
			<span>{formatTime(timeLeft)}</span>
			<button onClick={() => setIsActive(!isActive)}>
				{isActive ? "Pause" : "Start"}
			</button>
			<button onClick={handleReset}>Reset</button>
		</div>
	);
};

export default Timer;
