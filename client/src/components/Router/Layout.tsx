import { Outlet } from "react-router";
import MenuBar from "@/components/MenuBar/MenuBar.tsx";

function Layout() {
    return (
        <>
            <div className={"flex gap-5"}>
                <MenuBar />
                <div className={"max-h-[90vh] mt-[5vh] justify-center"}>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;
