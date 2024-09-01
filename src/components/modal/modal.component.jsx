/* eslint-disable react/prop-types */

// React imports
import { useEffect } from "react";

// React DOM imports
import { createPortal } from "react-dom";

// Styles
import "./modal.styles.scss";

const Modal = ({ isOpen, onClose, children }) => {
	// Prevent scrolling when the modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	// Render the modal only if it's open
	if (!isOpen) return null;

	return createPortal(
		<div className="modal-overlay">
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<button className="modal-close" onClick={onClose}>
					&times;
				</button>
				{children}
			</div>
		</div>,
		document.getElementById("modal-root")
	);
};

export default Modal;
