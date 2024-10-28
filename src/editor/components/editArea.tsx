import React, { MouseEventHandler, useState } from "react";
import { useComponentConfigStore } from "../store/component-config";
import { useComponetsStore, Component } from "../store/components";
import { HoverMask } from "./hover-mask";

const EDITAREA_CLASSNAME = "edit-area";

const PORTAL_CLASSNAME = "portal-wrapper";

const EditArea = () => {
	const { components } = useComponetsStore();
	const { componentConfig } = useComponentConfigStore();

	const [hoverComponentId, setHoverComponentId] = useState<number>();

	const handleMouseOver: MouseEventHandler = (e) => {
		const path = e.nativeEvent.composedPath();

		for (let i = 0; i < path.length; i += 1) {
			const ele = path[i] as HTMLElement;

			const componentId = ele.dataset?.componentId;
			if (componentId) {
				setHoverComponentId(+componentId);
				return;
			}
		}
	};

	function renderComponents(components: Component[]): React.ReactNode {
		return components.map((component: Component) => {
			const config = componentConfig?.[component.name];

			if (!config?.component) {
				return null;
			}

			return React.createElement(
				config.component,
				{
					key: component.id,
					...config.defaultProps,
					...component.props,
					id: component.id,
					name: component.name,
				},
				renderComponents(component.children || [])
			);
		});
	}

	return (
		<div
			className={`h-full overflow-auto ${EDITAREA_CLASSNAME}`}
			onMouseOver={handleMouseOver}
			onMouseLeave={() => setHoverComponentId(undefined)}
		>
			<div className={PORTAL_CLASSNAME} />
			{Boolean(hoverComponentId) && (
				<HoverMask
					mountNodeClassname={PORTAL_CLASSNAME}
					componentId={hoverComponentId!}
					containerClassName={EDITAREA_CLASSNAME}
				/>
			)}
			{renderComponents(components)}
		</div>
	);
};

export { EditArea };
