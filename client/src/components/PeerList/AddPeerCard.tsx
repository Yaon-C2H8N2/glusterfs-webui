import { Card } from "@/components/ui/card.tsx";

interface AddPeerCardProps {
    onClick?: () => void;
}

function AddPeerCard(props: AddPeerCardProps) {
    return (
        <div>
            <Card
                className={
                    "flex flex-col justify-center text-center min-w-60 min-h-40 h-40"
                }
                onClick={props.onClick}
            >
                <div>Add a peer</div>
                <div>+</div>
            </Card>
        </div>
    );
}

export default AddPeerCard;
export type { AddPeerCardProps };
