import { Card } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";

interface VolumeCardProps {
    volume: Volume;
    className?: string;
    onClick?: () => void;
}

interface Volume {
    Name: string;
    Type: string;
    Status: string;
    Bricks: string[];
}

function VolumeCard(props: VolumeCardProps) {
    const statusColor: { [key: string]: string } = {
        active: "text-green-500",
        inactive: "text-red-500",
    };
    const statusText: { [key: string]: string } = {
        active: "Active",
        inactive: "Inactive",
    };

    return (
        <Card
            className={
                "flex flex-col justify-center text-center min-w-[30.5rem] max-w-[30.5rem] p-3 min-h-60 h-60 max-h-60 gap-2" +
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
            <div className={"text-gray-400 text-xs"}>Bricks :</div>
            <div className={"flex flex-wrap"}>
                {props.volume.Bricks.map((brick) => (
                    <Badge key={brick} className={"m-1"}>
                        {brick}
                    </Badge>
                ))}
            </div>
        </Card>
    );
}

export default VolumeCard;
export type { VolumeCardProps, Volume };
