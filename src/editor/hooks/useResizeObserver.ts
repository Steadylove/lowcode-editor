import { useEffect } from "react";

export const useResizeObserver = (callback: () => void) => {
	useEffect(() => {
		const observer = new ResizeObserver(callback);

		observer.observe(document.body);

		return () => {
			observer.disconnect();
		};
	}, []);
};
