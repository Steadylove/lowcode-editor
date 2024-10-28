import { useDrop } from "react-dnd";
import { useComponetsStore } from "../store/components";
import { useComponentConfigStore } from "../store/component-config";

interface UseMaterialDropProps {
	accept: string[];
	id: number;
}

export const useMaterialDrop = (props: UseMaterialDropProps) => {
	const { accept, id } = props;
	const { addComponent } = useComponetsStore();
	const { componentConfig } = useComponentConfigStore();

	const [{ canDrop }, drop] = useDrop(() => ({
		accept,
		drop: (item: { name: string }, monitor) => {
			if (monitor.didDrop()) {
				return;
			}

			const { defaultProps, desc } = componentConfig[item.name];
			addComponent(
				{
					id: new Date().getTime(),
					name: item.name,
					props: defaultProps,
					desc: desc,
				},
				id
			);
		},
		collect: (monitor) => ({
			canDrop: monitor.canDrop(),
		}),
	}));

	return { canDrop, drop };
};
