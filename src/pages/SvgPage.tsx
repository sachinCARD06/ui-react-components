import SubSidbar from "@/components/SubSidbar/SubSidbar";
import { svgsRoutes } from "@/routes/svgsRoutes";
import { Outlet } from "react-router-dom";

const SvgPage = () => {
  return (
    <div className="flex">
      <div>
        <SubSidbar subSidbarRoutes={svgsRoutes} title="Svgs" />
      </div>
      <main className="min-h-[calc(100vh-4rem)] flex-1 p-2 md:p-3 lg:p-4 animate-in slide-in-from-bottom-2">
        <Outlet />
      </main>
    </div>
  );
};

export default SvgPage;
