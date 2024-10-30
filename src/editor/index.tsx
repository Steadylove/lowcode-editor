import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { EditArea } from "./components/setting/components/editArea";
import { MaterialWrapper } from "./components/material";
import { Setting } from "./components/setting";
import { useComponetsStore } from "./store/components";
import { Preview } from "./components/preview";
import { Button } from "antd";

export default function LowcodeEditor() {
	const { mode, setMode } = useComponetsStore();

	return (
		<div className="h-screen flex flex-col">
			<div className="h-[60px] border-b border-black flex items-center px-5 justify-between">
				<div>Q lowcode</div>
				<div>
					<Button
						type="primary"
						onClick={() => setMode(mode === "edit" ? "preview" : "edit")}
					>
						{mode === "edit" ? "预览" : "退出预览"}
					</Button>
				</div>
			</div>
			{mode === "edit" ? (
				<Allotment>
					<Allotment.Pane preferredSize={240} maxSize={500} minSize={200}>
						<MaterialWrapper />
					</Allotment.Pane>
					<Allotment.Pane>
						<EditArea />
					</Allotment.Pane>
					<Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
						<Setting />
					</Allotment.Pane>
				</Allotment>
			) : (
				<Preview />
			)}
		</div>
	);
}
