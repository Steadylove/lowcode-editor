import { CommonComponentProps } from "../../interface";
import { useMaterialDrop } from "@/editor/hooks/useMaterialDrop";

const Page = ({ children, id, name, styles }: CommonComponentProps) => {
	const { canDrop, drop } = useMaterialDrop({
		accept: ["Button", "Container"],
		id,
	});

	return (
		<div
			data-component-name={name}
			data-component-id={id}
			ref={drop}
			className={`h-full ${canDrop ? "border-[2px] border-blue-400" : ""}`}
			style={styles}
		>
			{children}
		</div>
	);
};

export { Page };
