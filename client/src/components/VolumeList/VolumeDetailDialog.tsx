import { useState } from "react";
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
import { Volume } from "@/components/VolumeList/VolumeCard.tsx";

interface VolumeDetailDialog {
    children?: React.ReactNode;
    volume: Volume;
}

function VolumeDetailDialog(props: VolumeDetailDialog) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={(openned) => setIsOpen(openned)}>
            <DialogTrigger asChild>{props.children}</DialogTrigger>
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
                        <div>Peers :</div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={() => setIsOpen(false)}>Done</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default VolumeDetailDialog;
