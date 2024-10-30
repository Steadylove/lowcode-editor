import { CommonComponentProps } from "@/editor/interface";

const Container = ({ children, styles }: CommonComponentProps) => {
	return (
		<div className={`min-h-[100px] p-5`} style={styles}>
			{children}
		</div>
	);
};

export { Container };
