import { Button as ShadcnButton } from "@/components/ui/button";

import { CommonComponentProps } from "@/editor/interface";
const Button = ({ text, id, name }: CommonComponentProps) => {
	return (
		<ShadcnButton data-component-name={name} data-component-id={id}>
			{text as string}
		</ShadcnButton>
	);
};

export { Button };
