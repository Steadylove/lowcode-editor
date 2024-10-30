import { useComponentConfigStore } from "@/editor/store/component-config";
import { Component, useComponetsStore } from "@/editor/store/components";
import React, { ReactNode } from "react";

const Preview = () => {
	const { components } = useComponetsStore();
	const { componentConfig } = useComponentConfigStore();

	const renderComponents: (components: Component[]) => ReactNode = (
		components
	) => {
		return components.map((component) => {
			const config = componentConfig?.[component.name];

			if (!config.prodComponent) return null;

			return React.createElement(
				config.prodComponent,
				{
					key: component.id,
					id: component.id,
					name: component.name,
					styles: component.styles,
					...config.defaultProps,
					...component.props,
				},
				renderComponents(component.children || [])
			);
		});
	};

	return renderComponents(components);
};

export { Preview };
