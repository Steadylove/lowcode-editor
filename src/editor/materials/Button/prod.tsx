import { Button as AntdButton } from "antd";
import { CommonComponentProps } from "@/editor/interface";
const Button = ({ text, styles }: CommonComponentProps) => {
	return <AntdButton style={styles}>{text as string}</AntdButton>;
};

export { Button };
