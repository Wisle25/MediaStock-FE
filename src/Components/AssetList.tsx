import { useNavigate } from "@solidjs/router";
import { Component, mergeProps } from "solid-js";

interface AssetListProps {
    id: string;
    imageUrl: string;
    title: string;
    price: number;
    showDelete?: boolean;
    onDeleteClick?: (id: string) => void;
}

const AssetList: Component<AssetListProps> = (props) => {
    const mergedProps = mergeProps({ showDelete: true }, props);

    const navigate = useNavigate();

    const toAsset = () => {
        navigate("/asset/" + props.id)
    }

    return (
        <div class="flex justify-between items-center bg-white rounded-md my-2">
            <div class="flex items-center gap-4 p-4 border-b border-gray-300 cursor-pointer hover:bg-gray-200 w-full" onClick={toAsset}>
                <img src={props.imageUrl} alt={props.title} class="w-16 h-16 object-cover rounded-lg" />
                <section>
                    <h3 class="text-lg font-bold">{props.title}</h3>
                    <p class="text-gray-500">Rp {props.price}</p>
                </section>
            </div>
            {mergedProps.showDelete && (
                <i class="fa-solid fa-trash text-red-600 text-2xl cursor-pointer" title="Delete" onClick={() => props.onDeleteClick(props.id)}></i>
            )}
        </div>
    );
};

export default AssetList;
