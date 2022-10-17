import { FadeLoader } from "react-spinners";

type LoaderProps = {
  color?: string;
  height?: number;
  margin?: number;
  width?: number;
  speedMultiplier?: number;
  className?: string;
};

const Loader = ({
  color = "#175BCD",
  height = 10,
  margin = -5,
  width = 5,
  speedMultiplier = 1,
  className = "",
}: LoaderProps) => {
  return (
    <FadeLoader
      color={color}
      height={height}
      margin={margin}
      width={width}
      speedMultiplier={speedMultiplier}
      className={className}
    />
  );
};

export default Loader;
