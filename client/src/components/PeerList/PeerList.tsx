import { useEffect, useState } from "react";
import PeerCard, { Peer } from "@/components/PeerList/PeerCard.tsx";
import AddPeerCard from "@/components/PeerList/AddPeerCard.tsx";
import AddPeerDialog from "@/components/PeerList/AddPeerDialog.tsx";
import PeerDetailDialog from "@/components/PeerList/PeerDetailDialog.tsx";

function PeerList() {
    const [peers, setPeers] = useState(new Array<Peer>());

    useEffect(() => {
        fetch("/api/peers", { method: "GET" })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Failed to fetch peers");
            })
            .then((data) => {
                setPeers(data["peers"]);
            });
    }, []);

    const handleProbe = (hostname: string) => {
        fetch("/api/peers/probe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ hostname: hostname }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Failed to probe peer");
            })
            .then(() => {
                fetch("/api/peers", { method: "GET" })
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error("Failed to fetch peers");
                    })
                    .then((data) => {
                        setPeers(data["peers"]);
                    });
            });
    };

    return (
        <>
            <h1 className={"text-2xl mb-5"}>List of connected peers :</h1>
            <div className={"flex flex-wrap gap-3"}>
                {peers.map((peer) => (
                    <PeerDetailDialog
                        key={"peerdialog-" + peer.UUID}
                        peer={peer}
                    >
                        <PeerCard
                            key={"peercard-" + peer.UUID}
                            className={
                                "hover:cursor-pointer hover:shadow-primary transition-shadow duration-100"
                            }
                            peer={peer}
                        />
                    </PeerDetailDialog>
                ))}
                <AddPeerDialog onConfirm={(hostname) => handleProbe(hostname)}>
                    <AddPeerCard
                        className={
                            "hover:cursor-pointer hover:shadow-primary transition-shadow duration-100"
                        }
                    />
                </AddPeerDialog>
            </div>
        </>
    );
}

export default PeerList;
