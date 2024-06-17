import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";

interface AddPeerDialogProps {
    children?: React.ReactNode;
    onConfirm?: (hostname: string) => void;
}

function AddPeerDialog(props: AddPeerDialogProps) {
    const [hostname, setHostname] = useState<string>("");

    return (
        <Dialog>
            <DialogTrigger asChild>{props.children}</DialogTrigger>
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
                            onInput={(event) => {
                                // @ts-ignore
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
