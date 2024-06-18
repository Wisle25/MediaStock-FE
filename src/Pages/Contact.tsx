import { Component } from "solid-js";
import Header from "../Layouts/Header";

import Footer from "../Components/home-about-contact/Footer";
import Faq from "../Components/home-about-contact/Faq";
import ContactAdmin from "../Components/home-about-contact/ContactAdmin";


const Home: Component = () => {
    return (
        <div class="w-full">
            <Header />
            <Faq />
            <ContactAdmin />
            <Footer />
        </div>
    )
}

export default Home;