import { Component, createSignal, Show } from "solid-js";

interface FileInputProps {
    onInput: (file: File) => void;
    class?: string;
    error?: string;
    existedFile: string| null;
}

const FileInput: Component<FileInputProps> = (props) => {
    const [preview, setPreview] = createSignal<string | null>(null);

    const handleFileChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const file = target.files?.[0];

        if (file) {
            props.onInput(file);

            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div 
            class={`flex flex-col items-center justify-center rounded-lg p-4 h-fit
                border-2 border-dashed border-gray-300 ${props.class} ${props.error ? "border-red-600" : "border-gray-500"}`}
        >
            {!preview() && !props.existedFile ? (
                <div class="flex flex-col items-center mb-4">
                    <i class="fas fa-cloud-upload-alt text-4xl text-gray-400"></i>
                    <p class="text-gray-500 mt-2">Upload Image</p>
                    <p class="text-gray-400 text-sm">image size must be less than 2MB</p>
                </div>
            ) : (
                <img src={preview() || props.existedFile} class="w-full h-full object-cover rounded-lg my-3" />
            )}
            <label class="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                Select Image
                <input type="file" accept="image/*" onChange={handleFileChange} class="hidden" />
            </label>
            <Show when={props.error}>{props.error}</Show>
        </div>
    );
};

export default FileInput;
