import { Card } from "@/components/ui/card.tsx";

interface AddVolumeCardProps {
    className?: string;
    onClick?: () => void;
}

function AddVolumeCard(props: AddVolumeCardProps) {
    return (
        <div>
            <Card
                className={
                    "flex flex-col justify-center text-center min-w-60 max-w-60 min-h-40 max-h-40 gap-2" +
                    " " +
                    props.className
                }
                onClick={props.onClick}
            >
                <div>Create a volume</div>
                <div>+</div>
            </Card>
        </div>
    );
}

export default AddVolumeCard;
export type { AddVolumeCardProps };
