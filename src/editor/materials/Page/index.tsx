import { useComponentConfigStore } from "@/editor/store/component-config";
import { useComponetsStore } from "@/editor/store/components";
import React, { PropsWithChildren } from "react";
import { useDrop } from "react-dnd";

const Page = ({ children }: PropsWithChildren) => {
  const { componentConfig } = useComponentConfigStore();
  const { addComponent } = useComponetsStore();
  const [{ canDrop }, drop] = useDrop(() => ({
    accept: ["Button", "Container"],
    drop: (item: { type: string }) => {
      alert(item.type);
      const props = componentConfig[item.type].defaultProps;
      addComponent({
        id: new Date().getTime(),
        name: item.type,
        props,
      });
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  }));
  return (
    <div
      ref={drop}
      className="h-full box-border p-5"
      style={{ border: canDrop ? "2px solid blue" : "none" }}
    >
      {children}
    </div>
  );
};

export { Page };
