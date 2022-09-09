import Sidebar from "@/components/Sidebar";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex w-screen h-screen overflow-x-hidden bg-carbon-700 flex-nowrap">
      <Sidebar />
    </div>
  );
};

export default Home;
