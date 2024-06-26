import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Volume } from "@/components/VolumeList/VolumeCard.tsx";
import { Pause, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";

interface VolumeDetailDialog {
    volume: Volume;
    onAction?: (action: string) => void;
    onClose?: () => void;
}

function VolumeDetailDialog(props: VolumeDetailDialog) {
    const [isOpen, setIsOpen] = useState(true);

    const isControlDisabled = (status: string) => {
        return ["Stopping...", "Starting..."].includes(status);
    };

    useEffect(() => {
        !isOpen && props.onClose && props.onClose();
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={(openned) => setIsOpen(openned)}>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Details</DialogTitle>
                    <DialogDescription>
                        View the details of the volume and manage its peers and
                        bricks.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-4">
                        <div>Name : {props.volume.Name}</div>
                        <div>Type : {props.volume.Type}</div>
                        <div>Status : {props.volume.Status}</div>
                        <div>
                            <div className={"flex flex-wrap gap-1"}>
                                Peers :
                                {props.volume.Bricks.map((brick, index) => {
                                    return (
                                        <Badge
                                            key={"brick-" + index}
                                            className={"text-[0.65rem]"}
                                        >
                                            {brick.Peer.Hostname +
                                                ":" +
                                                brick.Path}
                                        </Badge>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        disabled={
                            props.volume.Status === "Started" ||
                            isControlDisabled(props.volume.Status)
                        }
                        onClick={() =>
                            props.onAction && props.onAction("start")
                        }
                    >
                        <Play size={14} />
                    </Button>
                    <Button
                        disabled={
                            props.volume.Status === "Stopped" ||
                            props.volume.Status === "Created" ||
                            isControlDisabled(props.volume.Status)
                        }
                        variant={"destructive"}
                        onClick={() => props.onAction && props.onAction("stop")}
                    >
                        <Pause size={14} />
                    </Button>
                    <Button onClick={() => setIsOpen(false)}>Done</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default VolumeDetailDialog;
