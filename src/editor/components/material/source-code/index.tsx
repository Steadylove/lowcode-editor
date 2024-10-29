import { useComponetsStore } from "@/editor/store/components";
import MonacoEditor, { OnMount } from "@monaco-editor/react";

const SourceCode = () => {
	const { components } = useComponetsStore();

	const handleEditorMount: OnMount = (editor, monaco) => {
		editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
			editor.getAction("editor.action.formatDocument")?.run();
		});
	};

	return (
		<MonacoEditor
			height={"100%"}
			path="components.json"
			language="json"
			onMount={handleEditorMount}
			value={JSON.stringify(components, null, 2)}
			options={{
				readOnly: true,
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
	);
};

export { SourceCode };
