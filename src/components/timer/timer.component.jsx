/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

// React imports
import { useEffect, useState, useRef } from "react";

const Timer = ({ currentTimer, minutes, setIsDone }) => {
	// ---------------------------------------------- State ----------------------------------------------
	const [timeLeft, setTimeLeft] = useState(minutes);
	const [isActive, setIsActive] = useState(false);

	// Create a ref for the audio element
	// Create refs for the audio elements
	const audioRefs = {
		alarm: useRef(null),
		click: useRef(null),
	};

	// ---------------------------------------------- Helper functions ----------------------------------------------

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

	// Function to play the audio
	const playAudio = (sound) => {
		if (audioRefs[sound].current) {
			audioRefs[sound].current.play();
		}
	};

	// ---------------------------------------------- Effects ----------------------------------------------

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
			playAudio("alarm");
			handleReset();
			setIsDone(true);
		} else {
			clearInterval(interval);
		}

		return () => clearInterval(interval);
	}, [isActive, timeLeft]);

	return (
		<div>
			<h1>{currentTimer}</h1>
			<span>{formatTime(timeLeft)}</span>
			<button
				onClick={() => {
					playAudio("click");
					setIsActive(!isActive);
				}}
			>
				{isActive ? "Pause" : "Start"}
			</button>
			<button
				onClick={() => {
					playAudio("click");
					handleReset();
				}}
			>
				Reset
			</button>

			<audio ref={audioRefs.alarm} src="/audio/alarm.mp3" />
			<audio ref={audioRefs.click} src="/audio/click.mp3" />
		</div>
	);
};

export default Timer;
