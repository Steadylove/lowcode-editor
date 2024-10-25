import { Button as ShadcnButton } from "@/components/ui/button";

type ButtonProps = {
  text: string;
};

const Button = ({ text }: ButtonProps) => {
  return <ShadcnButton>{text}</ShadcnButton>;
};

export { Button };
