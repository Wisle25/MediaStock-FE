import { createSignal } from "solid-js";
import hero from "/assets/img/hero-bg.png?url"
import heroImg from "/assets/img/hero-img.png?url"

function Section() {
    return (
        <div>
            <section id="hero" class="flex items-center bg-cover bg-no-repeat bg-top px-40 py-16 hero" style={`background-image: url(${hero});`}>
                <div class="mx-auto py-4 container">
                    <div class="flex flex-wrap">
                        <div class="flex flex-col justify-center lg:w-1/2 text-center lg:text-left hero-content">
                            <h1 class="font-bold text-[#012970] text-4xl">Media Stock:</h1>
                            <h1 class="font-bold text-[#012970] text-4xl">Jual Beli Hak Cipta Asset</h1>
                            <h2 class="mt-4 text-[#444444] text-xl">
                                Temukan dan jual berbagai jenis aset media dengan aman dan mudah.
                            </h2>
                            <div>
                                <div class="mt-8 text-center lg:text-left">
                                    <a
                                        href="/store"
                                        class="inline-flex justify-center items-center bg-[#4154f1] hover:bg-[#4154f1] shadow-md hover:shadow-lg px-10 py-3 rounded-lg text-white transition duration-500 btn-get-started self-center"
                                    >
                                        <span class="font-semibold tracking-wider">Go To Shop</span>
                                        <i class="bi-arrow-right ml-2 transition-transform duration-300 bi"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-center mt-8 lg:mt-0 lg:w-1/2 hero-img">
                            <img src={heroImg} class="w-full max-w-sm lg:max-w-full" alt="hero" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Section;
