import { Tree } from "antd";
import { useComponetsStore } from "@/editor/store/components";
const Outline = () => {
	const { components, setCurComponent } = useComponetsStore();

	return (
		<Tree
			fieldNames={{ title: "desc", key: "id" }}
			treeData={components}
			showLine
			defaultExpandAll
			onSelect={([selectedKey]) => {
				setCurComponent(Number(selectedKey));
			}}
		/>
	);
};

export { Outline };
