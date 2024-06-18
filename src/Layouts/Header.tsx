import { Component, createSignal, Show } from "solid-js";
import Link from "../Components/Link";
import Button from "../Components/Button";
import { useAuth } from "../Providers/AuthProvider";
import { useToaster } from "../Providers/ToastProvider";
import { useNavigate } from "@solidjs/router";

import logo from "/LogoCropped.png?url"

const Header: Component = () => {
    const { loggedUser, refreshUser } = useAuth();
    const { showToast } = useToaster();
    const navigate = useNavigate();

    // User Option
    const [userOptionOpen, setUserOptionOpen] = createSignal(false);

    // Log out handling
    const handleLogout = async (e: Event) => {
        const response = await fetch("http://localhost:8000/auths", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include"
        });
        const data = await response.json();

        if (data.status === "success") {
            refreshUser();
            showToast({ status: data.status, message: data.message })
        }
    }

    // ...
    const toCartFavorite = () => {
        navigate("/cart-favorite")
        setUserOptionOpen(false);
    }

    return (
        <header class="bg-white py-3 px-10 w-full font-['Nunito'] text-primary font-bold text-lg
        flex justify-between items-center
        fixed top-0 shadow-md z-10">
            {/* Logo section */}
            <Link href="/" class="flex items-center gap-x-2">
                <img src={logo} alt="Media-stock logo" width={75} />
                <h1 class="text-3xl">Media Stock</h1>
            </Link>

            {/* Nav Bar */}
            <nav class="flex gap-x-3">
                <Link href="/">Home</Link>
                <Link href="/">About</Link>
                <Link href="/Store">Store</Link>
                <Link href="/">Contact</Link>
            </nav>

            {/** User Info */}
            {loggedUser() ? 
                <section class="flex gap-x-3 items-center">
                    <span class="whitespace-nowrap underline cursor-pointer" onClick={() => setUserOptionOpen(!userOptionOpen())}>Hello, {loggedUser().username}!</span>
                    <Show when={userOptionOpen()}>
                        <div class="absolute right-10 top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-48">
                            <Button text="Dashboard" class="!text-black bg-white text-start hover:bg-gray-100" icon="fa-solid fa-table-columns" />
                            <Button text="Cart and Favorite" class="!text-black bg-white text-start hover:bg-gray-100" icon="fa-solid fa-cart-shopping" onClick={toCartFavorite} />
                            <Button text="Logout" class="!text-black bg-white text-start hover:bg-gray-100" icon="fa-solid fa-door-open" onClick={handleLogout} />
                        </div>
                    </Show>
                </section>
                : 
                <section class="flex gap-x-3">
                    <Link href="/auth?ctx=login">Login</Link>
                    <Link href="/auth?ctx=register">Register</Link>
                </section>
            }
        </header>
    )
}

export default Header;
