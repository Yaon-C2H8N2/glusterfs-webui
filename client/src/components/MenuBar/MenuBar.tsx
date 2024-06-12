function MenuBar() {
    return (
        <div
            className={
                "flex flex-col gap-5 min-h-[100vh] min-w-72 w-72 bg-primary text-secondary p-10 justify-center"
            }
        >
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
    );
}

export default MenuBar;
