import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Peer } from "@/components/PeerList/PeerCard.tsx";
import { useState } from "react";

interface PeerDetailDialogProps {
    children?: React.ReactNode;
    peer: Peer;
}

function PeerDetailDialog(props: PeerDetailDialogProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={(openned) => setIsOpen(openned)}>
            <DialogTrigger asChild>{props.children}</DialogTrigger>
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
