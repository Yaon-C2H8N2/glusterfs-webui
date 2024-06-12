import { Route, Routes } from "react-router";
import PeerList from "@/components/PeerList/PeerList.tsx";
import Dashboard from "@/components/Dashboard/PeerList.tsx";
import Layout from "@/components/Router/Layout.tsx";

function Router() {
    return (
        <Routes>
            <Route path={"/"} element={<Layout />}>
                <Route path={""} element={<Dashboard />} />
                <Route path={"peers"} element={<PeerList />} />
            </Route>
        </Routes>
    );
}

export default Router;
