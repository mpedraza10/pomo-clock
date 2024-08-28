/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

// React imports
import { useState, useEffect, useRef } from "react";

// Components
import Controls from "../controls/controls.component";

// Styles
import "./timer.styles.scss";

const Timer = ({ minutes, currentTimer, setIsDone }) => {
	// Define initial duration of a Pomodoro session (in milliseconds)
	const pomodoroDuration = minutes * 60 * 1000;

	const [isRunning, setIsRunning] = useState(false);
	const [startTime, setStartTime] = useState(null); // Track when the timer started
	const [timeLeft, setTimeLeft] = useState(pomodoroDuration); // Time remaining

	// Create a ref for the audio element
	// Create refs for the audio elements
	const audioRefs = {
		alarm: useRef(null),
		click: useRef(null),
	};

	// ---------------------------------------------- Helper functions ----------------------------------------------

	// Function that resets the timer to default setting
	const handleReset = () => {
		setIsRunning(false);
		setTimeLeft(pomodoroDuration);
	};

	// Function to play the audio
	const playAudio = (sound) => {
		if (audioRefs[sound].current) {
			audioRefs[sound].current.play();
		}
	};

	// Function to format how the time is displayed in the app
	const formatTime = (milliseconds) => {
		const totalSeconds = Math.floor(milliseconds / 1000);
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		return `${minutes.toString().padStart(2, "0")}:${seconds
			.toString()
			.padStart(2, "0")}`;
	};

	// ---------------------------------------------- Effects ----------------------------------------------
	useEffect(() => {
		setTimeLeft(pomodoroDuration);
		setIsRunning(false);
	}, [minutes]);

	useEffect(() => {
		let timerId;

		if (isRunning) {
			// Save the start time if the timer just started
			const start = Date.now() - (pomodoroDuration - timeLeft);
			setStartTime(start);

			// Set an interval to update the time left
			timerId = setInterval(() => {
				const elapsedTime = Date.now() - start;
				const remainingTime = pomodoroDuration - elapsedTime;
				setTimeLeft(Math.max(remainingTime, 0)); // Ensure time doesn't go negative

				if (remainingTime <= 0) {
					clearInterval(timerId);
					setIsRunning(false); // Stop the timer when it hits zero
					playAudio("alarm");
					setIsDone(true);
					handleReset();
				}
			}, 100); // Update every 100ms for smoothness
		}

		return () => clearInterval(timerId); // Cleanup interval on component unmount or timer stop
	}, [isRunning, timeLeft]);

	return (
		<div className="timer-container">
			<span className="current-time">{formatTime(timeLeft)}</span>
			<Controls
				currentTimer={currentTimer}
				isRunning={isRunning}
				setIsRunning={setIsRunning}
				playAudio={playAudio}
				handleReset={handleReset}
			/>
			<audio ref={audioRefs.alarm} src="/audio/alarm.mp3" />
			<audio ref={audioRefs.click} src="/audio/click.mp3" />
		</div>
	);
};

export default Timer;
