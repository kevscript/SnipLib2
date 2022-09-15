import Sidebar from "../Sidebar";

export type SidebarWrapperProps = {
  children: React.ReactNode;
};

const SidebarWrapper = ({ children }: SidebarWrapperProps) => {
  return (
    <div className="flex w-screen h-screen overflow-x-hidden bg-carbon-700 flex-nowrap">
      <Sidebar />
      {children}
    </div>
  );
};

export default SidebarWrapper;
