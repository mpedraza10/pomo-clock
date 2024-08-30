// React imports
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";

// Components
import App from "./App.jsx";

// Styles
import "./index.scss";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<App />
		<Analytics />
	</StrictMode>
);
