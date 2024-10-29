import { create } from "zustand";
import { Button } from "../materials/Button";
import { Container } from "../materials/Container";
import { Page } from "../materials/Page";
import { FunctionComponent } from "react";
import { CommonComponentProps } from "../interface";

type SetterType = "select" | "input" | "inputNumber";

export interface ComponentSetter {
	name: string;
	label: string;
	type: SetterType;
	[key: string]: unknown;
}

export interface ComponentConfig {
	name: string;
	defaultProps: Record<string, unknown>;
	component: FunctionComponent<CommonComponentProps>;
	desc: string;
	componentSetters?: ComponentSetter[];
	stylesSetter?: ComponentSetter[];
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
			desc: "容器",
		},
		Button: {
			name: "Button",
			defaultProps: {
				text: "button",
			},
			component: Button,
			desc: "按钮",
			componentSetters: [
				{
					name: "type",
					label: "按钮类型",
					type: "select",
					options: [
						{
							label: "主按钮",
							value: "primary",
						},
						{
							label: "次按钮",
							value: "default",
						},
					],
				},
				{
					name: "text",
					label: "文本",
					type: "input",
				},
			],
			stylesSetter: [
				{
					name: "width",
					label: "宽度",
					type: "inputNumber",
				},
				{
					name: "height",
					label: "高度",
					type: "inputNumber",
				},
			],
		},
		Page: {
			name: "Page",
			defaultProps: {},
			component: Page,
			desc: "页面 ",
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
