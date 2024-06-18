import { createSignal } from 'solid-js';
import { AiOutlineSearch } from 'solid-icons/ai';
import { FaRegularFolder } from 'solid-icons/fa';
import { BsFilterSquare } from 'solid-icons/bs';
import { AiOutlineShoppingCart } from 'solid-icons/ai';
import { BsCollectionPlay } from 'solid-icons/bs';
import { AiOutlineStar } from 'solid-icons/ai';

const Service = () => {
    const services = [
        {
            icon: AiOutlineSearch,
            title: "Pencarian Asset",
            description: "Temukan berbagai asset yang Anda butuhkan dengan mudah melalui fitur pencarian yang intuitif.",
            color: "blue"
        },
        {
            icon: FaRegularFolder,
            title: "Kategorisasi Asset",
            description: "Telusuri asset dengan cepat dengan fitur pengelompokan berdasarkan kategori yang relevan.",
            color: "orange"
        },
        {
            icon: BsFilterSquare,
            title: "Pengurutan Asset",
            description: "Susun asset berdasarkan preferen untuk menemukan yang paling sesuai dengan kebutuhan Anda.",
            color: "green"
        },
        {
            icon: AiOutlineShoppingCart,
            title: "Keranjang Belanja",
            description: "Simpan asset yang diminati di keranjang belanja untuk kemudahan berbelanja.",
            color: "red"
        },
        {
            icon: BsCollectionPlay,
            title: "Reguler Asset",
            description: "Temukan berbagai macam asset untuk project skala kecil.",
            color: "purple"
        },
        {
            icon: AiOutlineStar,
            title: "Premium Asset",
            description: "Dapatkan pengalaman premium dengan akses yang lebih banyak",
            color: "pink"
        }
    ];

    return (
        <section id="services" class="py-10">
            <div class="mx-auto px-4 container">
                <header class="mt-20 mb-10 text-center">
                    <p class="font-bold text-[#012970] text-4xl">Fitur dan Layanan yang tersedia</p>
                </header>
                <div class="flex flex-wrap -mx-4">
                    {services.map((service, index) => (
                        <ServiceBox key={index} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ServiceBox = (props) => {
    const { icon: Icon, title, description, color } = props.service;
    const [isHovered, setIsHovered] = createSignal(false);

    const colorClasses = {
        blue: "border-blue-500 text-blue-500 bg-blue-50",
        orange: "border-orange-500 text-orange-500 bg-orange-50",
        green: "border-green-500 text-green-500 bg-green-50",
        red: "border-red-500 text-red-500 bg-red-50",
        purple: "border-purple-500 text-purple-500 bg-purple-50",
        pink: "border-pink-500 text-pink-500 bg-pink-50"
    };

    const hoverClasses = {
        blue: "hover:bg-blue-500 hover:text-white",
        orange: "hover:bg-orange-500 hover:text-white",
        green: "hover:bg-green-500 hover:text-white",
        red: "hover:bg-red-500 hover:text-white",
        purple: "hover:bg-purple-500 hover:text-white",
        pink: "hover:bg-pink-500 hover:text-white"
    };

    const readMoreClasses = {
        blue: "text-blue-500 bg-blue-50",
        orange: "text-orange-500 bg-orange-50",
        green: "text-green-500 bg-green-50",
        red: "text-red-500 bg-red-50",
        purple: "text-purple-500 bg-purple-50",
        pink: "text-pink-500 bg-pink-50"
    };

    return (
        <div class="mb-8 px-4 w-full md:w-1/2 lg:w-1/3">
            <div class={`service-box border-b-4 p-8 text-center rounded-md transition-all ${colorClasses[color]} ${isHovered() ? hoverClasses[color] : ''}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Icon class="mx-auto mb-6 w-10 h-10" />
                <h3 class="mb-4 font-semibold text-2xl">{title}</h3>
                <p class="mb-6">{description}</p>
                <a href="/store" class={`inline-flex items-center justify-center font-semibold text-lg px-6 py-2 rounded-md transition-all ${readMoreClasses[color]}`}>
                    <span>Read More</span>
                    <i class="bi-arrow-right ml-2 bi"></i>
                </a>
            </div>
        </div>
    );
};

export default Service;
