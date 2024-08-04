import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Peer } from "@/components/PeerList/PeerCard.tsx";
import { useEffect, useState } from "react";
import { Brick } from "@/components/VolumeList/AddVolumeDialog.tsx";
import { Badge } from "@/components/ui/badge.tsx";

interface PeerDetailDialogProps {
    peer: Peer;
    onClose?: () => void;
}

function PeerDetailDialog(props: PeerDetailDialogProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [peerBricks, setPeerBricks] = useState(new Array<Brick>());

    useEffect(() => {
        fetch("/api/peer/" + props.peer.Hostname, { method: "GET" })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Failed to fetch peer details");
            })
            .then((data) => {
                setPeerBricks(data["bricks"]);
            });
    }, []);

    useEffect(() => {
        !isOpen && props.onClose && props.onClose();
    }, [isOpen]);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(openned) => {
                setIsOpen(openned);
            }}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Details</DialogTitle>
                    <DialogDescription>
                        View the details of the peer and manage its bricks.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col gap-4">
                        <div>Hostname : {props.peer.Hostname}</div>
                        <div>UUID : {props.peer.UUID}</div>
                        <div>Status : {props.peer.State}</div>
                        <div className={"flex flex-wrap gap-1"}>
                            Bricks :{" "}
                            {peerBricks.map((brick, index) => (
                                <Badge
                                    key={"brick-" + index}
                                    className={"text-[0.65rem]"}
                                >
                                    {brick.Peer.Hostname + ":" + brick.Path}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => setIsOpen(false)}>Done</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default PeerDetailDialog;
