import { createContext, useContext, Component, createSignal, ParentProps, For } from "solid-js";
import Toaster from "../Components/Toaster";

interface Toast {
    message: string;
    status: string;
    id: number;
}

interface ToasterContextType {
    showToast: (toast: Omit<Toast, 'id'>) => void;
}

const ToasterContext = createContext<ToasterContextType>();

export const ToasterProvider: Component<ParentProps> = (props) => {
    const [toasts, setToasts] = createSignal<Toast[]>([]);
    let toastId = 0;

    const showToast = (toast: Omit<Toast, 'id'>) => {
        const id = toastId++;
        setToasts((prev) => [...prev, { ...toast, id }]);
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToasterContext.Provider value={{ showToast }}>
            {props.children}
            <For each={toasts()}>
                {(toast) => (
                    <Toaster
                        status={toast.status}
                        message={toast.message}
                        onClose={() => removeToast(toast.id)}
                    />
                )}
            </For>
        </ToasterContext.Provider>
    );
};

export const useToaster = () => {
    return useContext(ToasterContext);
};
