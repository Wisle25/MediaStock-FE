import { AiOutlineCheckSquare } from 'solid-icons/ai';

import features from "assets/img/features.png?url"

const Feature = () => {
    return (
        <section id="features" class="py-12 w-full features">
            <div class="mx-auto px-20">
                <header class="mb-8 text-center section-header">
                    <p class="font-bold text-[#012970] text-4xl">Mudahnya Mencari Berbagai Jenis Aset di Media Stock</p>
                </header>
                <div class="flex flex-wrap md:flex-nowrap justify-center items-center">
                    <div class="md:pr-4 md:w-6/12 lg:w-6/12">
                        <img src={features} class="p-8 img-fluid" alt="" />
                    </div>
                    <div class="mt-5 md:mt-0 md:w-6/12 lg:w-6/12">
                        <div class="gap-4 grid my-10">
                            <FeatureBox icon={<AiOutlineCheckSquare class="mx-2 text-2xl" />} title="Pencarian Aset yang Mudah dan Efisien"/>
                            <FeatureBox icon={<AiOutlineCheckSquare class="mx-2 text-2xl" />} title="Menjual Berbagai Jenis Asset" />
                            <FeatureBox icon={<AiOutlineCheckSquare class="mx-2 text-2xl" />} title="Terdapat Reguler Asset dan Premium Asset" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const FeatureBox = (props) => {
    const { icon, title } = props;

    return (
        <div class="flex items-center hover:bg-blue-500 shadow-md px-6 py-8 rounded-lg hover:text-white transition-all feature-box">
            {icon}
            <h3 class="font-semibold text-xl">{title}</h3>
        </div>
    );
};

export default Feature;
