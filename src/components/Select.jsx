import { useRef, useState } from "react";

function Select({ rooms, HandleSelect }) {
  const selectRef = useRef(null);
  const [Open, setOpen] = useState(false);
  return (
    <div className="Select" data-open={Open} ref={selectRef}>
      <div
        className="value"
        onClick={() => {
          setOpen(!Open);
        }}
      >
        Choisir un Piece
      </div>
      <div className="list">
        <ul>
          {rooms.map((room, index) => {
            return (
              <li
                key={index}
                onClick={(event) => {
                  HandleSelect(event.currentTarget.textContent);
                  setOpen(!Open);
                }}
              >
                {room.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default Select;
