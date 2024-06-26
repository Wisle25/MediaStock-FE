import { Component, createEffect, createResource, createSignal, For, Show } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import Button from "../Components/Button";
import Comment from "../Components/Comment";
import { useAuth } from "../Providers/AuthProvider";
import { useToaster } from "../Providers/ToastProvider";
import RatingForm from "../Components/RatingForm";
import Review from "../Components/Review";
import CommentForm from "../Components/CommentForm";

const DetailAsset: Component = () => {
    const { loggedUser } = useAuth();
    const { showToast } = useToaster();
    const navigate = useNavigate();
    const params = useParams();

    // Fetch the asset details using the asset id from the route
    const [asset] = createResource(async () => {
        const response = await fetch(`http://localhost:8000/assets/${params.id}${ loggedUser() ? "?userId=" + loggedUser().id : "" }`);
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
            showToast(responseJson)
        }
    }

    const downloadAsset = async () => {
        window.location.href = `http://localhost:8000/assets-download/${params.id}`
    }

    const toggleFavorite = async () => {
        const response = await fetch("http://localhost:8000/favorites/" + asset().id, {
            method: `${asset().isFavorite ? "DELETE" : "POST"}`,
            credentials: "include",
        })
        const responseJson = await response.json();

        showToast(responseJson)
        if (responseJson.status === "success")
            window.location.reload();
    }

    const toggleCart = async () => {
        if (!loggedUser().isVerified) {
            showToast({status: "failed", message: "You have to verify account to checkout!"})

            return;
        }

        const response = await fetch("http://localhost:8000/carts/" + asset().id, {
            method: `POST`,
            credentials: "include",
        })
        const responseJson = await response.json();

        showToast(responseJson)
    }

    // Ratings
    const [ratings, setRatings] = createSignal([]);
    const [hasRating, setHasRating] = createSignal(-1);
    const fetchRating = async () => {
        const response = await fetch("http://localhost:8000/ratings/" + asset().id);
        const responseJson = await response.json();
    
        if (responseJson.status === "success") {
            setRatings(responseJson.data);
    
            // Check is user has given a rating
            if (loggedUser() && ratings()) {
                setHasRating(
                    ratings().findIndex(rating => rating.username === loggedUser().username)
                );
            }
        }
    }

    // Comments
    const [comments, setComments] = createSignal([]);
    const fetchComments = async () => {
        const response = await fetch("http://localhost:8000/comments/" + asset().id);
        const responseJson = await response.json();
    
        if (responseJson.status === "success") {
            setComments(responseJson.data);
        }
    }
    
    createEffect(async () => {
        if (asset()) {
            fetchRating();
            fetchComments();
        }
    });

    return (
        <main class="w-3/4 mx-auto my-10">
            {asset.loading && <p>Loading...</p>}
            {asset.error && <p>There is an error!</p>}
            {asset() && (
            <div class="flex gap-10">
                <img src={asset().filePath} alt={asset().title} class="w-1/2 h-fit object-cover rounded-lg shadow-md" />
                <div class="w-1/2 font-['Nunito']">
                    <section class="flex justify-between">
                        {/* Title and Owner */}
                        <div>
                            <h1 class="text-4xl font-bold text-primary">{asset().title}</h1>
                            <p class="text-xl">{asset().ownerUsername}</p>
                        </div>

                        {/* Time info */}
                        <div class="flex justify-center items-center gap-x-2">
                            <p class="p-1 border-2 border-primary rounded">Created: {new Date(asset().createdAt).toLocaleDateString()}</p>
                            {asset().updatedAt != asset().createdAt && 
                             <p class="p-1 border-2 border-primary rounded">Updated: {new Date(asset().updatedAt).toLocaleDateString()}</p>
                            }

                            {/* Delete Asset (Only appears to admin or owner) */}
                            {(loggedUser() != null && (loggedUser().id === asset().ownerId || loggedUser().role === "Admin")) && (
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
                    <div class="flex justify-between">
                        <section class="flex items-center gap-x-10 text-2xl shadow-lg w-fit p-3 rounded border-2 my-4">
                            <div class="flex items-center text-yellow-500">
                                <i class="fas fa-star mr-1"></i>{asset().rating}/5
                            </div>
                            <div class="flex items-center text-red-500">
                                <i class="fas fa-heart mr-1"></i>{asset().favoriteCount} Likes
                            </div>
                            <div class="flex items-center text-green-700">
                                <i class="fa-solid fa-cart-shopping mr-1"></i>{asset().purchasedCount} Purchased
                            </div>
                        </section>

                        <section class="flex items-center text-xl w-fit p-3 rounded border-2 my-4 bg-blue-500 text-white font-bold">
                            {asset().category}
                        </section>
                    </div>

                    {/* Description and Details */}
                    <section class="my-4 border-y-2 border-gray-300 py-3">
                        <h3 class="font-['Teko'] text-xl font-semibold tracking-wider">Description:</h3>
                        <p class="min-h-20">{asset().description}</p>
                        <h3 class="font-['Teko'] text-xl font-semibold tracking-wider">Detail:</h3>
                        <p class="min-h-32">{asset().details === "" ?  "No details provided" : asset().details}</p>
                    </section>

                    {/* Pricing and interaction */}
                    <div class="flex justify-between items-center">
                        <Show when={!asset().isPurchased}>
                            <p class="font-['Teko'] text-4xl font-bold">{Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(asset().price)}</p>
                        </Show>

                        <div class="flex gap-x-5">
                            {asset().isPurchased ?
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
                                text={`${asset().isFavorite ? "Remove from " : "Add To "} Favorite`} 
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
                    <For each={comments()} fallback={<div class="text-center my-5">No comments were added! Be the first one!</div>}>
                    {(item) =>
                        <Comment
                            id={item.id}
                            username={item.username} 
                            avatarUrl={item.avatarLink} 
                            commentDate={item.createdAt}
                            commentText={item.content} 
                            owned={loggedUser() && loggedUser().username === item.username}
                        />
                    }
                    </For>
                    <CommentForm assetId={asset().id} />
                </section>

                <section class="w-1/2 p-2 border-l-2">
                    <h3 class="font-['Nunito'] text-xl font-bold">Reviews:</h3>
                    <For each={ratings()} fallback={<div class="text-center my-5">No reviews were added! Be the first one!</div>}>
                        {(item, idx) =>
                            <Review
                                id={item.id}
                                username={item.username} 
                                avatarUrl={item.userAvatar} 
                                description={item.description} 
                                reviewDate={item.createdAt} 
                                score={item.score}
                                owned={hasRating() == idx()}
                            />
                        }
                    </For>
                    <Show when={asset() && asset().isPurchased && hasRating() === -1}>
                        <RatingForm assetId={asset().id} />
                    </Show>
                </section>
            </div>
        </main>
    );
};

export default DetailAsset;
