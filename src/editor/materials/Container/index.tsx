import React, { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren;

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="border-[1px] border-black min-h-screen p-5">{children}</div>
  );
};

export { Container };
