/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

// React imports
import { useEffect, useState, useRef } from "react";

// Components
import Controls from "../controls/controls.component";

// Styles
import "./timer.styles.scss";

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
		<div className="timer-container">
			<span className="current-time">{formatTime(timeLeft)}</span>
			<span className="phrase">
				{currentTimer === "work"
					? "Time to hustle! Your to-do list isn't going to check itself off!"
					: currentTimer === "sbreak"
					? "Quick stretch! It's time to pretend you're doing yoga."
					: "Long break! Now's your chance to contemplate life… or just snack endlessly."}
			</span>

			<Controls
				currentTimer={currentTimer}
				isActive={isActive}
				setIsActive={setIsActive}
				playAudio={playAudio}
				handleReset={handleReset}
			/>

			<audio ref={audioRefs.alarm} src="/audio/alarm.mp3" />
			<audio ref={audioRefs.click} src="/audio/click.mp3" />
		</div>
	);
};

export default Timer;
