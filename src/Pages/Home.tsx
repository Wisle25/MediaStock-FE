import { Component } from "solid-js";
import Header from "../Layouts/Header";
import Section from "../Components/home-about-contact/Section";
import Main from "../Components/home-about-contact/Main";
import Service from "../Components/home-about-contact/Service";
import Footer from "../Components/home-about-contact/Footer";


const Home: Component = () => {
    return (
        <p>
            <Header />
            <Section />
            <Main />
            <Service />
            <Footer />
        </p>
    )
}

export default Home;