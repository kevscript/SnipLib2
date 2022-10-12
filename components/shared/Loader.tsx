import { FadeLoader } from "react-spinners";

const Loader = () => {
  return (
    <FadeLoader
      color="#175BCD"
      height={10}
      margin={-5}
      width={5}
      speedMultiplier={1}
    />
  );
};

export default Loader;
