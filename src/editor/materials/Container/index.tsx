import { CommonComponentProps } from "@/editor/interface";

import { useMaterialDrop } from "@/editor/hooks/useMaterialDrop";

const Container = ({ children, id, name, styles }: CommonComponentProps) => {
	const { canDrop, drop } = useMaterialDrop({
		accept: ["Button", "Container"],
		id,
	});

	return (
		<div
			data-component-name={name}
			data-component-id={id}
			ref={drop}
			className={`min-h-[100px] p-5 ${
				canDrop ? "border-[2px] border-blue-400" : "border border-black"
			}`}
			style={styles}
		>
			{children}
		</div>
	);
};

export { Container };
