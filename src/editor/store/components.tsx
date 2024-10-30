import { CSSProperties } from "react";
import { create } from "zustand";

export interface ComponentAction {
	event: string;
	code: string;
}

export interface Component {
	id: number;
	name: string;
	props: Record<string, unknown>;
	children?: Component[];
	parentId?: number;
	desc: string;
	styles?: CSSProperties;
	actions: ComponentAction[];
}

interface State {
	mode: "edit" | "preview";
	components: Component[];
	curComponent: Component | null;
}

interface Action {
	updateComponent: (json: Component[]) => void;
	addComponent: (component: Component, parentId?: number) => void;
	deleteComponent: (componentId: number) => void;
	updateComponentProps: (
		componentId: number,
		props: Record<string, unknown>
	) => void;
	updateComponentStyles: (
		componentId: number,
		styles: CSSProperties,
		replace?: boolean
	) => void;
	updateComponentAction: (componentId: number, action: ComponentAction) => void;
	setCurComponent: (componentId?: number) => void;
	setMode: (mode: State["mode"]) => void;
}

export const useComponetsStore = create<State & Action>((set, get) => ({
	mode: "edit",
	components: [
		{
			id: new Date().getTime(),
			name: "Page",
			props: {},
			desc: "页面",
			actions: [],
		},
	],
	curComponent: null,
	updateComponent: (json) => {
		const components = json as Component[];
		set(() => ({
			components,
		}));
	},
	addComponent: (component, parentId) =>
		set((state) => {
			if (parentId) {
				const parentComponent = getComponentById(parentId, state.components);

				if (parentComponent) {
					if (parentComponent.children) {
						parentComponent.children.push(component);
					} else {
						parentComponent.children = [component];
					}
				}

				component.parentId = parentId;
				return { components: [...state.components] };
			}
			return { components: [...state.components, component] };
		}),

	deleteComponent: (componentId) => {
		const component = getComponentById(componentId, get().components);
		if (component?.parentId) {
			const parentComponent = getComponentById(
				component.parentId,
				get().components
			);

			if (parentComponent) {
				parentComponent.children = parentComponent?.children?.filter(
					(item) => item.id !== +componentId
				);

				set({ components: [...get().components] });
			}
		}
	},

	updateComponentStyles: (componentId, styles, replace) => {
		set((state) => {
			const component = getComponentById(componentId, state.components);
			if (!component) return state;
			if (replace) {
				component.styles = styles;
			} else {
				component.styles = { ...component.styles, ...styles };
			}
			return { components: [...state.components] };
		});
	},

	updateComponentAction: (componentId, action) => {
		set((state) => {
			const component = getComponentById(componentId, state.components);
			if (!component) return state;

			const { code, event } = action;
			if (!component.actions.find((i) => i.event === event)) {
				component.actions.push({
					event,
					code,
				});
			} else {
				component.actions.find((i) => i.event === event)!.code = code;
			}

			return { components: [...state.components] };
		});
	},

	updateComponentProps: (componentId, props) =>
		set((state) => {
			const component = getComponentById(componentId, state.components);
			if (component) {
				component.props = { ...component.props, ...props };

				return { components: [...state.components] };
			}

			return { components: [...state.components] };
		}),

	/**
	 * Set active component
	 * @param id
	 */
	setCurComponent: (id) => {
		set((state) => ({
			curComponent: id ? getComponentById(id, state.components) : null,
		}));
	},

	setMode: (mode) => {
		set({
			mode,
		});
	},
}));

export function getComponentById(
	id: number | null,
	components: Component[]
): Component | null {
	if (!id) return null;

	for (const component of components) {
		if (component.id == id) return component;
		if (component.children && component.children.length > 0) {
			const result = getComponentById(id, component.children);
			if (result !== null) return result;
		}
	}
	return null;
}
