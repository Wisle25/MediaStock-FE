import { Component, createSignal, mergeProps, onCleanup, createEffect, onMount } from "solid-js";

interface ToasterProps {
    timer?: number;
    status: string;
    message: string;
    onClose: () => void;
}

const Toaster: Component<ToasterProps> = (props) => {
    const finalProps = mergeProps({ timer: 3000 }, props);

    // Handling Progress
    const [progress, setProgress] = createSignal(0);
    const [visible, setVisible] = createSignal(false);
    const intervalDuration = finalProps.timer / 100;

    const progressInterval = setInterval(() => {
        setProgress((prev) => (prev < 100 ? prev + 1 : 0));
    }, intervalDuration);

    // Show toaster and start progress
    onMount(() => {
        setTimeout(() => setVisible(true), 10); // Small delay to trigger transition
    });

    createEffect(() => {
        if (progress() >= 100) {
            setVisible(false);
            clearInterval(progressInterval);
            setTimeout(props.onClose, 200); // Delay removal to allow exit animation
        }
    });

    onCleanup(() => clearInterval(progressInterval));

    // Determine styles based on status
    const bgColor = finalProps.status === "success" ? "bg-green-500" : "bg-red-500";
    const title = finalProps.status === "success" ? "Success" : "Failed";
    const progressBarColor = finalProps.status === "success" ? "bg-green-700" : "bg-red-700";
    const progressBarBgColor = finalProps.status === "success" ? "bg-green-100" : "bg-red-100";

    return (
        <div
            class={`text-white text-2xl font-['Nunito'] font-bold text-center
            p-5 ${bgColor} rounded-lg flex flex-col items-center w-fit justify-center
            fixed top-0 left-1/2 transform -translate-x-1/2 transition-all duration-200
            ${visible() ? "translate-y-12" : "-translate-y-full"}`}
            style="z-index: 50;">
            {/* Title */}
            <h1>{title}</h1>

            {/* Message */}
            <section class="flex items-center gap-x-4 w-full justify-center">
                <i class={`fa-solid ${finalProps.status === "success" ? "fa-circle-check" : "fa-circle-exclamation"} text-2xl`}></i>
                <p class="text-sm">{finalProps.message}</p>
            </section>

            {/* Progress */}
            <section class={`absolute bottom-0 rounded-bl-lg rounded-br-lg w-full ${progressBarBgColor} h-2`}>
                <div
                    class={`${progressBarColor} h-full rounded-bl-lg rounded-br-lg`}
                    style={`width: ${progress()}%`}
                ></div>
            </section>
        </div>
    );
};

export default Toaster;
