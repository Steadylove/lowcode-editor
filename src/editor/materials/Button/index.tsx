import { Button as AntdButton } from "antd";
import { CommonComponentProps } from "@/editor/interface";
const Button = ({ text, id, name, styles }: CommonComponentProps) => {
	return (
		<AntdButton
			data-component-name={name}
			style={styles}
			data-component-id={id}
		>
			{text as string}
		</AntdButton>
	);
};

export { Button };
