import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useEffect, useState } from "react";

interface AddPeerDialogProps {
    onConfirm?: (hostname: string) => void;
    onClose?: () => void;
}

function AddPeerDialog(props: AddPeerDialogProps) {
    const [hostname, setHostname] = useState<string>("");
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
                    <DialogTitle>Add peer</DialogTitle>
                    <DialogDescription>
                        Add a peer to the cluster by providing the peer's
                        hostname.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="hostname" className="text-right">
                            Hostname
                        </Label>
                        <Input
                            id="hostname"
                            className="col-span-3"
                            onChange={(event) => {
                                setHostname(event.target.value);
                            }}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        onClick={() =>
                            props.onConfirm && props.onConfirm(hostname)
                        }
                    >
                        Probe
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AddPeerDialog;
export type { AddPeerDialogProps };
