import { useMemo } from "react";
import { useComponentConfigStore } from "../store/component-config";
import { useDrag } from "react-dnd";

const Material = () => {
  const { componentConfig } = useComponentConfigStore();

  const components = useMemo(() => {
    return Object.values(componentConfig);
  }, [componentConfig]);

  return (
    <div>
      {components.map((item, index) => {
        return <MaterialItem name={item.name} key={item.name + index} />;
      })}
    </div>
  );
};

type MaterialItemProps = {
  name: string;
};

const MaterialItem = ({ name }: MaterialItemProps) => {
  const [_, drag] = useDrag({
    type: name,
    item: {
      type: name,
    },
  });

  return (
    <div
      ref={drag}
      className="border-dashed border border-black py-2 px-[10px] m-[10px] cursor-move inline-block bg-white hover:bg-[#ccc]"
    >
      {name}
    </div>
  );
};

export {};

export { Material };
