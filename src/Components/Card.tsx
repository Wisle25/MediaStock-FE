import { Component } from "solid-js";
import { useToaster } from "../Providers/ToastProvider";

interface CardProps {
    id: string;
    title: string;
    ownerUsername: string;
    description: string;
    imageUrl: string;
    favorite_count: number;
    is_favorite: boolean;

    onClick: (id: string) => void;
}

const Card: Component<CardProps> = (props) => {
    const { showToast } = useToaster();

    const toggleFavorite = async () => {
        const response = await fetch("http://localhost:8000/favorites/" + props.id, {
            method: `${props.is_favorite ? "DELETE" : "POST"}`,
            credentials: "include",
        })
        const responseJson = await response.json();

        showToast(responseJson)
    }

    const toggleCart = async () => {
        const response = await fetch("http://localhost:8000/carts/" + props.id, {
            method: `POST`,
            credentials: "include",
        })
        const responseJson = await response.json();

        showToast(responseJson)
    }

    return (
        <div 
            class="relative w-96 h-80 border-2 border-gray-100 rounded overflow-hidden shadow-lg bg-white cursor-pointer transform transition-transform duration-300 hover:scale-105"
            onClick={() => props.onClick(props.id)}
        >
            <div class="absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-300 hover:opacity-100">
                <div class="flex justify-between items-start bg-black bg-opacity-50 p-2">
                    <i 
                        class={`${props.is_favorite ? "fa-solid" : "fa-regular"} fa-heart text-red-500 text-3xl transition-transform duration-300 hover:scale-125`} 
                        title="Add to Favorite" 
                        onClick={toggleFavorite}
                    ></i>
                    <i 
                        class="fa-solid fa-cart-plus text-orange-300 text-3xl transition-transform duration-300 hover:scale-125" 
                        title="Add to Cart"
                        onClick={toggleCart}
                    ></i>
                </div>
            </div>
            <img class="w-full object-cover h-48" src={props.imageUrl} alt="Asset Image" />

            <section class="px-6 pt-2 flex justify-between items-center">
                <div class="flex items-center text-red-500">
                    <i class="fas fa-heart mr-1"></i>{props.favorite_count}
                </div>
                <div class="flex items-center text-yellow-500">
                    <i class="fas fa-star mr-1"></i>4.5
                </div>
            </section>

            <section class="px-6 pb-4">
                <div class="flex justify-between items-center">
                    <div class="font-bold text-xl">{props.title}</div>
                    <div class="text-gray-700 text-base">{props.ownerUsername}</div>
                </div>
                <p class="text-gray-700 text-base">
                    {props.description}
                </p>
            </section>
        </div>
    );
}

export default Card;
