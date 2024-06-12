function MenuBar() {
    return (
        <div className={"flex flex-col gap-5 min-h-[100vh] justify-center"}>
            <div>
                <a href={"/"}>Dashboard</a>
            </div>
            <div>
                <a href={"/peers"}>Peers</a>
            </div>
            <div>
                <a href={"/peers"}>Volumes</a>
            </div>
        </div>
    );
}

export default MenuBar;
