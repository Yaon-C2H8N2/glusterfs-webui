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

interface PeerDetailDialogProps {
    peer: Peer;
    onClose?: () => void;
}

function PeerDetailDialog(props: PeerDetailDialogProps) {
    const [isOpen, setIsOpen] = useState(true);

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
                        <div>Bricks : </div>
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
