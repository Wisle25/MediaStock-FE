import { Component, createResource, Show } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import Button from "../Components/Button";
import Comment from "../Components/Comment";
import { useAuth } from "../Providers/AuthProvider";
import { useToaster } from "../Providers/ToastProvider";

const DetailAsset: Component = () => {
    const { loggedUser } = useAuth();
    const { showToast } = useToaster();
    const navigate = useNavigate();
    const params = useParams();

    // Fetch the asset details using the asset id from the route
    const [asset] = createResource(async () => {
        const response = await fetch(`http://localhost:8000/assets/${params.id}${ loggedUser() ? "?userId=" + loggedUser().user_id : "" }`);
        const responseJson = await response.json();

        if (responseJson.status === "success") {
            return responseJson.data;
        }

        throw new Error("There is an error!")
    });

    const deleteAsset = async (e: Event) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:8000/assets/${params.id}`, {
            method: "DELETE",
            credentials: "include"
        })

        const responseJson = await response.json();

        if (responseJson.status === "success") {
            navigate("/store");
            showToast({ status: responseJson.status, message: responseJson.message })
        }
    }

    const downloadAsset = async () => {
        window.location.href = `http://localhost:8000/assets-download/${params.id}`
    }

    const toggleFavorite = async () => {
        const response = await fetch("http://localhost:8000/favorites/" + asset().id, {
            method: `${asset().is_favorite ? "DELETE" : "POST"}`,
            credentials: "include",
        })
        const responseJson = await response.json();

        showToast(responseJson)
        if (responseJson.status === "success")
            window.location.reload();
    }

    const toggleCart = async () => {
        const response = await fetch("http://localhost:8000/carts/" + asset().id, {
            method: `POST`,
            credentials: "include",
        })
        const responseJson = await response.json();

        showToast(responseJson)
    }

    return (
        <main class="w-3/4 mx-auto my-10">
            {asset.loading && <p>Loading...</p>}
            {asset.error && <p>There is an error!</p>}
            {asset() && (
            <div class="flex gap-10">
                <img src={"http://localhost:9000/media-stock/" + asset().file_watermark_path} alt={asset().title} class="w-1/2 h-fit object-cover rounded-lg shadow-md" />
                <div class="w-1/2 font-['Nunito']">
                    <section class="flex justify-between">
                        {/* Title and Owner */}
                        <div>
                            <h1 class="text-4xl font-bold text-primary">{asset().title}</h1>
                            <p class="text-xl">{asset().owner_username}</p>
                        </div>

                        {/* Time info */}
                        <div class="flex justify-center items-center gap-x-2">
                            <p class="p-1 border-2 border-primary rounded">Created: {new Date(asset().created_at).toLocaleDateString()}</p>
                            {asset().updated_at != asset().created_at && 
                             <p class="p-1 border-2 border-primary rounded">Updated: {new Date(asset().updated_at).toLocaleDateString()}</p>
                            }

                            {/* Delete Asset (Only appears to admin or owner) */}
                            {(loggedUser() != null && loggedUser().user_id === asset().owner_id) && (
                            <>
                                <button title="Update asset" onClick={() => navigate(`/asset-form?ctx=update&id=${asset().id}`)}>
                                    <i class="fa-solid fa-pen-to-square text-2xl p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"></i>
                                </button>
                                <button title="Delete asset" onClick={deleteAsset}>
                                    <i class="fa-solid fa-trash text-2xl p-2 bg-red-500 text-white rounded-md hover:bg-red-600"></i>
                                </button>
                            </>)}
                        </div>
                    </section>
                    
                    {/* Review, Favorite, Bought for x times */}
                    <section class="flex items-center gap-x-10 text-2xl shadow-lg w-fit p-3 rounded border-2 my-4">
                        <div class="flex items-center text-yellow-500">
                            <i class="fas fa-star mr-1"></i>4.5/5
                        </div>
                        <div class="flex items-center text-red-500">
                            <i class="fas fa-heart mr-1"></i>{asset().favorite_count} Likes
                        </div>
                        <div class="flex items-center text-green-700">
                            <i class="fa-solid fa-cart-shopping mr-1"></i>{asset().purchased_count} Purchased
                        </div>
                    </section>

                    {/* Description and Details */}
                    <section class="my-4 border-y-2 border-gray-300 py-3">
                        <h3 class="font-['Teko'] text-xl font-semibold tracking-wider">Description:</h3>
                        <p class="min-h-20">{asset().description}</p>
                        <h3 class="font-['Teko'] text-xl font-semibold tracking-wider">Detail:</h3>
                        <p class="min-h-32">{asset().details === "" ?  "No details provided" : asset().details}</p>
                    </section>

                    {/* Pricing and interaction */}
                    <div class="flex justify-between items-center">
                        <Show when={!asset().is_purchased}>
                            <p class="font-['Teko'] text-4xl font-bold">{Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(asset().price)}</p>
                        </Show>

                        <div class="flex gap-x-5">
                            {asset().is_purchased ? 
                                <Button
                                    text="Download"
                                    isFull={false}
                                    class="bg-green-600 hover:bg-green-700 text-xl"
                                    icon="fa-solid fa-download"
                                    onClick={downloadAsset}
                                />
                            : 
                                <Button 
                                    text="Add to Cart" 
                                    isFull={false} 
                                    class="bg-green-600 hover:bg-green-700 text-xl" 
                                    icon="fa-solid fa-cart-shopping"
                                    onClick={toggleCart}
                                />
                            }
                            <Button 
                                text={`${asset().is_favorite ? "Remove from " : "Add To "} Favorite`} 
                                isFull={false} class="bg-red-500 hover:!bg-red-600 text-xl" 
                                icon="fas fa-heart"
                                onClick={toggleFavorite}
                            />
                        </div>
                    </div>
                </div>
            </div>
            )}

            {/* Comments and Reviews */}
            <div class="flex mt-10 h-[47.7%]">
                <section class="w-1/2 p-2 border-r-2">
                    <h3 class="font-['Nunito'] text-xl font-bold">Comments:</h3>
                    <Comment username="Test" avatarUrl="Test" commentDate="Hari ini" commentText="Komentar saya" />
                </section>

                <section class="w-1/2 p-2 border-l-2">
                    <h3 class="font-['Nunito'] text-xl font-bold">Reviews:</h3>
                    <Comment username="Test" avatarUrl="Test" commentDate="Hari ini" commentText="Review saya..." />
                </section>
            </div>
        </main>
    );
};

export default DetailAsset;
