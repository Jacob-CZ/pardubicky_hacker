import { useProgress } from "@react-three/drei";
import { Progress } from "./ui/progress";

export default function Loading() {
    const progress = useProgress();
    return (
        <>
        {progress.progress !== 100 && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-black z-50 flex items-center justify-center">
            <Progress value={progress.progress} />
        </div>
        ) }
        </>
    );
    }