import { useComponentConfigStore } from "@/editor/store/component-config";
import { useComponetsStore } from "@/editor/store/components";
import { Button, Modal } from "antd";
import { useState } from "react";
import { CustomJS } from "./custom-js";

const Event = () => {
	const { curComponent, updateComponentAction } = useComponetsStore();
	const { componentConfig } = useComponentConfigStore();

	const [modalVisible, setModalVisible] = useState(false);

	const [editingEvent, setEditingEvent] = useState<string | null>(null);

	if (!curComponent) return null;

	const events = componentConfig[curComponent.name]?.events || [];

	return (
		<div className="flex flex-col gap-4">
			<Modal
				width={700}
				open={modalVisible}
				footer={null}
				onCancel={() => {
					setEditingEvent(null);
					setModalVisible(false);
				}}
				onClose={() => {
					setEditingEvent(null);
					setModalVisible(false);
				}}
				closable
			>
				<CustomJS
					onSubmit={(val) => {
						updateComponentAction(curComponent.id, {
							event: editingEvent!,
							code: val,
						});
						setModalVisible(false);
						setEditingEvent(null);
					}}
					defaultValue={
						curComponent.actions.find((i) => i.event === editingEvent)?.code ||
						""
					}
				/>
			</Modal>
			{events.map((event) => (
				<div
					className="flex gap-5 items-center justify-center"
					key={event.name}
				>
					<div>{event.label}</div>
					<Button
						type="primary"
						onClick={() => {
							setModalVisible(true);
							setEditingEvent(event.name);
						}}
					>
						{curComponent.actions.find((i) => i.event === event.name)?.code
							? "编辑事件"
							: "添加事件"}
					</Button>
				</div>
			))}
		</div>
	);
};

export { Event };
