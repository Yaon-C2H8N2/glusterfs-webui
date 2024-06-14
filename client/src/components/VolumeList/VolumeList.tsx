import { useEffect, useState } from "react";
import VolumeCard, { Volume } from "@/components/VolumeList/VolumeCard.tsx";

function VolumeList() {
    const [volumes, setVolumes] = useState(new Array<Volume>());

    const demoVolumes: Volume[] = [
        {
            Name: "vol1",
            Type: "replicated",
            Status: "active",
            Bricks: [
                "peer1:/data/vol1",
                "peer2:/data/vol1",
                "peer3:/data/vol1",
                "peer4:/data/vol1",
                "peer5:/data/vol1",
                "peer6:/data/vol1",
            ],
        },
        {
            Name: "vol2",
            Type: "striped",
            Status: "active",
            Bricks: ["peer1:/data/vol2", "peer2:/data/vol2"],
        },
    ];

    useEffect(() => {
        setVolumes(demoVolumes);
    }, []);

    return (
        <>
            <h1 className={"text-2xl mb-5"}>List of created volumes :</h1>
            <div className={"flex flex-wrap gap-3"}>
                {volumes.map((volume) => (
                    <VolumeCard
                        key={"volumecard-" + volume.Name}
                        className={
                            "hover:cursor-pointer hover:shadow-primary transition-shadow duration-100"
                        }
                        volume={volume}
                    />
                ))}
            </div>
        </>
    );
}

export default VolumeList;
