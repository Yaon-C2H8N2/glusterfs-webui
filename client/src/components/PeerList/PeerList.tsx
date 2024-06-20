import { useEffect, useState } from "react";
import PeerCard, { Peer } from "@/components/PeerList/PeerCard.tsx";
import AddPeerCard from "@/components/PeerList/AddPeerCard.tsx";
import AddPeerDialog from "@/components/PeerList/AddPeerDialog.tsx";
import PeerDetailDialog from "@/components/PeerList/PeerDetailDialog.tsx";

function PeerList() {
    const [peers, setPeers] = useState(new Array<Peer>());
    const [peerInDetail, setPeerInDetail] = useState<Peer | null>(null);
    const [openAddPeerDialog, setOpenAddPeerDialog] = useState(false);

    const fetchPeers = () => {
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
    };

    useEffect(() => {
        fetchPeers();
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
                fetchPeers();
                setOpenAddPeerDialog(false);
            });
    };

    return (
        <>
            <h1 className={"text-2xl mb-5"}>List of connected peers :</h1>
            <div className={"flex flex-wrap gap-3"}>
                {peerInDetail && (
                    <PeerDetailDialog
                        peer={peerInDetail}
                        onClose={() => setPeerInDetail(null)}
                    />
                )}
                {peers.map((peer) => (
                    <PeerCard
                        key={"peercard-" + peer.UUID}
                        className={
                            "hover:cursor-pointer hover:shadow-primary transition-shadow duration-100"
                        }
                        peer={peer}
                        onClick={() => {
                            setPeerInDetail(peer);
                        }}
                    />
                ))}
                {openAddPeerDialog && (
                    <AddPeerDialog
                        onConfirm={(hostname) => handleProbe(hostname)}
                        onClose={() => setOpenAddPeerDialog(false)}
                    />
                )}
                <AddPeerCard
                    className={
                        "hover:cursor-pointer hover:shadow-primary transition-shadow duration-100"
                    }
                    onClick={() => setOpenAddPeerDialog(true)}
                />
            </div>
        </>
    );
}

export default PeerList;
