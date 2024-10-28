import { useComponetsStore } from "../store/components";

const Setting = () => {
	const { components } = useComponetsStore();
	return (
		<pre className="overflow-auto">{JSON.stringify(components, null, 2)}</pre>
	);
};

export { Setting };
