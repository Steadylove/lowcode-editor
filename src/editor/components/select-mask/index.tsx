import { getComponentById, useComponetsStore } from "@/editor/store/components";
import React, { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { Popconfirm, Space, Dropdown } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useResizeObserver } from "@/editor/hooks/useResizeObserver";

type SelectMaskProps = {
	mountNodeClassname: string;
	containerClassname: string;
};

const SelectMask = (props: SelectMaskProps) => {
	const { mountNodeClassname, containerClassname } = props;

	const { components, curComponent, setCurComponent, deleteComponent } =
		useComponetsStore();

	const curComponentId = curComponent?.id;

	const [position, setPosition] = useState({
		left: 0,
		top: 0,
		width: 0,
		height: 0,
		labelTop: 0,
		labelLeft: 0,
	});

	const updatePosition = () => {
		if (!curComponentId) return;

		const container = document.querySelector(`.${containerClassname}`);
		if (!container) return;

		const node = document.querySelector(
			`[data-component-id="${curComponentId}"]`
		);
		if (!node) return;

		const { top, left, width, height } = node.getBoundingClientRect();
		const { top: containerTop, left: containerLeft } =
			container.getBoundingClientRect();

		let labelTop = top - containerTop + container.scrollTop;
		const labelLeft = left - containerLeft + width;

		if (labelTop <= 0) {
			labelTop -= -20;
		}

		setPosition({
			top: top - containerTop + container.scrollTop,
			left: left - containerLeft + container.scrollTop,
			width,
			height,
			labelTop,
			labelLeft,
		});
	};

	useEffect(() => {
		updatePosition();
	}, [curComponentId, components]);

	const el = useMemo(() => {
		return document.querySelector(`.${mountNodeClassname}`)!;
	}, []);

	const handleDelete = () => {
		if (!curComponent?.id) return;
		deleteComponent(curComponent?.id);
		setCurComponent();
	};

	const parentComponents = useMemo(() => {
		const parentComponents = [];
		let component = curComponent;
		while (component?.parentId) {
			component = getComponentById(component.parentId!, components);
			parentComponents.push(component!);
		}
		return parentComponents;
	}, [curComponent, components]);

	useResizeObserver(updatePosition);

	return createPortal(
		<>
			<div
				style={{
					position: "absolute",
					left: position.left,
					top: position.top,
					backgroundColor: "rgba(90, 90, 239, 0.3)",
					border: "1px dashed blue",
					pointerEvents: "none",
					width: position.width,
					height: position.height,
					zIndex: 12,
					borderRadius: 4,
					boxSizing: "border-box",
				}}
			/>
			<div
				style={{
					position: "absolute",
					left: position.labelLeft,
					top: position.labelTop,
					fontSize: "14px",
					zIndex: 13,
					display: !position.width || position.width < 10 ? "none" : "inline",
					transform: "translate(-100%, -100%)",
				}}
			>
				<Space>
					<Dropdown
						menu={{
							items: parentComponents.map((item) => ({
								key: item.id,
								label: item.name,
							})),
							onClick: ({ key }) => {
								setCurComponent(getComponentById(+key, components)!.id);
							},
						}}
						disabled={parentComponents.length === 0}
					>
						<div
							style={{
								padding: "0 8px",
								backgroundColor: "blue",
								borderRadius: 4,
								color: "#fff",
								cursor: "pointer",
								whiteSpace: "nowrap",
							}}
						>
							{curComponent?.desc}
						</div>
					</Dropdown>
					{curComponent?.name !== "Page" && (
						<div style={{ padding: "0 8px", backgroundColor: "blue" }}>
							<Popconfirm
								title="确认删除？"
								okText={"确认"}
								cancelText={"取消"}
								onConfirm={handleDelete}
							>
								<DeleteOutlined style={{ color: "#fff" }} />
							</Popconfirm>
						</div>
					)}
				</Space>
			</div>
		</>,
		el
	);
};

export { SelectMask };
