import { Component, createSignal } from "solid-js";
import anonym from "/Anonym.jpg?url"
import { useToaster } from "../Providers/ToastProvider";
import Input from "./Input";
import Button from "./Button";

interface CommentProps {
    id: string;
    username: string;
    avatarUrl: string;
    commentDate: string;
    commentText: string;
    owned: boolean;
}

const Comment: Component<CommentProps> = (props) => {
    const { showToast } = useToaster();

    const [isEditing, setIsEditing] = createSignal(false);
    const [updatedText, setUpdatedText] = createSignal(props.commentText);

    const onUpdatedInput = (name: string, value: string) => {
        setUpdatedText(value);
    }

    const handleEdit = async (e: Event) => {
        e.preventDefault();

        // Send request to server to edit comment
        const response = await fetch("http://localhost:8000/comments/" + props.id, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content: updatedText() })
        });
        const responseJson = await response.json();
        if (responseJson.status === "success") {
            window.location.reload();
        }
    };

    const handleRemove = async () => {
        const response = await fetch("http://localhost:8000/comments/" + props.id, {
            method: "DELETE",
            credentials: "include"
        })
        const responseJson = await response.json();
        if (responseJson.status === "success") {
            window.location.reload();
        }
    };

    return (
        <div class="flex items-start space-x-4 p-4 border-b border-gray-200 relative">
            <img src={props.avatarUrl === "" ? anonym : props.avatarUrl} alt={`${props.username}'s avatar`} class="w-12 h-12 rounded-full object-cover" />
            <div>
                <div class="flex items-center space-x-2">
                    <h4 class="font-semibold">{props.username}</h4>
                    <span class="text-sm text-gray-500">{new Date(props.commentDate).toLocaleDateString()}</span>
                </div>
                {isEditing() ? (
                    <form onSubmit={handleEdit}>
                        <Input
                            name="content"
                            value={updatedText()}
                            onInput={onUpdatedInput}
                            isTextArea={true}
                        />
                        <div class="flex space-x-2 mt-2">
                            <Button 
                                text="Save"
                                type="submit"
                            />
                            <Button 
                                text="Cancel"
                                type="button"
                                onClick={() => setIsEditing(false)} 
                                class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" 
                            />
                        </div>
                    </form>
                ) : (
                    <p class="mt-1 text-gray-700">{props.commentText}</p>
                )}
            </div>
            {props.owned && (
                <div class="absolute right-4 top-4 flex space-x-2 text-xl">
                    <i 
                        title="Edit Comment"
                        class="fa-solid fa-pen-to-square cursor-pointer hover:text-yellow-600 text-yellow-500"
                        onClick={() => setIsEditing(true)}
                    ></i>
                    <i 
                        title="Remove comment"
                        class="fa-solid fa-trash text-red-500 cursor-pointer hover:text-red-700"
                        onClick={handleRemove}
                    ></i>
                </div>
            )}
        </div>
    );
}

export default Comment;
