import { Component, Show } from "solid-js";
import { useToaster } from "../Providers/ToastProvider";

import anonym from "/Anonym.jpg?url"

interface ReviewProps {
    id: string;
    username: string;
    avatarUrl: string;
    reviewDate: string;
    description: string;
    score: number;
    owned: boolean;
}

const Review: Component<ReviewProps> = (props) => {
    const { showToast } = useToaster();

    const deleteRating = async () => {
        const response = await fetch("http://localhost:8000/ratings/" + props.id, {
            method: "DELETE",
            credentials: "include",
        })
        const responseJson = await response.json();

        showToast(responseJson);
    }

    return (
        <div class="flex items-center space-x-4 border-b border-gray-200 justify-between">
            <div class="flex items-start space-x-4 p-4">
                <img src={props.avatarUrl === "" ? anonym : props.avatarUrl} alt={`${props.username}'s avatar`} class="w-12 h-12 rounded-full object-cover" />
                <div>
                    <div class="flex items-center justify-between space-x-2">
                        <h4 class="font-semibold">{props.username}</h4>
                        <span class="text-sm text-gray-500">{new Date(props.reviewDate).toLocaleDateString()}</span>
                        <div class="flex items-center text-yellow-500">
                            <i class="fas fa-star mr-1"></i>{props.score}
                        </div>
                    </div>
                    <p class="mt-1 text-gray-700">{props.description}</p>
                </div>
            </div>
            <Show when={props.owned}>
                <i 
                    class="fa-solid fa-trash text-xl text-red-500 cursor-pointer" 
                    title="Delete review"
                    onClick={deleteRating}
                ></i>
            </Show>
        </div>
    );
}

export default Review;
