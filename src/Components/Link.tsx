import { A, AnchorProps } from "@solidjs/router";
import { Component, mergeProps } from "solid-js";

interface LinkProps extends AnchorProps {
    color?: string
    hoverColor?: string
}

const Link: Component<LinkProps> = (props) => {
    const color = mergeProps({ 
        color: "text-blue-500",
        hoverColor: "text-primaryLighter" 
    }, props);

    return (
        <A 
        {...props}
        class={`${color.color} transition-colors duration-300 hover:cursor-pointer hover:${color.hoverColor} ${props.class}`}
        >
            {props.children}
        </A>
    )
}

export default Link;
