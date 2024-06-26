import { Component, createResource, createSignal, For } from "solid-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import Card from "../Components/Card";
import SearchBar from "../Components/SearchBar";
import Sidebar from "../Components/SideBar";
import { useAuth } from "../Providers/AuthProvider";

const Store: Component = () => {
    const { loggedUser } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Pagination
    const [page, setPage] = createSignal(parseInt(searchParams.page) || 1);
    const [items] = createSignal(24);

    // Fetch assets function
    const fetchAssets = async () => {
        const response = await fetch(
            `https://helpful-serenity-production.up.railway.app/assets?listCount=${items()}&pageList=${page()}&sortBy=${searchParams.sort}${searchParams.search ? "&search=" + searchParams.search : ""}${searchParams.category ? "&category=" + searchParams.category : ""}${loggedUser() ? "&userId=" + loggedUser().id : ""}`
        );
        const responseJson = await response.json();

        if (responseJson.status === "success") {
            return responseJson.data;
        }

        throw new Error("There is an error!");
    };

    // Create resource with fetcher function and dependencies
    const [assets] = createResource(() => [searchParams.sort, searchParams.search, searchParams.category, page()], fetchAssets);

    // SideBar
    const [isSidebarOpen, setSidebarOpen] = createSignal(false);
    const toggleSiderbar = (e: Event) => {
        e.preventDefault();
        setSidebarOpen(!isSidebarOpen());
    };

    // To detail
    const toDetailAsset = (id: string) => {
        navigate("/asset/" + id);
    };

    return (
        <>
            {isSidebarOpen() && <Sidebar toggleSidebar={toggleSiderbar} />}

            <main class="w-full">
                <SearchBar
                    toggleSidebar={toggleSiderbar}
                    isSidebarOpen={isSidebarOpen()}
                />

                <h1 class="text-center font-['Teko'] font-bold text-4xl mt-5">Store</h1>
                <p class="text-center font-['Nunito'] text-sm">Looking for awesome store? Here you can find a bunch!</p>

                <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-5 gap-x-2 p-5 mt-5 h-[50rem] overflow-y-auto">
                    {assets.loading && <p>Please wait...</p>}
                    {assets.error && <p>There is an error!</p>}
                    <For each={assets()} fallback={<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">Assets not found!</div>}>
                        {(item) => (
                            <Card
                                id={item.id}
                                title={item.title}
                                ownerUsername={item.ownerUsername}
                                description={item.description}
                                category={item.category}
                                imageUrl={item.filePath}
                                favoriteCount={item.favoriteCount}
                                isFavorite={item.isFavorite}
                                rating={item.rating}
                                onClick={toDetailAsset}
                            />
                        )}
                    </For>
                </section>

                {/* Pagination Controls */}
                <div class="flex justify-center absolute mt-10 left-1/2 -translate-x-1/2 bottom-5">
                    <button 
                        class="px-4 py-2 mx-2 bg-blue-500 text-white rounded" 
                        onClick={() => setPage(page() - 1)}
                        disabled={page() === 1}
                    >
                        Previous
                    </button>
                    <button 
                        class="px-4 py-2 mx-2 bg-blue-500 text-white rounded" 
                        onClick={() => setPage(page() + 1)}
                        disabled={assets()?.length < items()}
                    >
                        Next
                    </button>
                </div>
            </main>
        </>
    );
};

export default Store;
