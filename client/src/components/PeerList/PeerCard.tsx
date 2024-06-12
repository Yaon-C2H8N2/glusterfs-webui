import { Card } from "@/components/ui/card.tsx";

interface PeerCardProps {
    peer: Peer;
    onClick?: () => void;
}

interface Peer {
    UUID: string;
    Hostname: string;
    State: string;
}

function PeerCard(props: PeerCardProps) {
    const statusColor =
        props.peer.State === "active" ? "text-green-500" : "text-red-500";
    const statusText = props.peer.State === "active" ? "Active" : "Inactive";

    return (
        <Card
            className={
                "flex flex-col justify-center text-center min-w-60 min-h-40 h-40 gap-2"
            }
            onClick={props.onClick}
        >
            <div className={"text-xl"}>{props.peer.Hostname}</div>
            <div className={"text-gray-400 text-xs"}>
                {"UUID : " + props.peer.UUID}
            </div>
            <div>Status :</div>
            <div className={statusColor}>{statusText}</div>
        </Card>
    );
}

export default PeerCard;
export type { PeerCardProps, Peer };
