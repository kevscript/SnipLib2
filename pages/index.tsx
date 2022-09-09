import Sidebar from "@/components/Sidebar";
import Snipbar from "@/components/Snipbar";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  return (
    <div className="flex w-screen h-screen overflow-x-hidden bg-carbon-700 flex-nowrap">
      <Sidebar />
      <Snipbar />
    </div>
  );
};

export default Home;
