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
