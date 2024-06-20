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
import { Trash2 } from "lucide-react";

interface AddVolumeDialogProps {
    children?: React.ReactNode;
    onConfirm?: (volume: Object) => void;
    onClose?: () => void;
}

type Brick = {
    Peer: Peer;
    Path: string;
};

function AddVolumeDialog(props: AddVolumeDialogProps) {
    const [bricks, setBricks] = useState<Brick[]>([]);
    const [volumeName, setVolumeName] = useState<string>("");
    const [volumeType, setVolumeType] = useState<string>("");
    const [availableHosts, setAvailableHosts] = useState<Peer[]>([]);
    const [isOpen, setIsOpen] = useState(true);
    const typeOptions = [
        {
            value: "distribute",
            label: "Distribute",
        },
        {
            value: "replicate",
            label: "Replicate",
        },
    ];

    const columns: ColumnDef<Brick>[] = [
        {
            accessorKey: "peer",
            header: "Peer",
            cell: ({ row }) => row.original.Peer.Hostname,
        },
        {
            accessorKey: "path",
            header: "Bricks",
        },
        {
            accessorKey: "actions",
            header: "",
            cell: ({ row }) => (
                <Button
                    className={
                        "group-hover:visible invisible opacity-0 group-hover:opacity-100 transition duration-300"
                    }
                    variant={"destructive"}
                    onClick={() =>
                        setBricks(
                            bricks.filter(
                                (brick) =>
                                    brick.Peer.UUID !== row.original.Peer.UUID,
                            ),
                        )
                    }
                >
                    <Trash2 size={14} />
                </Button>
            ),
        },
    ];

    useEffect(() => {
        fetch("/api/peers", { method: "GET" })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Failed to fetch peers");
            })
            .then((data) => {
                setAvailableHosts(data["peers"]);
            });
    }, []);

    useEffect(() => {
        !isOpen && props.onClose && props.onClose();
    }, [isOpen]);

    const handleAddBrick = (brick: Brick) => {
        setBricks([...bricks, brick]);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(openned) => setIsOpen(openned)}>
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
                        <Input
                            id="name"
                            className="col-span-3"
                            onChange={(event) =>
                                setVolumeName(event.target.value)
                            }
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="type" className="text-center">
                            Type
                        </Label>
                        <div id="type" className="col-span-3">
                            <Select
                                onValueChange={(value) => setVolumeType(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {typeOptions.map((type) => (
                                        <SelectItem
                                            key={type.value}
                                            value={type.value}
                                            disabled={
                                                type.value !== "replicate"
                                            }
                                        >
                                            {type.value !== "replicate"
                                                ? type.label +
                                                  " (Not implemented)"
                                                : type.label}
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
                        disabled={!volumeName || !volumeType || !bricks.length}
                        onClick={() => {
                            props.onConfirm &&
                                props.onConfirm({
                                    name: volumeName,
                                    type: volumeType,
                                    bricks: bricks,
                                });
                        }}
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
