import { Allotment } from "allotment";
import "allotment/dist/style.css";
import { EditArea } from "./components/editArea";
import { Material } from "./components/material";

export default function LowcodeEditor() {
  return (
    <div className="h-screen flex flex-col">
      <div className="h-[60px] border-b border-black flex items-center">
        header
      </div>
      <Allotment>
        <Allotment.Pane preferredSize={240} maxSize={300} minSize={200}>
          <Material />
        </Allotment.Pane>
        <Allotment.Pane>
          <EditArea />
        </Allotment.Pane>
        <Allotment.Pane preferredSize={300} maxSize={500} minSize={300}>
          Setting
        </Allotment.Pane>
      </Allotment>
    </div>
  );
}
