import { Component, createResource, createSignal, For, onMount } from "solid-js";
import { useAuth } from "../Providers/AuthProvider";
import Input from "../Components/Input";
import Button from "../Components/Button";

import anonym from "/Anonym.jpg?url"
import { useToaster } from "../Providers/ToastProvider";
import AssetList from "../Components/AssetList";
import { useNavigate } from "@solidjs/router";

const Dashboard: Component = () => {
    const { showToast } = useToaster();
    const navigate = useNavigate();

    // User
    const { loggedUser, refreshUser } = useAuth();
    const [editProfileInput, setEditProfileInput] = createSignal({
        username: loggedUser()?.username || "",
        email: loggedUser()?.email || "",
        password: "",
        confirmPassword: "",
    });
    const [avatar, setAvatar] = createSignal<File | null>(null);

    const handleInput = (name: string, value: string) => {
        setEditProfileInput({ ...editProfileInput(), [name]: value });
    };

    const handleAvatarChange = (file: File) => {
        setAvatar(file);
    };

    const submitProfile = async (e: Event) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", editProfileInput().username);
        formData.append("email", editProfileInput().email);
        formData.append("password", editProfileInput().password);
        formData.append("confirmPassword", editProfileInput().confirmPassword);
        if (avatar()) {
            formData.append("avatar", avatar()!);
        }

        const response = await fetch("http://localhost:8000/users/" + loggedUser().id, {
            method: "PUT",
            credentials: "include",
            body: formData,
        });
        const responseJson = await response.json();

        if (responseJson.status === "success") {
            refreshUser();
        } 

        showToast(responseJson);
    };

    // Transaction History
    const [transactions] = createResource(async () => {
        const response = await fetch("http://localhost:8000/transactions", {
            method: "GET",
            credentials: "include"
        })
        const responseJson = await response.json();
        console.log(responseJson.data);
        if (responseJson.status === "success") {
            return responseJson.data;
        }
    })

    // Purchased Asset
    const [purchased] = createResource(async () => {
        const response = await fetch("http://localhost:8000/purchased", {
            method: "GET",
            credentials: "include"
        })
        const responseJson = await response.json();

        if (responseJson.status === "success") {
            return responseJson.data;
        }
    })

    // Owned Asset
    const [owned] = createResource(async () => {
        const response = await fetch("http://localhost:8000/assetsMe", {
            method: "GET",
            credentials: "include"
        })
        const responseJson = await response.json();

        if (responseJson.status === "success") {
            return responseJson.data;
        }
    })

    // Throw
    onMount(() => {
        if (!loggedUser() || !loggedUser().isVerified) {
            navigate("/");
        }
    })

    return (
        <main class="w-3/4 mx-auto mt-10 font-['Nunito']">
            {/* User Profile */}
            <h1 class="font-['Teko'] text-4xl font-bold text-center">User Profile</h1>
            <p class="mb-8 text-center">Take a look at your profile! Update your profile as you need!</p>
            <section class="flex items-center">
                <div class="w-1/3 flex flex-col items-center">
                    <img 
                        src={loggedUser().avatarLink ? loggedUser().avatarLink : anonym}
                        alt="User Avatar" 
                        class="w-96 h-96 rounded-full object-cover cursor-pointer border-4 border-blue-500"
                        onClick={() => document.getElementById("avatarInput")?.click()}
                    />
                    <input 
                        type="file" 
                        id="avatarInput" 
                        class="hidden" 
                        accept="image/*"
                        onChange={(e) => handleAvatarChange(e.currentTarget.files[0])}
                    />
                    <h2 class="text-xl font-bold mt-4">{loggedUser()?.username}</h2>
                    <p class="text-gray-600">{loggedUser()?.email}</p>
                </div>
                <div class="w-2/3 p-4 bg-gray-100 shadow-xl border-2 border-primaryLighter rounded-lg">
                    <h2 class="text-2xl font-bold mb-4">Edit Profile</h2>
                    <form onSubmit={submitProfile}>
                        <Input 
                            name="username" 
                            label="Username" 
                            value={editProfileInput().username} 
                            onInput={handleInput}
                        />
                        <Input 
                            name="email" 
                            label="Email"
                            value={editProfileInput().email} 
                            onInput={handleInput}
                        />
                        <Input 
                            name="password" 
                            label="Password" 
                            type="password" 
                            value={editProfileInput().password} 
                            onInput={handleInput}
                        />
                        <Input 
                            name="confirmPassword" 
                            label="Confirm Password" 
                            type="password" 
                            value={editProfileInput().confirmPassword} 
                            onInput={handleInput}
                        />
                        <Button text="Update Profile Changes" type="submit" />
                    </form>
                </div>
            </section>

            {/* Assets info */}
            <h1 class="font-['Teko'] text-4xl font-bold text-center mt-8">Assets</h1>
            <p class="mb-8 text-center">See transaction history, owned asset, and purchased asset here.</p>
            <section class="flex justify-center gap-x-5">
                {/* Transaction History */}
                <div class="p-5 bg-blue-500 rounded-md shadow-xl w-[28rem] h-[32rem] overflow-y-auto relative">
                    <h3 class="font-bold text-center font-['Teko'] text-2xl text-white">Transaction History</h3>
                    {transactions() && 
                        <For each={transactions()} fallback={<div class="text-white font-bold text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">No History!</div>}>
                            {item => 
                            <div class="flex gap-x-2 my-2 p-2 bg-white rounded-md shadow-2xl items-center">
                                <i class="fa-solid fa-money-bill-transfer text-3xl"></i>
                                <div class="flex-1">
                                    <p>{item.id.split("-")[item.id.split("-").length - 1]}</p>
                                    <p>{Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(item.totalAmount)}</p>
                                </div>
                                <p class="self-start">{new Date(item.purchasedAt).toLocaleDateString()}</p>
                            </div>
                            }
                        </For>
                    }
                </div>

                {/* Purchased asset */}
                <div class="p-5 bg-blue-500 rounded-md shadow-xl w-[28rem] h-[32rem] overflow-y-auto relative">
                    <h3 class="font-bold text-center font-['Teko'] text-2xl text-white">Purchased Assets</h3>
                    <For each={purchased()} fallback={<div class="text-white font-bold text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">No purchased Items!</div>}>
                    {(asset) => (
                        <AssetList
                            id={asset.id}
                            imageUrl={asset.filePath}
                            title={asset.title}
                            price={asset.price}
                            showDelete={false}
                        />
                    )}
                    </For>
                </div>

                {/* Owned Asset */}
                <div class="p-5 bg-blue-500 rounded-md shadow-xl w-[28rem] h-[32rem] overflow-y-auto relative">
                    <h3 class="font-bold text-center font-['Teko'] text-2xl text-white">Owned Assets</h3>
                    <For each={owned()} fallback={<div class="text-white font-bold text-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl">No Owned Items!</div>}>
                    {(asset) => (
                        <AssetList
                            id={asset.id}
                            imageUrl={asset.filePath}
                            title={asset.title}
                            price={asset.price}
                            showDelete={false}
                        />
                    )}
                    </For>
                </div>
            </section>

            {/* Finance */}
            <h1 class="font-['Teko'] text-4xl font-bold text-center mt-8">Finance</h1>
            <p class="mb-8 text-center">See your profit, subscription, and how much you spend!</p>
            <section class="flex justify-center gap-x-5">
                {/* Profit */}
                <div class="p-5 bg-blue-500 rounded-md shadow-xl w-[20rem] h-fit overflow-y-auto flex flex-col gap-y-2 justify-center items-center font-bold text-white">
                    <h3 class="font-['Teko'] text-4xl">Profit</h3>
                    <i class="fa-solid fa-chart-line text-8xl"></i>
                    <p class="self-start">Sold Asset: 0</p>
                    <p class="self-start">Profit: Rp1.000.000</p>
                </div>

                {/* Profit */}
                <div class="p-5 bg-blue-500 rounded-md shadow-xl w-[20rem] h-fit overflow-y-auto flex flex-col gap-y-2 justify-center items-center font-bold text-white">
                    <h3 class="font-['Teko'] text-4xl">Money Spending</h3>
                    <i class="fa-solid fa-sack-dollar text-8xl"></i>
                    <p class="self-start">Purchased Asset: 0</p>
                    <p class="self-start">Value: Rp1.000.000</p>
                </div>

                {/* Subscription */}
                <div class="p-5 bg-blue-500 rounded-md shadow-xl w-[20rem] h-fit overflow-y-auto flex flex-col gap-y-2 justify-center items-center font-bold text-white">
                    <h3 class="font-['Teko'] text-4xl">Subscription</h3>
                    <i class="fa-solid fa-star text-8xl"></i>
                    <p class="self-start">Purchased Asset: 0</p>
                    <p class="self-start">Value: Rp1.000.000</p>

                    <Button
                        text="Subscribe"
                        class="bg-white !text-blue-500 hover:!bg-gray-200"
                    />
                </div>
            </section>
        </main>
    );
};

export default Dashboard;
