import { Outlet } from "react-router-dom";
import SubSidbar from "@/components/SubSidbar/SubSidbar";
import { featureRoutes } from "@/routes/featuresRoutes";

const Features = () => {
  return (
    <div className="flex">
      <div>
        <SubSidbar subSidbarRoutes={featureRoutes} title="Features" />
      </div>
      <main className="min-h-[calc(100vh-4rem)] flex-1 p-2 md:p-3 lg:p-4 animate-in slide-in-from-bottom-2">
        <Outlet />
      </main>
    </div>
  );
};

export default Features;
