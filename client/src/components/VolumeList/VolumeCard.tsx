import { Card } from "@/components/ui/card.tsx";
import { Brick } from "@/components/VolumeList/AddVolumeDialog.tsx";

interface VolumeCardProps {
    volume: Volume;
    className?: string;
    onClick?: () => void;
}

interface Volume {
    Name: string;
    Type: string;
    Status: string;
    Bricks: Brick[];
}

function VolumeCard(props: VolumeCardProps) {
    const statusColor: { [key: string]: string } = {
        Started: "text-green-500",
        Stopped: "text-red-500",
        Created: "text-orange-500",
    };
    const statusText: { [key: string]: string } = {
        Started: "Started",
        Stopped: "Stopped",
        Created: "Created",
    };

    return (
        <Card
            className={
                "flex flex-col justify-center text-center min-w-60 max-w-60 min-h-40 max-h-40 gap-2 " +
                " " +
                props.className
            }
            onClick={props.onClick}
        >
            <div className={"text-xl"}>{props.volume.Name}</div>
            <div className={"text-gray-400 text-xs"}>
                {"Type : " + props.volume.Type}
            </div>
            <div className={"flex gap-2 justify-center"}>
                <div>Status :</div>
                <div className={statusColor[props.volume.Status]}>
                    {statusText[props.volume.Status]}
                </div>
            </div>
        </Card>
    );
}

export default VolumeCard;
export type { VolumeCardProps, Volume };
