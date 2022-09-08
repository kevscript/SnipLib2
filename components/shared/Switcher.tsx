import { useState } from "react";

const Switcher = () => {
  const id = "switcher";
  const [active, setActive] = useState(false);
  return (
    <>
      <input
        className="sr-only group"
        id={id}
        type="checkbox"
        checked={active}
        readOnly
      />
      <label
        className="relative flex items-center justify-between w-8 h-4 transition-all rounded-full cursor-pointer bg-carbon-300"
        htmlFor={id}
        onClick={() => setActive((x) => !x)}
      >
        <div
          className={`absolute transition-all bg-white rounded-full top-[2px] w-3 h-3 drop-shadow-sm ${
            active ? "left-[18px]" : "left-[2px]"
          }`}
        ></div>
      </label>
    </>
  );
};

export default Switcher;
