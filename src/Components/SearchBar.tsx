import { Component } from "solid-js";

interface SearchBarProps {
    isSidebarOpen: boolean;
    toggleSidebar: (e: Event) => void;
}

const SearchBar: Component<SearchBarProps> = (props) => {
    const isSidebarOpen = () => props.isSidebarOpen;

    return (
        <div class="flex items-center gap-x-2 py-3 px-10 border-y border-gray-300">
            {/* Filter Button */}
            {!isSidebarOpen() && 
                <button class="flex items-center justify-center p-2 border border-gray-300 rounded-full"
                    onClick={props.toggleSidebar}
                >
                    <i class="fas fa-sliders-h"></i>
                    <span class="ml-2">Filter</span>
                </button>
            }
            
            {/* Search Input */}
            <div class="flex items-center flex-grow border border-gray-300 rounded-full px-3 py-2 bg-gray-100">
                <i class="fas fa-search text-gray-500"></i>
                <input 
                    type="text" 
                    placeholder="Search for the asset you want" 
                    class="flex-grow ml-2 outline-none bg-transparent text-gray-700"
                />
            </div>
            
            {/* Sort By Dropdown */}
            <div class="relative flex items-center">
                <button class="flex items-center justify-center p-2 border border-gray-300 rounded-full">
                    <span class="mr-2">Sort by</span>
                    <span>Recommended</span>
                    <i class="fas fa-chevron-down ml-2"></i>
                </button>
                {/* You can add a dropdown menu here if needed */}
            </div>
        </div>
    );
}

export default SearchBar;
