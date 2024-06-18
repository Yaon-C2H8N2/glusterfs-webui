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
import { useEffect, useState } from "react";
import { BrickTable } from "@/components/VolumeList/BrickTable.tsx";
import { Peer } from "@/components/PeerList/PeerCard.tsx";
import { ColumnDef } from "@tanstack/react-table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";

interface AddVolumeDialogProps {
    children?: React.ReactNode;
    onConfirm?: () => void;
}

type Brick = {
    peer: Peer;
    path: string;
};

function AddVolumeDialog(props: AddVolumeDialogProps) {
    const [bricks, setBricks] = useState<Brick[]>([]);
    const [availableHosts, setAvailableHosts] = useState<Peer[]>([]);
    const typeOptions = ["Distributed", "Replicated"];

    const columns: ColumnDef<Brick>[] = [
        {
            accessorKey: "peer",
            header: "Peer",
            cell: ({ row }) => row.original.peer.Hostname,
        },
        {
            accessorKey: "path",
            header: "Bricks",
        },
    ];

    useEffect(() => {
        const dummyHosts: Peer[] = [
            {
                UUID: "1",
                Hostname: "peer1",
                State: "Connected",
            },
            {
                UUID: "2",
                Hostname: "peer2",
                State: "Connected",
            },
        ];
        setAvailableHosts(dummyHosts);
    }, []);

    const handleAddBrick = (brick: Brick) => {
        setBricks([...bricks, brick]);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{props.children}</DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                    <DialogTitle>Create volume</DialogTitle>
                    <DialogDescription>
                        Create a glusterfs volume by providing the peers that
                        will host the volume and setting the volume's name and
                        type.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-center">
                            Name
                        </Label>
                        <Input id="name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-center">
                            Type
                        </Label>
                        <div id="type" className="col-span-3">
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {typeOptions.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <BrickTable
                        columns={columns}
                        data={bricks}
                        hosts={availableHosts}
                        onAdd={handleAddBrick}
                    />
                </div>
                <DialogFooter>
                    <Button
                        onClick={() => props.onConfirm && props.onConfirm()}
                    >
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AddVolumeDialog;
export type { AddVolumeDialogProps, Brick };
