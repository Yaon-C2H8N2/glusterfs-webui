import { useEffect, useState } from "react";
import VolumeCard, { Volume } from "@/components/VolumeList/VolumeCard.tsx";
import VolumeDetailDialog from "@/components/VolumeList/VolumeDetailDialog.tsx";
import AddVolumeCard from "@/components/VolumeList/AddVolumeCard.tsx";
import AddVolumeDialog from "@/components/VolumeList/AddVolumeDialog.tsx";

function VolumeList() {
    const [volumes, setVolumes] = useState(new Array<Volume>());
    const [volumeInDetail, setVolumeInDetail] = useState<Volume | null>(null);
    const [openCreateVolumeDialog, setOpenCreateVolumeDialog] = useState(false);

    const fetchVolumes = () => {
        fetch("/api/volumes", { method: "GET" })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Failed to fetch volumes");
            })
            .then((data) => {
                setVolumes(data["volumes"] ?? []);
            });
    };

    useEffect(() => {
        fetchVolumes();
    }, []);

    useEffect(() => {
        volumes.forEach((volume) => {
            volumeInDetail &&
                volumeInDetail.Name === volume.Name &&
                setVolumeInDetail(volume);
        });
    }, [volumes]);

    const handleVolumeCreate = (volume: Object) => {
        fetch("/api/volumes/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(volume),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Failed to probe peer");
            })
            .then(() => {
                fetchVolumes();
                setOpenCreateVolumeDialog(false);
            });
    };

    const handleVolumeUpdate = (volume: Volume, action: string) => {
        let volIndex = volumes.findIndex((v) => v.Name === volume.Name);
        volumes[volIndex].Status =
            action === "start" ? "Starting..." : "Stopping...";
        setVolumes([...volumes]);
        fetch(`/api/volumes/${volume.Name}/${action}`, {
            method: "GET",
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Failed to update volume");
            })
            .then(() => {
                fetchVolumes();
            });
    };

    return (
        <>
            <h1 className={"text-2xl mb-5"}>List of created volumes :</h1>
            <div className={"flex flex-wrap gap-3"}>
                {volumeInDetail && (
                    <VolumeDetailDialog
                        volume={volumeInDetail}
                        key={"volume-" + volumeInDetail.Name}
                        onAction={(action) =>
                            handleVolumeUpdate(volumeInDetail, action)
                        }
                        onClose={() => setVolumeInDetail(null)}
                    />
                )}
                {volumes.map((volume) => (
                    <VolumeCard
                        key={"volumecard-" + volume.Name}
                        className={
                            "hover:cursor-pointer hover:shadow-primary transition-shadow duration-100"
                        }
                        volume={volume}
                        onClick={() => {
                            setVolumeInDetail(volume);
                        }}
                    />
                ))}
                {openCreateVolumeDialog && (
                    <AddVolumeDialog
                        onConfirm={(volume) => {
                            handleVolumeCreate(volume);
                        }}
                        onClose={() => setOpenCreateVolumeDialog(false)}
                    />
                )}
                <AddVolumeCard
                    className={
                        "hover:cursor-pointer hover:shadow-primary transition-shadow duration-100"
                    }
                    onClick={() => setOpenCreateVolumeDialog(true)}
                />
            </div>
        </>
    );
}

export default VolumeList;
