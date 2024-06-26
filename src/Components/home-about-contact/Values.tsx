import { createSignal } from 'solid-js';

import values1 from "/assets/img/values-1.jpg?url"
import values2 from "/assets/img/values-2.jpg?url"
import values3 from "/assets/img/values-3.jpg?url"

const Values = () => {
    return (
        <section id="values" class="py-10 w-full values">
            <div class="mx-auto mb-20 px-20">
                <header class="mb-8 text-center section-header">
                    <p class="font-bold text-[#012970] text-4xl">Jenis asset yang dapat digunakan</p>
                </header>
                <div class="flex flex-wrap -mx-1 mt-10 px-10">
                    <AssetBox
                        imgSrc={values1}
                        title="Asset Gambar"
                        description="Temukan berbagai koleksi aset gambar berkualitas tinggi."
                        mtClass="mt-4 md:mt-0"
                    />
                    <AssetBox
                        imgSrc={values2}
                        title="Aset Video"
                        description="Jelajahi beragam video berkualitas untuk kebutuhan Anda."
                        mtClass="mt-4 md:mt-0"
                    />
                    <AssetBox
                        imgSrc={values3}
                        title="Aset Audio"
                        description="Dapatkan berbagai musik dan suara berkualitas tinggi."
                        mtClass="mt-4 md:mt-0"
                    />
                </div>
            </div>
        </section>
    );
};

const AssetBox = (props) => {
    const { imgSrc, title, description, mtClass } = props;

    return (
        <div class="mb-4 px-4 md:w-1/2 lg:w-1/3 transition-all duration-300">
            <div class="bg-white shadow-md p-6 rounded-lg text-center hover:scale-105 transform transition-transform duration-300">
                <img src={imgSrc} class="mb-6 rounded-lg w-full h-auto" alt="" />
                <h3 class="mb-2 font-bold text-blue-800 text-xl">{title}</h3>
                <p class="text-gray-700">{description}</p>
            </div>
        </div>
    );
};

export default Values;
