import { Card } from "@/components/ui/card.tsx";

interface AddPeerCardProps {
    className?: string;
    onClick?: () => void;
}

function AddPeerCard(props: AddPeerCardProps) {
    return (
        <div>
            <Card
                className={
                    "flex flex-col justify-center text-center min-w-60 min-h-40 h-40" +
                    " " +
                    props.className
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
