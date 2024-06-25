import React, { useMemo } from "react";
import { toast } from "sonner";
import { Volume } from "@/components/VolumeList/VolumeCard.tsx";
import { Peer } from "@/components/PeerList/PeerCard.tsx";

interface EventListenerProps {
    children?: React.ReactNode;
}

interface VolumeEvent {
    Volume: Volume;
    Type: string;
}

interface PeerEvent {
    Peer: Peer;
    Type: string;
}

interface Event {
    value: VolumeEvent | PeerEvent;
}

function EventListener(props: EventListenerProps) {
    const socket = useMemo(() => {
        return new WebSocket("ws://localhost:8083/events/socket");
    }, []);

    const eventMessages = {
        volume: {
            create: "has been created",
            delete: "has been deleted",
            start: "has been started",
            stop: "has been stopped",
        },
        peer: {
            probed: "probed",
            removed: "has been removed",
            connected: "got connected to the cluster",
            disconnected: "got disconnected from the cluster",
        },
    };

    socket.onmessage = (e) => {
        const event: Event = { value: JSON.parse(e.data) };
        const description =
            "Peer" in event.value
                ? "Peer " +
                  event.value.Peer.Hostname +
                  " " +
                  // @ts-ignore
                  eventMessages.peer[event.value.Type]
                : "Volume " +
                  event.value.Volume.Name +
                  " " +
                  // @ts-ignore
                  eventMessages.volume[event.value.Type];

        toast("New notification received !", {
            description: description,
            closeButton: true,
        });
    };

    return props.children;
}

export default EventListener;
export type { EventListenerProps };
