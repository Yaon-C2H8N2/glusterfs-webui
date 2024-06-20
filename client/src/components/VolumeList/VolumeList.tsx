import { useEffect, useState } from "react";
import VolumeCard, { Volume } from "@/components/VolumeList/VolumeCard.tsx";
import VolumeDetailDialog from "@/components/VolumeList/VolumeDetailDialog.tsx";
import AddVolumeCard from "@/components/VolumeList/AddVolumeCard.tsx";
import AddVolumeDialog from "@/components/VolumeList/AddVolumeDialog.tsx";

function VolumeList() {
    const [volumes, setVolumes] = useState(new Array<Volume>());

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
            });
    };

    return (
        <>
            <h1 className={"text-2xl mb-5"}>List of created volumes :</h1>
            <div className={"flex flex-wrap gap-3"}>
                {volumes.map((volume) => (
                    <VolumeDetailDialog
                        volume={volume}
                        key={"volume-" + volume.Name}
                    >
                        <VolumeCard
                            key={"volumecard-" + volume.Name}
                            className={
                                "hover:cursor-pointer hover:shadow-primary transition-shadow duration-100"
                            }
                            volume={volume}
                        />
                    </VolumeDetailDialog>
                ))}
                <AddVolumeDialog
                    onConfirm={(volume) => {
                        console.log(volume);
                        handleVolumeCreate(volume);
                    }}
                >
                    <AddVolumeCard
                        className={
                            "hover:cursor-pointer hover:shadow-primary transition-shadow duration-100"
                        }
                    />
                </AddVolumeDialog>
            </div>
        </>
    );
}

export default VolumeList;
