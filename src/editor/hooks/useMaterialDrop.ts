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
		drop: (item: { type: string }, monitor) => {
			if (monitor.didDrop()) {
				return;
			}

			const props = componentConfig[item.type].defaultProps;
			addComponent(
				{
					id: new Date().getTime(),
					name: item.type,
					props,
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
