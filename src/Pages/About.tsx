import { Component } from "solid-js";
import Header from "../Layouts/Header";

import Footer from "../Components/home-about-contact/Footer";
import Feature from "../Components/home-about-contact/Feature";
import Values from "../Components/home-about-contact/Values";


const About: Component = () => {
    return (
        <p>
            <Header />
            <Feature />
            <Values />
            <Footer />
        </p>
    )
}

export default About;