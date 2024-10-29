import React, { useEffect } from "react";
import { Form, Input, Select } from "antd";
import { useComponetsStore } from "@/editor/store/components";
import {
	ComponentConfig,
	useComponentConfigStore,
} from "@/editor/store/component-config";
import { ComponentSetter } from "../../../store/component-config";

const Attr = () => {
	const [form] = Form.useForm();

	const { curComponent, updateComponentProps } = useComponetsStore();

	const { componentConfig } = useComponentConfigStore();

	useEffect(() => {
		const data = form.getFieldsValue();
		form.setFieldsValue({ ...data, ...curComponent?.props });
	}, [curComponent]);

	if (!curComponent?.id) return null;

	const renderFormElement = (setting: ComponentSetter) => {
		const { type, options } = setting;

		if (type === "select" && options instanceof Array) {
			return <Select options={options}></Select>;
		} else if (type === "input") {
			return <Input />;
		}
	};

	const handleValueChange = (values: ComponentConfig) => {
		if (curComponent.id) {
			updateComponentProps(
				curComponent.id,
				values as unknown as Record<string, unknown>
			);
		}
	};

	return (
		<Form
			form={form}
			onValuesChange={handleValueChange}
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 14 }}
		>
			<Form.Item label="组件id">
				<Input value={curComponent.id} disabled />
			</Form.Item>
			<Form.Item label="组件类型">
				<Input value={curComponent.desc} disabled />
			</Form.Item>
			{componentConfig[curComponent.name]?.componentSetters?.map((setter) => (
				<Form.Item key={setter.name} name={setter.name} label={setter.label}>
					{renderFormElement(setter)}
				</Form.Item>
			))}
		</Form>
	);
};

export { Attr };
