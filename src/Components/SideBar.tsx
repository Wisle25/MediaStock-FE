import { Component, createSignal, onCleanup, onMount, Show } from "solid-js";

interface SidebarProps {
    toggleSidebar: (e: Event) => void;
}

const Sidebar: Component<SidebarProps> = (props) => {
    const [categoryOpen, setCategoryOpen] = createSignal(false);
    const [typeOpen, setTypeOpen] = createSignal(false);
    const [isHidden, setHidden] = createSignal(true);
    const [animateOpen, setAnimateOpen] = createSignal(false);

    const ToggleHide = () => {
        if (isHidden()) {
            setHidden(false);
            setTimeout(() => {
                setAnimateOpen(true);
            }, 0);
        }
        else {
            setAnimateOpen(false);
        }
    }

    const onClosingTransitionEnd = () => {
        if (!animateOpen()) {
            setHidden(true);
        }
    }

    onMount(ToggleHide);

    return (
        <aside 
            class={`flex flex-col p-4 bg-white rounded-lg shadow-md w-64 h-full 
            transition-transform transform duration-75 ${animateOpen() ? "translate-x-0" : "-translate-x-full"} ${isHidden() ? "hidden" : ""}`}
            onTransitionEnd={onClosingTransitionEnd}>

            {/* Filter Header */}
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-semibold flex items-center gap-2">
                    <i class="fas fa-sliders-h"></i> Filter
                </h2>
                <button onClick={props.toggleSidebar}>
                    <i class="fas fa-chevron-left"></i>
                </button>
            </div>

            {/* Filter Buttons */}
            <div class="flex flex-col gap-2 mb-4">
                <button class="py-2 px-4 border rounded-full text-center hover:bg-gray-100">ALL</button>
                <button class="py-2 px-4 border rounded-full text-center hover:bg-gray-100">IMAGE</button>
                <button class="py-2 px-4 border rounded-full text-center hover:bg-gray-100">VIDEO</button>
                <button class="py-2 px-4 border rounded-full text-center hover:bg-gray-100">AUDIO</button>
            </div>

            {/* Category Section */}
            <div class="mb-4">
                <div class="flex items-center justify-between cursor-pointer" onClick={() => setCategoryOpen(!categoryOpen())}>
                    <h3 class="text-lg font-semibold flex items-center gap-2">
                        <i class="fas fa-th"></i> Category
                    </h3>
                    <i class={`fas ${categoryOpen() ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                </div>
                <Show when={categoryOpen()}>
                    <div class="mt-2">
                        <label class="flex items-center mb-2">
                            <input type="radio" name="category" class="mr-2" /> Panorama
                        </label>
                        <label class="flex items-center mb-2">
                            <input type="radio" name="category" class="mr-2" /> City and Architecture
                        </label>
                        <label class="flex items-center mb-2">
                            <input type="radio" name="category" class="mr-2" /> Peoples and Portraits
                        </label>
                        <label class="flex items-center mb-2">
                            <input type="radio" name="category" class="mr-2" /> Foods and Drink
                        </label>
                        <label class="flex items-center mb-2">
                            <input type="radio" name="category" class="mr-2" /> Animals
                        </label>
                        <label class="flex items-center mb-2">
                            <input type="radio" name="category" class="mr-2" /> Object
                        </label>
                    </div>
                </Show>
            </div>

            {/* Type Section */}
            <div class="mb-4">
                <div class="flex items-center justify-between cursor-pointer" onClick={() => setTypeOpen(!typeOpen())}>
                    <h3 class="text-lg font-semibold flex items-center gap-2">
                        <i class="fas fa-tags"></i> Type
                    </h3>
                    <i class={`fas ${typeOpen() ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                </div>
                <Show when={typeOpen()}>
                    <div class="mt-2">
                        <label class="flex items-center mb-2">
                            <input type="radio" name="type" class="mr-2" /> All Type
                        </label>
                        <label class="flex items-center mb-2">
                            <input type="radio" name="type" class="mr-2" /> Regular Asset
                        </label>
                        <label class="flex items-center mb-2">
                            <input type="radio" name="type" class="mr-2" /> Premium Asset
                        </label>
                    </div>
                </Show>
            </div>
        </aside>
    );
};

export default Sidebar;