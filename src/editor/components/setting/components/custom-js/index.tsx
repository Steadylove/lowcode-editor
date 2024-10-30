import { useState } from "react";
import MonacoEditor, { OnMount } from "@monaco-editor/react";
import { Button } from "antd";

type CustomJSProps = {
	defaultValue: string;
	onSubmit: (fun: string) => void;
};

const CustomJS = (props: CustomJSProps) => {
	const { onSubmit, defaultValue } = props;

	const [value, setValue] = useState(defaultValue);

	const handleEditorMount: OnMount = (editor, monaco) => {
		editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
			editor.getAction("editor.action.formatDocument")?.run();
		});
	};

	function codeChange(value: string = "") {
		setValue(value);
	}

	return (
		<div className="mt-[20px]">
			<div className="flex flex-col gap-3">
				<div>自定义 JS</div>
				<MonacoEditor
					width={"600px"}
					height={"300px"}
					path="action.js"
					language="javascript"
					onMount={handleEditorMount}
					onChange={codeChange}
					value={value}
					options={{
						fontSize: 14,
						scrollBeyondLastLine: false,
						minimap: {
							enabled: false,
						},
						scrollbar: {
							verticalScrollbarSize: 6,
							horizontalScrollbarSize: 6,
						},
					}}
				/>
				<Button type="primary" onClick={() => onSubmit(value)}>
					提交
				</Button>
			</div>
		</div>
	);
};

export { CustomJS };
