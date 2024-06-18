import { Component, createSignal } from "solid-js";
import { useAuth } from "../Providers/AuthProvider";
import Input from "../Components/Input";
import Button from "../Components/Button";

import anonym from "/Anonym.jpg?url"
import { useToaster } from "../Providers/ToastProvider";

const Dashboard: Component = () => {
    const { showToast } = useToaster();
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

    return (
        <main class="w-3/4 mx-auto mt-10">
            <h1 class="font-['Teko'] text-4xl font-bold text-center mb-8">User Profile</h1>
            <section class="flex items-center">
                <div class="w-1/3 flex flex-col items-center">
                    <img 
                        src={loggedUser().avatarLink ? "http://localhost:9000/media-stock/" + loggedUser().avatarLink : anonym}
                        alt="User Avatar" 
                        class="w-96 h-96 rounded-full object-cover cursor-pointer"
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
        </main>
    );
};

export default Dashboard;
