import { createSignal } from 'solid-js';
import { RiArrowsArrowDropDownLine } from 'solid-icons/ri';
import { RiArrowsArrowDropUpLine } from 'solid-icons/ri';

const Faq = () => {
    const [faq1Open, setFaq1Open] = createSignal(false);
    const [faq2Open, setFaq2Open] = createSignal(false);
    const [faq3Open, setFaq3Open] = createSignal(false);
    const [faq4Open, setFaq4Open] = createSignal(false);
    const [faq5Open, setFaq5Open] = createSignal(false);
    const [faq6Open, setFaq6Open] = createSignal(false);

    return (
        <section id="faq" class="py-12 w-full faq">
            <div class="mx-auto px-4 lg:px-20 container">
                <header class="mb-5 text-center section-header">
                    <p class="font-bold text-[#012970] text-3xl">FAQ</p>
                </header>

                <div class="gap-10 grid grid-cols-1 lg:grid-cols-2">
                    <div class="col-span-1 lg:col-span-1">
                        <div class="accordion" id="faqlist1">
                            <div class="mt-5 accordion-item">
                                <h2 class="accordion-header">
                                    <button
                                        class={`flex justify-between items-center  bg-white py-2 px-4 w-full font-semibold text-left text-lg accordion-button focus:outline-none  ${faq1Open() ? '' : 'border-b-2 border-gray-200'}`}
                                        onClick={() => setFaq1Open(!faq1Open())}
                                    >
                                        Bagaimana cara membeli aset?
                                        <span class="ml-auto">
                                            {faq1Open() ? <RiArrowsArrowDropUpLine class="w-7 h-7" /> : <RiArrowsArrowDropDownLine class="w-7 h-7" />}
                                        </span>
                                    </button>
                                </h2>
                                {faq1Open() && (
                                    <div id="faq-content-1" class="border-gray-200 px-4 pb-3 border-b-2 accordion-collapse">
                                        <div class="accordion-body">
                                            Untuk membeli aset di Media Stock, Anda perlu membuat akun terlebih dahulu. Setelah itu, Anda dapat
                                            pergi ke store dan memilih aset yang ingin dicari. Tekan asset untuk ke halaman detail asset dan tekan bayar menggunakan metode pembayaran yang tersedia.
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div class="mt-5 mt-5 accordion-item">
                                <h2 class="accordion-header">
                                    <button
                                        class={`flex justify-between items-center  bg-white py-2 px-4 w-full font-semibold text-left text-lg accordion-button focus:outline-none ${faq2Open() ? '' : 'border-b-2 border-gray-200'}`}
                                        onClick={() => setFaq2Open(!faq2Open())}
                                    >
                                        Bagaimana cara menjual aset?
                                        <span class="ml-auto">
                                            {faq2Open() ? <RiArrowsArrowDropUpLine class="w-7 h-7" /> : <RiArrowsArrowDropDownLine class="w-7 h-7" />}
                                        </span>
                                    </button>
                                </h2>
                                {faq2Open() && (
                                    <div id="faq-content-2" class="border-gray-200 px-4 pb-3 border-b-2 accordion-collapse">
                                        <div class="accordion-body">
                                            Setelah mendaftar akun, Anda dapat mengunggah aset di halaman dashboard dan mengatur detail asset beserta harga jualnya. Aset Anda akan ditinjau oleh
                                            tim kami sebelum tersedia untuk dibeli oleh pengguna lain.
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div class="mt-5 accordion-item">
                                <h2 class="accordion-header">
                                    <button
                                        class={`flex justify-between items-center  bg-white py-2 px-4 w-full font-semibold text-left text-lg accordion-button focus:outline-none ${faq3Open() ? '' : 'border-b-2 border-gray-200'}`}
                                        onClick={() => setFaq3Open(!faq3Open())}
                                    >
                                        Bagaimana cara menghubungi dukungan pelanggan?
                                        <span class="ml-auto">
                                            {faq3Open() ? <RiArrowsArrowDropUpLine class="w-7 h-7" /> : <RiArrowsArrowDropDownLine class="w-7 h-7" />}
                                        </span>
                                    </button>
                                </h2>
                                {faq3Open() && (
                                    <div id="faq-content-3" class="border-gray-200 px-4 pb-3 border-b-2 accordion-collapse">
                                        <div class="accordion-body">
                                            Anda dapat menghubungi dukungan pelanggan kami melalui formulir kontak yang tersedia di bawah ini. Mr. Harits akan dengan senang hati membantu Anda dengan pertanyaan atau masalah apa pun yang
                                            Anda miliki.
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div class="col-span-1 lg:col-span-1">
                        <div class="accordion" id="faqlist2">
                            <div class="mt-5 accordion-item">
                                <h2 class="accordion-header">
                                    <button
                                        class={`flex justify-between items-center  bg-white py-2 px-4 w-full font-semibold text-left text-lg accordion-button focus:outline-none ${faq4Open() ? '' : 'border-b-2 border-gray-200'}`}
                                        onClick={() => setFaq4Open(!faq4Open())}
                                    >
                                        Bagaimana cara mengunduh aset yang telah dibeli?
                                        <span class="ml-auto">
                                            {faq4Open() ? <RiArrowsArrowDropUpLine class="w-7 h-7" /> : <RiArrowsArrowDropDownLine class="w-7 h-7" />}
                                        </span>
                                    </button>
                                </h2>
                                {faq4Open() && (
                                    <div id="faq2-content-1" class="border-gray-200 px-4 pb-3 border-b-2 accordion-collapse">
                                        <div class="accordion-body">
                                            Setelah Anda membeli aset di Media Stock, Anda dapat mengunduhnya langsung dari akun Anda. Aset yang
                                            telah Anda beli akan tersedia dalam format yang sesuai dan dapat diunduh dengan mudah.
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div class="mt-5 accordion-item">
                                <h2 class="accordion-header">
                                    <button
                                        class={`flex justify-between items-center  bg-white py-2 px-4 w-full font-semibold text-left text-lg accordion-button focus:outline-none ${faq5Open() ? '' : 'border-b-2 border-gray-200'}`}
                                        onClick={() => setFaq5Open(!faq5Open())}
                                    >
                                        Bagaimana cara menambahkan aset ke keranjang belanja?
                                        <span class="ml-auto">
                                            {faq5Open() ? <RiArrowsArrowDropUpLine class="w-7 h-7" /> : <RiArrowsArrowDropDownLine class="w-7 h-7" />}
                                        </span>
                                    </button>
                                </h2>
                                {faq5Open() && (
                                    <div id="faq2-content-2" class="border-gray-200 px-4 pb-3 border-b-2 accordion-collapse">
                                        <div class="accordion-body">
                                        Cari asset yang ingin ditambahkan kemudian tekan icon keranjang pada saat menghover asset.
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div class="mt-5 accordion-item">
                                <h2 class="accordion-header">
                                    <button
                                        class={`flex justify-between items-center  bg-white py-2 px-4 w-full font-semibold text-left text-lg accordion-button focus:outline-none ${faq6Open() ? '' : 'border-b-2 border-gray-200'}`}
                                        onClick={() => setFaq6Open(!faq6Open())}
                                    >
                                        Bagaimana cara mendaftarkan premium?
                                        <span class="ml-auto">
                                            {faq6Open() ? <RiArrowsArrowDropUpLine class="w-7 h-7" /> : <RiArrowsArrowDropDownLine class="w-7 h-7" />}
                                        </span>
                                    </button>
                                </h2>
                                {faq6Open() && (
                                    <div id="faq2-content-3" class="border-gray-200 px-4 pb-3 border-b-2 accordion-collapse">
                                        <div class="accordion-body">
                                            Setelah login, tekan dashboard dan pilih premium asset. Lakukan dan selesaikan pembayaran maka akun anda akan mengaktifkan fitur premium asset
                                            </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;
