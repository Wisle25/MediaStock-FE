import { Component, createSignal, mergeProps, Show } from "solid-js";

interface InputProps {
    name: string;
    label?: string;
    type?: string;
    class?: string;
    onInput: (name: string, value: string) => void;
    value: string;
    error?: string;
    isTextArea?: boolean;
}

const Input: Component<InputProps> = (props) => {
    const mergedProps = mergeProps({ 
        type: "text", label: "Fill your answer here", isTextArea: false,
    }, props);

    // This is for animation purpose of label
    const [animateLabel, setAnimateLabel] = createSignal(false);
    const [visibleLabel, setVisibleLabel] = createSignal(false);

    const handleTransitionEnd = () => {
        if (inputValue() === "") {
            setVisibleLabel(false);
        }
    }

    // Hide and reveal password
    const [showPassword, setShowPassword] = createSignal(false);

    const togglePasswordVisibility = (e: Event) => {
        e.preventDefault();

        setShowPassword(!showPassword());
    }

    // Handling the value of input
    const [inputValue, setInputValue] = createSignal("");

    const handleInput = (e: InputEvent) => {
        const target = e.target as HTMLInputElement;
        const value  = target.value;

        // Fill the value
        setInputValue(value);

        // Call parent
        props.onInput(props.name, value);

        // Animation purpose
        if (target.value.length > 0) {
            setVisibleLabel(true);
            setTimeout(() => {
                setAnimateLabel(true);
            }, 0);
        }
        else {
            setAnimateLabel(false);
        }
    };

    return (
        <div class="flex flex-col my-4 font-['Nunito'] font-semibold">
            <label 
                for={props.name}
                class={`transition-all duration-300 transform ${animateLabel() ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${visibleLabel() ? '' : 'hidden'}`}
                onTransitionEnd={handleTransitionEnd}
            >
                {mergedProps.label}:
            </label>

            <div class="relative">
                {mergedProps.isTextArea ? (
                    <textarea 
                        name={props.name}
                        placeholder={mergedProps.label} 
                        class={`border-2 p-2 rounded-lg w-full ${props.class}
                            focus:border-primaryLighter focus:outline-none focus:border-[3px] ${props.error ? 'border-red-500' : 'border-gray-400'}`}
                        onInput={handleInput}
                        value={props.value}
                    />
                ) : (
                    <input 
                            name={props.name} 
                            type={showPassword() ? "text" : mergedProps.type}
                            placeholder={mergedProps.label} 
                            class={`border-2 p-2 rounded-lg w-full ${props.class}
                                focus:border-primaryLighter focus:outline-none focus:border-[3px] ${props.error ? 'border-red-500' : 'border-gray-400'}`}
                            onInput={handleInput}
                            value={props.value}
                    />
                )}
                {mergedProps.type == "password" && 
                    <button 
                        class={`absolute top-1/2 -translate-y-1/2 right-4 
                            text-xl hover:cursor-pointer 
                            fa-solid 
                            ${!showPassword() ? "fa-eye" : "fa-eye-slash"}`}
                        onClick={togglePasswordVisibility} 
                    />
                }
            </div>
            <Show when={props.error}><p class="text-red-500 text-sm mt-1">{props.error}</p></Show>
        </div>
    );
}

export default Input;
