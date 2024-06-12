import { Outlet } from "react-router";
import MenuBar from "@/components/MenuBar/MenuBar.tsx";

function Layout() {
    return (
        <>
            <div className={"flex gap-5"}>
                <MenuBar />
                <Outlet />
            </div>
        </>
    );
}

export default Layout;
