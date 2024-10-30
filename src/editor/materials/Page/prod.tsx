import { CommonComponentProps } from "../../interface";

const Page = ({ children, styles }: CommonComponentProps) => {
	return <div style={styles}>{children}</div>;
};

export { Page };
