import { Route, Routes } from "react-router";
import PeerList from "@/components/PeerList/PeerList.tsx";
import Dashboard from "@/components/Dashboard/Dashboard.tsx";
import Layout from "@/components/Router/Layout.tsx";
import VolumeList from "@/components/VolumeList/VolumeList.tsx";

function Router() {
    return (
        <Routes>
            <Route path={"/"} element={<Layout />}>
                <Route path={""} element={<Dashboard />} />
                <Route path={"peers"} element={<PeerList />} />
                <Route path={"volumes"} element={<VolumeList />} />
            </Route>
        </Routes>
    );
}

export default Router;
