import { useMemo } from "react";
import { useComponentConfigStore } from "../../store/component-config";
import { useDrag } from "react-dnd";

const Material = () => {
	const { componentConfig } = useComponentConfigStore();

	const components = useMemo(() => {
		return Object.values(componentConfig);
	}, [componentConfig]);

	return (
		<div className="h-full overflow-auto">
			{components.map((item, index) => {
				return (
					<MaterialItem
						name={item.name}
						desc={item.desc}
						key={item.name + index}
					/>
				);
			})}
		</div>
	);
};

type MaterialItemProps = {
	name: string;
	desc: string;
};

const MaterialItem = ({ name, desc }: MaterialItemProps) => {
	const [_, drag] = useDrag({
		type: name,
		item: {
			name: name,
		},
	});

	if (name === "Page") return null;

	return (
		<div
			ref={drag}
			className="border-dashed border border-black py-2 px-[10px] m-[10px] cursor-move inline-block bg-white hover:bg-[#ccc]"
		>
			{desc}
		</div>
	);
};

export { Material };
