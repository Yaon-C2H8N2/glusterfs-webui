import { Outlet } from "react-router";
import MenuBar from "@/components/MenuBar/MenuBar.tsx";
import { Toaster } from "@/components/ui/sonner.tsx";

function Layout() {
    return (
        <>
            <div className={"flex gap-5"}>
                <MenuBar />
                <div className={"max-h-[90vh] mt-[5vh] justify-center"}>
                    <Outlet />
                    <Toaster />
                </div>
            </div>
        </>
    );
}

export default Layout;
