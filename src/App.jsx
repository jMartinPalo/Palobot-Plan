import { useRef, useState } from "react";
import Canvas from "./components/Canvas";
import Input from "./components/Imput";
import Select from "./components/Select";

import "./stylesheets/main.scss";
import { makeMap } from "./tools";
function App() {
  const [Plan, setPlan] = useState(makeMap());
  const inputRef = useRef(false);

  const HandleClick = () => {
    const roomFind = Plan.rooms.find(
      (room) => room.name === inputRef.current.value
    );
    if (roomFind) {
      Plan.robot.pos.x = roomFind.pos.x * 50;
      Plan.robot.pos.y = roomFind.pos.y * 50;
      setPlan({ ...Plan });
    }
  };
  const HandleSelect = (value) => {
    const roomFind = Plan.rooms.find((room) => room.name === value);
    if (roomFind) {
      Plan.robot.pos.x = roomFind.pos.x * 50;
      Plan.robot.pos.y = roomFind.pos.y * 50;
      setPlan({ ...Plan });
    }
  };
  if (Plan)
    return (
      <div className="App">
        <Canvas {...Plan} />
        <Input inputRef={inputRef} HandleClick={HandleClick} />
        <Select HandleSelect={HandleSelect} {...Plan} />
      </div>
    );
  else return <></>;
}

export default App;
