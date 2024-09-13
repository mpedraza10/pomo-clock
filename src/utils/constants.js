// React toastify imports
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showSuccessAlert = (successMessage) =>
	toast.success(successMessage, {
		position: "bottom-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
	});

export const showErrorAlert = (errorMessage) =>
	toast.error(errorMessage, {
		position: "bottom-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
	});

export const getTodaysDate = () => new Date().toISOString().slice(0, 10);

// Converte new Date() obj to formatted string date -> "YYYY-MM-DD"
export const convertDateToString = (date) => date.toISOString().slice(0, 10);

export const getStartAndLastDayOfCurrentWeek = () => {
	const curr = new Date(); // Get current date
	const day = curr.getDay(); // Get the day of the week (0 for Sunday, 1 for Monday, etc.)

	// Calculate the difference to the previous Monday
	const diffToMonday = day === 0 ? -6 : 1 - day; // Sunday (0) needs to go back 6 days to Monday, otherwise subtract the day of the week from 1

	// Calculate the first and last days of the week (Monday to Sunday)
	const first = curr.getDate() + diffToMonday;
	const last = first + 6;

	const firstDay = new Date(curr.setDate(first));
	const lastDay = new Date(curr.setDate(last));

	return [firstDay, lastDay];
};

// Helper function to generate all dates in the range
export const generateDateRange = (start, end) => {
	const dateList = [];
	let currentDate = new Date(start);
	while (currentDate <= end) {
		dateList.push(new Date(currentDate));
		currentDate.setDate(currentDate.getDate() + 1);
	}
	return dateList;
};

export const getDay = (inputDate) => {
	// Create a date object from the input string
	const date = new Date(inputDate);

	// Define arrays for days of the week and month names
	const daysOfWeek = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];

	const dayOfWeek = daysOfWeek[date.getDay()];

	return `${dayOfWeek}`;
};
