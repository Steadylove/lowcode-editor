import { useState } from "react";
import { useComponetsStore } from "../../store/components";
import { Segmented } from "antd";
import { Attr } from "./components/Attr";
import { Style } from "./components/Style";
import { Event } from "./components/Event";

const SETTING_OPTIONS = [
	{
		value: "attr",
		label: "属性",
	},
	{
		value: "style",
		label: "样式",
	},
	{
		value: "event",
		label: "事件",
	},
] as const;

const Setting = () => {
	const { components, curComponent } = useComponetsStore();

	const componentId = curComponent?.id;

	const [activeValue, setActiveValue] = useState<
		(typeof SETTING_OPTIONS)[number]["value"]
	>(SETTING_OPTIONS[0].value);

	return (
		<div className="w-full h-full flex flex-col">
			<Segmented
				block
				className="w-full"
				value={activeValue}
				onChange={setActiveValue}
				options={[...SETTING_OPTIONS]}
			></Segmented>
			<div className="h-0 grow overflow-y-auto p-4">
				{activeValue === "attr" && <Attr></Attr>}
				{activeValue === "style" && <Style></Style>}
				{activeValue === "event" && <Event></Event>}
			</div>
		</div>
	);
};

export { Setting };
