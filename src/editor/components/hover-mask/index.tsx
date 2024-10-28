import { getComponentById, useComponetsStore } from "@/editor/store/components";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

type HoverMaskProps = {
	mountNodeClassname: string;
	containerClassName: string;
	componentId: number;
};

const HoverMask = (props: HoverMaskProps) => {
	const { componentId, containerClassName, mountNodeClassname } = props;

	const [position, setPosition] = useState({
		left: 0,
		top: 0,
		width: 0,
		height: 0,
		labelTop: 0,
		labelLeft: 0,
	});

	const updatePosition = useCallback(() => {
		if (!componentId) {
			return;
		}

		const container = document.querySelector(`.${containerClassName}`);

		if (!container) return;

		const node = document.querySelector(`[data-component-id="${componentId}"]`);
		if (!node) return;

		const { top, left, width, height } = node.getBoundingClientRect();

		const { top: containerTop, left: containerLeft } =
			container.getBoundingClientRect();

		let labelTop = top - containerTop + container.scrollTop;

		const labelLeft = left - containerLeft + container.scrollLeft + width;

		if (labelTop <= 0) {
			labelTop -= -20;
		}

		setPosition({
			left: left - containerLeft + container.scrollLeft,
			top: top - containerTop + container.scrollTop,
			width,
			height,
			labelLeft,
			labelTop,
		});
	}, [componentId, containerClassName]);

	const { components } = useComponetsStore();

	const curComponent = useMemo(() => {
		return getComponentById(componentId, components);
	}, [componentId, components]);

	useEffect(() => {
		updatePosition();
	}, [componentId, updatePosition]);

	const el = useMemo(() => {
		const el = document.querySelector(`.${mountNodeClassname}`);
		return el;
	}, [mountNodeClassname]);

	return createPortal(
		<>
			<div
				style={{
					position: "absolute",
					left: position.left,
					top: position.top,
					backgroundColor: "rgba(0, 0, 255, 0.1)",
					border: "1px dashed blue",
					pointerEvents: "none",
					width: position.width,
					height: position.height,
					zIndex: 12,
					borderRadius: 4,
					boxSizing: "border-box",
				}}
			></div>
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
					{curComponent?.name}
				</div>
			</div>
		</>,
		el!
	);
};

export { HoverMask };
