import { Component, createSignal } from "solid-js";
import Input from "./Input";
import Button from "./Button";
import { useToaster } from "../Providers/ToastProvider";

interface CommentProps {
    assetId: string;
}

const CommentForm: Component<CommentProps> = (props) => {
    const { showToast } = useToaster();
    const [commentText, setCommentText] = createSignal("");

    const handleInput = (name: string, value: string) => {
        setCommentText(value);
    };

    const addComment = async (e: Event) => {
        e.preventDefault();

        // Handle form submission
        const commentData = {
            assetId: props.assetId,
            content: commentText(),
        };

        // Send request to server to add comment
        const response = await fetch("http://localhost:8000/comments", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentData)
        });
        const responseJson = await response.json();

        showToast(responseJson);
        
        // Reset form after submission
        setCommentText("");
    };

    return (
        <form onSubmit={addComment} class="flex flex-col p-3 rounded-lg mx-auto shadow-xl w-full font-['Nunito']">
            <h3 class="font-bold text-xl">Leave a Comment</h3>
            <Input
                name="comment"
                label="Write your comment here..."
                class="h-28"
                value={commentText()}
                onInput={handleInput}
                isTextArea={true}
            />
            <Button
                text="Add Comment"
                type="submit"
                class="self-end"
                isFull={false}
            />
        </form>
    );
};

export default CommentForm;
