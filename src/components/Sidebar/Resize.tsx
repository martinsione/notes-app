import { useCallback, useEffect, useRef, useState } from "react";

export default function Resize({ children }: { children: React.ReactNode }) {
  const sidebarRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(268);

  useEffect(() => {
    setSidebarWidth(Number(localStorage.getItem("sidebarWidth")) || 268);
  }, []);

  const MIN_WIDTH = 200;
  const MAX_WIDTH = 500;

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseEvent) => {
      if (isResizing && sidebarRef.current) {
        let calc =
          // @ts-ignore
          mouseEvent.clientX - sidebarRef.current.getBoundingClientRect().left;
        // If calc < MIN_WIDTH, set to MIN_WIDTH, else if calc > MAX_WIDTH, set to MAX_WIDTH, else set to calc
        calc = Math.min(Math.max(calc, MIN_WIDTH), MAX_WIDTH);
        setSidebarWidth(calc);
        localStorage.setItem("sidebarWidth", calc.toString());
      }
    },

    [isResizing]
  );

  console.log(sidebarWidth);

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <div
      ref={sidebarRef}
      className="w-full bg-neutral-50 flex justify-between shadow-md"
      style={{ width: sidebarWidth }}
      onMouseDown={(e) => e.preventDefault()}
    >
      {children}
      <div
        className="w-1 flex-grow-0 flex-shrink-0 resize-y cursor-ew-resize hover:bg-neutral-200"
        onMouseDown={startResizing}
      />
    </div>
  );
}
