import React, { useState } from "react";
import { Segmented } from "antd";
import { Material } from "./Material";
import { Outline } from "./outline";
import { SourceCode } from "./source-code";

const OPTIONS = [
	{
		key: "material",
		label: "物料",
	},
	{
		key: "code",
		label: "源码",
	},
	{
		key: "outline",
		label: "大纲",
	},
] as const;

const MaterialWrapper = () => {
	const [activeKey, setActiveKey] =
		useState<(typeof OPTIONS)[number]["key"]>("material");

	return (
		<div className="w-full h-full flex flex-col gap-4">
			<Segmented
				onChange={setActiveKey}
				value={activeKey}
				block
				options={OPTIONS.map((item) => ({ ...item, value: item.key }))}
			></Segmented>
			<div className="h-0 grow overflow-y-auto p-4">
				{activeKey === "material" && <Material />}
				{activeKey === "code" && <SourceCode />}
				{activeKey === "outline" && <Outline />}
			</div>
		</div>
	);
};

export { MaterialWrapper };
