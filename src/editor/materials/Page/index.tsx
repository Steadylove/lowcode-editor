import { CommonComponentProps } from "../../interface";
import { useMaterialDrop } from "@/editor/hooks/useMaterialDrop";

const Page = ({ children, id, name }: CommonComponentProps) => {
	const { canDrop, drop } = useMaterialDrop({
		accept: ["Button", "Container"],
		id,
	});

	return (
		<div
			data-component-name={name}
			data-component-id={id}
			ref={drop}
			className="h-full box-border p-5"
			style={{ border: canDrop ? "2px solid blue" : "none" }}
		>
			{children}
		</div>
	);
};

export { Page };
