import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Select } from "antd";
import { useComponetsStore } from "@/editor/store/components";
import { useComponentConfigStore } from "@/editor/store/component-config";
import { CSSProperties } from "react";
import { ComponentSetter } from "@/editor/store/component-config";
import { CssEditor } from "./css-editor/CssEditor";
import { debounce } from "lodash-es";
import styleToObject from "style-to-object";
import "./css-editor/index.css";

const Style = () => {
	const [form] = Form.useForm();

	const [css, setCss] = useState<string>(`.comp{\n\n}`);

	const { curComponent, updateComponentStyles } = useComponetsStore();
	const { componentConfig } = useComponentConfigStore();

	function toCSSStr(css: Record<string, unknown>) {
		let str = `.comp {\n`;
		for (const key in css) {
			let value = css[key];
			if (!value) {
				continue;
			}
			if (
				["width", "height"].includes(key) &&
				!value.toString().endsWith("px")
			) {
				value += "px";
			}

			str += `\t${key}: ${value};\n`;
		}
		str += `}`;
		return str;
	}

	useEffect(() => {
		// const data = form.getFieldsValue();
		// form.setFieldsValue({ ...data, ...curComponent?.styles });
		setCss(toCSSStr(curComponent?.styles!));
	}, [curComponent]);

	if (!curComponent) return null;

	// function renderFormElement(setting: ComponentSetter) {
	// 	const { type, options } = setting;

	// 	if (type === "select" && options instanceof Array) {
	// 		return <Select options={options} />;
	// 	} else if (type === "input") {
	// 		return <Input />;
	// 	} else if (type === "inputNumber") {
	// 		return <InputNumber />;
	// 	}
	// }

	// function valueChange(changeValues: CSSProperties) {
	// 	if (curComponent) {
	// 		updateComponentStyles(curComponent.id, changeValues);
	// 	}
	// }

	const handleEditorChange = debounce((val: string | undefined) => {
		setCss(val || "");
		if (!val) return;
		const css: Record<string, unknown> = {};

		const cssStr = val
			.replace(/\/\*.*\*\//, "") // 去掉注释 /** */
			.replace(/(\.?[^{]+{)/, "") // 去掉 .comp {
			.replace("}", ""); // 去掉 }

		styleToObject(cssStr, (name, value) => {
			css[name.replace(/-\w/, (item) => item.toUpperCase().replace("-", ""))] =
				value;
		});

		updateComponentStyles(curComponent.id, css, true);
	}, 500);

	return (
		<Form
			form={form}
			// onValuesChange={valueChange}
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 14 }}
		>
			<Form.Item label="组件id">
				<Input value={curComponent.id} disabled />
			</Form.Item>
			<Form.Item label="组件类型">
				<Input value={curComponent.desc} disabled />
			</Form.Item>
			{/* {componentConfig[curComponent.name]?.stylesSetter?.map((setter) => (
				<Form.Item key={setter.name} name={setter.name} label={setter.label}>
					{renderFormElement(setter)}
				</Form.Item>
			))} */}
			<div className="h-[200px] border-[1px] border-[#ccc]">
				<div className="flex flex-col gap-2"></div>
				<CssEditor value={css} onChange={handleEditorChange} />
			</div>
		</Form>
	);
};

export { Style };
