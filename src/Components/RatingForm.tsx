import { Component, createSignal } from "solid-js";
import Input from "./Input";
import Button from "./Button";
import { useToaster } from "../Providers/ToastProvider";

interface RatingProps {
    assetId: string;
}

const RatingForm: Component<RatingProps> = (props) => {
    const { showToast } = useToaster();
    const [score, setScore] = createSignal(0);
    const [description, setDescription] = createSignal("");

    const handleScoreChange = (value: number) => {
        setScore(value);
    };

    const onDescriptionInput = (name: string, value: string) => {
        setDescription(value);
    };

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        
        // Handle form submission
        const ratingData = {
            assetId: props.assetId,
            score: score(),
            description: description(),
        };

        // Send to API
        const response = await fetch("http://localhost:8000/ratings", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ratingData)
        })
        const responseJson = await response.json();

        if (responseJson.status === "success") {
            window.location.reload();
        }

        showToast(responseJson);
    };

    return (
        <form onSubmit={handleSubmit} class="flex flex-col p-3 rounded-lg shadow-xl w-72 font-['Nunito']">
            <div class="flex items-center gap-x-2 self-center">
                {[1, 2, 3, 4, 5].map((value) => (
                    <label>
                        <input
                            type="radio"
                            name="score"
                            value={value}
                            class="hidden"
                            checked={score() === value}
                            onChange={() => handleScoreChange(value)}
                        />
                        <i
                            class={`fa-star cursor-pointer text-2xl ${score() >= value ? "fas text-yellow-500" : "far text-gray-300"}`}
                            onClick={() => handleScoreChange(value)}
                        ></i>
                    </label>
                ))}
            </div>
            <Input 
                name="description" 
                value={description()} 
                onInput={onDescriptionInput} 
                isTextArea={true} 
                label="Describe how you feel! (Optional)"
                class="h-20"
            />
            <Button
                text="Review"
                type="submit"
                class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400"
            />
        </form>
    );
};

export default RatingForm;
