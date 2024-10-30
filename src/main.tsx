import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Online } from "./compile.tsx";

createRoot(document.getElementById("root")!).render(
	import.meta.env.VITE_COMPILE ? (
		<Online />
	) : (
		<DndProvider backend={HTML5Backend}>
			<App />
		</DndProvider>
	)
);
