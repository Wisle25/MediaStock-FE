import { Component, createResource, createSignal, For } from "solid-js";
import Card from "../Components/Card";
import SearchBar from "../Components/SearchBar";
import Sidebar from "../Components/SideBar";
import { useNavigate } from "@solidjs/router";
import { useAuth } from "../Providers/AuthProvider";

const Store: Component = () => {
    const { loggedUser } = useAuth();
    const navigate = useNavigate();

    // Pagination
    const [page, setPage] = createSignal(1);
    const [items, setItems] = createSignal(25);

    // Get Asset store data
    const [assets] = createResource(async () => {
        const response = await fetch(`http://localhost:8000/assets?listCount=${items()}&pageList=${page()}${ loggedUser() ? "&userId=" + loggedUser().user_id : "" }`)
        const responseJson = await response.json();

        if (responseJson.status === "success") {
            return responseJson.data;
        }
    })

    // SideBar
    const [isSidebarOpen, setSidebarOpen] = createSignal(false);
    const toggleSiderbar = (e: Event) => {
        e.preventDefault();

        setSidebarOpen(!isSidebarOpen());
    }

    // To detail
    const toDetailAsset = (id: string) => {
        navigate("/asset/" + id)
    }

    // JSX
    return (
        <>
        {isSidebarOpen() && 
            <Sidebar toggleSidebar={toggleSiderbar} />
        }

        <main class="w-full">
            <SearchBar toggleSidebar={toggleSiderbar} isSidebarOpen={isSidebarOpen()} />

            <h1 class="text-center font-['Teko'] font-bold text-4xl mt-5">Store</h1>
            <p class="text-center font-['Nunito'] text-sm">Looking for awesome store? Here you can find a bunch!</p>

            <section class="flex justify-center gap-x-5 mt-10">
                {assets.loading && <p>Please wait...</p>}
                {assets.error && <p>There is an error!</p>}
                {assets() && 
                    <For each={assets()} fallback={<div>Loading</div>}>
                        {(item) => 
                            <Card
                                id={item.id}
                                title={item.title}
                                ownerUsername={item.owner_username}
                                description={item.description}
                                imageUrl={`http://localhost:9000/media-stock/${item.file_watermark_path}`}
                                favorite_count={item.favorite_count}
                                is_favorite={item.is_favorite}
                                rating={item.rating}
                                onClick={toDetailAsset}
                            />
                        }
                    </For>
                }
            </section>
        </main>
        </>
    )
}

export default Store;
