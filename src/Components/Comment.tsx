import { Component } from "solid-js";

interface CommentProps {
    username: string;
    avatarUrl: string;
    commentDate: string;
    commentText: string;
}

const Comment: Component<CommentProps> = (props) => {
    return (
        <div class="flex items-start space-x-4 p-4 border-b border-gray-200">
            <img src={props.avatarUrl} alt={`${props.username}'s avatar`} class="w-12 h-12 rounded-full object-cover" />
            <div>
                <div class="flex items-center space-x-2">
                    <h4 class="font-semibold">{props.username}</h4>
                    <span class="text-sm text-gray-500">{props.commentDate}</span>
                </div>
                <p class="mt-1 text-gray-700">{props.commentText}</p>
            </div>
        </div>
    );
}

export default Comment;
