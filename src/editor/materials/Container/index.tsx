import { CommonComponentProps } from "@/editor/interface";

import { useMaterialDrop } from "@/editor/hooks/useMaterialDrop";

const Container = ({ children, id, name }: CommonComponentProps) => {
	const { canDrop, drop } = useMaterialDrop({
		accept: ["Button", "Container"],
		id,
	});

	return (
		<div
			data-component-name={name}
			data-component-id={id}
			ref={drop}
			className="min-h-[100px] p-5"
			style={{
				border: canDrop ? "2px solid blue" : "1px solid black",
			}}
		>
			{children}
		</div>
	);
};

export { Container };
