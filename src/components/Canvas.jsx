import { useEffect, useRef } from "react";
import { drawCanvas } from "../tools";

function Canvas({ rooms, robot }) {
  const canvasRef = useRef(null);
  const size = { width: 1200, height: 800 };
  const requestIdRef = useRef(null);
  const tick = () => {
    if (!canvasRef.current) return;
    drawCanvas(canvasRef.current, rooms, robot);
    requestIdRef.current = requestAnimationFrame(tick);
  };
  useEffect(() => {
    requestIdRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
  });
  return <canvas {...size} ref={canvasRef}></canvas>;
}
export default Canvas;
