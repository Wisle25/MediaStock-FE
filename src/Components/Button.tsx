import { Component, JSX, mergeProps, Show } from "solid-js";

interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string,
    icon?: string,
    isFull?: boolean,
}

const Button: Component<ButtonProps> = (props) => {
    const mergedProps = mergeProps({ isFull: true, type: "button" }, props);

    return (
        <button
            {...mergedProps}
            class={`${mergedProps.class} bg-blue-500 p-2 rounded-lg hover:bg-blue-600 text-center
            font-['Nunito'] font-bold text-white text-lg ${mergedProps.isFull ? "w-full" : "w-fit"}`}
        >
            <Show when={props.icon}>
                <i class={`${props.icon} mr-2`}></i>
            </Show>
            {props.text}
        </button>
    )
}

export default Button;
