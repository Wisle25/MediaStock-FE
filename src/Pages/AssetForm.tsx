import { Component, createResource, createSignal, onMount, Show } from "solid-js";
import Input from "../Components/Input";
import Button from "../Components/Button";
import FileInput from "../Components/FileInput";
import { createStore } from "solid-js/store";
import { useToaster } from "../Providers/ToastProvider";
import { useNavigate, useSearchParams } from "@solidjs/router";
import { useAuth } from "../Providers/AuthProvider";

const AssetForm: Component = () => {
    const { showToast } = useToaster();
    const { loggedUser } = useAuth();
    const navigate = useNavigate();
    
    const [searchParams] = useSearchParams();
    const [assetInput, setAssetInput] = createStore({
        title: "",
        description: "",
        details: "",
        price: "",
        category: "", // Added category field
    });

    const [assetErrors, setAssetErrors] = createStore({
        title: "",
        description: "",
        details: "",
        price: "",
        assetFile: "",
        category: "", // Added category field
    });

    const [selectedFile, setSelectedFile] = createSignal<File | null>(null);

    const onInput = (name: string, value: string) => {
        setAssetInput({ [name]: value });
        setAssetErrors({ [name]: "" });
    };

    const onFileInput = (file: File) => {
        setSelectedFile(file);
    };

    const submitAsset = async (e: Event) => {
        e.preventDefault();

        // File validation
        if (!selectedFile()) {
            setAssetErrors({ assetFile: "You have to upload a file for your asset!" });
            return;
        }

        // Construct form Data as it needs form-data not just JSON
        const formData = new FormData();
        formData.append("title", assetInput.title);
        formData.append("description", assetInput.description);
        formData.append("details", assetInput.details);
        formData.append("price", assetInput.price);
        formData.append("category", assetInput.category); // Added category

        if (selectedFile()) {
            formData.append("asset", selectedFile() as File);
        }

        // Send to Back-End
        if (searchParams.ctx == "update") {
            const response = await fetch("https://helpful-serenity-production.up.railway.app/assets/" + searchParams.id, {
                method: "PUT",
                body: formData,
                credentials: "include"
            });
            const responseJson = await response.json();
    
            showToast({ status: responseJson.status, message: responseJson.message });
            if (responseJson.status === "success") {
                navigate("/asset/" + searchParams.id);
            }
        } else {
            const response = await fetch("https://helpful-serenity-production.up.railway.app/assets", {
                method: "POST",
                body: formData,
                credentials: "include"
            });
            const responseJson = await response.json();
    
            showToast({ status: responseJson.status, message: responseJson.message });
            if (responseJson.status === "success") {
                navigate("/asset/" + responseJson.data);
            }
        }
    };

    // ONLY HAPPENS WHEN ON UPDATE CTX
    const [existedFile, setExistedFile] = createSignal<string | null>(null);
    onMount(async () => {
        if (searchParams.ctx == "update") {
            // Get Text Data
            const assetId = searchParams.id;
            const response = await fetch(`https://helpful-serenity-production.up.railway.app/assets/${assetId}?userId=`+loggedUser().id, {
                method: "GET",
                credentials: "include",
            });
            const responseJson = await response.json();
   
            setAssetInput(responseJson.data);
            const url = responseJson.data.filePath;
            setExistedFile(url);

            // Get File Data
            const fileResponse = await fetch(url);
            const blob = await fileResponse.blob();
            setSelectedFile(new File([blob], responseJson.data.filePath, { type: blob.type })); 
        }
    });

    return (
        <main class="w-[65%] mx-auto my-10">
            <h1 class="font-['Teko'] text-3xl font-bold text-center">Create and Sell your Asset</h1>
            <p class="font-['Nunito'] text-sm text-center">You have wonderfull asset and want to make money? You can place your own asset on our marketplace and earn money!</p>

            <div class="flex gap-x-8 mt-10">
                <form class="w-3/4" onSubmit={submitAsset}>
                    <Input name="title" label="Enter Asset Title" onInput={onInput} value={assetInput.title} />
                    <Input name="description" label="Enter Asset Description" onInput={onInput} value={assetInput.description} class="h-24" isTextArea={true} />
                    <Input name="details" label="Enter Asset Detail" onInput={onInput} value={assetInput.details} class="h-52" isTextArea={true} />
                    <Input name="price" label="Enter Asset Price (in Rp)" onInput={onInput} value={assetInput.price} type="number" />

                    <div class="my-4 font-['Nunito'] font-semibold">
                        <label for="category" class="block mb-2">Select Asset Category</label>
                        <select 
                            name="category" 
                            id="category" 
                            class="border-2 p-2 rounded-lg w-full focus:border-primaryLighter focus:outline-none focus:border-[3px] border-gray-400" 
                            value={assetInput.category} 
                            onChange={(e) => onInput('category', (e.target as HTMLSelectElement).value)}
                        >
                            <option value="" disabled>Select a category</option>
                            <option value="Panorama">Panorama</option>
                            <option value="City and Architecture">City and Architecture</option>
                            <option value="Peoples and Portraits">Peoples and Portraits</option>
                            <option value="Foods and Drink">Foods and Drink</option>
                            <option value="Animals">Animals</option>
                            <option value="Object">Object</option>
                        </select>
                        <Show when={assetErrors.category}><p class="text-red-500 text-sm mt-1">{assetErrors.category}</p></Show>
                    </div>
                    
                    <Button text={`${searchParams.ctx == "update" ? "Update" : "Add New"} Asset`} type="submit" />
                </form>

                <FileInput onInput={onFileInput} class="w-1/2 mt-4" error={assetErrors.assetFile} existedFile={existedFile()} />
            </div>
        </main>
    );
}

export default AssetForm;
