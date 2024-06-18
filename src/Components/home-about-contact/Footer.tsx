import Link from "../Link";

const Footer = () => {
    return (
        <footer id="footer" class="bg-blue-50 py-4 footer">
            <div class="footer-top">
                <div class="mx-auto px-4 container">
                    <div class="gap-4 grid grid-cols-1 md:grid-cols-5">
                        <FooterInfoBox />
                        <FooterLinks title="Useful Links" links={usefulLinks} />
                        <FooterContact />
                    </div>
                </div>
            </div>

            <div class="mx-auto mt-10 mb-5 px-4 text-center container">
                <div class="text-gray-600 text-sm">
                    &copy; Copyright <strong><span>Media Stock</span></strong>. All Rights Reserved
                </div>
            </div>
        </footer>
    );
};

const FooterInfoBox = () => (
    <div class="col-span-2">
        <a href="" class="flex items-center logo">
            <img src="../src/assets/img/logo.png" alt="" class="max-h-10" />
            <span class="font-semibold text-primary text-xl">Media Stock</span>
        </a>
        <div class="mt-4">
            <p class="text-gray-700 text-sm">
                Media Stock adalah platform terpercaya untuk menjual dan membeli hak cipta aset. Kami menyediakan untuk memonetisasi karya-karya mereka dan bagi para pembeli untuk menemukan konten berkualitas yang mereka butuhkan.
            </p>
        </div>
    </div>
);

const FooterLinks = (props: { title: string; links: { title: string; url: string }[] }) => (
    <div class="col-start-4">
        <h4 class="font-semibold text-lg text-primary">{props.title}</h4>
        <ul class="flex flex-col mx-1 text-gray-700">
            <Link href="/" class="my-0.5 hover:text-primary">Home</Link>
            <Link href="/about" class="my-0.5 hover:text-primary">About</Link>
            <Link href="/Store" class="my-0.5 hover:text-primary">Store</Link>
            <Link href="/contact" class="my-0.5 hover:text-primary">Contact</Link>
        </ul>
    </div>
);

const FooterContact = () => (
    <div class="col-span-1 md:col-span-1">
        <h4 class="mb-2 font-semibold text-lg text-primary">CONTACT US</h4>
        <p class="text-gray-700 text-sm">
            Jalan Ir. Sutami 36 Kentingan,<br />
            Jebres, Surakarta,<br />
            Jawa Tengah, Indonesia<br /><br />
            <strong>No HP:</strong> +6281229006357<br />
            <strong>Email:</strong> mediastock@gmail.com<br />
        </p>
    </div>
);

const usefulLinks = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Store", url: "/store" },
    { title: "Contact", url: "/contact" },
];

export default Footer;
