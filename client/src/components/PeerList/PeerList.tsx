import { useEffect, useState } from "react";
import PeerCard, { Peer } from "@/components/PeerList/PeerCard.tsx";
import AddPeerCard from "@/components/PeerList/AddPeerCard.tsx";

function PeerList() {
    const [peers, setPeers] = useState(new Array<Peer>());

    const demoPeers: Peer[] = [
        {
            UUID: "1",
            Hostname: "peer1",
            State: "active",
        },
        {
            UUID: "2",
            Hostname: "peer2",
            State: "inactive",
        },
        {
            UUID: "3",
            Hostname: "peer3",
            State: "active",
        },
        {
            UUID: "4",
            Hostname: "peer4",
            State: "active",
        },
        {
            UUID: "5",
            Hostname: "peer5",
            State: "active",
        },
    ];

    useEffect(() => {
        setPeers(demoPeers);
    }, []);

    return (
        <>
            <h1 className={"text-2xl mb-5"}>List of connected peers :</h1>
            <div className={"flex flex-wrap gap-3"}>
                {peers.map((peer) => (
                    <PeerCard peer={peer} />
                ))}
                <AddPeerCard />
            </div>
        </>
    );
}

export default PeerList;
