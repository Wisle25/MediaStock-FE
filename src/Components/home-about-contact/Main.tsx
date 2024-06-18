import { createSignal } from "solid-js";

function Main() {
    return (
        <div>
            <section id="about" class="about">
                <div class="mx-auto mt-14 px-4 container">
                    <div class="flex flex-wrap about-content">
                        <div class="flex flex-col justify-center p-6 lg:w-1/2">
                            <div class="bg-[#f6f9ff] p-10">
                                <h2 class="font-bold text-[#012970] text-2xl">
                                    Platform Aman untuk Membeli dan Menjual Hak Cipta Aset Media
                                </h2>
                                <p class="mt-4 mb-8 leading-6">
                                    Media Stock menyediakan platform online yang aman untuk membeli dan menjual hak cipta berbagai jenis
                                    aset media, seperti gambar, video, dan audio. Kami menyediakan platform online yang aman bagi para
                                    pembeli dan penjual.
                                </p>
                                <div class="text-center lg:text-left">
                                    <a
                                        href="#"
                                        class="inline-flex justify-center items-center bg-[#4154f1] hover:bg-[#4154f1] shadow-md hover:shadow-lg px-10 py-3 rounded-md text-white transition duration-500 self-center"
                                    >
                                        <span class="font-semibold tracking-wider">Read More</span>
                                        <i class="bi-arrow-right ml-2 transition-transform duration-300 bi"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center p-6 lg:w-1/2">
                            <img src="../src/assets/img/about.jpg" class="w-full max-w-sm lg:max-w-full" alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Main;
