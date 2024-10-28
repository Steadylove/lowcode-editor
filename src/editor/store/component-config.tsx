import { create } from "zustand";
import { Button } from "../materials/Button";
import { Container } from "../materials/Container";
import { Page } from "../materials/Page";
import { FunctionComponent } from "react";
import { CommonComponentProps } from "../interface";

export interface ComponentConfig {
	name: string;
	defaultProps: Record<string, unknown>;
	component: FunctionComponent<CommonComponentProps>;
}

interface State {
	componentConfig: { [key: string]: ComponentConfig };
}

interface Action {
	registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

/**
 * 存放当前注册的组件种类
 */
export const useComponentConfigStore = create<State & Action>((set) => ({
	componentConfig: {
		Container: {
			name: "Container",
			defaultProps: {},
			component: Container,
		},
		Button: {
			name: "Button",
			defaultProps: {
				text: "按钮",
			},
			component: Button,
		},
		Page: {
			name: "Page",
			defaultProps: {},
			component: Page,
		},
	},
	registerComponent: (name, componentConfig) =>
		set((state) => {
			return {
				...state,
				componentConfig: {
					...state.componentConfig,
					[name]: componentConfig,
				},
			};
		}),
}));
