import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.tsx";
import { Peer } from "@/components/PeerList/PeerCard.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Brick } from "@/components/VolumeList/AddVolumeDialog.tsx";

interface BrickTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    hosts?: Peer[];
    onAdd?: (brick: Brick) => void;
}

export function BrickTable<TData, TValue>({
    columns,
    data,
    hosts,
    onAdd,
}: BrickTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const [isAdding, setIsAdding] = useState(false);
    const [selectedPeer, setSelectedPeer] = useState<Peer>();
    const [brickPath, setBrickPath] = useState<string>();

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            className={"group"}
                        >
                            {row.getVisibleCells().map((cell) => {
                                return (
                                    <TableCell
                                        key={cell.id}
                                        className={
                                            cell.column.id === "actions"
                                                ? "flex justify-end"
                                                : ""
                                        }
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext(),
                                        )}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                    <TableRow>
                        {isAdding ? (
                            <TableCell colSpan={columns.length}>
                                <div className={"grid grid-cols-6 gap-2"}>
                                    <div className={"grid col-span-2"}>
                                        <Select
                                            onValueChange={(value) =>
                                                setSelectedPeer(
                                                    hosts?.find(
                                                        (host) =>
                                                            host.Hostname ===
                                                            value,
                                                    ),
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a peer" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {hosts?.map((host) => (
                                                    <SelectItem
                                                        key={host && host.UUID}
                                                        value={
                                                            host &&
                                                            host.Hostname
                                                        }
                                                    >
                                                        {host && host.Hostname}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className={"grid col-span-2"}>
                                        <Input
                                            placeholder={"brick path"}
                                            onInput={(event) =>
                                                setBrickPath(
                                                    // @ts-ignore
                                                    event.target["value"],
                                                )
                                            }
                                        />
                                    </div>
                                    <Button
                                        className="w-full"
                                        disabled={!selectedPeer || !brickPath}
                                        onClick={() => {
                                            if (selectedPeer && brickPath) {
                                                const brick = {
                                                    peer: selectedPeer,
                                                    path: brickPath,
                                                };
                                                onAdd && onAdd(brick);
                                            }
                                            setIsAdding(false);
                                            setBrickPath(undefined);
                                            setSelectedPeer(undefined);
                                        }}
                                    >
                                        Confirm
                                    </Button>
                                    <Button
                                        className="w-full"
                                        variant={"destructive"}
                                        onClick={() => {
                                            setIsAdding(false);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </TableCell>
                        ) : (
                            <TableCell colSpan={columns.length}>
                                <Button
                                    className="w-full"
                                    onClick={() => {
                                        setIsAdding(true);
                                    }}
                                >
                                    Add brick
                                </Button>
                            </TableCell>
                        )}
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
