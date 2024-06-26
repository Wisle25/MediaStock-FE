// AssetPage.tsx
import { Component, createResource, createSignal, For } from "solid-js";
import AssetList from "../Components/AssetList";
import Link from "../Components/Link";
import { useToaster } from "../Providers/ToastProvider";
import Button from "../Components/Button";
import { useAuth } from "../Providers/AuthProvider";

const AssetPage: Component = () => {
    const { showToast } = useToaster();
    const { loggedUser } = useAuth();

    // Favorites
    const [favorites] = createResource(async () => {
        const response = await fetch("https://helpful-serenity-production.up.railway.app/favorites", {
            method: "GET",
            credentials: "include",
        });
        const responseJson = await response.json();

        return responseJson.data;
    })

    const removeFavorite = async (id: string) => {
        const response = await fetch("https://helpful-serenity-production.up.railway.app/favorites/" + id, {
            method: "DELETE",
            credentials: "include",
        })
        const responseJson = await response.json();

        showToast(responseJson);

        if (responseJson.status === "success")
            window.location.reload();
    }
    
    // Carts
    const [totalPrice, setTotalPrice] = createSignal(0);
    const [assetsId, setAssetsId] = createSignal<string[]>([])

    const [carts] = createResource(async () => {
        const response = await fetch("https://helpful-serenity-production.up.railway.app/carts", {
            method: "GET",
            credentials: "include",
        });
        const responseJson = await response.json();

        // Calculate total price
        for (const asset of responseJson.data) {
            setTotalPrice((prev) => prev + Number(asset.price));
            setAssetsId([...assetsId(), asset.id])
        }

        return responseJson.data;
    })
    const removeCart = async (id: string) => {
        const response = await fetch("https://helpful-serenity-production.up.railway.app/carts/" + id, {
            method: "DELETE",
            credentials: "include",
        })
        const responseJson = await response.json();

        showToast(responseJson);

        if (responseJson.status === "success")
            window.location.reload();
    }

    const removeAllCart = async () => {
        const response = await fetch("https://helpful-serenity-production.up.railway.app/carts", {
            method: "DELETE",
            credentials: "include"
        })

        console.log(await response.json())
    }

    const checkOut = async () => {
        if (!loggedUser().isVerified) {
            showToast({status: "failed", message: "You have to verify account to checkout!"})

            return;
        }

        const response = await fetch("https://helpful-serenity-production.up.railway.app/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ totalAmount: totalPrice(), assetsId: assetsId() }),
            credentials: "include"
        })
        console.log(JSON.stringify({ totalAmount: totalPrice(), assetsId: assetsId() }))
        const responseJson = await response.json();

        showToast(responseJson)

        if (responseJson.status === "success") {
            await removeAllCart();
            window.location.reload();
        }
    }

    return (
    <main class="p-10 w-full font-['Nunito']">
        <h1 class="text-3xl font-bold text-center font-['Teko']">Cart and Favorite</h1>
        <p class="text-center text-sm">Take a look what you've discovered from the store!</p>
        <div class="flex gap-8 mt-10 h-5/6">
            <section class="w-1/2 p-4 border-x-2 border-red-500">
                <h2 class="text-2xl font-bold mb-4 p-2 bg-red-500 w-fit mx-auto text-white rounded"><i class="fa-solid fa-heart"></i> Favorite Assets</h2>
                <For each={favorites()}>
                {(asset) => (
                    <AssetList
                        id={asset.id}
                        imageUrl={asset.filePath}
                        title={asset.title}
                        price={asset.price}
                        onDeleteClick={removeFavorite}
                    />
                )}
                </For>
            </section>

            <section class="w-1/2 p-4 border-x-2 border-yellow-500 relative">
                <h2 class="text-2xl font-bold mb-4 p-2 bg-yellow-500 w-fit mx-auto text-white rounded"><i class="fa-solid fa-cart-shopping"></i> Asset In Cart</h2>
                <For each={carts()}>
                {(asset) => (
                    <AssetList
                        id={asset.id}
                        imageUrl={asset.filePath}
                        title={asset.title}
                        price={asset.price}
                        onDeleteClick={removeCart}
                    />
                )}
                </For>
                <div class="absolute w-[97%] bottom-0">
                    <div class="flex items-center justify-between">
                        <p>Total Price:</p>
                        <p>{Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(totalPrice())}</p>
                    </div>
                    <Button text="Checkout" icon="fa-solid fa-money-bill" onClick={checkOut} />
                </div>
            </section>
        </div>
        <p class="mt-10 text-lg text-center">Wan't to discover more? Take a look at the <Link href="/store" class="underline">store</Link> again!</p>
    </main>
    );
};

export default AssetPage;
