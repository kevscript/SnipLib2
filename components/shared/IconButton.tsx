import { HTMLProps } from "react";
import ReactTooltip from "react-tooltip";

type IconButtonProps = {
  onClick?: () => unknown;
  scale?: "small" | "normal";
  type?: "button" | "submit" | "reset" | undefined;
  icon: JSX.Element;
  className?: string;
  tooltipId?: string;
  tooltipText?: string;
  place?: "top" | "bottom" | "left" | "right";
} & HTMLProps<HTMLButtonElement>;

const IconButton = ({
  onClick,
  icon,
  type = "button",
  scale = "normal",
  className,
  tooltipId,
  tooltipText,
  place = "bottom",
  ...restProps
}: IconButtonProps) => {
  const customStyles = scale === "small" ? "w-6 h-6" : "w-8 h-8";
  return (
    <>
      <button
        onClick={onClick}
        data-tip
        data-for={tooltipId}
        className={`flex items-center justify-center transition-all ease-out rounded cursor-pointer bg-carbon-400 group hover:scale-105 ${customStyles} ${className}`}
        {...restProps}
      >
        {icon}
      </button>
      {tooltipText && (
        <ReactTooltip
          id={tooltipId}
          place={place}
          className="!bg-black !bg-opacity-50"
        >
          <span className="text-xs">{tooltipText}</span>
        </ReactTooltip>
      )}
    </>
  );
};

export default IconButton;
