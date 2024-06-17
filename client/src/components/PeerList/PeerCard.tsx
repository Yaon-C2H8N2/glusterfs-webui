import { Card } from "@/components/ui/card.tsx";

interface PeerCardProps {
    peer: Peer;
    className?: string;
    onClick?: () => void;
}

interface Peer {
    UUID: string;
    Hostname: string;
    State: string;
}

function PeerCard(props: PeerCardProps) {
    const statusColor: { [key: string]: string } = {
        Connected: "text-green-500",
        Disconnected: "text-red-500",
    };
    const statusText: { [key: string]: string } = {
        Connected: "Connected",
        Disconnected: "Disconnected",
    };

    return (
        <Card
            className={
                "flex flex-col justify-center text-center min-w-60 min-h-40 h-40 gap-2" +
                " " +
                props.className
            }
            onClick={props.onClick}
        >
            <div className={"text-xl"}>{props.peer.Hostname}</div>
            <div className={"text-gray-400 text-xs"}>
                {"UUID : " + props.peer.UUID}
            </div>
            <div>Status :</div>
            <div className={statusColor[props.peer.State]}>
                {statusText[props.peer.State]}
            </div>
        </Card>
    );
}

export default PeerCard;
export type { PeerCardProps, Peer };
