import { useSearchParams } from "@solidjs/router";
import { Component, createSignal, onCleanup, onMount } from "solid-js";

interface SearchBarProps {
    isSidebarOpen: boolean;
    toggleSidebar: (e: Event) => void;
}

const SearchBar: Component<SearchBarProps> = (props) => {
    const [isDropdownOpen, setDropdownOpen] = createSignal(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen());

    const handleSortChange = (option: string) => {
        setSearchParams({ ...searchParams, sort: option });
        setDropdownOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (!(event.target as HTMLElement).closest('.sort-dropdown')) {
            setDropdownOpen(false);
        }
    };

    const searchAsset = (e: Event) => {
        const target = e.target as HTMLInputElement;
        setSearchParams({ ...searchParams, search: target.value });
    }

    onMount(() => {
        document.addEventListener('mousedown', handleClickOutside);
    });

    onCleanup(() => {
        document.removeEventListener('mousedown', handleClickOutside);
    });

    return (
        <div class="flex items-center gap-x-2 py-3 px-10 border-y border-gray-300">
            {!props.isSidebarOpen && 
                <button class="flex items-center justify-center p-2 border border-gray-300 rounded-full" onClick={props.toggleSidebar}>
                    <i class="fas fa-sliders-h"></i>
                    <span class="ml-2">Filter</span>
                </button>
            }
            <div class="flex items-center flex-grow border border-gray-300 rounded-full px-3 py-2 bg-gray-100">
                <i class="fas fa-search text-gray-500"></i>
                <input 
                    type="text" 
                    placeholder="Search for the asset you want" 
                    class="flex-grow ml-2 outline-none bg-transparent text-gray-700"
                    onInput={searchAsset}
                />
            </div>
            <div class="relative flex items-center sort-dropdown">
                <button class="flex items-center justify-center p-2 border border-gray-300 rounded-full" onClick={toggleDropdown}>
                    <span class="mr-2">Sort by</span>
                    <span>{searchParams.sort}</span>
                    <i class={`fas fa-chevron-down ml-2 ${isDropdownOpen() ? "rotate-180" : ""}`}></i>
                </button>
                {isDropdownOpen() && (
                    <div class="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        <ul>
                            <li class="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSortChange("Recommended")}>Recommended</li>
                            <li class="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSortChange("Newest")}>Newest</li>
                            <li class="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSortChange("Oldest")}>Oldest</li>
                            <li class="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSortChange("PriceLow")}>Price: Low to High</li>
                            <li class="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSortChange("PriceHigh")}>Price: High to Low</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchBar;
