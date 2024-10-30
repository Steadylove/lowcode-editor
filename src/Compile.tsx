import "./index.css";
import { Preview } from "./editor/components/preview/index.tsx";
import { useEffect } from "react";
import { useComponetsStore } from "./editor/store/components.tsx";
import json from "./config.json";

export const Online = () => {
	const { updateComponent } = useComponetsStore();
	useEffect(() => {
		console.log(json);
		updateComponent(json);
	}, []);
	return <Preview />;
};
