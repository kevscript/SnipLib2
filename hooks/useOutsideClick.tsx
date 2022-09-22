import React, { useEffect } from "react";

type useOutsideClickArgs = {
  ref: React.RefObject<HTMLElement>;
  action: () => unknown;
};

const useOutsideClick = ({ ref, action }: useOutsideClickArgs) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        action();
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, action]);
};

export default useOutsideClick;
