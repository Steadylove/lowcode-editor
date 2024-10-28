import { Button as AntdButton } from "antd";
import { CommonComponentProps } from "@/editor/interface";
const Button = ({ text, id, name }: CommonComponentProps) => {
	return (
		<AntdButton data-component-name={name} data-component-id={id}>
			{text as string}
		</AntdButton>
	);
};

export { Button };
