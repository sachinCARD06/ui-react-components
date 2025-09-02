import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Components } from "./pages/Components";
import Features from "./pages/Features";
import JoyridePage from "./pages/JoyridePage";
import FolderFileExplorer from "./pages/FolderFileExplorer";
import ScrollToTop from "./components/ScrollToTop";
import SvgPage from "./pages/SvgPage";
import AnimatedBeam from "./pages/AnimatedBeam";
import FrontendRoadmap from "./pages/FrontendRoadmap";
import IpAddresses from "./pages/IpAddresses";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="ui-components" element={<Components />} />
          <Route path="features" element={<Features />}>
            <Route path="joyride" element={<JoyridePage />} />
            <Route path="explorer" element={<FolderFileExplorer />} />
            <Route path="ip-addresses" element={<IpAddresses />} />
          </Route>
          <Route path="svgs" element={<SvgPage />}>
            <Route path="animated-beam" element={<AnimatedBeam />} />
            <Route path="frontend-roadmap" element={<FrontendRoadmap />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
