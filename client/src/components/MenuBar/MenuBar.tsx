function MenuBar() {
    return (
        <div
            className={
                "flex flex-col gap-5 min-h-[100vh] min-w-72 w-72 bg-primary text-secondary p-10 justify-between"
            }
        >
            <div className={"flex justify-center"}>
                <img
                    src={"/gluster-ant.png"}
                    alt={"gluster logo"}
                    width={100}
                />
            </div>
            <div className={"flex flex-col gap-5 justify-center"}>
                <div>
                    <a href={"/"}>Dashboard</a>
                </div>
                <div>
                    <a href={"/peers"}>Peers</a>
                </div>
                <div>
                    <a href={"/volumes"}>Volumes</a>
                </div>
            </div>
            <div className={"flex flex-col items-center text-gray-400 text-xs"}>
                <div>Version 1.0.0</div>
                <div>© 2024 Yaon</div>
            </div>
        </div>
    );
}

export default MenuBar;
